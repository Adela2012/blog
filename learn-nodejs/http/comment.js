var http = require('http')

var querystring = require('querystring')

var postData = querystring.stringify({
  'respUser': '5a4b4f915188252bca053c71',
  'targetId': '5c2c27255188251ae760380f',
  'targetType': 'entry',
  'content': '使用场景不同 '
})

var options = {
   hostname: 'comment-wrapper-ms.juejin.im',
   port: 80,
   path: '/v1/comment',
   method: 'POST',
   headers: {
    'Accept':' */*',
    'Accept-Encoding':' gzip, deflate, br',
    'Accept-Language':' zh-CN,zh;q=0.9,en;q=0.8',
    'Cache-Control':' no-cache',
    'Connection':' keep-alive',
    'Content-Length': postData.length,
    'Content-Type':' application/x-www-form-urlencoded',
    'Host':' comment-wrapper-ms.juejin.im',
    'Origin':' https://juejin.im',
    'Pragma':' no-cache',
    'Referer':' https://juejin.im/post/5c2c27096fb9a049f66c3672?utm_source=gold_browser_extension',
    'User-Agent':' Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
    'X-Juejin-Client':' 1546426443808',
    'X-Juejin-Src':' web',
    'X-Juejin-Token':' eyJhY2Nlc3NfdG9rZW4iOiJpSGdzNkU3aHdWMGpzOTN1IiwicmVmcmVzaF90b2tlbiI6IjBTS3gxbGV1NTNrWHJNMGciLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ==',
    'X-Juejin-Uid':' 5b017dd451882542c8330653'
   }
}

var req = http.request(options, function(res) {
  console.log('Status: ' + res.statusCode)
  console.log('headers: ' + JSON.stringify(res.statusCode))

  res.on('data', function(chunk) {
    console.log(Buffer.isBuffer(chunk))
    console.log(typeof chunk)
  })

  res.on('end', function() {
    console.log('comment end')
  })

  
})


req.on('error', function(e) {
  console.log('Error: '+e.message)
})

req.write(postData)

req.end()