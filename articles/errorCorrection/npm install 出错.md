

### 新项目下载下来，npm install 出错
- 【问题】：在 npm install ，发生报错，报错如下
```
npm ERR! Error: EACCES: permission denied, mkdir '/Users/...'
```

- 【解决】： 在终端中输入，解决

```
sudo chown -R $USER:$GROUP ~/.npm
sudo chown -R $USER:$GROUP ~/.config
```

