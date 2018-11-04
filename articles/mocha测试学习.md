# 使用mocha测试

学习了官网的示例，将学习成果记录一下。
## mocha是什么
Mocha是一个跑在node和浏览器上的javascript测试框架，让异步测试变得简单有趣， 并提供灵活精确的报告。

## 安装
使用npm全局安装
<pre>
$ npm install --global mocha
</pre>
作为项目开发依赖安装
<pre>
$ npm install --save-dev mocha
</pre>

## 开始
创建测试文件<a href='../learn-mocha'>learn-mocha</a>
<pre>
$ npm install mocha -g // 全局安装mocha
$ mkdir test // 创建test文件夹
$ touch test.js // 创建test文件
</pre>

## 例子
<pre>
var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});
</pre>
例子中使用了测试集定义函数`describe()`和测试用例定义函数`it()`，先引入`node`的`assert`模块的`eaual()`方法用来验证两数是否相等：`[1,2,3].indexOf(4)` == `-1`
<pre>
learn-mocha git:(master) ✗ mocha

  Array
    #indexOf()
      ✓ should return -1 when the value is not present

  1 passing (7ms)
</pre>
在终端输入`mocha`，可以看到测试用例通过了。

`Mocha`的执行会找到当前命令执行目录下的`test`目录。`./test/*.js`是`Mocha`寻找的目标。
也可以在package.json中设置如下设置，就可以使用`npm test`命令行开启`Mocha`测试
<pre>
"scripts": {
  "test": "mocha"
}
</pre>

## 断言ASSERTIONS
Mocha支持各种断言库来验证功能，例如should.js、chai、expect.js、better-assert、unexpected等

## 异步模式
在mocha中测试异步代码并不容易。通过给`it()`加一个回调函数（通常命名为done），mocha将会知道异步代码执行之后需要调用`done`来表示测试完成。
<pre>
describe('User', function() {
  describe('#save()', function() {
    it('should save without error', function(done) {
      var user = new User('Luna');
      user.save(function(err) {
        if (err) done(err);
        else done();
      });
    });
  });
});
</pre>

当done()可以接受异步代码错误的时候，上面代码还可以简化为
<pre>
describe('User', function() {
  describe('#save()', function() {
    it('should save without error', function(done) {
      var user = new User('Luna');
      user.save(done);
    });
  });
});
</pre>

### 使用PROMISES
除了使用回调函数`done()`， 你还可以返回`Promise`，
<pre>
beforeEach(function() {
  return db.clear()
    .then(function() {
      return db.save([tobi, loki, jane]);
    });
});

describe('#find()', function() {
  it('respond with matching records', function() {
    return db.find({ type: 'User' }).should.eventually.have.length(3);
  });
});
</pre>

### 使用async/await
如果js环境支持 async/await， 你可以这样写异步测试
<pre>
beforeEach(async function() {
  await db.clear();
  await db.save([tobi, loki, jane]);
});

describe('#find()', function() {
  it('responds with matching records', async function() {
    const users = await db.find({ type: 'User' });
    users.should.have.length(3);
  });
});
</pre>


## 同步模式
当测试同步代码时，mocha会自动的执行下一个测试用例
<pre>
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      [1,2,3].indexOf(5).should.equal(-1);
      [1,2,3].indexOf(0).should.equal(-1);
    });
  });
});
</pre>

### 箭头函数
不建议在mocha中使用箭头函数，因为箭头函数对this的绑定会使测试用例无法访问Mocha上下文中的一些方法。
<pre>
describe('my suite', () => {
  it('my test with arrow function', () => {
    // should set the timeout of this test to 1000 ms; instead will fail
    this.timeout(1000);
    assert.ok(true);
  });
});

describe('my suite', function () {
  it('my test without arrow function', function() {
    // set the timeout of this test to 1000 ms; passing
    this.timeout(1000);
    assert.ok(true);
  });
});
</pre>

## HOOKS
Mocha提供了四种hooks用来做测试准备和测后清理工作
- before() 在所有测试套件运行之前运行
- after() 在所有测试套件运行之后运行
- beforeEach() 在每个测试用例运行之前运行
- afterEach() 在每个测试用例运行之后运行
<pre>
var assert = require('assert');
describe('hooks', function() {

  before(function() {
    console.log('runs before all tests in this block') 
  });

  after(function() {
    console.log('runs after all tests in this block') 
  });

  beforeEach(function() {
    console.log('runs before each test in this block') 
  });

  afterEach(function() {
    console.log('runs after each test in this block') 
  });

  it('test 1', function(){
    assert.ok(true)
  })

  it('test 2', function(){
    assert.ok(true)
  })

});
</pre>

<pre>
➜  learn-mocha git:(master) ✗ mocha test/hooks.js

  hooks
runs before all tests in this block
runs before each test in this block
    ✓ test 1
runs after each test in this block
runs before each test in this block
    ✓ test 2
runs after each test in this block
runs after all tests in this block

  2 passing (8ms)
</pre>