export type Constructor<T = any> = new(...args: any[]) => T;

export interface Singleton<T, O = {}> {
    value?: T
    shouldUpdate?: boolean
    get(opts?: O): T
}


export class SingletonContainer {
    private static _instances = new Map<Constructor, Singleton<any>>();

    // eslint-disable-next-line @typescript-eslint/naming-convention
    static get<T, O>(ItemConstructor: Constructor<Singleton<T, O>>, opts?: O): T {
        let instance = SingletonContainer._instances.get(ItemConstructor);
        
        if (!instance || instance?.shouldUpdate) {
            instance = new ItemConstructor();

            instance.value = instance.get(opts);
    
            SingletonContainer._instances.set(ItemConstructor, instance);
        }
        
        
        return instance!.value;
    }
}