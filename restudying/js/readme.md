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


## 异步
1.  什么是单线程，和异步有什么关系
  -  单线程 - 只有一个线程，只能做一件事，两段 JS 不能同时执行
  -  原因 - 避免 DOM 渲染的冲突
  ```
  浏览器需要渲染 DOM
  JS 可以修改 DOM 结构
  JS 执行的时候，浏览器 DOM 渲染会暂停
  两段 JS 也不能同时执行（都修改 DOM 就冲突了）
  webworker 支持多线程，但是不能访问 DOM
  ```
  -  解决方案 - 异步
  -  实现方式 - event loop
2.  什么是 event-loop
  -  事件轮询，JS 实现异步的具体解决方案
  -  同步代码，直接执行
  -  异步函数先放在 异步队列 中
  -  待同步函数执行完毕，轮询执行 异步队列 的函数
3.  是否用过 jquery 的 Deferred
4.  Promise 的基本使用和原理
  - 基本语法
  ```javascript
  function loadImg(src) {
    const promise = new Promise(function(resolve, reject){
      var img = document.createElement('img')
      img.onload = function(){
        resolvee(img)
      }
      img.onerror = function(){
        reject(img)
      }
      img.src = src
    })
    return promise
  }
  loadImg(src)
  .then(
    img => console.log(img.width), 
    err=> console.log('fail'))
  .then(img => console.log(img.height))
  ```
  - 异常捕获 - Error 和 reject 都要考虑
  - 多个串联 - 链式执行的好处
  - Promise.all 和 Promise.race
  ```javascript
  // 全部完成之后，统一执行success
  Promise.all([result1, result2]).then(datas => {
    datas[0], datas[1]
  })
  // 只要一个完成，就执行success
  Promise.race([result1, result2]).then(data => {
    data
  })
  ```
  - Promise 标准 - 状态变化，then 函数
      - 三种状态： pending fulfilled rejected。
      - 初始状态是pending。
      - pending 变成 fulfilled, 或者 pending 变成 rejected。
      - 状态变化不可逆。

      - Promise 实例必须实现 then 方法
      - then() 可以接收两个函数作为参数
      - then() 返回的必须是一个Promise实例
5.  介绍一下 async/await（和 Promise 的区别、联系）
  - 基本语法
      -  使用 await ，函数必须用 async 标识
      -  await 后面跟的是一个 Promise 实例
      -  需要 babel-polyfill
  - 使用了 Promise ，并没有和 Promise 冲突
  - 完全是同步的写法，再也没有回调函数
  - 但是：改变不了 JS 单线程、异步的本质

6.  总结一下当前 JS 解决异步的方案
  -  jQuery Deferred
  -  Promise
  -  Async/Await
  -  Generator（解释不讲的原因）
      - 原理比较复杂
      - 不是异步的直接替代方式
      - 有更好更简洁的解决方案 async/await
      - koa 也早已“弃暗投明”


## 虚拟DOM
1. vdom 是什么？为何会存在 vdom？
  -  virtual dom ，`虚拟 DOM`
  -  `用 JS 模拟 DOM 结构`
  -  `DOM 操作非常“昂贵”`
  -  `将 DOM 对比操作放在 JS 层，提高效率`
  ```html 
  <ul id="list">
    <li class="item">Item 1</li>
  </ul>
  ```
  ```javascript
  var vdom = {
    tag: 'ul',
    attrs: {
      id: 'list'
    },
    children: [{
      tag: 'li',
      attrs: {
        className: 'item',
        children: ['Item 1']
      }
    }]
  }
  ```   
2. vdom 的如何应用，核心 API 是什么
  - 可用 snabbdom 的用法来举例
  -  核心 API：h 函数、patch 函数
      -  h(‘<标签名>’, {…属性…}, […子元素…])
      -  h(‘<标签名>’, {…属性…}, ‘….’)
      -  patch(container, vnode) 
      -  patch(vnode, newVnode) 
3. 介绍一下 diff 算法
  -  什么是 diff 算法，是 `linux 的基础命令`
  -  vdom 为何用 diff 算法
      -  DOM 操作是“昂贵”的，因此尽量减少 DOM 操作
      -  `找出本次 DOM 必须更新的节点来更新`，其他的不更新
      -  这个“找出”的过程，就需要 diff 算法
  -  diff 算法的实现流程
      - `patch(container, vnode)` 
        ```javascript
        function createElement(vnode){
          let tag = vnode.tag
          let attrs = vnode.attrs || {}
          let children = vnode.children || {}
          if (!tag) return null
          // 创建元素
          let elem = document.createElement(tag)
          // 创建属性
          for (let attrName in attrs) {
            if (attrs.hasOwnPropery(attrName)) {
              elem.setAttribute(attrName, attrs[attrName])
            }
          }
          // 创建子元素
          children.forEach(childVnode => {
            elem.appendChild(createElement(childVnode))
          })
          return elem
        }
        ```
      
      - `patch(vnode, newVnode)` 
        ```javascript
        function updateChildren(vnode, newVnode) {
          let children =vnode.children
          let newChildren = newVnode.children

          children.forEach((child, index) => {
            let newChild = newChildren[index]
            if(newChild == null) return
            if (child.tag == newChild.tag) {
              updateChildren(child, newChild)
            } else {
              replaceNode(child, newChild)
            }
          })
        }
        ```
      -  节点新增和删除，节点重新排序， 节点属性、样式、事件变化， 如何极致压榨性能， ……




