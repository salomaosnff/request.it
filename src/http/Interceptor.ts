import { Stream } from "node:stream";
import { Request } from "../types/request-file";

export interface HttpInterceptor<T> {
    canActivate?(data: T): Promise<boolean>
    prepare?(data: T): Promise<T>;
    handler?(data: T): Promise<T>
}

export class HttpInterceptorSet<T, I extends HttpInterceptor<T> = HttpInterceptor<T>> {
    private _set = new Set<I>();

    use(interceptor: I) {
        this._set.add(interceptor);
        return this;
    }

    eject(interceptor: I) {
        this._set.delete(interceptor);
        return this;
    }

    clear () {
        this._set.clear();
        return this;
    }

    private async accumulate<R>(
        fn: (interceptor: I, value: R) => Promise<R>,
        initialValue: R
    ) {
        for(const interceptor of this._set) {
            initialValue = await fn(interceptor, initialValue) ?? initialValue;
        }

        return initialValue;
    }

    prepare(data: T) {
        return this.accumulate(async (interceptor, data) => {
            if (await interceptor.canActivate!(data) ?? true) {
                return interceptor.prepare!(data) ?? data;
            }
            return data;
        }, data);
    }

    handler(data: T) {
        return this.accumulate(async (interceptor, data) => {
            if (await interceptor.canActivate!(data) ?? true) {
                return interceptor.handler!(data) ?? data;
            }
            return data;
        }, data);
    }
}