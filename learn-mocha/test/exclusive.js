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