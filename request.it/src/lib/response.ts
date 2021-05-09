import { Headers } from "./request-file";

export interface Response {
  headers: Headers;
  status: number;
  statusText: string;
  contentType: string;
  body: any;
  data: any;
  time: number;
}
