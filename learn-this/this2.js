var obj = {
  name: 'aa',
  foo: function() {
    return this.name
  }
}

var name = 'bb'
var test = obj.foo

console.log(obj.foo()) // aa

console.log(test()) // bb