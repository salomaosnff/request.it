import * as http from "http";
import * as https from "https";
import { URL } from "url";
import pick from "lodash.pick";
import { Request, RequestFile } from "../types/request-file";
import { stringify } from "querystring";
import { HttpInterceptorSet } from "./Interceptor";
import { Response } from "../types/response";

interface RequestFileWithVars extends RequestFile {
  vars: Record<string, any>;
}

export class HttpClient {
  interceptors = {
    request: new HttpInterceptorSet<Request>(),
    response: new HttpInterceptorSet<Response>(),
  };

  streamToPromise(readable: NodeJS.ReadableStream) {
    return new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];

      readable
        .on("data", (chunk) => {
          chunks.push(chunk);
        })
        .on("close", () => {
          resolve(Buffer.concat(chunks));
        })
        .on("error", reject);
    });
  }

  request(req: Request) {
    return new Promise<Response>(async (resolve, reject) => {
      try {
        req = await this.interceptors.request.prepare(req);
        req = await this.interceptors.request.handler(req);

        const url = new URL(req.url);
        const request =
          url.protocol === "https:" ? https.request : http.request;

        const reqStream = request(
          url,
          {
            method: req.method,
            headers: req.headers,
            timeout: req.timeout ?? 30000,
          },
          (stream) => {
            if (
              new Set([301, 307, 308]).has(stream.statusCode as number) &&
              req.followRedirects &&
              (req.maxRedirects ?? 5) > 0
            ) {
              return resolve(
                this.request({
                  ...req,
                  maxRedirects: req.maxRedirects! - 1,
                  url: stream.headers.location!,
                })
              );
            }

            let res = {
              headers: stream.headers,
              status: stream.statusCode ?? 0,
              statusText: stream.statusMessage ?? "",
              contentType: "binary",
              body: Buffer.alloc(0),
              request: req,
            } as Response;

            this.streamToPromise(stream)
              .then(async (body) => {
                try {
                  res.body = body;
                  res = await this.interceptors.response.prepare(res);
                  res = await this.interceptors.response.handler(res);
                  resolve(res);
                } catch (err) {
                  reject(err);
                }
              })
              .catch(reject);
          }
        );

        reqStream.end(req.body);
      } catch (err) {
        reject(err);
      }
    });
  }
}
