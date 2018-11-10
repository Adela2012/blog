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

router.get('/hello/:name', async (ctx, next) => {
  var name = ctx.params.name
  ctx.response.body = `<h1>Hello, ${name}!</h1>`
})

app.use(bodyParser())
app.use(router.routes())

app.listen(3002)
