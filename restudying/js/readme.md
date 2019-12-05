# Javascript

1. 基础知识
  - es6常用语法：Class Module Promise 等
  - 原型高级应用：结合jQuery和zepto源码
  - 异步全面讲解：从原理到jQuery再到Promise
2. 框架原理
  - 虚拟DOM：存在价值、如何使用、diff算法
  - MVVM Vue：MVVM，Vue响应式、模板解析、渲染
  - 组件化React：组件化、JSX、vdom、setState 
3. 混合开发
  - hybrid：基础、上线流程
  - hybrid vs H5
  - 前端客户端通讯：原理，JS-Bridge封装
4. 热爱编程
  - 读书、博客
  - 开源

## es6

1. ES6 模块化如何使用，开发环境如何打包
  -  语法： import export （注意有无 default)
  -  环境： babel 编译 ES6 语法，模块化可用 webpack 和 rollup
  -  扩展： 说一下自己对模块化标准统一的期待
2. Class 和普通构造函数有何区别
  -  JS 构造函数
  -  Class 基本语法
  -  语法糖
  -  继承
3. Promise 的基本使用和原理
  -  new Promise 实例，而且要 return
  -  new Promise 时要传入函数，函数有 resolve reject 两个参数 
  -  成功时执行 resolve() 失败时执行 reject()
  -  then 监听结果
4. 总结一下 ES6 其他常用功能
  -  let/const
  -  多行字符串/模板变量
  -  解构赋值
  -  块级作用域
  -  函数默认参数
  -  箭头函数

## 原型
1. 说一个原型的实际应用

  - jquery如何使用原型
```javascript
(function(window) {
  var zepto = {}

  function Z(dom, selector) {
    var i, len = dom ? dom.length : 0
    for (i = 0; i < len; i++) {
      this[i] = dom[i] // 赋值到new Z实例的属性中
    }
    this.length = len
    this.selector = selector || ''
  }

  zepto.Z = function (dom, selector) {
    return new Z(dom, selector)
  }

  zepto.init = function(selector) {
    var slice = Array.prototype.slice
    var dom = slice.call(document.querySelectorAll(selector))
    return zepto.Z(dom, selector)
  }

  var $ = function(selector) {
    return zepto.init(selector)
  } 
  window.$ = $

  $.fn = {
    css: function () {console.log('css')},
    html: function () {console.log('html')},
  }

  Z.prototype = $.fn
}
)(window)
```
  - zepto如何使用原型
```javascript
(function(window){
  var jQuery = function (selector) {
    return new jQuery.fn.init(selector)
  }

  jQuery.fn = {
    css: function(){console.log('css')},
    html: function(){console.log('html')},
  }

  var init = jQuery.fn.init = function (selector) {
    var slice = Array.prototype.slice
    var dom = slice.call(document.querySelectorAll(selector))

    var i, len = dom?dom.length : 0
    for (i = 0; i < len; i++) {
      this[i] = dom[i]
    }
    this.length = len
    this.selector = selector || ''
  }

  init.prototype = jQuery.fn

  window.$ = jQuery
})(window)
```
  - 入口函数、构造函数、构造函数原型
2. 原型如何体现它的扩展性
```javascript
// 扩展插件
$.fn.getNodeName = function(){
  return this[0].nodeName
}
```
好处：
  -  只有 $ 会暴露在 window 全局变量
  -  将插件扩展统一到 $.fn.xxx 这一个接口，方便使用

