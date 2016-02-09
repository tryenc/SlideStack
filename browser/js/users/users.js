app.config(function ($stateProvider, $urlRouterProvider) {

    // THIS BREAKS WHEN GIVEN A BROKEN USER ID
    //$urlRouterProvider.when('/users/:id', '/users/:id/classes');
    $stateProvider
    .state('user', {
        url: '/users/:id',
        //abstract: true,
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
        controller: 'ClassesTabCtrl'
    })
    .state('user.presentations', {
        url: '/presentations',
        templateUrl: 'js/users/profile/presentations/presentations.html',
        controller: 'PresentationTabCtrl'
    })
    .state('user.students', {
        url: '/students',
        templateUrl: 'js/users/profile/students/students.html',
        controller: 'StudentsTabCtrl'
    });
});