## MVVM和VUE
1. 说一下使用 jQuery 和使用框架的区别
  -  数据和视图的分离，解耦（开放封闭原则）
  -  以数据驱动视图，只关心数据变化，DOM 操作被封装
  -  前端组件化（后面还有组件化的课程）
2. 说一下对 MVVM 的理解
  -  Model - 模型、数据
  -  View - 视图、模板（视图和模型是分离的）
  -  ViewModel - 连接 Model 和 View （view -> DOM listeners -> Model, Model -> Data Bindings -> View）- View 可以通过事件绑定的方式影响到 Model, Model 可以通过数据绑定的方式影响到 View
  - 三要素
      -  响应式：vue 如何监听到 data 的每个属性变化？
      -  模板解析：vue 的模板如何被解析，指令如何处理？
      -  渲染：vue 的模板如何被渲染成 html ？以及渲染过程
3. vue 中如何实现响应式
  -  修改 data 属性之后，vue 立刻监听到
  -  data 属性被代理到 vm 上
```javascript
var mv = {}
var data = {
  price: 100,
  name: 'adela'
}
for (let key in data) {
  // 命中闭包。保证key的独立的作用域
  (function(key){
    Object.defineProperty(vm, key, {
      get() {
        return data[key]
      },
      set(newValue) {
        data[key] = newValue
      }
    })
  })(key)
}
```
4. vue 中如何解析模板
  -  模板是什么
      -  本质：字符串
      -  有逻辑，如 v-if v-for 等
      -  与 html 格式很像，但有很大区别
      -  模板最终要转换成一个 JS 函数（render 函数）
  -  render 函数
      -  模板中所有信息都包含在了 render 函数中，执行是返回 vnode
      -  this 即 vm
      -  price 即 this.price 即 vm.price，即 data 中的 price
      -  _c 即 this._c 即 vm._c
  ```html
  <div id="app">
    <p>{{price}}</p>
  </div>
  ```
  ```javascript
  function render () {
    with(this) {
      return _c( // createElement
        'div', 
        {
          attrs: {"id": "app"}
        },
        [
          _c('p', [_v(_s(price))]) // _v createTextVNode, _s toString
        ]
      )
    }
  }
  ```
  -  render 函数与 vdom
      - updateComponent 中实现了 vdom 的 patch
      -  页面首次渲染执行 updateComponent
      -  data 中每次修改属性，执行 updateComponent
5. vue 的整个实现流程
  -  第一步：解析模板成 render 函数
      -  with 的用法
      -  模板中的所有信息都被 render 函数包含
      -  模板中用到的 data 中的属性，都变成了 JS 变量
      -  模板中的 v-model  v-for  v-on 都变成了 JS 逻辑
      -  render 函数返回 vnode
  -  第二步：响应式开始监听
      -  Object.defineProperty
      -  将 data 的属性代理到 vm 上
  -  第三步：首次渲染，显示页面，且绑定依赖
      -  初次渲染，执行 updateComponent，执行 vm._render()
      -  执行 render 函数，会访问到 vm.list vm.title
      -  会被响应式的 get 方法监听到（后面详细讲）
      -  执行 updateComponent ，会走到 vdom 的 patch 方法
      -  patch 将 vnode 渲染成 DOM ，初次渲染完成
  -  第四步：data 属性变化，触发 rerender
      -  修改属性，被响应式的 set 监听到
      -  set 中执行 updateComponent
      -  updateComponent 重新执行 vm._render()
      -  生成的 vnode 和 prevVnode ，通过 patch 进行对比
      -  渲染到 html 中

  -  为何要监听 get ，直接监听 set 不行吗？
      -  data 中有很多属性，有些被用到，有些可能不被用到
      -  被用到的会走到 get ，不被用到的不会走到 get
      -  未走到 get 中的属性，set 的时候我们也无需关心
      -  避免不必要的重复渲染




## 组件化和React
- 组件化理解
- JSX本质
- JSX和vdom的关系
- setState的过程
-  阐述自己对 React 和 vue 的认识

