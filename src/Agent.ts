import * as http from 'http';
import * as https from 'https';
import { URL } from 'url';
import pick from 'lodash.pick';
import { RequestFile } from './types/request-file';
import { stringify } from 'querystring';

interface RequestFileWithVars extends RequestFile {
    vars: Record<string, any>
}

export class HttpClient {
    getTemplateString(template: string, vars: Record<string, any> = {}) {
        return template.replace(/\{\{(\s*.+?\s*)\}\}/, (_, name) => {
            const value = pick(vars, name.trim());
            return value === undefined ? name : value;
        });
    }

    getURL(req:RequestFileWithVars) {
        const url = this.getTemplateString(req.url, req.vars);
        const parsed = new URL(url);

        for(let [name, value] of Object.entries(req.query ?? {})) {
            parsed.searchParams.set(name, value);
        }

        return parsed;
    }

    getHeaders(req: RequestFileWithVars) {
        return Object.entries(req.headers ?? {}).reduce((acc, [key, value]) => {
            key = this.getTemplateString(key);
            value = this.getTemplateString(value);

            acc[key] = value;

            return acc;
        }, {} as Record<string, any>);
    }

    hasHeader(req: RequestFile, name: string) {
        if (!req.headers) {return false;}
        return name in req.headers || name.toLowerCase() in req.headers;
    }

    normalizeHeaders(req: RequestFileWithVars) {
        req.headers = req.headers ?? {};
        if (typeof req.data !== 'object') {return req;}

        if (req.data.type === 'json') {
            if (!this.hasHeader(req, 'Content-Type')) {
                req.headers['Content-Type'] = 'application/json';
            }
        } else if (req.data.type === 'xml') {
            if (!this.hasHeader(req, 'Content-Type')) {
                req.headers['Content-Type'] = 'application/xml';
            }
        } else if (req.data.type === 'multipart') {
            if (!this.hasHeader(req, 'Content-Type')) {
                req.headers['Content-Type'] = 'multipart/form-data';
            }
        } else if (req.data.type === 'urlencoded') {
            if (!this.hasHeader(req, 'Content-Type')) {
                req.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            }
        }
    }

    getBody(req: RequestFileWithVars) {
        if (typeof req.data !== 'object') {return req.data;}
        if (req.data.type === 'json') {return JSON.stringify(req.data.json);}
        if (req.data.type === 'urlencoded') {return stringify(req.data.form.reduce((acc, field) => ({...acc, [field.name]: field.value}), {}));}
        if (req.data.type === 'xml') {return req.data;}
    }

    request(req: RequestFileWithVars) {
        return new Promise<Buffer>((resolve, reject) => {
            const url = this.getURL(req);
            const chunks: Buffer[] = [];

            this.normalizeHeaders(req);

            const request = url.protocol === 'https:' ? https.request : http.request;

            request(url, {
                method: req.method,
                headers: this.getHeaders(req),
                timeout: 3000
            }, (res) => {
                res
                    .on('data', chunk => chunks.push(chunk))
                    .on('close', () => resolve(Buffer.concat(chunks)))
                    .on('error', reject)
                ;
            }).end(this.getBody(req));
        });
    }
}