# Tapable 0.2.8 入门

tapable是webpack的核心框架（4.0以上版本的API已经发生了变化），是一个基于事件流的框架，或者叫做发布订阅模式，或观察者模式，webpack的整个生命周期及其开放的自定义插件系统都离不开tapable的支持，研究其运行原理是阅读webpack源代码的第一步。

Tapable是一个小型库，允许你添加和应用插件到一个javascript模块。它可以被继承或混入其他模块。除可以定制事件发射和操作，还可以通过回调参数访问事件的“排放者”或“生产者”。

Tapable 有四组成员函数：
- plugin(name:string, handler:function)：这允许自定义插件注册到Tapable实例的事件中。这起到类似on()的方法EventEmitter，这是用于注册一个处理程序/侦听器当信号/事件发生做一些事情。
- apply(…pluginInstances: (AnyPlugin|function)[])：AnyPlugin应该是一个具有方法的类（或者很少，是一个对象）apply，或者只是一个带有一些注册码的函数。此方法仅适用于插件的定义，以便真正的事件侦听器可以注册到Tapable实例的注册表中。
- applyPlugins*(name:string, …)：Tapable实例可以使用这些函数将特定哈希下的所有插件应用。这组方法就像使用各种策略精心控制事件发射的emit()方法EventEmitter。
- mixin(pt: Object)：一种简单的方法来将Tapable原型扩展为mixin而不是继承。

不同的applyPlugins*方法涵盖以下用例：

- 插件可以串行运行。
- 插件可以并行运行。
- 插件可以一个接一个地运行，但从前一个插件（瀑布）获取输入。
- 插件可以异步运行。
- 放弃保释运行插件：也就是说，一旦一个插件返回非插件undefined，跳出运行流程并返回该插件的返回。这听起来像once()的EventEmitter，但是是完全不同的。

### Tapable 介绍

```js
var Tapable = require("tapable");
```
Tapable 是一个库，用于绑定和执行插件。

在使用上，你仅仅需要继承它

```js
function MyClass() {
    Tapable.call(this)
}

MyClass.prototype = Object.create(Tapable.prototype)

MyClass.prototype.method = function() {}
```

或者复制它的属性到你的类中

```js
function MyClass2() {
    EventEmitter.call(this);
    Tapable.call(this);
}

MyClass2.prototype = Object.create(EventEmitter.prototype);
Tapable.mixin(MyClass2.prototype);

MyClass2.prototype.method = function() {};
```

### 公开方法(Public functions)

#### apply

```js
void apply(plugins: Plugin...)

Tapable.prototype.apply = function apply() {
    for(var i = 0; i < arguments.length; i++) { 
        arguments[i].apply(this); // 遍历所有参数并执行
    }
};
```

通过arguments获得所有传入的插件对象，并调用插件对象的apply方法，更改上下文为当前this，执行插件。（Webpack的插件就是Tapable对象，因此必须要提供 apply 方法）

#### plugin

```js
void plugin(names: string|string[], handler: Function)

Tapable.prototype.plugin = function plugin(name, fn) {
	if(Array.isArray(name)) {
		name.forEach(function(name) {
			this.plugin(name, fn);
		}, this);
		return;
	}
	if(!this._plugins[name]) this._plugins[name] = [fn];
	else this._plugins[name].push(fn);
};
```
names: 需要监听的事件名称，可以传入事件名称集合，也可以传入单个事件名称
handler: 事件的处理函数

tapable通过原型方法Tapable.prototype.plugin来注册事件监听。将回调函数按照事件名称进行归类存储，在tapable实例中统一调度管理。

### 受保护的方法 (Protected functions)

- `applyPlugins`
- `applyPluginsWaterfall`
- `applyPluginsBailResult`

- `applyPluginsAsync`
- `applyPluginsAsyncWaterfall`
- `applyPluginsAsyncSeries`

- `applyPluginsParallel`
- `applyPluginsParallelBailResult`

- `hasPlugins`

tapable中的事件触发方式可以按命名分为如下几个大组：

- `waterfall`方法会将上一个监听的执行结果传给下一个
- `bailResult`方法只会执行到第一个返回结果不是undefined的事件流
- `Series`方法会线性执行异步事件流，上一个结束后下一个才会开始
- `Parallel`方法会并行执行所有异步监听

#### applyPlugins

```js
void applyPlugins(name: string, args: any...)

Tapable.prototype.applyPlugins = function applyPlugins(name) {
	if(!this._plugins[name]) return;
	var args = Array.prototype.slice.call(arguments, 1); // 除名称以外的其他参数
	var plugins = this._plugins[name]; // 第一个参数为事件名, 查找事件流数组
	for(var i = 0; i < plugins.length; i++)
		plugins[i].apply(this, args); // 依次执行指定name事件流的apply方法
};
```
触发事件name，传入参数args，并行的调用所有注册在事件name上的处理函数


#### applyPluginsWaterfall

