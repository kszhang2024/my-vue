import { arrayMethods } from "./array";

class Observer {
    // 观测值
    constructor(value) {
        // 创建 __ob__ 属性
        Object.defineProperty(value, `__ob__`, {
            value: this,
            enumerable: false,
            configurable: true,
            writable: true
        });

        if (Array.isArray(value)) {
            // 重写原型方法
            value.__proto__ = arrayMethods;
            // 递归判断数组元素
            this.observeArray(value);
        } else {
            this.walk(value);
        }
    }

    walk(data) {
        // 对象上的所有属性进行观测
        const keys = Object.keys(data);
        for(let key of keys) {
            let value = data[key];
            defineReactive(data, key, value);
        }
    }

    observeArray(data) {
        for (let i=0; i<data.length; i++) {
            observer(data[i]);
        }
    }
}

function defineReactive(data, key, value) {
    // 递归入口
    observer(value);

    Object.defineProperty(data, key, {
        get() {
            console.log("获取值");
            return value;
        },
        set(newValue) {
            if (value === newValue) return;
            console.log("设置值");
            value = newValue;
        }
    });
}

export function observer(value) {
    if(Array.isArray(value) || Object.prototype.toString.call(value) === "[object Object]") {
        return new Observer(value);
    }
}