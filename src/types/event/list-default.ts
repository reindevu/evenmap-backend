export interface EventListDefaultRequest {
  sw: number[];
  ne: number[];
  date?: string;
  typeMnemocode?: string;
}

export interface EventListDefaultResponse
  extends Array<{
    id: string;
    name: string;
    typeMnemocode: string;
    description: string;
    dateFrom: Date;
    dateTo: Date;
    coordinates: number[];
  }> {}
