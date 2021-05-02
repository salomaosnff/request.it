export type RequestDataRaw = string;
export type RequestDataFormField = { name: string; value: string };
export type RequestDataFormFieldFile = RequestDataFormField & { type: 'file' };
export type RequestDataFormFieldText = RequestDataFormField & { type: 'text' };
export type RequestDataForm<T extends RequestDataFormField> = { form: T[] };

export type RequestDataFormMultipart = { type: 'multipart' } & RequestDataForm<
    RequestDataFormFieldText
    | RequestDataFormFieldFile
>;

export type RequestDataFormUrlEncoded = {
    type: 'urlencoded'
} & RequestDataForm<RequestDataFormField>;


export type RequestDataJSON = {
    type: 'json'
    json: any
};

export type RequestDataXML = {
    type: 'xml'
    xml: any
};

export type RequestData = RequestDataRaw
    | RequestDataJSON
    | RequestDataFormMultipart
    | RequestDataFormUrlEncoded
    | RequestDataXML;