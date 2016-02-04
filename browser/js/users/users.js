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
    })
});

app.controller('UserCtrl', function ($scope, $state, user, PresentationFactory) {
    $scope.newPresMenu = false;
    $scope.createPresentation = function (newPres) {
        PresentationFactory.create(newPres)
            .then(createdPres => $state.go('editPres', { id: createdPres._id }))
    };
    console.log("user", user);
    $scope.user = user;
});
