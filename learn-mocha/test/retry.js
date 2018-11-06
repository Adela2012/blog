var assert = require('assert')
let i = 0;
describe('retries', function() {
  // Retry all tests in this suite up to 4 times
  this.retries(4);

  beforeEach(function () {
    // browser.get('http://www.yahoo.com');
    i++
    console.log('beforeEach'+i)
  });

  it('suite test 1', function () {
    // Specify this test to only retry up to 2 times
    // this.retries(3);
    i++
    // expect($('.foo').isDisplayed()).to.eventually.be.true;
    console.log(i +' test')
    assert(i == 7)
  });
  it('suite test 2', function () {
    // Specify this test to only retry up to 2 times
    this.retries(3);
    console.log(i +' test suite test 2')
    assert(i == 4)
  });
});