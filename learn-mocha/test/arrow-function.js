var assert = require('assert')
describe('my suite', () => {
  it('#1 my test with arrow function', () => {
    // should set the timeout of this test to 1000 ms; instead will fail
    this.timeout(1000);
    assert.ok(true);
  });
});

describe('my suite', () => {
  it('#2 my test without all arrow function', function(){
    // should set the timeout of this test to 1000 ms; instead will fail
    this.timeout(1000);
    assert.ok(true);
  });
});

describe('my suite', function() {
  it('#3 my test without all arrow function', () => {
    // should set the timeout of this test to 1000 ms; instead will fail
    this.timeout(1000);
    assert.ok(true);
  });
});

describe('my suite', function() {
  it('#4 my test without arrow function', function() {
    // should set the timeout of this test to 1000 ms; instead will fail
    this.timeout(1000);
    assert.ok(true);
  });
});

// my suite
// 1) #1 my test with arrow function

// my suite
// ✓ #2 my test without all arrow function

// my suite
// ✓ #3 my test without all arrow function

// my suite
// ✓ #4 my test without arrow function

// 3 passing (9ms)
//   1 failing

//   1) my suite
//        #1 my test with arrow function:
//      TypeError: this.timeout is not a function
//       at Context.it (test/arrow-fun.js:5:10)