app.controller('PresentationTabCtrl', ($scope, PresentationFactory, $state) => {
    $scope.newPresMenu = false;

    $scope.createPresentation = function (newPres) {
        PresentationFactory.create(newPres, $scope.user._id)
            .then(createdPres => $state.go('editPres', { id: createdPres._id }))
    };

    $scope.editState = function(id){
        $state.go('editPres', { id: id });
    };

    $scope.viewState = function(id){
        $state.go('viewPres', { id: id });
    };
});

