import { schema } from "./model";
import { Event } from "@models";

import {
  JsonRpcCallback,
  JsonRpcContext,
  JsonRpcErrorTypeMnemocode,
  jsonRpcError,
  jsonRpcResult,
} from "@shared/jsonrpc";
import { EventCreateDefaultRequest, EventCreateDefaultResponse } from "types";

export async function eventCreateDefault(
  args: EventCreateDefaultRequest,
  _: JsonRpcContext,
  callback: JsonRpcCallback
) {
  try {
    await schema.validate(args);

    const eventCreateDoc = await Event.create({
      name: args.name,
      typeMnemocode: args.typeMnemocode,
      description: args.description,
      dateFrom: new Date(args.dateFrom),
      dateTo: new Date(args.dateTo),
      location: {
        type: "Point",
        coordinates: args.lngLat
      },
    });

    jsonRpcResult<EventCreateDefaultResponse>({
      callback,
      result: {
        id: eventCreateDoc.id,
      },
    });
  } catch (e) {
    console.log(e);
    jsonRpcError({
      callback,
      errorTypeMnemocode: JsonRpcErrorTypeMnemocode.UnknownError,
    });
  }
}
