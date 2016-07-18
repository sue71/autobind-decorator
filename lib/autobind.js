"use strict";
function autoBindMethod(target, key, descriptor) {
    var fn = descriptor.value;
    return {
        configurable: true,
        get: function () {
            if (this === fn.prototype) {
                return fn;
            }
            return fn.bind(this);
        },
        set: function (newValue) {
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
exports.autoBindMethod = autoBindMethod;
function autoBindClass(target) {
    var keys;
    keys = Object.getOwnPropertyNames(target.prototype);
    keys.forEach(function (key) {
        var descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);
        if (typeof descriptor.value === "function") {
            Object.defineProperty(target.prototype, key, autoBindMethod(target, key, descriptor));
        }
    });
    return target;
}
exports.autoBindClass = autoBindClass;
