import { observer } from "./observer/index.js";

export default function initState(vm) {
  // 获取传入的数据对象
  const opts = vm.$options;
  if (opts.props) {
    initProps(vm);
  }
  if (opts.methods) {
    initMethods(vm);
  }
  if (opts.data) {
    initData(vm);
  }
  if (opts.computed) {
    initComputed(vm);
  }
  if (opts.watch) {
    initWatch(vm);
  }
}

function initData(vm) {
  let data = vm.$options.data;
  // 使用函数防止数据在组件之间共享
  data = vm._data = typeof data === "function" ? data.call(vm) : data || {};

  for (let key in data) {
      // 代理，通过 this.a 来访问 this._data.a
      proxy(vm, `_data`, key);
  }

  // 对数据进行观测
  observer(data);
}

function proxy(target, sourceKey, key) {
  Object.defineProperty(target, sourceKey, {
    get() {
      return target[sourceKey][key];
    },
    set(newValue) {
      target[sourceKey][key] = newValue;
    },
  });
}
