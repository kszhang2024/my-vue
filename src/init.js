import { initState } from "./state";

export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        const vm = this;
        
        // 这里的 this 代表调用 _init 方法的对象（实例对象）
        vm.$options = options;

        // 初始化状态
        initState(vm);
    }
}