# 使用mocha测试

学习了官网的示例，将学习成果记录一下。
## mocha是什么
Mocha是一个跑在node和浏览器上的javascript测试框架，让异步测试变得简单有趣， 并提供灵活精确的报告。

## 安装
使用npm全局安装
```
$ npm install --global mocha
```
作为项目开发依赖安装
```
$ npm install --save-dev mocha
```

## 开始
创建测试文件<a href='../learn-mocha'>learn-mocha</a>
``` 
$ npm install mocha -g // 全局安装mocha
$ mkdir test // 创建test文件夹
$ touch test.js // 创建test文件
```

## 例子
``` javascript
var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});
```
例子中使用了测试集定义函数`describe()`和测试用例定义函数`it()`，先引入`node`的`assert`模块的`eaual()`方法用来验证两数是否相等：`[1,2,3].indexOf(4)` == `-1`
```
learn-mocha git:(master) ✗ mocha

  Array
    #indexOf()
      ✓ should return -1 when the value is not present

  1 passing (7ms)
```
在终端输入`mocha`，可以看到测试用例通过了。

`Mocha`的执行会找到当前命令执行目录下的`test`目录。`./test/*.js`是`Mocha`寻找的目标。
也可以在package.json中设置如下设置，就可以使用`npm test`命令行开启`Mocha`测试
``` javascript
"scripts": {
  "test": "mocha"
}
```

## 断言ASSERTIONS
Mocha支持各种断言库来验证功能，例如should.js、chai、expect.js、better-assert、unexpected等

## 异步模式
在mocha中测试异步代码并不容易。通过给`it()`加一个回调函数（通常命名为done），mocha将会知道异步代码执行之后需要调用`done`来表示测试完成。
``` javascript
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
```

当done()可以接受异步代码错误的时候，上面代码还可以简化为
``` javascript
describe('User', function() {
  describe('#save()', function() {
    it('should save without error', function(done) {
      var user = new User('Luna');
      user.save(done);
    });
  });
});
```

### 使用PROMISES
除了使用回调函数`done()`， 你还可以返回`Promise`，
``` javascript
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
```

### 使用async/await
如果js环境支持 async/await， 你可以这样写异步测试
``` javascript
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
```


## 同步模式
当测试同步代码时，mocha会自动的执行下一个测试用例
``` javascript
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      [1,2,3].indexOf(5).should.equal(-1);
      [1,2,3].indexOf(0).should.equal(-1);
    });
  });
});
```

### 箭头函数
不建议在mocha中使用箭头函数，因为箭头函数对this的绑定会使测试用例无法访问Mocha上下文中的一些方法。
``` javascript
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
```

## HOOKS
Mocha提供了四种hooks用来做测试准备和测后清理工作
- before() 在所有测试套件运行之前运行
- after() 在所有测试套件运行之后运行
- beforeEach() 在每个测试用例运行之前运行
- afterEach() 在每个测试用例运行之后运行
``` javascript
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
```

``` javascript
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
```
### 描述HOOKS
任何钩子在回调前都有一个可选的描述，在测试中能更简单定位到错误。如果一个钩子是命名函数，在没有描述时，将会使用函数名。
```javascript
beforeEach(function() {
  // beforeEach hook
});

beforeEach(function namedFun() {
  // beforeEach:namedFun
});

beforeEach('some description', function() {
  // beforeEach:some description
});
```

### 异步HOOKS
所有hooks(before(), after(), beforeEach(), afterEach()) 都有可能是同步或者异步，就像一个常规的测试。例如，您可能希望在每个测试之前填充虚拟内容的数据库：
```javascript
describe('Connection', function() {
  var db = new Connection,
    tobi = new User('tobi'),
    loki = new User('loki'),
    jane = new User('jane');

  beforeEach(function(done) {
    db.clear(function(err) {
      if (err) return done(err);
      db.save([tobi, loki, jane], done);
    });
  });

  describe('#find()', function() {
    it('respond with matching records', function(done) {
      db.find({type: 'User'}, function(err, res) {
        if (err) return done(err);
        res.should.have.length(3);
        done();
      });
    });
  });
});
```

