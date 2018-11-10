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

