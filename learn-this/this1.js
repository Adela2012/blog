var obj = {
  name: 'aa',
  foo: function () {
    return this.name
  }
}

var obj2 = {
  name: 'bb',
  foo: obj.foo
}

console.log(obj.foo()) // aa

console.log(obj2.foo()) // bb