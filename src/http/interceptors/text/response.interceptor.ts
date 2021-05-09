import { Response } from "../../../types/response";
import { HttpInterceptor } from "../../Interceptor";

export class TextResponseInterceptor implements HttpInterceptor<Response> {
  public canActivate(res: Response): Promise<boolean> {
    return (
      res.data === undefined &&
      (res.headers["content-type"]?.startsWith("text/") ||
        res.headers["content-type"]?.startsWith("application/json") ||
        res.headers["content-type"]?.startsWith("image/svg"))
    );
  }

  public async prepare(res: Response): Promise<Response> {
    const contentType = res.headers["content-type"] ?? "";

    if (contentType.startsWith("text/html")) {
      res.contentType = "html";
    } else if (contentType.startsWith("text/xml")) {
      res.contentType = "xml";
    } else if (contentType.startsWith("text/css")) {
      res.contentType = "css";
    } else if (contentType.startsWith("text/javascript")) {
      res.contentType = "javascript";
    } else if (contentType.startsWith("application/json")) {
      res.contentType = "json";
    } else if (contentType.startsWith("image/svg")) {
      res.contentType = "xml";
    } else {
      res.contentType = "text";
    }

    return res;
  }

  public async handler(res: Response): Promise<Response> {
    res.data = res.body.toString();
    return res;
  }
}
