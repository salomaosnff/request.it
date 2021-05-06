import { Response } from "../../../types/response";
import { HttpInterceptor } from "../../Interceptor";

export class JSONResponseInterceptor implements HttpInterceptor<Response> {
    async canActivate(response: Response) {
        return response.headers['content-type'];
    }

    async prepare(response: Response) {
        response.contentType = 'json';
        return response;
    }

    async handler(response: Response) {
        response.body = JSON.stringify(response.body.toString());
        return response;
    }
}