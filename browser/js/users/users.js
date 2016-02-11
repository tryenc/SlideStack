app.config(function ($stateProvider, $urlRouterProvider) {

    // THIS BREAKS WHEN GIVEN A BROKEN USER ID
    $urlRouterProvider.when('/users/:id', '/users/:id/presentations');
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
    .state('user.presentations', {
        url: '/presentations',
        templateUrl: 'js/users/profile/presentations/presentations.html',
        controller: 'PresentationTabCtrl',
        resolve: {
            presentations: function (PresentationFactory, user) {
                return PresentationFactory.fetchByOwner(user._id);
            }
        }
    })
    .state('user.teacherClasses', {
        url: '/teacherClasses',
        templateUrl: 'js/users/profile/classes/classes.html',
        controller: 'ClassesTabCtrl',
        resolve: {
            classes: function (ClassFactory, user) {
                return ClassFactory.fetchByTeacher(user._id);
            }
        }
    })
    .state('user.studentClasses', {
        url: '/studentClasses',
        templateUrl: 'js/users/profile/students/student.html',
        controller: 'StudentsTabCtrl',
        resolve: {
            classes: function(ClassFactory, user) {
                return ClassFactory.fetchByStudent(user._id);
            }
        }
    });
});
