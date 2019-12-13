### npm(淘宝依赖)、npm(原生翻墙)、cnpm、yarn
-  react版本号，`package` `^16.0.0`与`package-lock` `^15.6.2`中不统一的情况下（最新`^16.5.0`），用这几种方式下载的版本号差别。
-  npm(淘宝依赖)： `^16.0.0` (`package` )
-  npm(原生翻墙)： `^15.6.2` (`package-lock` )
-  cnpm： `^16.5.0` (最新)
-  yarn： `^16.0.0` (`package` )
> 知识点记录：<br>
`package-lock.json`： 是在 `npm install`时候生成一份文件，用以记录当前状态下实际安装的各个npm package的具体来源和版本号。<br>
向上标号`^`是定义了<strong>向后（新）兼容依赖</strong>。向新兼容依赖下载最新库包。例如 `^16.0.0`，`^16.5.0`。<br>
package.json文件只能锁定大版本，也就是版本号的第一位，并不能锁定后面的小版本。因此npm 5的版本以上就开始提供自动生成`package-lock.json`功能，为的是让开发者知道只要你保存了源文件，到一个新的机器上、或者新的下载源，只要按照这个`package-lock.json`所标示的具体版本下载依赖库包，就能确保所有库包与你上次安装的完全一样。<br>
在以前可能就是直接改package.json里面的版本，然后再npm install了，但是5版本后就不支持这样做了，因为版本已经锁定在package-lock.json里了，所以我们只能npm install xxx@x.x.x  这样去更新我们的依赖，然后package-lock.json也能随之更新。

