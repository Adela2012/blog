var https = require('https')
var fs = require('fs')

var options = {
  key: fs.readFileSync('ssh_key.pem'),
  cert: fs.readFileSync('ssh_cert.pem'),
}

https.createServer(options, function(req, res) {
  res.writeHead(200)
  res.end('hello ff')
}).listen(8090)