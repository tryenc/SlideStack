app.config(function ($stateProvider) {

    $stateProvider.state('editPres', {
        url: 'presentations/:id/edit',
        templateUrl: 'js/presentations/edit.html',
        controller: function ($scope, $stateParams) {
            console.log('from state params: ', $stateParams.id);
        }
    });
});
