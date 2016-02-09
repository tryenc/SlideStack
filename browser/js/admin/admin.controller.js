app.controller('AdminCtrl', ($scope, presentations, users, classes) => {
    $scope.teachers = users.filter(user => user.isTeacher);

    $scope.students = users.filter(user => user.isStudent);

    $scope.classes = classes;

    $scope.presentations = presentations;

    $scope.items = [
        { label: 'Users', state: 'admin.users' },
        { label: 'Presentations', state: 'admin.presentations' },
        { label: 'Classes', state: 'admin.classes' }
    ];
});
