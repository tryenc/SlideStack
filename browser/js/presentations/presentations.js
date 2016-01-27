app.config(function ($stateProvider) {

    $stateProvider.state('editPres', {
        url: 'presentations/:id/edit',
        templateUrl: 'js/presentations/edit.html',
        controller: function () {

        }
    });
});
