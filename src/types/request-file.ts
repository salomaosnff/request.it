import { RequestAuthOAuth2 } from "./oauth";

export type RequestMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "OPTIONS"
  | "HEAD";
export type RequestFormTextField = { name: string; value: any };
export type RequestFormFileField = { name: string; file: string };
export type RequestFormField = RequestFormTextField | RequestFormFileField;
export type RequestAuth = { enabled?: boolean } & RequestAuthOAuth2;
export type Headers = Record<string, any>;

export interface Request {
  method: RequestMethod;
  url: string;
  headers: Headers;
  query: Record<string, any>;
  auth?: RequestAuth;
  followRedirects?: boolean;
  timeout?: number;
  contentType?: string;
  body?: any;
  maxRedirects?: number
}

export interface RequestFile extends Request {
  name: string;
  docs?: string;
}
