var assert = require('assert')
describe('something slow', function() {
  this.slow(1);

  it('should take long enough for me to go make a sandwich', function() {
      assert(true)
  });
});