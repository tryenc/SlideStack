app.controller('PresentationPanelCtrl', ($scope, $uibModal) => {

    $scope.addPresentation = function(modalSize) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'addPresentationModal.html',
            controller: 'AddPresentationModalCtrl',
            size: modalSize,
            resolve: {
                classes() {
                    return $scope.classes;
                }
            }
        });
    }
}).controller('AddPresentationModalCtrl', ($scope, $uibModalInstance, PresentationFactory, classes, $state) => {

    $scope.newPresentation = {
        name: 'sampleName',
        class: ''
    };

    $scope.classes = classes;

    // Adds or removes the class depending on if the class is currently in the users class array
    $scope.updateClass = PresentationFactory.updatePresentationClass;

    $scope.makeNewPresentation = () => {
        PresentationFactory.create($scope.newPresentation)
            .then(presFromDb => {
                console.log("presFromDB",presFromDb);
                $state.reload();
                $uibModalInstance.close();
            });
    };

    $scope.cancel = () => {
        $uibModalInstance.dismiss('cancel');
    };
});

