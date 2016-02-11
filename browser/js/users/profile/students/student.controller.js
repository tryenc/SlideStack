/**
 * Created by Jon on 2/5/16.
 */
//
app.controller('StudentsTabCtrl', ($scope, UserFactory, ClassFactory, classes) => {
  $scope.classes = classes;

})
//
//// Filter for teacher/student dropdown showing only available classes
//.filter('NotEnrolled', () => {
//    return (teacherArray, student) => {
//
//        var teacherArrayCopy = teacherArray.slice();
//        for (var i = 0; i < teacherArrayCopy.length; i++) {
//            var currentTeacher = teacherArrayCopy[i];
//            for (var j = 0; j < student.classes.length; j++) {
//                var studentCurrent = student.classes[j];
//                if (currentTeacher._id === studentCurrent._id) {
//                    teacherArrayCopy.splice(i, 1);
//                    i--;
//                }
//            }
//        }
//        return teacherArrayCopy;
//    }
//});
