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