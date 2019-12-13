#### for in 和 for of区别。
- for in遍历数组和对象的`索引`
- for of遍历数组的`元素值`

>  for in遍历数组和对象
```javascript
var arr = [1,2,3]
arr.name = 'name'
Array.prototype.method = function () {}
for (let i in arr) console.log(i+1)
// 01 11 21 name1 method1

var obj = {name: 'name'}
Object.prototype.method = function () {}
for (let i in obj) console.log(i+1)
// name1 method1
```
从上述代码打印出来的问题，我们可以得到1.3结论
1. 索引是字符串型的数字，因而不能直接进行几何运算
2. 遍历顺序可能不是实际的内部顺序
3. 遍历数组所有的可枚举属性，包括原型。例如的原型方法method和name属性

for in 可以遍历到对象的原型方法method,如果不想遍历原型方法和属性的话，可以在循环内部判断一下,hasOwnPropery方法可以判断某属性是否是该对象的实例属性
```javascript
var arr = [1,2,3]
arr.name = 'name'
Array.prototype.method = function () {}
for (let i in arr) if(arr.hasOwnProperty(i)) console.log(i+1)
// 01 11 21 name1

var obj = {name: 'name'}
Object.prototype.method = function () {}
for (let i in obj) if(Object.hasOwnProperty(i))  console.log(i+1)
// name1
```

>  for of遍历数组和对象
```javascript
var arr = [1,2,3]
arr.name = 'name'
Array.prototype.method = function () {}
for (let i of arr) console.log(i+1)
// 2 3 4

var obj = {name: 'name'}
Object.prototype.method = function () {}
for (let i of obj) console.log(i+1)
// VM1718:9 Uncaught TypeError: obj is not iterable at <anonymous>:9:15
```
从上述代码打印出来, 我们可以看到for of可以遍历数组，但是遍历对象报错。

总结： 
- for in 遍历数组和对象的索引，包括原型方法和属性。
- for of 遍历数组的元素值，不能遍历对象。


