
## this 

new一个函数时，背地里会将创建一个连接到prototype成员的新对象，同时this会被绑定到那个新对象上。

#### call

call 方法第一个参数是要绑定给this的值，后面传入的是一个参数列表。当第一个参数为null、undefined的时候，默认指向window。

```javascript
var arr = [1, 2, 3, 89, 46]
var max = Math.max.call(null, arr[0], arr[1], arr[2], arr[3], arr[4])//89
```
#### apply

apply接受两个参数，第一个参数是要绑定给this的值，第二个参数是一个参数数组。当第一个参数为null、undefined的时候，默认指向window。

```javascript
var arr = [1,2,3,89,46]
var max = Math.max.apply(null,arr)//89
```

#### apply VS call

apply 和 call 的用法几乎相同, 唯一的差别在于：当函数需要传递多个变量时, apply 可以接受一个数组作为参数输入, call 则是接受一系列的单独变量。

call和apply可用来借用别的对象的方法，这里以call()为例。
使用 Person1 对象代替 this 对象，那么 Person2 就有了 Person1 中的所有属性和方法了，相当于 Person2 继承了 Person1 的属性和方法。

```javascript
var Person1  = function () {
    this.name = 'Dot';
}
var Person2 = function () {
    this.getname = function () {
        console.log(this.name);
    }
    Person1.call(this);
}
var person = new Person2();
person.getname();       // Dot
```

#### bind

和call很相似，第一个参数是this的指向，从第二个参数开始是接收的参数列表。区别在于bind方法返回值是**函数**以及bind接收的**参数列表的使用**。

- bind返回值是函数。bind 方法不会立即执行，而是返回一个改变了上下文 this 后的函数。

- 参数的使用。call 是把第二个及以后的参数作为 fn 方法的实参传进去，而 fn1 方法的实参实则是在 bind 中参数的基础上再往后排。

```javascript
function fn(a, b, c) {
    console.log(a, b, c);
}
var fn1 = fn.bind(null, 'Dot');

fn('A', 'B', 'C');            // A B C
fn1('A', 'B', 'C');           // Dot A B
fn1('B', 'C');                // Dot B C
fn.call(null, 'Dot');      // Dot undefined undefined
```

用bind方法实现函数珂里化，以下是一个简单的示例：

```javascript
var add = function(x) {
  return function(y) {
    return x + y;
  };
};

var increment = add(1);
var addTen = add(10);

increment(2);
// 3

addTen(2);
// 12
```

在低版本浏览器没有 bind 方法，我们也可以自己实现一个。

```javascript
if (!Function.prototype.bind) {
    Function.prototype.bind = function () {
        var self = this,                        // 保存原函数
            context = [].shift.call(arguments), // 保存需要绑定的this上下文
            args = [].slice.call(arguments);    // 剩余的参数转为数组
        return function () {                    // 返回一个新函数
            self.apply(context, [].concat.call(args, [].slice.call(arguments)));
        }
    }
}
```

#### call、apply和bind函数存在的区别:

bind返回对应函数, 便于稍后调用； apply, call则是立即调用。

除此外, 在 ES6 的箭头函数下, call 和 apply 将失效, 对于箭头函数来说:

- 箭头函数体内的 this 对象, 就是定义时所在的对象, 而不是使用时所在的对象;所以不需要类似于var _this = this这种丑陋的写法
- 箭头函数不可以当作构造函数，也就是说不可以使用 new 命令, 否则会抛出一个错误
- 箭头函数不可以使用 arguments 对象,，该对象在函数体内不存在. 如果要用, 可以用 Rest 参数代替
- 不可以使用 yield 命令, 因此箭头函数不能用作 Generator 函数

---- 

参考资料
- [call、apply和bind方法的用法以及区别](https://www.jianshu.com/p/bc541afad6ee)
