/**
 * Created by Jon on 2/4/16.
 */
app.controller('ClassAccordionCtrl', $scope => {

    $scope.classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4']
    $scope.students = ['Student 1', 'Student 2', 'Student 3'];
    $scope.presentations = ['Presentation 1', 'Presentation 2', 'Presentation 3'];

    $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
    };
});
