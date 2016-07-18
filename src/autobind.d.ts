export declare function autoBindMethod<T extends Function>(target: Object, key: string, descriptor: TypedPropertyDescriptor<T>): {
    configurable: boolean;
    get(): any;
    set(newValue: any): any;
};
export declare function autoBindClass<T extends Function>(target: T): T;
