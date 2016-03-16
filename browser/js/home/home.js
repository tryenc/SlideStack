app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl'
    });
});

app.controller('HomeCtrl', function ($scope, $state, AuthService) {


    AuthService.getLoggedInUser()
    .then(function (user) {
        $scope.user = user;
    });
    $scope.goToProfile = function(user){
      $state.go('user', { id: user._id });
    }
})
