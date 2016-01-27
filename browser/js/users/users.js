app.config(function ($stateProvider) {
    $stateProvider.state('user', {
        url: '/users/:id',
        templateUrl: 'js/users/profile/profile.html',
        controller: 'UserCtrl'
    });
});

app.controller('UserCtrl', function ($scope, $state, Presentation) {
    $scope.newPresMenu = false;
    $scope.createPresentation = function (newPres) {
        Presentation.create(newPres)
            .then(createdPres => $state.go('editPres', { id: createdPres._id }))
    }

    $scope.user = {
        email: 'test@sam.com',
        role: 'teacher',
        isTeacher: true,
        classes: [
            {
                _id: '1',
                name: 'CS 101',
                description: 'It\'s cool'
            },
            {
                _id: '2',
                name: 'JavaScript',
                description: 'It\'s about JavaScript'
            }
        ]
    }
});
