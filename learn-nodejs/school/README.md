#### 模块的流程
- 创建模块： `teacher.js`
- 导出模块： `exports.add = function () {}`（如果想模块成为特别的对象类型，就用`module.exports`，传统的模块实例，用`exports.add`，）
- 加载模块： `var teacher = require('./teacher.js')`
- 使用模块： `teacher.add('杨老师')`

#### exports和module.exports的区别
- 总结:每一个node.js执行文件，都自动创建一个module对象，同时，module对象会创建一个叫exports的属性，初始化的值是 {}。exports是module.exports的指向。
1. module应该是require方法中，上下文中的对象
2. exports对象应该是上下文中引用module.exports的新对象
3. exports.a = xxx 会将修改更新到module.exports对象中
4. exports = xxx 直接改变了 exports的指向


