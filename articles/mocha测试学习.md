# 使用mocha测试

学习了<a href="https://mochajs.org">MOCHA官网</a>的示例，将学习成果记录一下。
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
 `test case 3` 是因为测试用例 `it.skip` 。 `suite 2` 是因为测试套件 `describe.skip` 。 `test case 6` 是因为使用了 `this.skip()` ，模拟环境 `checkTestEnviroment` 有问题，需要跳过测试，最后跳过的测试会被标记为 `pending` 。
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
使用 `.skip()` 是比注释更好的能够不执行指定测试的方法。

## 重跑测试（RETRY TESTS）
可以选择 `this.retries(number)` 来重新执行失败的测试到一定的次数。这个函数是为了处理资源不容易被模拟和截断的 `end-to-end` 测试而设计的，所以不推荐在单元测试里使用。

`this.retries(number)` 作用在 `beforeEach/afterEach` hooks中，但是不作用在 `before/after` hooks中。
```javascript
describe('retries', function() {
  // Retry all tests in this suite up to 4 times
  this.retries(4);

  beforeEach(function () {
    browser.get('http://www.yahoo.com');
  });

  it('should succeed on the 3rd try', function () {
    // Specify this test to only retry up to 2 times
    this.retries(2);
    expect($('.foo').isDisplayed()).to.eventually.be.true;
  });
});
```

## 动态生成测试（DYNAMICALLY GENERATING TESTS）
`mocha` 使用 `Function.prototype.call` 和函数表达式来定义测试套件和测试用例，这样能简单动态的生成测试用例。不需要特别的语法，只需 `javascirpt` 就能实现类似参数化测试的功能。
```javascript
var assert = require('chai').assert;

function add() {
  return Array.prototype.slice.call(arguments).reduce(function(prev, curr) {
    return prev + curr;
  }, 0);
}

describe('add()', function() {
  var tests = [
    {args: [1, 2],       expected: 3},
    {args: [1, 2, 3],    expected: 6},
    {args: [1, 2, 3, 4], expected: 10}
  ];

  tests.forEach(function(test) {
    it('correctly adds ' + test.args.length + ' args', function() {
      var res = add.apply(null, test.args);
      assert.equal(res, test.expected);
    });
  });
});
```
```javascript
➜  learn-mocha git:(master) ✗ mocha test/dynamically-generate.js

  add()
    ✓ correctly adds 2 args
    ✓ correctly adds 3 args
    ✓ correctly adds 4 args

  3 passing (11ms)
```

## 测试持续时间（TEST DURATION）
在许多测试报告里会显示测试时间，当测试时间过长，会被特殊标记出来。可以使用 `slow()` 方法，来定义被认为 `slow` 的测试时间长度。
```javascript
describe('something slow', function() {
  this.slow(10000);

  it('should take long enough for me to go make a sandwich', function() {
    // ...
  });
});
```
## 测试超时（TIMEOUTS）
### 套件级别（SUITE-LEVEL）
在套件级别`describe()`定义`this.timeout(numer)`，将会被运用于该套件下的所有嵌套套件和测试用例。
```javascript
describe('a suite of tests', function() {
  this.timeout(500);

  it('should take less than 500ms', function(done){
    setTimeout(done, 300);
  });

  it('should take less than 500ms as well', function(done){
    setTimeout(done, 250);
  });
})
```
上面的代码定义了超时时间是500ms，然后测试执行时间都没有超过，所以测试可以通过
```javascript
➜  learn-mocha git:(master) ✗ mocha test/timeouts/suite-level.js

  a suite of tests
    ✓ should take less than 500ms (306ms)
    ✓ should take less than 500ms as well (251ms)

  2 passing (564ms)
```
如果把时间从`this.timeout(500)`改成` this.timeout(300)`，，就会的到超时错误
```javascript
➜  learn-mocha git:(master) ✗ mocha test/timeouts/suite-level.js

  a suite of tests
    1) should take less than 300ms
    ✓ should take less than300ms as well (253ms)

  1 passing (569ms)
  1 failing

  1) a suite of tests
       should take less than 300ms:
     Error: Timeout of 300ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/blog/learn-mocha/test/timeouts/suite-level.js)
```
### 用例级别
在测试级别`it()`中使用方法也差不多。在`it()`中使用`this.timeout(0)`可以重载/消除测试套件定义的超时时间。
```javascript
it('should take less than 500ms', function(done){
  this.timeout(500);
  setTimeout(done, 300);
});
```
```javascript
➜  learn-mocha git:(master) ✗ mocha test/timeouts/test-level.js

  ✓ should take less than 500ms (302ms)

  1 passing (308ms)
```

