
#### 5. css预处理器的使用。sass/less。
CSS预处理器的原理: 是将类 CSS 语言通过 Webpack 编译 转成浏览器可读的真正 CSS。在这层编译之上，便可以赋予 CSS 更多更强大的功能
1. 变量使用
2. 嵌套
3. 标识符&
4. 群组嵌套
5. 混合器
6. 继承
混合器会导致属性重复，css体积大，继承只继承css规则，不继承重复属性
https://www.sass.hk/guide/

- 混合器：实现大段样式的重用。通过@include包含在一个父规则中时，在混合器中的规则最终会生成父规则中的嵌套规则
```scss
$--sm: 1190px !default;

$--breakpoints: (
  'xs' : (max-width: $--sm),
  'sm' : (min-width: $--sm + 1px)
  // 'md' : (min-width: $--md),
  // 'lg' : (min-width: $--lg)
);

 @mixin res($key: 'sm', $map: $--breakpoints) {
	// 循环断点Map，如果存在则返回
	@if map-has-key($map, $key) {
		@media only screen and #{inspect(map-get($map, $key))} {
			@content;
		}
	} @else {
		@warn "Undefeined points: `#{$map}`";
	}
}

@include res(sm) {
  [class*="xs_"] {
    display: none
  }
}
```
- 继承
```scss
//通过选择器继承继承样式
.error {
  border: 1px solid red;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
```
