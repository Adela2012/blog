var obj = {
  name: 'aa',
  foo: function () {
    console.log(this.name)
  },
  bee: () => {
    console.log(this.name)
  }
}

var name = 'bb'

obj.foo() // aa
obj.bee() // bb