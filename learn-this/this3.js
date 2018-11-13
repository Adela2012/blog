var obj = {
  name: 'aa',
  foo: function () {
    return this.name
  }
}

var obj2 = {
  name: 'bb',
  foo: function () {
    var test = obj.foo
    return test()
  }
}

var name = 'cc'
console.log(obj2.foo()) // cc