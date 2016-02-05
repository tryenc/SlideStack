app.config(function ($stateProvider) {

    // Teachers
    $stateProvider.state('editPres', {
        url: '/presentations/:id/edit',
        templateUrl: 'js/presentations/teacherEdit/editPresentation.html',
        resolve: {
            presentation: function (PresentationFactory, $stateParams) {
                return PresentationFactory.fetchById($stateParams.id);
            }
        },
        controller: function ($scope, presentation, PresentationFactory) {
            $scope.presentation = presentation;

            // $scope.$watch('presentation.markdown', function (newVal, oldVal) {
            //     if (newVal === oldVal) return;
            //     console.log(newVal);
            //     // $scope.slides = newVal.split('$$$');
            // });

            $scope.save = function (presentation) {
                PresentationFactory.update(presentation)
                    .then(updatedPres => console.log(updatedPres))
                    .then(null, err => $scope.error = err);
            }

            $scope.display = {
                fullscreen: false,
                mode: 'edit'
            }
        }
    });
});
