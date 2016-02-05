app.config(function ($stateProvider) {
    $stateProvider
    .state('user', {
        url: '/users/:id',
        templateUrl: 'js/users/profile/profile.html',
        controller: ($scope, user) => {
            $scope.user = user;
        },
        resolve: {
            user: function (UserFactory, $stateParams) {
                return UserFactory.fetchById($stateParams.id);
            }
        }
    })
    .state('user.classes', {
        url: '/classes',
        templateUrl: 'js/users/profile/classes/classes.html',
        controller: 'ProfileClassesCtrl'
    })
    .state('user.presentations', {
        url: '/presentations',
        templateUrl: 'js/users/profile/presentations/presentations.html',
        controller: 'PresentationTabCtrl'

    })
    .state('user.students', {
        url: '/students',
        templateUrl: 'js/users/profile/students/profile.students.html',
        controller: 'StudentsTabCtrl'
    });
});
