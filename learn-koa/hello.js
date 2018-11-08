const Koa = require('koa')
const app = new Koa()

app.use(ctx => {
  ctx.body = 'hello koa'
})

app.listen(3000)

var ctx = {
  request: {
    method: 'GET',
    url: '/',
    header: {
      host: 'localhost:3000',
      connection: 'keep-alive',
      pragma: 'no-cache',
      'cache-control': 'no-cache',
      'upgrade-insecure-requests': '1',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36',
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
      cookie: 'NTKF_T2D_CLIENTID=guestCF89D4A7-1D94-AED1-8AED-6290310D55ED; nTalk_CACHE_DATA={uid:xt_1000_ISME9754_guestCF89D4A7-1D94-AE,tid:1539251908876207}; token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyMDE1MTIzMTA5MDE1NjgxNTlkZWIxMmUyYWFkYzQ1YjA4NWI1YTQxNDA2ZTk1N2ExIiwiYXVkIjpbInVjNmM3ZjA2ZTU0YWM3N2Y4NyIsInVjZW50ZXIiXSwiaV92IjoxNTI2NTUxNzE4MDAwLCJpZGVudF9pZCI6NzM5MzA0LCJuYmYiOjE1NDAxNzI5MjIsInBfdiI6MTQ1MTUyMzcxNjAwMCwiaXNzIjoidWNlbnRlciIsImV4cCI6MTU0MDI1OTMyMiwidHlwZSI6MSwiaWF0IjoxNTQwMTcyOTIyLCJqdGkiOiIzOTM3NTUifQ.UXjZTku5qZWx0M4Mz03RnRa9RDZijuyrunbyB_v9C8UUgJlYUhYcLRXqpU0NI91gvSFXBrARxuhyom0izf1-GE8g4-SiVckcGZG8fLd188AM6U_S5IfvSZlcuYdsLSfsLVn6DCcMYcboIko8JDf5Jxtt36KZAXk0mjZkGM5egNs; from=wxtrc; io=dvyflC1-uJWkoariAAAC'
    }
  },
  response: { status: 404, message: 'Not Found', header: {} },
  app: { subdomainOffset: 2, proxy: false, env: 'development' },
  originalUrl: '/',
  req: '<original node req>',
  res: '<original node res>',
  socket: '<original node socket>'
}