const fs = require("fs");
const mime = require("mime-types");
const breakLine = "\n";

export type FormDataValue = string | File | number;
export type FormDataEntry = [string, FormDataValue];
export type FormDataCallback = (
  name: string,
  value: FormDataValue,
  index: number
) => void;

export class File {
  static from(name: string, contentType: string = mime.lookup(name)) {
    return new File(name, fs.readFileSync(name), contentType);
  }

  constructor(
    public filename: string,
    public data: Buffer,
    public type: string
  ) {}
}

export class FormData {
  public boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW";
  private _entries: FormDataEntry[] = [];

  static from(form: Record<string, FormDataValue | FormDataValue[]>) {
    const formData = new FormData();

    for (const [key, value] of Object.entries(form)) {
      formData.set(key, value);
    }

    return formData;
  }

  public append(name: string, data: FormDataValue) {
    if (data instanceof File) {
      this._entries.push([name, data]);
    } else {
      this._entries.push([name, data]);
    }

    return this;
  }

  public delete(name: string) {
    this._entries = this._entries.filter(([entryName]) => entryName !== name);

    return this;
  }

  public entries() {
    return this._entries;
  }

  public forEach(callback: FormDataCallback) {
    this._entries.forEach(([name, data], index: number) => {
      callback(name, data, index);
    });
  }

  public get(name: string) {
    for (const [entryName, data] of this._entries) {
      if (entryName === name) {
        return data;
      }
    }

    return null;
  }

  public getAll(name: string) {
    return this._entries.reduce<FormDataValue[]>((acc, [entryName, data]) => {
      if (entryName === name) {
        acc.push(data);
      }

      return acc;
    }, []);
  }

  public has(name: string) {
    return this._entries.some(([entryName]) => entryName === name);
  }

  public keys() {
    return this._entries.map(([entryName]) => entryName);
  }

  public set(name: string, data: FormDataValue | FormDataValue[]) {
    this.delete(name);

    if (Array.isArray(data)) {
      data.forEach((val) => {
        this.append(name, val);
      });
    } else {
      this.append(name, data);
    }
  }

  public values() {
    return this._entries.map(([data]) => data);
  }

  public toBuffer() {
    const chunks: Buffer[] = [Buffer.from(this.boundary + breakLine)];

    this.forEach((name, value) => {
      console.log("name", name);
      console.log("value", value);
      let chunk: Buffer;

      if (value instanceof File) {
        chunk = Buffer.from(
          `Content-Disposition: form-data; name="${name}"${breakLine}` +
            // `content-type: ${value.type}\n` +
            // `content-transfer-encoding: quoted-printable\n` +
            value.data +
            "\n" +
            this.boundary
        );
      } else {
        console.log("caiu no else");
        chunk = Buffer.from(
          `Content-Disposition: form-data; name="${name}"${breakLine}${breakLine}` +
            // "content-type: text/plain;charset=windows-1250\n" +
            // `content-transfer-encoding: quoted-printable\n\n` +
            String(value) +
            "\n" +
            this.boundary
        );
      }

      chunks.push(chunk);
    });

    chunks.push(Buffer.from(breakLine));

    return Buffer.concat(chunks);
  }
}
