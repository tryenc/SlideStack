app.config(function ($stateProvider) {

    $stateProvider.state('editPres', {
        url: '/presentations/:id/edit',
        templateUrl: 'js/presentations/edit.html',
        resolve: {
            presentation: function (Presentation, $stateParams) {
                return Presentation.fetchById($stateParams.id);
            }
        },
        controller: function ($scope, presentation, Presentation) {
            $scope.presentation = presentation;
            $scope.save = function (presentation) {
                Presentation.update(presentation)
                    .then(updatedPres => console.log(updatedPres))
                    .then(null, err => $scope.error = err);
            }
        }
    });
});
