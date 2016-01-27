app.config(function ($stateProvider) {
    $stateProvider.state('markedTest', {
        url: '/marked-test',
        templateUrl: 'js/marked_test/marked_test.html',
        controller: function ($scope) {
            $scope.text = '';
        }
    })
})
