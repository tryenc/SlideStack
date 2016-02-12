app.controller('classPresCtrl', function ($scope, $state, currClass, UserFactory, ClassFactory, PresentationFactory) {
    $scope.presentations = currClass.presentations;

    $scope.delete = function (presentation) {
        PresentationFactory.delete(presentation)
            .then($state.reload());
    };
});
