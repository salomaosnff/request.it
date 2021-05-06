import * as http from 'http';
import * as https from 'https';
import { URL } from 'url';
import pick from 'lodash.pick';
import { Request, RequestFile } from '../types/request-file';
import { stringify } from 'querystring';
import { HttpInterceptorSet } from './Interceptor';
import { Response } from '../types/response';

interface RequestFileWithVars extends RequestFile {
    vars: Record<string, any>
}

export class HttpClient {
    interceptors = {
        request: new HttpInterceptorSet<Request>(),
        response: new HttpInterceptorSet<Response>(),
    };

    request(req: Request) {
        return new Promise<Response>(async (resolve, reject) => {
            try {
                req = await this.interceptors.request.prepare(req);
                req = await this.interceptors.request.handler(req);

                const url = new URL(req.url);
                const chunks: Buffer[] = [];
                const request = url.protocol === 'https:' ? https.request : http.request;

                request(url, {
                    method: req.method,
                    headers: req.headers,
                    timeout: req.timeout ?? 30000,
                }, (stream) => {
                    stream
                        .on('data', chunk => chunks.push(chunk))
                        .on('close', async () => {
                            let res: Response = {
                                headers: stream.headers,
                                status: stream.statusCode ?? 0,
                                statusText: stream.statusMessage ?? '',
                                contentType: 'binary',
                                body: Buffer.concat(chunks)
                            };

                            try {
                                res = await this.interceptors.response.prepare(res);
                                res = await this.interceptors.response.handler(res);
                                
                                resolve(res);
                            } catch (err) {
                                reject(err);
                            }
                        })
                        .on('error', reject)
                    ;
                }).end(req.body);
            } catch(err) {
                reject(err);
            }
        });
    }
}