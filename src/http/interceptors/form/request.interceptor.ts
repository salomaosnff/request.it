import { Request } from "../../../types/request-file";
import { HttpInterceptor } from "../../Interceptor";
import { stringify } from "querystring";

declare module "../../../types/request-file" {
  interface Request {
    start: number;
  }
}

export class FormRequestInterceptor implements HttpInterceptor<Request> {
  async prepare(request: Request) {
    if (request.contentType === "urlencoded") {
      request.body = stringify(request.body);
    }

    return request;
  }
}
