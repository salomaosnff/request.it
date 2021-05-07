import { Request, RequestMethod } from "../../../types/request-file";
import { HttpInterceptor } from "../../Interceptor";

declare module '../../../types/request-file' {
    interface Request {
        vars ?: Record<string, any>
    }
}

export class VarsRequestInterceptor implements HttpInterceptor<Request> {
    async canActivate(request: Request) {
        return !!request.vars && typeof request.vars === 'object';
    }

    parse(str: string, vars?: Record<string, any>) {
        if (vars === undefined) {return str;}

        return str.replace(/\{\{(\s*.*?\s*\}\})/gmi, (_, name: string) => {
            const key = name.trim();
            const value = vars[key];

            return value === undefined ? name : value;
        });
    }

    async prepare(request: Request) {
        request.method = this.parse(request.method, request.vars) as RequestMethod;
        request.url = this.parse(request.url, request.vars);

        for (const [name, value] of Object.entries(request.headers)) {
            request.headers[name] = this.parse(value, request.vars);
        }

        for (const [name, value] of Object.entries(request.query)) {
            request.query[name] = this.parse(value, request.vars);
        }

        return request;
    }
}