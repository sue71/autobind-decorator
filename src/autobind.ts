export function autoBindMethod<T extends Function>(target: Object, key: string, descriptor: TypedPropertyDescriptor<T>) {
  let fn = descriptor.value;

  return {
    configurable: true,

    get() {
      if (this === fn.prototype) {
        return fn;
      }
      return fn.bind(this);
    },

    set(newValue) {
      Object.defineProperty(this, key, {
        configurable: true,
        writable: true,
        enumerable: true,
        value: newValue
      });
      return newValue;
    }
  };

}

export function autoBindClass<T extends Function>(target: T): T {
  let keys;

  keys = Object.getOwnPropertyNames(target.prototype);

  keys.forEach(key => {
    let descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);

    if (typeof descriptor.value === "function") {
      Object.defineProperty(target.prototype, key, autoBindMethod(target, key, descriptor));
    }

  });

  return target;
}
