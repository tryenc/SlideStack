app.config(function ($stateProvider) {

    $stateProvider.state('teacherPres', {
        url: '/presentations/:id/teacher',
        templateUrl: 'js/presentations/teacherPresentation.html',
        resolve: {
            presentation: function (Presentation, $stateParams) {
                return Presentation.fetchById($stateParams.id);
            }
        },
        controller: function ($scope, presentation, Presentation) {

            $scope.presentation = presentation;

            $scope.slides = $scope.presentation.markdown.split('$$$');

        }
    });
});
