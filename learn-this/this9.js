foo() // TypeError: foo is not a function
bar() // ReferenceError: bar is not defined

var foo = function bar () {
  console.log('bb')
}