### 钩子级别（HOOK-LEVEL）
在钩子级别`HOOK-LEVEL`中使用方法也差不多。使用`this.timeout(0)`也可以s禁用`hook`的超时。
```javascript
describe('a suite of tests', function() {
  beforeEach(function(done) {
    this.timeout(3000); // A very long environment setup.
    setTimeout(done, 2500);
  });

  it('it', function(done) {
    setTimeout(done, 20);
  })
});
```
```javascript
➜  learn-mocha git:(master) ✗ mocha test/timeouts/hook-level.js

  a suite of tests
    ✓ it

  1 passing (3s)
```

## DIFFS
`mocha`支持来自断言库的有`err.expected` 和 `err.actual` 实际属性的任何`AssertionErrors`错误 。`mocha`将自动显示预期和实际之间的差异。下面是一个“字符串”差异的例子：
```javascript
const assert = require('assert')

describe('suite 1', function () {
  it('test case 1', function () {
    assert.equal(-1, [1, 2, 3].indexOf(4))
  })

  it('test case 2', function () {
    assert.equal('test', [1, 2, 3].toString())
  })
})
```
```javascript
➜  learn-mocha git:(master) ✗ mocha test/diffs.js

  suite 1
    ✓ test case 1
    1) test case 2

  1 passing (9ms)
  1 failing

  1) suite 1
       test case 2:

      AssertionError [ERR_ASSERTION]: 'test' == '1,2,3'
      + expected - actual

      -test
      +1,2,3

      at Context.<anonymous> (test/diffs.js:9:12)
```

## 使用命令（USAGE）
```
➜  learn-mocha git:(master) ✗ mocha --help

  Usage: mocha [debug] [options] [files]

  Options:

    -V, --version                           output the version number
    -A, --async-only                        force all tests to take a callback (async) or return a promise
    -c, --colors                            force enabling of colors
    -C, --no-colors                         force disabling of colors
    -G, --growl                             enable growl notification support
    -O, --reporter-options <k=v,k2=v2,...>  reporter-specific options
    -R, --reporter <name>                   specify the reporter to use (default: spec)
    -S, --sort                              sort test files
    -b, --bail                              bail after first test failure
    -d, --debug                             enable node's debugger, synonym for node --debug
    -g, --grep <pattern>                    only run tests matching <pattern>
    -f, --fgrep <string>                    only run tests containing <string>
    -gc, --expose-gc                        expose gc extension
    -i, --invert                            inverts --grep and --fgrep matches
    -r, --require <name>                    require the given module
    -s, --slow <ms>                         "slow" test threshold in milliseconds [75]
    -t, --timeout <ms>                      set test-case timeout in milliseconds [2000]
    -u, --ui <name>                         specify user-interface (bdd|tdd|qunit|exports) (default: bdd)
    -w, --watch                             watch files for changes
    --check-leaks                           check for global variable leaks
    --full-trace                            display the full stack trace
    --compilers <ext>:<module>,...          use the given module(s) to compile files (default: )
    --debug-brk                             enable node's debugger breaking on the first line
    --globals <names>                       allow the given comma-delimited global [names] (default: )
    --es_staging                            enable all staged features
    --harmony<_classes,_generators,...>     all node --harmony* flags are available
    --preserve-symlinks                     Instructs the module loader to preserve symbolic links whenresolving and caching modules
    --icu-data-dir                          include ICU data
    --inline-diffs                          display actual/expected differences inline within each string
    --no-diff                               do not show a diff on failure
    --inspect                               activate devtools in chrome
    --inspect-brk                           activate devtools in chrome and break on the first line
    --interfaces                            display available interfaces
    --no-deprecation                        silence deprecation warnings
    --exit                                  force shutdown of the event loop after test run: mocha willcall process.exit
    --no-timeouts                           disables timeouts, given implicitly with --debug
    --no-warnings                           silence all node process warnings
    --opts <path>                           specify opts path (default: test/mocha.opts)
    --perf-basic-prof                       enable perf linux profiler (basic support)
    --napi-modules                          enable experimental NAPI modules
    --prof                                  log statistical profiling information
    --log-timer-events                      Time events including external callbacks
    --recursive                             include sub directories
    --reporters                             display available reporters
    --retries <times>                       set numbers of time to retry a failed test case
    --throw-deprecation                     throw an exception anytime a deprecated function is used
    --trace                                 trace function calls
    --trace-deprecation                     show stack traces on deprecations
    --trace-warnings                        show stack traces on node process warnings
    --use_strict                            enforce strict mode
    --watch-extensions <ext>,...            additional extensions to monitor with --watch (default: js)
    --delay                                 wait for async suite definition
    --allow-uncaught                        enable uncaught errors to propagate
    --forbid-only                           causes test marked with only to fail the suite
    --forbid-pending                        causes pending tests and test marked with skip to fail the suite
    --file <file>                           include a file to be ran during the suite (default: )
    --exclude <file>                        a file or glob pattern to ignore (default: )
    -h, --help                              output usage information

  Commands:

    init <path>                             initialize a client-side mocha setup at <path>
```

