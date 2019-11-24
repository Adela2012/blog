// import Compile from './compile.js'
class KVue {
  constructor(options) {
    this.$options = options

    this.$data = options.data
    this.observe(this.$data)

    // 模拟一下watcher创建
    // new Watcher()
    // this.$data.test

    // new Watcher()
    // this.$data.foo.bar

    new Compile(options.el, this)

    if (options.created) {
      options.created.call(this)
    }
  }

  observe(value) {
    if (!value || typeof value !== 'object') {
      return
    }

    Object.keys(value).forEach(key => {
      this.defineReactive(value, key, value[key])
      // 代理data中的属性到vue实例上
      this.proxyData(key)
    })
  }

  defineReactive(obj, key, val) {

    this.observe(val) // 递归解决数据嵌套

    const dep = new Dep() // 初始化dependence

    Object.defineProperty(obj, key, {
      get() {
        Dep.target && dep.addDep(Dep.target)
        return val
      },
      set(newVal) {
        if (newVal == val)
          return
        val = newVal
        console.log(`${key}属性更新了：${val}`)
        dep.notify()
      }
    })
  }

  proxyData(key) {
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key]
      },
      set(newVal) {
        this.$data[key] = newVal
      }
    })
  }
}

// Dep: 用来管理watcher对象。
// 读数据的时候，会触发getter函数，把当前的Watcher对象（存放在Dep.target中）搜集到Dep类中去。
// 写数据的时候，会触发setter方法，通知Dep类调用notify来触发所有watcher对象的update方法更新对应视图。
class Dep {
  constructor() {
    //  这里存放若干依赖（watcheer）
    this.deps = []
  }

  addDep(dep) {
    this.deps.push(dep)
  }

  notify() {
    // 通知所有的依赖去做更新
    this.deps.forEach(dep => dep.update())
  }
}

// Wathcer  
class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb
    // 将当前watcher实例制定到Dep静态属性target
    Dep.target = this
    this.vm[this.key] // 触发getter, 添加依赖
    Dep.target = null
  }

  update() {
    console.log(`属性更新了`)
    this.cb.call(this.vm, this.vm[this.key])
  }
}