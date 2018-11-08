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
