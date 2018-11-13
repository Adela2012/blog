var obj = {
  name: 'aa',
  foo: function () {
    console.log(this.name)
  }
}

var obj2 = {
  name: 'bb'
}

var name = 'cc'

obj.foo() // aa
obj.foo.apply() // cc
obj.foo.apply(obj2) // bb
