import { RequestAuthOAuth2 } from "./oauth";
import { RequestData } from "./request-data";

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD';
export type RequestFormTextField = { name: string; value: any };
export type RequestFormFileField = { name: string; file: string };
export type RequestFormField = RequestFormTextField | RequestFormFileField;
export type RequestAuth = { enabled?: boolean } & (RequestAuthOAuth2);
export type Headers = Record<string, string>;

export type RequestFile = {
    name: string
    method: RequestMethod
    url: string
    headers?: Headers
    query?: Record<string, any>
    auth?: RequestAuth
    data?: RequestData
    followRedirects?: boolean
    docs?: string
};

const x: RequestFile = {
    name: 'Listar usuários',
    method: 'DELETE',
    url: 'https://www.google.com',
    data: {
        type: 'multipart',
        form: [
            { name: 'test', type: 'file', value: './file.jpg' }
        ]
    }   
};