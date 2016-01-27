app.config(function ($stateProvider) {
    $stateProvider.state('editPres', {
        url: '/edit',
        templateUrl: 'js/presentations/edit.html',
        controller: 'PresentationsCtrl'
    });
});

app.controller('PresentationsCtrl', function ($scope, Parser) {
    $scope.presentation = {
        markdown: '# This is parsed'
    };
});
