import { schema } from "./model";
import { Event } from "@models";

import {
  JsonRpcCallback,
  JsonRpcContext,
  JsonRpcErrorTypeMnemocode,
  jsonRpcError,
  jsonRpcResult,
} from "@shared/jsonrpc";
import { EventListDefaultRequest, EventListDefaultResponse } from "types";

export async function eventListDefault(
  args: EventListDefaultRequest,
  _: JsonRpcContext,
  callback: JsonRpcCallback
) {
  try {
    await schema.validate(args);

    const additionalFilter: Record<string, any> = {};

    if(args.date) {
      additionalFilter.dateFrom = { $lte: args.date };
      additionalFilter.dateTo = { $gte: args.date };
    }

    if(args.typeMnemocode) {
      additionalFilter.typeMnemocode = args.typeMnemocode;
    }

    const eventDocs = await Event.find({
      ...additionalFilter,
      location: {
        $geoWithin: {
          $box: [
            [args.sw[0], args.sw[1]],
            [args.ne[0], args.ne[1]],
          ],
        },
      },
    });

    jsonRpcResult<EventListDefaultResponse>({
      callback,
      result: eventDocs.map(key => ({
        id: key.id,
        typeMnemocode: key.typeMnemocode,
        name: key.name,
        description: key.description,
        dateFrom: key.dateFrom,
        dateTo: key.dateTo,
        coordinates: key.location.coordinates
      }))
    });
  } catch (e) {
    jsonRpcError({
      callback,
      errorTypeMnemocode: JsonRpcErrorTypeMnemocode.UnknownError,
    });
  }
}
