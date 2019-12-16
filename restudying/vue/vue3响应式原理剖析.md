# Vue3响应式原理剖析
1. vue3响应式初体验
2. vue2 & vue3响应式原理对比
3. vue3响应式实现
4. 源码分析


## vue2响应式原理回顾
1. 对象响应化：遍历每个key，定义getter、setter
2. 数组响应化：覆盖数组原型方法，额外增加通知逻辑
```javascript
const arrayProto = Object.create(Array.prototype) // 使用 Object.create()来创建带有你想要的[[Prototype]]的新对象

['push','pop','shift','unshift','splice','reverse','sort'].forEach(method => {
  arrayProto[method].apply(this, arguments)
  notifyUpdate()
})

function observe(obj) {
  if (typeof obj !== 'object' || obj == null) return
  if (Array.isArray(obj)) {
    Object.setPrototypeOf(obj, arrayProto) // 设置一个指定的对象的原型
  } else {
    const keys = object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      defineReactive(obj, key, obj[key])
    }
  }
}

function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        observe(newVal)
        notifyUpdate()
        val = newVal
      }
    }
  })
}

function notifyUpdate() {
  // 页面更新
}
```

## vue3响应式实现
- vue3使用ES6的Proxy特性来实现响应式。

> Proxy 对象用于定义基本操作的自定义行为（如属性查找，赋值，枚举，函数调用等）。
`let p = new Proxy(target, handler);`
**target**
用Proxy包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
**handler**
一个对象，其属性是当执行一个操作时定义代理的行为的函数。

!http://es6.ruanyifeng.com/#docs/proxy](http://es6.ruanyifeng.com/#docs/proxy)

```javascript
const toProxy = new WeakMap() // obj: observed
const toRaw = new WeakMap() // observed: obj

function isObject(obj) {
  return typeof obj === 'object' || obj === null
}
function hasOwn(obj, key) {
  return obj.hasOwnProperty(key)
}

function reactive(obj) {
  // 判断是否对象
  if(!isObject(obj)) {
    return obj
  } 
  // 查找缓存，避免重复代理
  if (toProxy.has(obj)) {
    return toProxy.get(obj)
  }
  if (toRaw.has(obj)) {
    return obj
  }

  // Proxy相当于在对象外层加拦截
  const observed = new Proxy(obj, {
    get(target, key, receiver) {

    },
    set(target, key, value, receiver) {

    },
    deleteProperty(target, key) {

    }
  })

  toProxy.set(obj, observed)
  toRaw.set(observed, obj)

  return observed
}

// 依赖收集：建立target.key和响应函数之间对应关系
const activeReactiveEffectStack = []
// 映射关系表，结构大致如下： 
// {target: {key: [fn1,fn2]}}
const targetsMap = new WeakMap()
function track (target, key) {

}

// 触发target.key对应响应函数
function trigger(target, type, key) {

}

// effect任务：执行fn并将其入栈
function effect(fn) {
  const rxEffect = function (...args) {
    return run (exEffect, fn, args)
  }
  rxEffect()
  return rxEffect
}

function run(effect, fn, args) {
  try {
    activeReactiveEffectStack.push(effect)
    return fn(...args) //执行fn以收集依赖
  } finally {
    activeReactiveEffectStack.pop()
  }
}
```