解释几个常用的选项
- `-V, --version` 版本号
- `-b, --bail` 只对第一个抛出异常处理  
- `-d, --debug` 开启node的debug模式，对标记了debugger语句的代码进行调试
- `-t, --timeout <ms> `指定测试用例的超时时间。默认是2000毫秒。
- `-w, --watch` 用来监测测试文件的变化 
- `-s, --slow <ms> ` 指定测试用例执行时间为慢的阈值。默认是75毫秒。

## 接口（INTERFACES）
`mocha` 的接口系统允许开发人员选择自己的DSL风格。`mocha` 拥有 `BDD`, `TDD`, `Exports`, `QUnit` 和 `Require` 风格的接口。
### BDD
`BDD` 接口 提供 `describe()`, `context()`, `it()`, `specify()`, `before()`, `after()`, `beforeEach()`, `afterEach()`。
`describe()` = `context()`, `it()` = `specify()`
前面的例子都是用的 BDD 接口。
```javascript
describe('Array', function() {
    before(function() {
      // ...
    });

    describe('#indexOf()', function() {
      context('when not present', function() {
        it('should not throw an error', function() {
          (function() {
            [1,2,3].indexOf(4);
          }).should.not.throw();
        });
        it('should return -1', function() {
          [1,2,3].indexOf(4).should.equal(-1);
        });
      });
      context('when present', function() {
        it('should return the index where the element first appears in the array', function() {
          [1,2,3].indexOf(3).should.equal(2);
        });
      });
    });
  });
```
### TDD
提供 `suite()`, `test()`, `suiteSetup()`, `suiteTeardown()`, `setup()`, `teardown()`
```javascript
suite('Array', function() {
  setup(function() {
    // ...
  });

  suite('#indexOf()', function() {
    test('should return -1 when not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
```
### EXPORTS
类似于 `mocha` 前身 `expresso`。关键字 `before`, `after`, `beforeEach`, `afterEach` 是`special-cased`。 测试套件是对象，函数是测试用例。
```javascript
module.exports = {
  before: function() {
    // ...
  },

  'Array': {
    '#indexOf()': {
      'should return -1 when not present': function() {
        [1,2,3].indexOf(4).should.equal(-1);
      }
    }
  }
};
```

### QUNIT
类似`QUnit`。测试套件单独定义在测试用例之前，像TDD一样支持suite()和test()，像BDD一样支持hooks。同样包括`before()`, `after()`, `beforeEach()`, `afterEach()`。
```javascript
unction ok(expr, msg) {
  if (!expr) throw new Error(msg);
}

suite('Array');

test('#length', function() {
  var arr = [1,2,3];
  ok(arr.length == 3);
});

test('#indexOf()', function() {
  var arr = [1,2,3];
  ok(arr.indexOf(1) == 0);
  ok(arr.indexOf(2) == 1);
  ok(arr.indexOf(3) == 2);
});

suite('String');

test('#length', function() {
  ok('foo'.length == 3);
});
```

### REQUIRE
允许通过`require()`来导入`describe()`和`it()`的方法。可以自己定义别名。注意：只能用`mocha`命令执行，`node`不行。
```javascript
var testCase = require('mocha').describe;
var pre = require('mocha').before;
var assertions = require('mocha').it;
var assert = require('chai').assert;

testCase('Array', function() {
  pre(function() {
    // ...
  });

  testCase('#indexOf()', function() {
    assertions('should return -1 when not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});
```

## 报告（REPORTERS）
`Mocha`提供了多种console端报告模式
- `mocha --reporter spec` 这是默认模式。是一个按照测试套件和用例分层次的视图
- `mocha --reporter dot` 显示一个由点组成的矩阵。点的颜色代表着不同的测试结果
- `mocha --reporter nyan` 显示了一个图。。。。。
- `mocha --reporter tap` 基于Test Anything Protocol (TAP)
- `mocha --reporter landing` 模拟飞机降落
- `mocha --reporter list` 以列表的形式显示每一个测试用例
- `mocha --reporter progress` 以进度条的形式显示
- `mocha --reporter json` 输出json格式的报告
- `mocha --reporter min` 只输出summary。可以与mocha -w一起使用
- `mocha --reporter doc` 输出HTML格式的报告
- `mocha --reporter markdown` 输出HTML格式的报告

<br>
<br>
<br>

-----------------
参照链接：
- <a href="https://mochajs.org">https://mochajs.org</a> MOCHA官网
- <a href="https://www.jianshu.com/p/3927515bf2df">https://www.jianshu.com/p/3927515bf2df</a> 做测试的DanteYu