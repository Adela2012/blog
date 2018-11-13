if (val === undefined) {
  alert(1) 
}
// Uncaught ReferenceError: val is not defined

if (val === undefined) {
  val = 1
  alert(2)
}
// Uncaught ReferenceError: val is not defined


if (val === undefined) {
  var val = 1
  alert(3)
}
// 3