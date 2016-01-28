app.config(function ($stateProvider) {
    $stateProvider.state('user', {
        url: '/users/:id',
        templateUrl: 'js/users/profile/profile.html',
        controller: 'UserCtrl',
        resolve: {
            user: function (User, $stateParams) {
                return User.fetchById($stateParams.id)
            }
        }
    });
});

app.controller('UserCtrl', function ($scope, $state, Presentation, user) {
    $scope.user = user;
    $scope.newPresMenu = false;
    $scope.createPresentation = function (newPres) {
        Presentation.create(newPres)
            .then(createdPres => $state.go('editPres', { id: createdPres._id }))
    }
});
