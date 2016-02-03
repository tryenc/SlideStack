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

    $scope.makeNewPresentation = () => {
        PresentationFactory.create($scope.newPresentation)
            .then( () => {
                $state.reload();
                $uibModalInstance.close();
            });
    };

    $scope.cancel = () => {
        $uibModalInstance.dismiss('cancel');
    };
});

