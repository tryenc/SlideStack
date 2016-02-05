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
        templateUrl: 'js/users/profile/classes/profile.classes.html'
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

app.controller('UserCtrl', function ($scope, $state, user, PresentationFactory, ClassFactory, UserFactory) {

    $scope.user = user;

    //==========NEW PRESENTATION CONTROLS==========

    $scope.newPresMenu = false;

    $scope.createPresentation = function (newPres) {
        PresentationFactory.create(newPres, $scope.user._id)
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

    $scope.updateClasses = (user, classToUpdate) => {

        UserFactory.update(ClassFactory.updateClasses(user, classToUpdate));

    };

    // Filter for teacher/student dropdown showing only available classes
}).filter('NotEnrolled', () => {
    return (teacherArray, student) => {

        var teacherArrayCopy = teacherArray.slice();
        for (var i = 0; i < teacherArrayCopy.length; i++) {
            var currentTeacher = teacherArrayCopy[i];
            for (var j = 0; j < student.classes.length; j++) {
                var studentCurrent = student.classes[j];
                if (currentTeacher._id === studentCurrent._id) {
                    teacherArrayCopy.splice(i, 1);
                    i--;
                }
            }
        }
        return teacherArrayCopy;
    }
});
