var obj = {
  name: 'aa',
  fn: function () {
    console.log(this.name)
  },
  foo: function() {
    (function (cb) {
      cb()
    })(this.fn)
  }
}

var name = 'bb'
obj.foo() // bb