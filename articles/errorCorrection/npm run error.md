### npm run error
- 【问题】：在 npm run dev ，发生报错，报错如下
```
cross-env NODE_ENV=development node server/server.js

server dev
events.js:165
      throw er; // Unhandled 'error' event
      ^

Error: listen EADDRINUSE 0.0.0.0
    at Server.setupListenHandle [as _listen2] (net.js:1325:19)
    at listenInCluster (net.js:1383:12)
    at Server.listen (net.js:1482:5)
    at Application.listen (/Users/adela/mater/todo-ssr/node_modules/koa/lib/application.js:65:19)
    at Object.<anonymous> (/Users/adela/mater/todo-ssr/server/server.js:29:5)
    at Module._compile (module.js:649:30)
    at Object.Module._extensions..js (module.js:660:10)
    at Module.load (module.js:561:32)
    at tryModuleLoad (module.js:501:12)
    at Function.Module._load (module.js:493:3)
Emitted 'error' event at:
    at emitErrorNT (net.js:1362:8)
    at process._tickCallback (internal/process/next_tick.js:114:19)
    at Function.Module.runMain (module.js:692:11)
    at startup (bootstrap_node.js:194:16)
    at bootstrap_node.js:666:3
```

- 【解决】： 打开终端，输入

```
ps -ef|grep node
```
查看端口号情况，如下
```
  501  3315  3314   0 10:34上午 ttys000    0:00.11 node /Users/adela/mater/todo-ssr/node_modules/.bin/cross-env NODE_ENV=development node server/server.js
  501  3316  3315   0 10:34上午 ttys000    0:04.21 node server/server.js
  501  3419  3322   0 10:35上午 ttys003    0:00.00 grep --color=auto --exclude-dir=.bzr --exclude-dir=CVS --exclude-dir=.git --exclude-dir=.hg --exclude-dir=.svn node
```
在终端输入：```skill -9 3316```把这几个端口占用都杀死


