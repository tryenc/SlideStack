/**
 * Created by Jon on 2/4/16.
 */
app.controller('ProfileClassesCtrl', ($scope, ClassFactory) => {
    $scope.user.classes.forEach(singleClass => {
        //console.log(singleClass);
        ClassFactory.fetchStudentsByClass(singleClass._id)
            .then(classOfStudents => {
                singleClass.students = classOfStudents;
            });
    });
});
