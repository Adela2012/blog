
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

