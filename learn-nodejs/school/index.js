var addclass = require('./class')

exports.add = function(classes){
    classes.forEach(function(item){
        addclass.add(item.teacherName, item.students)
    })
}
