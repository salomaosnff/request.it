import { Headers, Request } from "./request-file";

export interface Response {
  headers: Headers;
  status: number;
  statusText: string;
  contentType: string;
  body: any;
  data: any;
  request?: Request;
}