```js
any applyPluginsWaterfall(name: string, init: any, args: any...)

Tapable.prototype.applyPluginsWaterfall = function applyPlugins(name, init) {
	if(!this._plugins[name]) return init; // 如果指定事件没有注册事件流，则返回第2个参数(init)
	var args = Array.prototype.slice.call(arguments, 1); // 除name以外的其他参数
	var plugins = this._plugins[name]; // 查找事件流数组
	var current = init; 
	for(var i = 0; i < plugins.length; i++)
		args[0] = current;
		current = plugins[i].apply(this, args); // 依次执行事件流的apply()方法, 传入的args是前执行返回值替换init初始值的参数
	return current;
};
```

触发事件name，串行的调用注册在事件name上的处理函数（先入先出），最先执行的处理函数传入init和args，后续的处理函数传入前一个处理函数的返回值和args，函数最终返回最后一个处理函数的返回结果

#### applyPluginsBailResult

```js
any applyPluginsBailResult(name: string, args: any...)

Tapable.prototype.applyPluginsBailResult = function applyPluginsBailResult(name) {
	if(!this._plugins[name]) return;
	var args = Array.prototype.slice.call(arguments, 1); // 除名称以外的其他参数
	var plugins = this._plugins[name]; // 第一个参数为事件名, 查找事件流数组
	for(var i = 0; i < plugins.length; i++) {
		var result = plugins[i].apply(this, args); // 依次执行事件流的apply()方法并取得返回值
		if(typeof result !== "undefined") { // 如果返回一个不为undefined的结果
			return result; // 则停止执行并将这个结果返回。
		}
	}
};
```

触发事件name，串行的调用注册在事件name上的处理函数（先入先出），传入参数args，如果其中一个处理函数返回值!== undefined，直接返回这个返回值，后续的处理函数将不被执行


#### applyPluginsAsync

```js
void applyPluginsAsync(
	name: string,
	args: any...,
	callback: (err?: Error) -> void
)

// 异步执行监听回调的方法。这个方法是顺序执行，等到第一个插件执行结束后才会执行下一个插件
Tapable.prototype.applyPluginsAsyncSeries = Tapable.prototype.applyPluginsAsync = function applyPluginsAsync(name) {
	var args = Array.prototype.slice.call(arguments, 1); // 除名称以外的其他参数
	var callback = args.pop(); // 参数数组最后一个弹出，回调函数赋给callback
	var plugins = this._plugins[name]; // 第一个参数为事件名, 查找事件流数组
	if(!plugins || plugins.length === 0) return callback(); // 监听事件name为空或没有没有注册事件流，执行回调函数
	var i = 0;
	var _this = this
	args.push(copyProperties(callback, function next(err) { // copyProperties将callback原型方法复制到next中并返回next
		if(err) return callback(err);
		i++;
		if(i >= plugins.length) {
			return callback();
		}
		plugins[i].apply(_this, args); // 将下一个插件当做回调函数传入第一个插件
	})); // 利用闭包实现了一个迭代器，变量i记录在applyPluginsAsync()方法中,并在回调中函数next( )中保持了对i的引用。
	plugins[0].apply(this, args);
};

function copyProperties(from, to) { // 将from原型方法复制到指定对象to中
	for(var key in from)
		to[key] = from[key];
	return to;
}
```

触发事件name，串行的调用注册在事件name上的处理函数（先入先出），倘若某一个处理函数报错，则执行传入的callback(err)，后续的处理函数将不被执行，否则最后一个处理函数调用callback。

#### applyPluginsAsyncSeries

```js
applyPluginsAsyncSeries(
	name: string,
	args: any...,
	callback: (err: Error, result: any) -> void
)
```
同applyPluginsAsync

#### applyPluginsAsyncWaterfall

```js
applyPluginsAsyncWaterfall(
	name: string,
	init: any,
	callback: (err: Error, result: any) -> void
)
```
```js
Tapable.prototype.applyPluginsAsyncWaterfall = function applyPluginsAsyncWaterfall(name, init, callback) {
	if(!this._plugins[name] || this._plugins[name].length === 0) return callback(null, init); // 监听事件name为空或没有没有注册事件流，执行回调函数
	var plugins = this._plugins[name]; // 第一个参数为事件名, 查找事件流数组
	var i = 0;
	var _this = this
	var next = copyProperties(callback, function(err, value) {// copyProperties函数将callback函数加入了参数函数并返回参数函数
		if(err) return callback(err);
		i++;
		if(i >= plugins.length) {
			return callback(null, value);
		}
		plugins[i].call(_this, value, next);
	});
	plugins[0].call(this, init, next);
};
```

触发事件name，串行的调用注册在name上的处理函数(先入先出)，第一个处理函数传入参数init，后续的函数依赖于前一个函数执行回调的时候传入的参数nextValue，倘若某一个处理函数报错，则执行传入的callback(err)，后续的处理函数将不被执行，否则最后一个处理函数调用callback(value)

#### applyPluginsParallel

