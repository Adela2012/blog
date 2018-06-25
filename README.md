# 学习Node.js基础
> 通过慕课网课程【进击Node.js基础】进行学习。笔记和代码。

<br><br>
---------------------------------------------
---------------------------------------------
<br><br>


## 进击Node.js基础（一)

<br>

### 第三章(begin)

#### nodejs 本质
- nodejs 本质上是 JavaScript的执行环境，只是它的分装加了很多web底层的处理。

#### commonjs 规范 和 nodejs
- 模块与包管理工具： 模块的定义、模块的标识、模块的引用。
- 在nodejs里面，每个文件可以看做是一个独立的模块，在里面不用担心命名空间、变量污染、方法定义隔离，模块通过彼此的依赖和引入，可以组合成更强大的功能包

#### 模块的分类
- 分成：核心模块、文件模块、第三方模块。核心模块，在node启动时会被预先加载。
- 引用：路径、模块名

<br>

### 第四章，模块与包管理工具（school）

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


