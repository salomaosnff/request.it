import { Response } from "../../../types/response";
import { HttpInterceptor } from "../../Interceptor";
import { performance } from "perf_hooks";

declare module "../../../types/response" {
  interface Response {
    end: number;
    time: number;
  }
}

export class TimeResponseInterceptor implements HttpInterceptor<Response> {
  public async handler(res: Response): Promise<Response> {
    res.end = performance.now();
    res.time = res.end - res.request!.start;

    return res;
  }
}
