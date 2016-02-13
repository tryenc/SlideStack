app.controller('classPresCtrl', function ($scope, $state, currClass, UserFactory, ClassFactory, PresentationFactory) {
    $scope.presentations = currClass.presentations;
    console.log(currClass);

    $scope.delete = function (presentation) {
        PresentationFactory.delete(presentation)
            .then($state.reload());
    };

    $scope.createPresentation = function (newPres) {
        newPres.owner = $scope.loggedInUser._id;

        // brackets because class is a reserved word
        newPres['class'] = currClass.foundClass._id;
        PresentationFactory.create(newPres)
            .then(createdPres => $state.go('editPres', { id: createdPres._id }))
    };

});
