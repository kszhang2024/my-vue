import { initMixin } from './init.js';

// Vue 实际是一个构造函数, 通过 new 进行实例化
function Vue(options) {
    // 开始 Vue 的初始化
    this._init(options);
}

// 有利于代码分割
initMixin(Vue);

export default Vue;