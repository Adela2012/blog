class KVue {
  constructor(options) {
    this.$options = options

    this.$data = options.data
    this.observe(this.$data)

    // 模拟一下watcher创建
    new Watcher()
    this.$data.test

    new Watcher()
    this.$data.foo.bar
  }

  observe(value) {
    if (!value || typeof value !== 'object') {
      return
    }

    Object.keys(value).forEach(key => {
      this.defineReactive(value, key, value[key])
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
  constructor() {
    // 将当前watcher实例制定到Dep静态属性target
    Dep.target = this
  }

  update() {
    console.log(`属性更新了`)
  }
}