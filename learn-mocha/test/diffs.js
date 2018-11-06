const assert = require('assert')

describe('suite 1', function () {
  it('test case 1', function () {
    assert.equal(-1, [1, 2, 3].indexOf(4))
  })

  it('test case 2', function () {
    assert.equal('test', [1, 2, 3].toString())
  })
})