
### window.location.href无效，页面不跳转
- 在`react`的`componentDidMount`中使用，判断是否在finance的APP中，如果是，则执行`window.location.href`授权登录，线上发现该行代码不生效，最终使用将之放在`function`中。
