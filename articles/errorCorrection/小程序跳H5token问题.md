
### 小程序跳H5token问题
- 【问题】微信小程序跳H5，token从URL上传递，H5获取到token以后，塞入cookie。在本地localhost环境下可以识别，在测试环境pay.tairamall.com中不行。
- 【解决】通过跟电商小程序开发人员沟通得知，塞到cookie中 必须指定域名.tairanmall.com，指定路径为/。采用以下代码解决。

```js
let Days = 1,exp = new Date();
exp.setTime(exp.getTime() + (expire ? expire : Days) * 24 * 60 * 60 * 1000);
document.cookie = name + "=" + encodeURI(value) + ";expires=" + exp.toGMTString() + ";domain=.tairanmall.com;path=/";
```

- 【注意】上述代码无法在localhost域名下指定cookie的domain。localhost上的工作时，cookie的域必须设置为“”或NULL或FALSE。

### cookie知识补充

> `cookie` 存放在客户端的计算机中，用于客户端与服务器之间传递信息。通过浏览器请求某个页面时，就会发送这个 `cookie`。
可以通过 `document.cookie` 来读取或设置这些信息。

1. Cookie 基础知识

- 有大小限制，存放的数据不能超过4kb，超过该属性将返回空字符串。
- 以文件形式存放在客户端，查看和修改信息很方便，所以不能存放重要信息。
- `Name=Value`；名称和值都必须是合法的标示符。
- 存在有效期。默认情况下，一个 cookie 的生命周期就是在浏览器关闭的时候结束。如果想要 cookie 能在浏览器关掉之后还可以使用，就必须要为该 cookie 设置有效期，也就是 cookie 的失效日期。
- 有域[domain]和路径[path]。因为浏览器是个注意安全的环境，所以不同的域之间是不能互相访问 cookie 的(当然可以通过特殊设置的达到 cookie 跨域访问)。一个网页所创建的 cookie 只能被与这个网页在同一目录或子目录下得所有网页访问，而不能被其他目录下得网页访问。

2. Cookie常见问题

- 两种类型：1. 当前网站本身设置的 cookie。 2. 来自在网页上嵌入广告或图片等其他域来源的 第三方 cookie (网站可通过使用这些 cookie 跟踪你的使用信息)
- 生命周期: 1. 临时性质的cookie。当前使用的过程中网站会储存一些你的个人信息，当浏览器关闭后这些信息也会从计算机中删除。2. 设置失效时间的cookie。就算浏览器关闭了，这些信息业依然会在计算机中。
- 清除方式：1. 通过浏览器工具。 2. 通过设置 cookie 的有效期。

3. cookie 路径概念

　默认情况下，只有与创建 cookie 的页面在同一个目录或子目录下的网页才可以访问。
> 举例： `http://pay.tairanmall.com/fund_h5/` 这个页面有创建一个cookie，那么在`/fund_h5/`路径下都能获取到这个cookie, 在`/`或者`/wx/`下不行。

如何让这个 cookie 能被其他目录或者父级的目录访问，通过设置 cookie 的路径就可以实现。

```js
document.cookie = "name=value;expires=date;path=path"
```

4. cookie 域概念
 cookie 实现同域之间访问，通过`domain`。

 ```js
 document.cookie = "name=value;path=path;domain=domain"
 ```

 > 举例： "www.tairanmall.com" 与 "pay.tairanmall.com" 公用一个关联的域名"tairanmall.com"。如果想让"www.tairanmall.com"下的域名，让"pay.tairanmall.com"访问到。需要设置cookie的domain属性，并且需要把path属性设置为 "/"。

5. cookie 安全性

通常 cookie 信息都是使用HTTP连接传递数据，这种传递方式很容易被查看，所以 cookie 存储的信息容易被窃取。假如 cookie 中所传递的内容比较重要，那么就要求使用加密的数据传输。

cookie 的这个属性的名称是“secure”，默认的值为空。如果一个 cookie 的属性为secure，那么它与服务器之间就通过HTTPS或者其它安全协议传递数据。

```js
document.cookie = "username=Darren;secure"
```

把cookie设置为secure，只保证 cookie 与服务器之间的数据传输过程加密，而保存在本地的 cookie文件并不加密。如果想让本地cookie也加密，得自己加密数据。

6. cookie 编码细节

在输入cookie信息时不能包含空格，分号，逗号等特殊符号，而在一般情况下，cookie 信息的存储都是采用未编码的方式。所以，在设置 cookie 信息以前要先使用escape()函数将 cookie 值信息进行编码，在获取到 cookie 值得时候再使用unescape()函数把值进行转换回来。

```js
document.cookie = name + "="+ escape (value)
unescape(document.cookie.substring(c_start,c_end))

```

