var name = 'bb'

var obj = {
  name: 'aa',
  foo: function() {
    eval('console.log(this.name)')
  },
  bee: function () {
    eval.call(window, 'console.log(this.name)')
  }
}

obj.foo() // aa
obj.bee() // bb