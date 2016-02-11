app.controller('PresentationTabCtrl', ($scope, PresentationFactory, $state, user, presentations) => {
    $scope.newPresMenu = false;
    $scope.presentations = presentations;

    $scope.createPresentation = function (newPres) {
        newPres.owner = user._id;
        PresentationFactory.create(newPres)
            .then(createdPres => $state.go('editPres', { id: createdPres._id }))
    };
});
