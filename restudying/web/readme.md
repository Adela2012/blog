# 总览
一面
1. 页面布局类
2. CSS盒模型、DOM事件类
3. HTTP协议类、原型链类
4. 面向对象类、通信类
5. 前端安全类、前端算法类

二面
1. 渲染机制、js运行机制
2. 页面性能、错误监控
3. MVVM框架类解析
4. 双向绑定、设计模式

三面
1. 面试技巧
2. 业务能力
3. 团队协作能力
4. 带人能力

终面
1. 面试技巧
2. 职业竞争力
3. 职业规划

真题解析
1. 九宫格
2. 阿里笔试题
3. 函数和对象
4. 算法题

## 面试准备

1. 知识：对协议的了解、业务的认识
2. 能力：架构能力、业务抽象能力、项目把控能力，带2-3人快速开发
3. 经验：能力上项目的体验

- 在职业生涯中有么有做过特色业务，角色是什么，推动了什么，改变了什么。
- 在开发中遇到过什么问题。
- 架构分析和设计能力。目录结构、复用性、模块化、自动化测试。代码易读、易维护。
- 成品的体验和可用性。用户研究。某个项目完成了功能，但是做了改进，增强了用户体验。
- 熟悉构建工，webpack，能自己搭建前端构建环境。

1. 职位描述分析
2. 业务分析或实战模拟
3. 技术栈准备
4. 自我介绍

#### 业务分析和实战模拟

```html
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
```

使用 meta 元素放入X-UA-Compatible(浏览器兼容模式)  http-equiv 标头，为你的网页指定文件模式。兼容性配置：IE走最高级的Edge去渲染，如果有Chrome浏览器，用Chrome渲染。

```html
<meta name="renderer" content="webkit">
```

双核浏览器： IE webkit 内核。如果是双核浏览器，优先用webkit内核渲染。

```html
<link rel="dns-prefetch" href="//static.360buyimg.com">
```

DNS预解析。为了在加载图片快的时候，第一个优化的点就是DNS预解析


#### 简历
- 姓名-年龄-手机-邮箱-籍贯
- 学历
- 工作经历，时间-公司-岗位-职位-技术栈-业绩（给公司做出了什么成绩；攻克了什么难题；哪些地方没有做好，可以准备可以弥补的技术方案）
- 开源项目，GitHub和说明

#### 自我陈述
- 把握面试的沟通方向：
    1. 负责了什么项目。这个项目是做什么的，和前端的结合点什么，做的角色是什么，承担了什么责任，做出了什么成绩。
    2. 项目负责人。项目几个人参与、是项目还是技术负责人。做出了怎么样的成绩，项目是怎么分配的，团队间是怎么协作的。技术管理上，怎么解决技术配合和技术难点的。
   （我平时喜欢研究一些网站，喜欢去看技术原理和技术好玩的点。我喜欢思考，也愿意尝试去做更好的方式。）
- 豁达、自信的适度发挥。

## 一面二面
- 沟通简洁、回答灵活、态度谦虚
1. 页面布局
2. css盒模型
3. DOM事件
4. HTTP协议
5. 面向对象
6. 原型链
7. 通信
8. 安全
9. 算法

#### 页面布局
flex，float， grid，table-cell，position，优缺点、他们之间的比较，height如果不定义，兼容性。
1. float 浮动，脱离文档流，如果处理不好，会有很多局限性。兼容性比较好。
2. position 绝对定位，高效。脱离文档流。
3. flex 布局，解决了上述的缺点问题，移动端最为常用。
4. table-cell 表格布局，兼容性很好。缺点：历史上的诟病，当中间高度超出时，两边也会变高。
5. grid 网格布局，代码量少，比较新。

#### css盒模型
- 分类：标准模型（content）、IE模型(border)
- 区别：不同点在于高度和宽度的不同。
- 设置：使用box-sizing: content-box/border-box
- 获取高宽：
```javascript
dom.style.width/height // 仅内联样式的宽和高
dom.currentStyle.width/height // 渲染以后的宽和高，仅IE
window.getComputedStyle(dom).width/height // 渲染以后的宽和高
dom.getBoundingClientRect().width/height // 元素的left/top/width/height 
```
- 边距重叠：
    1. 父子元素边距重叠
    2. 兄弟元素边距重叠，上下margin重叠取最大值。
- BFC：
    1. 基本概念：块级格式化上下文
    2. 原理-渲染规则：1、垂直方向的边距会发生重叠。2、BFC的区域如果与浮动元素的box重叠，可以清除浮动。3、里外元素不会影响。4、计算BFC高度时，浮动的元素也会参与计算。 
    3. 如何创建BFC：0、overflow：hidden/auto。1、FLOAT不为none。2、position的值不为static和relative。3、display为table/flex/inline-block相关。


#### DOM 事件

- 基本概念：DOM事件的级别
```javascript
// DOM0：
element.onclick = function(){}
// DOM2：
element.addEventListener('click', function(){}, false) // false冒泡，true捕获
// DOM3：
element.addEventListener('keyup', function(){}, false) // 增加了事件类型
```
- DOM事件模型：冒泡、捕获
- DOM事件流：浏览器在当前页面与用户交互的过程中，用户行为怎么传到页面上，怎么响应。1、捕获；2、目标阶段：事件通过捕获，到达目标元素；3、冒泡：在从目标元素上传到window对象
- 描述DOM事件捕获的具体流程：window->document->html->body->...->目标元素
- Event对象的常见应用：1、阻止默认行为`event.preventDefault()`；2、阻止冒泡`event.stopPropagation()`；3、事件响应优先级，例如一个按钮依次绑定了两个事件A、B，在A的响应函数中加入这句  话，B点击将不会被执行`event.stopImmediatePropagation()`；4、for循环给DOM注册了安装事件，怎么优化？子元素绑定click事件代理转移到父元素上，响应函数中，需要判断哪一个被点击了。当前被绑定的事件`event.currentTarget`、当前被点击的元素`event.target`。事件代理，事件委托。
- 自定义事件：
```javascript
var eve = new Event('custome'); 
dom.addEventListener('custome', function() { 
console.log('custome'); 
}); 
dom.dispatchEvent(eve);
// CustomEvent与Event差不多，object做参数。
```




