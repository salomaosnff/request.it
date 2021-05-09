import { Request } from "../../../types/request-file";
import { HttpInterceptor } from "../../Interceptor";
import { performance } from "perf_hooks";

declare module "../../../types/request-file" {
  interface Request {
    start: number;
  }
}

export class TimeRequestInterceptor implements HttpInterceptor<Request> {
  public async handler(req: Request): Promise<Request> {
    req.start = performance.now();

    return req;
  }
}
