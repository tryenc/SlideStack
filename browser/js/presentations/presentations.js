app.config(function ($stateProvider) {

    $stateProvider.state('editPres', {
        url: '/presentations/:id/edit',
        templateUrl: 'js/presentations/edit.html',
        resolve: {
            presentation: function (PresentationFactory, $stateParams) {
                console.log('in the resolve block');
                return PresentationFactory.fetchById($stateParams.id);
            }
        },
        controller: function ($scope, presentation, PresentationFactory) {

            $scope.presentation = presentation;

            $scope.slides = $scope.presentation.markdown.split('$$$');

            $scope.$watch('presentation.markdown', function (newVal, oldVal) {
                if (newVal === oldVal) return;
                $scope.slides = newVal.split('$$$');
            });

            $scope.save = function (presentation) {
                PresentationFactory.update(presentation)
                    .then(updatedPres => console.log(updatedPres))
                    .then(null, err => $scope.error = err);
            }

            $scope.display = {
                fullscreen: false
            }
        }
    });
});
