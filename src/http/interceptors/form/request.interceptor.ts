import { Request } from "../../../types/request-file";
import { HttpInterceptor } from "../../Interceptor";
import { stringify } from "querystring";
import { FormData } from "../../../types/form-data";

declare module "../../../types/request-file" {
  interface Request {
    start: number;
  }
}

export class FormRequestInterceptor implements HttpInterceptor<Request> {
  async prepare(request: Request) {
    if (request.contentType === "urlencoded") {
      request.body = stringify(request.body);
    } else if (request.contentType === "multipart") {
      const form = request.body as FormData;
      request.body = form.toBuffer();
      request.headers[
        "content-type"
      ] = `multipart/form-data; boundary=${form.boundary}`;
      request.headers[
        "content-length"
      ] = request.body.byteLength;
      
      console.log(request.headers['content-type'].toString());
      console.log(request.headers['content-length'].toString());
      console.log(request.body.toString());
    }

    return request;
  }
}
