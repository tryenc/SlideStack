app.directive('login', function () {
    return {
        restric: 'E',
        templateUrl: 'js/common/directives/login/login.html',
        controller: function($scope, AuthService, $state){
            $scope.login = {};
            $scope.error = null;
            $scope.sendLogin = function (loginInfo) {
                $scope.error = null;
                AuthService.login(loginInfo).then(function (user) {
                    $state.go('user', { id: user._id });
                }).catch(function () {
                    $scope.error = 'Invalid login credentials.';
                });
            };
        }
    }
});
