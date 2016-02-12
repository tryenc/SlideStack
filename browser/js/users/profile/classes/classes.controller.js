/**
 * Created by Jon on 2/4/16.
 */
app.controller('ClassesTabCtrl', ($scope, $state, user, ClassFactory, classes) => {
    // $scope.user.classes.forEach(singleClass => {
    //
    //     // Loops through the list of classes and loads a
    //     // roster of students onto each class object
    //     ClassFactory.fetchStudentsByClass(singleClass._id)
    //         .then(classOfStudents => {
    //             singleClass.students = classOfStudents;
    //         });
    // });

    $scope.newClassMenu = false;
    $scope.classes = classes;

    $scope.createClass = function (newClass) {
        newClass.teacher = user._id;
        ClassFactory.create(newClass)
            .then($state.reload());
    };
});
