# Koa入门


## 目录

- [介绍](#introduce)
- [创建Koa](#koa)
- [上下文](#context)
- [处理URL](#url)
- [源码分析](#analysis)

## <a name="introduce"></a>介绍
> Koa 通过 node.js 实现了一个十分具有表现力的 HTTP 中间件框架，力求让 Web 应用开发和 API 使用更加地愉快。Koa 的中间件之间按照编码顺序在栈内依次执行，允许您执行操作并向下传递请求（downstream），之后过滤并逆序返回响应（upstream）。

## <a name="koa"></a>创建Koa
首先创建一个文件夹 [**learn-koa**](https://github.com/Adela2012/blog/tree/master/learn-koa) 作为项目文件夹。

先初始化`npm init`来创建一个`package.json`文件。

然后输入`npm install koa --save`来将它保存在`package.json`中。

```javascript
{
  "name": "learn-koa",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "koa": "^2.6.1"
  }
}

```

创建一个`hello.js`文件， 输入以下代码，再在终端输入 `node hello`，这时就起了一个端口为3000的服务，可以在浏览器中用`localhost:3000`打开。

```javascript
const Koa = require('koa')
const app = new Koa()

app.use(ctx => {
  ctx.body = 'hello koa'
})

app.listen(3000)
```

## <a name="context"></a>上下文
> Koa Context 将 node 的 request 和 response 对象封装到单个对象中，为编写 Web 应用程序和 API 提供了许多有用的方法。 这些操作在 HTTP 服务器开发中频繁使用，它们被添加到此级别而不是更高级别的框架，这将强制中间件重新实现此通用功能。

每个请求都将创建一个 Context，并在中间件中作为接收器引用，或者 ctx 标识符，如以下代码片段所示：

```javascript
app.use(async ctx => {
  ctx; // 这是 Context
  ctx.request; // 这是 koa Request
  ctx.response; // 这是 koa Response
});
```

为方便起见许多上下文的访问器和方法直接委托给它们的 `ctx.request` 或 `ctx.response` ，不然的话它们是相同的。 例如 `ctx.type` 和 `ctx.length` 委托给 `response` 对象，`ctx.path` 和 `ctx.method` 委托给 `request`。

## <a name="url"></a>处理URL
集中处理URL，根据不同的URL调用不同的处理函数，这样，我们才能专心为每个URL编写处理函数。

通过`npm install koa-router --save`，在项目中引入`koa-router`，让它处理URL映射。新建`router.js`文件。

### 处理GET请求
可以用`router.get('/path', async fn)`来进行get请求。

```javascript
const Koa = require('koa')
const router = require('koa-router')() // 函数调用
const app = new Koa()

app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
  await next()
})

router.get('/', async (ctx, next) => {
  var name = ctx.params.name
  ctx.response.body = `<h1>Index Page!</h1>`
})

router.get('/hello/:name', async (ctx, next) => {
  var name = ctx.params.name
  ctx.response.body = `<h1>Hello, ${name}!</h1>`
})

app.use(router.routes())

app.listen(3001)

```

在终端输入`node router.js`

- 在浏览器中打开`localhost:3001`

<img src="./images/koa-router_index.png" />

- 在浏览器中打开`localhost:3001/hello/adela2012`

<img src="./images/koa-router_hello.png" />

### 处理POST请求

可以用`router.post('/path', async fn)`来处理post请求。
通过`npm install koa-bodyparser --save`，在项目中引入`koa-bodyparser`，让它处理POST请求的reqest的body内容，解析出的参数绑定到`ctx.request.body`中。

修改`router.js`文件，将`koa-bodyparse`引入`const bodyParser = require('koa-bodyparser')`并使用`app.use(bodyParser())`

现在修改`router.js`，写一个简单的登录表单。

```javascript
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const router = require('koa-router')() // 函数调用
const app = new Koa()

app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
  await next()
})

router.get('/', async (ctx, next) => {
  var name = ctx.params.name
  ctx.response.body = `<h1>Index Page!</h1>
  <form action="/signin" method="post">
    <p>name: <input name="name" value="koa"></p>
    <p>password: <input type="password" name="password"></p>
    <p><input type="submit" value="submit"></p>
  </form>
  `
})

router.post('/signin', async (ctx, next) => {
  var name = ctx.request.body.name || ''
  var password = ctx.request.body.password || ''
  console.log(`signin with name: ${name}, password: ${password}`)
  if (name == 'koa' && password == '123456') {
    ctx.response.body = `<h1>Welcome, ${name}!</h1>`
  } else {
    ctx.response.body = `<h1>Lofin failed!</h1>
    <a href="/">try again</a>`
  }
})

app.use(bodyParser())
app.use(router.routes())

app.listen(3002)

```

### 重构

`router.js`中放了很多业务逻辑代码的话，就会很乱，特别是URL数量多了，`router.js`中的代码量就会很大，逻辑混乱。如下，是重新整理项目文件结构。在这个结构中，我们把入口启动内容放在`app.js`中，有关URL的业务内容放在`app`的文件夹中，然后让`app.js`自动导入所有处理`URL`的函数，这样逻辑就很清楚了。

```
·
|-- app.js                // koa入口文件
|-- app
|   |-- login.js          // 处理login相关URL
|   |-- hello.js          // 处理hello相关URL
|-- package.json          // 描述文件
|-- node_modules          // 依赖包
·

```

在`app/login.js`中，我们把方法从上面的`router.js`中分离出来，通过`module.exports`将两个ULR处理函数暴露出来，如下所示。

```javascript
var login = (ctx, next) => {
  var name = ctx.params.name
  ctx.response.body = `<h1>Index Page from APP!</h1>
  <form action="/signin" method="post">
    <p>name: <input name="name" value="koa"></p>
    <p>password: <input type="password" name="password"></p>
    <p><input type="submit" value="submit"></p>
  </form>
  `
}

var signin = (ctx, next) => {
  var name = ctx.request.body.name || ''
  var password = ctx.request.body.password || ''
  console.log(`signin with name: ${name}, password: ${password}`)
  if (name == 'koa' && password == '123456') {
    ctx.response.body = `<h1>Welcome, ${name}!</h1>`
  } else {
    ctx.response.body = `<h1>Lofin failed!</h1>
    <a href="/">try again</a>`
  }
}

module.exports = {
  'GET /': login,
  'POST /signin': signin
}
```

然后`app.js`中， 我们通过`fs`模块，用`readdirSync`列出`app`文件夹下的所有文件，用数组`filter`方法过滤所有后缀为`.js`的文件。然后依次将js文件导入，判断`get`和`post`方法，进行路由注册。代码如下。

```javascript
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const router = require('koa-router')() // 函数调用
const fs = require('fs') // 导入 fs 模块， 
const app = new Koa()

// 判断url的get和post并注册router
function addMapping(router, mapping) {
  // 处理js文件中每个URL
  for (let url in mapping) {
    if (url.startsWith('GET ')) {
      var path = url.substring(4)
      router.get(path, mapping[url])
      console.log(`register URL mapping: GET ${path}`)
    } else if (url.startsWith('POST ')) {
      var path = url.substring(5)
      router.post(path, mapping[url])
      console.log(`register URL mapping: POST ${path}`)
    } else {
      console.log(`invalid URL ${url}`)
    }
  }
}

function addControllers(router) {
  // 用 readdirSync 列出文件
  let files = fs.readdirSync(__dirname + '/app')
  // 过滤文件
  let js_files = files.filter(f => {
    return f.endsWith('.js')
  })
  // 处理每个文件
  for (let f of js_files) {
    console.log(`process file: ${f}...`)
    let mapping = require(__dirname + '/app/' + f)
    addMapping(router, mapping) // 判断url的get和post并注册router
  }
}

// 传入router，调用方法
addControllers(router) 

app.use(bodyParser())
app.use(router.routes())

// 监听3002端口
app.listen(3002) 

```

## <a href="analysis"></a>源码分析
koa源码lib目录下有四个核心js文件：`application.js`、`context.js`、`request.js`、`response.js`。以下依次进行分析。

<br>

---------------

参考链接：

- [Koa-廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434501579966ab03decb0dd246e1a6799dd653a15e1b000)
- [Koa 文档](https://demopark.github.io/koa-docs-Zh-CN/)
- [Koa github地址](https://github.com/koajs/koa)
- [KOA2框架原理解析和实现](https://juejin.im/post/5be3a0a65188256ccc192a87?utm_source=gold_browser_extension)

