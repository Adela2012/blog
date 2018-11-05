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