export class Command<T = any[]> {
  constructor(public name: string, public args: T) {}

  public send(): void {
    window.vscodeAcquireVsCodeApi.postMessage(this);
  }

  static call<T = any[]>(name: string, args: T): void {
    return new Command(name, args).send();
  }
}
