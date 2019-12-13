
### token问题
- 【问题】：商城后台日志刷爆，携带后台appid的token的接口一直请求商城的商品详情页。
- 【时间】：19年5月5日
- 【分析】：经过代码查看以及追踪分析，问题明确了。以`taobao.com`举例，域名指向是个商城的项目，另外它的后台系统，域名为`admin.taobao.com`。后台系统在登录以后，cookie设置`document.cookie='token='+message.data.token+';path=/;domain=.taobao.com';`。例如先在5月1日登录了`admin.taobao.com`。在`.taobao.com`存了`token`。5月2日再登陆`taobao.com`，这时候的token就是5月1日写入的。