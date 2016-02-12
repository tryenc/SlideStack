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

            $scope.slides = $scope.presentation.markdown.split('$$$');

            $scope.$watch('presentation.markdown', function (newVal, oldVal) {
                if (newVal === oldVal) return;
                $scope.slides = newVal.split('$$$');
            });

            $scope.save = function (presentation) {
                console.log("called")
                PresentationFactory.update(presentation)
                    .then(null, err => $scope.error = err);
            };

            $scope.display = {
                fullscreen: false,
                mode: 'edit'
            }

            $scope.themes = ["simple", "black", "sky", "solarized"];
        }
    });
});
