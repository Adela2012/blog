var hello = async (ctx, next) => {
  var name = ctx.params.name
  ctx.response.body = `<h1>hello, ${name}!</h1>`
};

module.exports = {
  'GET /hello/:name': hello
}
