var name = 'bb'
function foo() {
  console.log(this.name)
}

(function() {
  'use strict'
  console.log(this) // undefined
  foo.call(this) // bb
  foo.call(undefined) // bb
  foo.call(null) // bb
})()