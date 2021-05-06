import { Request } from "../../../types/request-file";
import { HttpInterceptor } from "../../Interceptor";

export class JSONRequestInterceptor implements HttpInterceptor<Request> {
    async canActivate(request: Request) {
        return request.contentType === 'json';
    }

    async prepare(request: Request) {
        if (!request.headers['content-type']) {
            request.headers = {
                ['content-type']: 'application/json'
            };
        }

        return request;
    }

    async handler(request: Request) {
        request.body = JSON.stringify(request.body);
        return request;
    }
}