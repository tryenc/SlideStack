/**
 * Created by Jon on 2/4/16.
 */
app.controller('ClassesTabCtrl', ($scope, ClassFactory) => {
    $scope.user.classes.forEach(singleClass => {

        // Loops through the list of classes and loads a
        // roster of students onto each class object
        ClassFactory.fetchStudentsByClass(singleClass._id)
            .then(classOfStudents => {
                singleClass.students = classOfStudents;
            });
    });
});
