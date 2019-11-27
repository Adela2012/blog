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


#### HTTP协议
- HTTP协议的主要特点
    1. 简单快速（每个资源UrI是固定的）、
    2. 灵活（每个HTTP协议中有一个头部分，会有数据类型。通过一个HTTP协议就能传输不同数据类型）、
    3. 无连接（连接一次就会断掉）、
    4. 无状态（从HTTP上不能区别两次连接的状态）

- HTTP报文的组成部分
    1. 请求报文：请求行（http方法、页面地址、HTTP协议、版本）、请求头（key、value值，告诉服务端要哪些内容）、空行(告诉服务器下面应该当做请求体来解析)、请求体。
    2. 响应报文：状态行（HTTP协议及版本、HTTP状态码）、响应头、空行、响应体。

- HTTP方法
    get获取资源、post传输资源、put更新资源、delete删除资源、head获得报文首部

- POST和GET的区别
    - `GET在浏览器回退时是无害的，而POST会再次提交请求`
    - GET产生的URL地址可以被收藏，而POST不可以
    - `GET请求会被浏览器主动缓存，而POST不可以，除非手动设置`
    - GET请求只能进行URL编码，而POST支持多种编码方式
    - `GET请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留`
    - `GET请求在URL中传送的参数是有长度限制的，而POST没有限制`
    - 对参数的数据类型，GET只接受ASCII字符，而POST没有限制
    - GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息
    - `GET参数通过URL传递，POST放在Request body中`

- HTTP状态码
    - 1xx: 指示信息-表示请求已接收，继续处理
    - 2xx: 成功-表示请求已被成功接收
    - 3xx: 重定向-要完成请求必须更进一步的额操作
    - 4xx: 客户端错误-请求语法错误或者请求无法实现
    - 5xx: 服务器错误-服务器未能实现合法请求
    ```
    200 OK: 客户端请求成功
    206 Partial Content: 客户发送了一个带有Range头的GET请求，服务器完成了它
    301 Moved Permanently: 所请求的页面已经转移至新的URL 【永久重定向】
    302 Found: 所请求的页面已经临时转移至新的URL【临时重定向】
    304 Not Modified: 客户端有缓冲的文档并发出了一个条件性的请求，服务器告诉客户，原来缓存的文档还可以继续使用
    400 Bad Request: 客户端请求有语法错误，不能被服务器所理解
    401 Unauthorized: 请求未经授权，这个状态码必须和WWW-Authenticate报头域一起使用
    403 Forbidden: 对被请求页面的访问被禁止
    404 Not Found: 请求资源不存在
    500 Internal Server Error: 服务器发生不可预期的错误原来缓存的文档还可以继续使用
    503 Server Unavailable: 请求未完成，服务器临时过载或当机，一段时间后可能恢复正常
    ```

- 持久连接
    - HTTP协议采用“请求-应答”模式，每个请求/应答客户和服务器都要新建一个连接，完成之后立即断开
    - 当使用Keep-Alive模式时，客户端到服务端的连接持久有效，当出现对服务器的后继请求时，Keep-Alive功能避免了建立或者重新建立连接，HTTP1.1版本才有
- 管线化
    - 在使用持久连接的情况下，某个连接消息的传递类似于：请求1->响应1->请求2->响应2->请求3->响应3
    - 某个连接上的消息变成了类似这样：请求1->请求2->请求3->响应1->响应2->响应3

    - `管线化机制通过持久连接完成，仅HTTP/1.1支持此技术`
    - `只有GET和HEAD请求可以进行管线化，而POST则有所限制`
    - `初次创建连接时不应启动管线机制，因为对方服务器不一定支持HTTP/1.1版本的协议`
    - 管线化不会影响响应到来的顺序
    - HTTP/1.1要求服务器端支持管线化，但不要求服务器端也对响应进行管线化处理，只是要求对于管线化的请求不失败即可
    - 由于上面提到的服务器端问题，开启管线化很可能并不会带来大幅度的性能提升，而且很多服务器和代理程序对于管线化的支持并不好，因此现代浏览器如Chrome和Firefox默认并未开启管线化支持
    

#### 原型链
- 创建对象有几种方法
- 原型、构造函数、实例、原型链
- instanceof的原理
- new运算符

##### 创建对象有几种方法
1、创建对象有几种方法：1、字面量。2、构造函数。3、Object.create
```javascript
var o1 = {name: 'o1'}; var o11 = new Object({name: 'o11'});
var M = function () {this.name = 'o2'}; var o2 = new M();
var P = {name: 'o3'}; var o3 = Object.create(P); // 创建的对象是用原型链进行连接的
```

##### 原型、构造函数、实例、原型链

![原型链类](./images/原型链类.png)

##### instanceof的原理
![instanceof](./images/instanceof.png)
- 用 constructor 来判断比 instanceof 更加严谨
```javascript
o2 instanceof M // true
o2 instanceof Object // true

o2.__proto__ === M.prototype // true
M.prototype.__proto__ === Object.prototype // true

o2.__proto__.constructor === M // true
o2.__proto__.constructor === Object // false
```

##### new运算符
1. 一个新对象被创建，它继承自foo.prototype
2. 构造函数foo被执行，执行的时候，相应的传参会被传入，同时上下文this会被指定为这个新实例。new foo等同于new foo()，只能用在不传递任何参数的情况
3. 如果构造函数返回了一个“对象”，那么这个对象会取代整个new出来的结果。如果构造函数没有返回对象，那么new出来的结果为步骤1创建的对象
```javascript
let new2 = function(func) {
    let o = Object.create(foo.prototype)
    let k = func.call(o)
    if (typeof k === 'object') {
        return k
    } else {
        return o
    }
}
```