```js
applyPluginsParallel(
	name: string,
	args: any...,
	callback: (err?: Error) -> void
)

Tapable.prototype.applyPluginsParallel = function applyPluginsParallel(name) {
	var args = Array.prototype.slice.call(arguments, 1);
	var callback = args.pop(); // 参数数组最后一个弹出，回调函数赋给callback
	if(!this._plugins[name] || this._plugins[name].length === 0) return callback();// 监听事件name为空或没有没有注册事件流，执行回调函数
	var plugins = this._plugins[name];
	var remaining = plugins.length;
	args.push(copyProperties(callback, function(err) {
		if(remaining < 0) return; // ignore
		if(err) {
			remaining = -1;
			return callback(err);
		}
		remaining--;
		if(remaining === 0) {
			return callback();
		}
	}));
	for(var i = 0; i < plugins.length; i++) {
		plugins[i].apply(this, args);
		if(remaining < 0) return;
	}
};
```

触发事件name，传入参数args，并行的调用所有注册在事件name上的处理函数，倘若任一处理函数执行报错，则执行callback('err')，否则当所有的处理函数都执行完的时候调用callback()

applyPluginsParallel 主要功能和最简单的 applyPlugins 方法比较相似，无论如何都会让所有注册的插件运行一遍；只是相比 applyPlugins 多了一个额外的功能，它最后提供一个 callback 函数，这个 callback 的函数比较倔强，如果所有的插件x都正常执行，且最后都cb()，则会在最后执行callback里的逻辑；不过，一旦其中某个插件运行出错，就会调用这个callback(err)，之后就算插件有错误也不会再调用该callback函数；

#### applyPluginsParallelBailResult

```js
applyPluginsParallelBailResult(
	name: string,
	args: any...,
	callback: (err: Error, result: any) -> void
)
```
```js
Tapable.prototype.applyPluginsParallelBailResult = function applyPluginsParallelBailResult(name) {
	var args = Array.prototype.slice.call(arguments, 1);
	var callback = args[args.length - 1];
	if(!this._plugins[name] || this._plugins[name].length === 0) return callback();
	var plugins = this._plugins[name];
	var currentPos = plugins.length;
	var currentError, currentResult;
	var done = [];
	for(var i = 0; i < plugins.length; i++) {
		args[args.length - 1] = (function(i) {
			return copyProperties(callback, function(err, result) {
				if(i >= currentPos) return; // ignore
				done.push(i);
				if(err || result) {
					currentPos = i + 1;
					done = done.filter(function(item) {
						return item <= i;
					});
					currentError = err;
					currentResult = result;
				}
				if(done.length === currentPos) {
					callback(currentError, currentResult);
					currentPos = 0;
				}
			});
		}(i));
		plugins[i].apply(this, args);
	}
};
```

触发事件name，串行的执行注册在事件name上的处理函数（先入先出），每个处理函数必须调用callback(err, result)，倘若任一处理函数在调用callback(err, result)的时候，err!==undefined || result!==undefined，则callback将真正被执行，后续的处理函数则不会再被执行。

它的行为和 applyPluginsParallel 非常相似，首先无论如何都会让所有注册的插件运行一遍（根据注册的顺序）；为了让 callback 执行，其前提条件是每个插件都需要调用 cb()；但其中的 callback 只会执行一次（当传给cb的值不是undefined/null 的时候），这一次执行顺序是插件定义顺序有关，而跟每个插件中的 cb() 执行时间无关的；

#### hasPlugins

```js
hasPlugins(
	name: string
)

Tapable.prototype.hasPlugins = function hasPlugins(name) {
	var plugins = this._plugins[name];
	return plugins && plugins.length > 0;
};
```
如果事件name已经被注册了，则返回true


### 使用案例
webpack的Tapable实例之一编译器负责编译webpack配置对象并返回一个编译实例。编译实例运行时，将创建所需的捆绑包。

node_modules/webpack/lib/Compiler.js

```js
var Tapable = require("tapable"); // 引入Tapable

function Compiler() {
    Tapable.call(this); // 将Tapable中的this指向Compiler
}

Compiler.prototype = Object.create(Tapable.prototype); // Compiler 继承 Tapable
```

现在在编译器上编写一个插件，my-custom-plugin.js

```js
function CustomPlugin() {} // 定义一个CustomPlugin类

CustomPlugin.prototype.apply = function(compiler) { // CustomPlugin的原型对象上添加apply入口
  compiler.plugin('emit', pluginFunction); // 传入compiler，并注册事件流pluginFunction的事件名称emit
}
```

编译器在其生命周期的适当位置通过执行插件, node_modules/webpack/lib/Compiler.js

```js
this.apply*("emit",options) // will fetch all plugins under 'emit' name and run them.
```


-------
参考资料
- [Tapable —— 腾讯云](https://cloud.tencent.com/developer/section/1477352)
- [webpack源码分析（一）— Tapable插件架构](https://www.jianshu.com/p/01a606c97d76)
- [Webpack 源码（一）—— Tapable 和 事件流](https://segmentfault.com/a/1190000008060440)
- [Tapable中文文档](https://www.jianshu.com/p/c71393db6287)
- [tapable0.2 —— github](https://github.com/webpack/tapable/tree/tapable-0.2)
- [webpack4.0各个击破（8）—— tapable篇](http://blog.51cto.com/13869008/2166755)
- [浅析webpack源码之Tapable介绍](https://www.cnblogs.com/QH-Jimmy/p/8036962.html)
