# 纠错集

>记录项目工作中遇到的问题



### VH
- 【问题】： CSS中使用了VH，在iOS中展示正常，但是在安卓的个别浏览器中，当输入框弹出时，使用VH的DIV的高度会发生变化。
- 【原因】： 在安卓端浏览器虚拟键盘弹出时，导致视口高度改变，以至于vh的取值改变；页面中使用vh定高的元素的大小被压缩，造成布局错位以及文字溢出。
    ```
    // 正常模式下
    100vh = document.documentElement.clientHeight;

    // 安卓端弹出虚拟键盘情况下
    100vh = document.documentElement.clientHeight - 虚拟键盘的高度;
    ```
- 【解决】： 使用rem/px进行布局暂时修复
<br>

#### 补充 
- vw：viewpoint width，视窗宽度，1vw等于视窗宽度的1%。
- vh：viewpoint height，视窗高度，1vh等于视窗高度的1%。
- vmin：vw和vh中较小的那个。
- vmax：vw和vh中较大的那个。
- px：绝对单位，页面按精确像素展示
- em：相对单位，基准点为自身或父节点字体的大小
- rem：相对单位，可理解为”root em”，相对根节点html的字体大小来计算


### react 错误提示
- `Super expression must either be null or a function, not undefined`单词拼写错误，例如`Component`写成了`Components`


### 手机自动识别手机的功能关闭
- iPhone手机浏览器在加载网页的时候，会把疑是手机号或者电话号的一串数字加上一个连接，点了之后会弹出拨打号码的窗口。
- 将手机自动识别手机的功能关闭：<meta name="format-detection" content="telephone=no" />
- 如果你还想要识别手机号的功能可以这样：<a href="tel:15*******60">15*******60</a>

### 手机兼容性问题：页面空白问题
- 问题描述：个别苹果6s和6，app中的H5页面点击进去是空白的，但在大部分的手机上，没有问题
- 拿到白屏页面手机后，将此H5页面在微信以及其他浏览器中打开，均空白，排除APP因素。
- 采用抓包工具，查看打印台，报错：`SyntaxError: Unexpected token '*'. Expected an opening '(' before a function's parameter list.`
- 通过报错和排查得知，webpack在打包编译JS代码时，转换成Generator和yield的代码，在问题机型上无法被正确解析。

### 下拉加载
- `mobile.ant.design`的下拉刷新在手机上滑动会有阻塞感，体验不好，如果去除容器`wrapper`的`height`，`scroll`会走`window`滑动顺畅，但是滑动到底部时，向上滑动时会走刷新。
- 使用过`vue`的`mint-loadmore`，并没有这种问题，所以将代码改写成react，发现上述问题还是存在，最终通过在`touch`事件触发时，判断`window.scrollY`的值来确定是否触发刷新的代码。
