app.controller('PresentationTabCtrl', ($scope, PresentationFactory, $state) => {
    $scope.newPresMenu = false;

    $scope.createPresentation = function (newPres) {
        PresentationFactory.create(newPres, $scope.user._id)
            .then(createdPres => $state.go('editPres', { id: createdPres._id }))
    };
});