### 延迟根suite
如果你需要在所有`suites`运行之前执行异步操作，你可能会延迟根`suite`。用`--delay`运行`mocha`。这将把一个特殊的回调函数，`run()`附加到全局上下文中：
```javascript
setTimeout(function() {
  // do some setup

  describe('my suite', function() {
    // ...
  });

  run();
}, 5000);
```

## 待定测试(PENDING TESTS)
待定测试将包括在测试结果中，并且标记为pending。未决测试不被认为是失败的测试。不添加回调函数callback即可。
```javascript
  describe('#indexOf()', function() {
    // pending test below
    it('should return -1 when the value is not present');
  });
});
```
```javascript
learn-mocha git:(master) ✗ mocha test/pending.js

  Array
    #indexOf()
      - should return -1 when the value is not present

  0 passing (5ms)
  1 pending
```
`it()`中没有回调函数，就会显示 0 passing 1 pending


### 独有测试(EXCLUSIVE TESTS)
可以通过添加`.only()`到`describe()`和`it()`函数中，来指定测试套件。测试套件和测试用例可以多次定义。如果在测试套件和测试用例同时都加上了`.only()`的时候，测试用例的执行是优先的。例如`suite 2`中，只执行了`test case 5`。
```javascript
const assert = require('assert')

describe('suite 1', function () {

  describe('sub suite 1', function () {

    it('test case 1', function () {
      assert(true)
    })

    it('test case 2', function () {
      assert(true)
    })
  })

  describe.only('sub suite 2', function () {

    it('test case 3', function () {
      assert(true)
    })
  })
})

describe.only('suite 2', function () {
  it('test case 4', function () {
    assert(true)
  })

  it.only('test case 5', function () {
    assert(true)
  })
})
```
```javascript
➜  learn-mocha git:(master) ✗ mocha test/exclusive.js

  suite 1
    sub suite 2
      ✓ test case 3

  suite 2
    ✓ test case 5

  2 passing (7ms) (5ms)
```

## 跳过测试(INCLUSIVE TESTS)
与 `.only()` 相反，通过给`describe()`和`it()`加上`.skip()`， `mocha` 会忽略这些测试套件或者测试用例。这些被跳过的测试都会被标记为`pending`。
```javascript
const assert = require('assert')

describe('suite 1', function () {

  describe('sub suite 1', function () {

    it('test case 1', function () {
      assert(true)
    })

    it('test case 2', function () {
      assert(true)
    })
  })

  describe.skip('sub suite 2', function () {

    it('test case 3', function () {
      assert(true)
    })
  })
})

describe.skip('suite 2', function () {
  it('test case 4', function () {
    assert(true)
  })

  it.skip('test case 5', function () {
    assert(true)
  })
})

let checkTestEnviroment = false
describe('suite 3', function () {
  it('test case 6', function () {
    if (checkTestEnviroment) { 
      assert(true)
    } else {
      this.skip()
    }
  })

  it('test case 7', function () {
    assert(true)
  })
})
```
从执行结果来看，`test case 3` 和 `suite 2` 和 `test case 6` 套件都进入了 `pending` 待定状态。
`test case 3`是因为测试用例`it.skip`。`suite 2`是因为测试套件`describe.skip`。`test case 6`是因为使用了`this.skip()`，模拟环境`checkTestEnviroment`有问题，需要跳过测试，最后跳过的测试会被标记为`pending`。
```javascript
➜  learn-mocha git:(master) ✗ mocha test/inclusive.js

  suite 1
    sub suite 1
      ✓ test case 1
      ✓ test case 2
    sub suite 2
      - test case 3

  suite 2
    - test case 4
    - test case 5

  suite 3
    - test case 6
    ✓ test case 7

  3 passing (9ms)
  4 pending
```
使用`.skip()`是比注释更好的能够不执行指定测试的方法。