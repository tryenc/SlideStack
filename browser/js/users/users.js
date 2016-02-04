app.config(function ($stateProvider) {
    $stateProvider
    .state('user', {
        url: '/users/:id',
        templateUrl: 'js/users/profile/profile.html',
        controller: 'UserCtrl',
        resolve: {
            user: function (UserFactory, $stateParams) {
                return UserFactory.fetchById($stateParams.id);
            }
        }
    })
    .state('user.classes', {
        url: '/classes',
        templateUrl: 'js/users/profile/profile.classes.html'
    })
    .state('user.presentations', {
        url: '/presentations',
        templateUrl: 'js/users/profile/profile.presentations.html'

    })
    .state('user.students', {
        url: '/students',
        templateUrl: 'js/users/profile/profile.students.html'
    });
});

app.controller('UserCtrl', function ($scope, $state, user, PresentationFactory, UserFactory, $log) {

    $scope.user = user;

    //==========NEW PRESENTATION CONTROLS==========

    $scope.newPresMenu = false;

    $scope.createPresentation = function (newPres) {
        PresentationFactory.create(newPres)
            .then(createdPres => $state.go('editPres', { id: createdPres._id }))
    };

    $scope.editState = function(id){
      $state.go('editPres', { id: id });
    };

    $scope.viewState = function(id){
      $state.go('viewPres', { id: id });
    };
    console.log("user", user);
    $scope.user = user;

    //==========STUDENT TAB CONTROLS==========

    $scope.toggleDropdown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
    };

    $scope.removeFromClass = function (student, classToRemoveFrom) {
        //filter class from student classes

        student.classes = student.classes.filter(function(studentClass){
            return (studentClass !== classToRemoveFrom);
        });

        UserFactory.update(student)
            .then(student => console.log("succesfully removed " + student.name + " from " + classToRemoveFrom));
    };

    $scope.addToClass = function (student, classToAddTo) {

        student.classes.push(classToAddTo);

        UserFactory.update(student)
            .then(student => console.log("succesfully added " + student.name + " to " + classToAddTo));
    }

});
