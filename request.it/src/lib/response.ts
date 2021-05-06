import { ContentType } from "./request-data";
import { Headers } from "./request-file";

export interface Response {
  headers: Headers;
  status: number;
  statusText: string;
  contentType: ContentType;
  body: any;
  data: any;
}
