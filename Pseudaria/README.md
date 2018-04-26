# 纠错集

记录项目工作中遇到的问题

***

### VH
- 问题: CSS中使用了VH，在iOS中展示正常，但是在安卓的个别浏览器中，当输入框弹出时，使用VH的DIV的高度会发生变化。
- 原因: 在安卓端浏览器虚拟键盘弹出时，导致视口高度改变，以至于vh的取值改变；页面中使用vh定高的元素的大小被压缩，造成布局错位以及文字溢出。
    ```
    // 正常模式下
    100vh = document.documentElement.clientHeight;

    // 安卓端弹出虚拟键盘情况下
    100vh = document.documentElement.clientHeight - 虚拟键盘的高度;
    ```
- 解决: 使用rem/px进行布局暂时修复
<br>
#### 补充： 
- vw：viewpoint width，视窗宽度，1vw等于视窗宽度的1%。
- vh：viewpoint height，视窗高度，1vh等于视窗高度的1%。
- vmin：vw和vh中较小的那个。
- vmax：vw和vh中较大的那个。
<br
- px：绝对单位，页面按精确像素展示
- em：相对单位，基准点为自身或父节点字体的大小
- rem：相对单位，可理解为”root em”, 相对根节点html的字体大小来计算