#### 面向对象
- 类与实例：类的声明、生成实例
```javascript
// 类的声明
function Animal () {
  this.name = 'name';
}
// es6中的class声明
class Animal2 {
  constructor () {
    this.name = name;
  }
}
// 实例化
new Animal(), new Animal2()
```

- 类与继承：如何实现继承、继承的几种方式
```javascript
// 借助构造函数实现继承：1、原理。2、缺点：部分继承，在构造函数中的属性能够继承，原型链上的不能继承。
function parent1 () {
  this.name = 'parent1'
}
function child1 () {
  parent1.call(this);  // 将父级构造函数this指向子构造函数的实例上，父级中的构造函数子类中也有。
  this.type = 'child1';
}

// 借助原型链实现继承：1、原理。2、缺点：例如 实例两个对象时，因为引用同一个对象，原型链中的原型对象两者是共同用的，改变一个时，另一个也会改变。
function parent2 () {
  this.name = 'parent2';
}
function child2 () {
  this.type = 'child2';
}
child2.prototype = new parent2();

// 组合方式实现继承：通过原型链和构造函数组合的方式，弥补了两者的不足，保留两者的优点。缺点：parent3执行了两次。
function parent3 () {
  this.name = 'parent3';
}
function child3 () {
  parent3.call(this);
  this.type = 'child3';
}
child3.prototype = new parent3;

// 组合方式实现继承优化1：1、构造函数体内，通过两个构造函数组合，能拿到所有构造函数的属性方法。想继承父类的原型对象，赋给子类父类的原型对象就行。2、不足：new child4().constructor === parent4
function parent4 () {
  this.name = 'parent4';
}
function child4 () {
  parent4.call(this); // 在实例化子类的时候，执行一次父类的实例化
  this.type = 'child4';
}
child4.prototype = parent4.prototype; // 对象上只是一次简单的引用，不会再次执行父类的构造函数

// 组合方式实现继承优化2： 
function parent5 () {
  this.name = 'parent5';
}
function child5 () {
  parent5.call(this);  
  this.type = 'child5';
}
child5.prototype = Object.create(parent5.prototype);  //Object.create创建一个中间对象， Object.create创建的原型对象就是参数，父类和子类对象的隔离。
Child5.prototype.construtor = child5;
```

#### 通信类
- 什么是同源策略及限制
- 前后端如何通信
- 如何创建Ajax
- 跨域通信的几种方式

##### 什么是同源策略及限制
同源限制策略限制`从一个源加载的文档或者脚本如何与来自另一个源的资源进行交互`。这是一个用于`隔离潜在恶意文件`的关键的安全机制。
- Cookie、LocalStorage和IndexDB无法读取。
- DOM无法获得。
- AJAX请求不能发送    
`协议、域名、端口`构成一个源

##### 前后端如何通信：
- AJAX (同源)；
- WebSocket（不受同源的限制）; 
- CORS（支持同源、支持跨域。CORS允许任何类型的请求，CORS需要浏览器和服务器同时支持，它允许浏览器向跨域服务器发出XMLHttpRequest请求，从而克服了AJAX只能同源使用的限制。）

##### 如何创建Ajax
XMLHTTPRequest对象的工作流程、兼容性处理、事件的触发条件、事件的触发顺序
```javascript
function xml(opt) {
    var xml = XMLHttpRequest ? new XMLHttpRequest() : new window.ActiveXObject('Microsoft.XMLHTTP')
    let {type, url, data} = opt
    type = type.toUpperCase()

    let dataArr = []
    for(var k in data) {
        dataArr.push(k + '=' + data[k])
    }

    if (type === 'GET') {
        url = url + '?' + dataArr.join('&')
        xhr.open(type, url, true)
        xhr.send()
    }
    if (type === 'POST') {
        xhr.open(type, url, true)
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urleencoded')
        xhr.send(dataArr.join('&'))
    }

    xhr.onload = function () {
        if (xhr.status === 200 || xhr.status === 304) {
            let res
            if (opt.success && opt.sucess instanceof Function) {
                res = xhr.responseText
                if (typeof res === 'string') {
                    res = JSON.parse(res)
                    opt.success.call(xhr, res)
                }
            }
        } else {
            if (opt.error && opt.error instanceof Function) {
                opt.error.call(xhr, res)
            } 
        }
    }
}
```


##### 跨域通信的几种方式
- JSONP
- Hash（hash改变，页面不刷新）
- postMessage（hmtl5中新增加的，用来实现跨域）
- WebSocket（不受同源限制）
- CORS（支持跨域通信的AJAX，浏览器会拦截AJAX请求，如果是跨域的，在HTTP头中加一个origin）
jsonp的实现原理，script标签的异步加载。
```javascript
util.jsonp = function(url, onsuccess, onerror, charset) {
    let callbackName = url.getName('tt_player')
    window[callbackName] = function () {
        if (onsuccess && onsuccess instanceof Function) {
            onsuccess(arguments[0])
        }
    }
    let script = util.createScript(url + '&callback=' + callbackName, charset)
    script.onload = script.onreadystatechange = function () {
        if (!script.readyState || /loaded|complete/.test(script.readyState)) {
            script.onload = script.onreadystatechange = null
            // 移除该script的DOM对象
            if(script.parentNode) {
                script.parentNode.removeChild(script)
            }
            // 删除函数或变量
            window[callbackName] = null
        }
    }
    script.onerror = function () {
        if (onerror && onerror instanceof Function) {
            onerror()
        }
    }
}
```

