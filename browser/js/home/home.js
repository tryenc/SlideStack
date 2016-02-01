app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html'
    });
});

app.controller('TestCtrl', function ($scope) {
    $scope.code = {};
    $scope.seeCode = function () {
        console.log($scope.code);
    }
})
