export type Constructor<T = any> = new (...args: any[]) => T;

export interface Singleton<T, O extends {}> {
  value?: T;
  shouldUpdate?: boolean;
  opts?: O;
  get(opts?: O): T;
}

export class SingletonContainer {
  private static _instances = new Map<Constructor, Singleton<any, any>>();

  static set<T, O>(ItemConstructor: Constructor<Singleton<T, O>>, opts?: O): void {
    let instance = new ItemConstructor(ItemConstructor);
    
    instance.shouldUpdate = true;
    instance.opts = opts;

    SingletonContainer._instances.set(ItemConstructor, instance);
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  static get<T, O>(ItemConstructor: Constructor<Singleton<T, O>>, opts?: O): T {
    let instance = SingletonContainer._instances.get(ItemConstructor);

    if (!instance || instance?.shouldUpdate) {
      opts = opts ?? instance?.opts;
      instance = new ItemConstructor();
      instance.opts = opts;
      instance.value = instance.get(opts);

      SingletonContainer._instances.set(ItemConstructor, instance);
    }

    return instance!.value;
  }
}
