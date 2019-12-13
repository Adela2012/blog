
#### vuex的模块。modules中namespaced的使用。
- vuex的模块
  - state => 基本数据 
  - getters => 从基本数据派生的数据 
  - mutations => 提交更改数据的方法，同步！ 
  - actions => 像一个装饰器，包裹mutations，使之可以异步。 
  - modules => 模块化Vuex

- namespaced: 为了解决不同模块命名冲突的问题，将不同模块的namespaced:true，之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名
