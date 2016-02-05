app.controller('ClassesPanelCtrl', ($scope, $uibModal) => {

    $scope.addClass = function(modalSize) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'addClassModal.html',
            controller: 'AddClassModalCtrl',
            size: modalSize
        });
    }
}).controller('AddClassModalCtrl', ($scope, $uibModalInstance, ClassFactory, $state) => {

    $scope.newClass = {
        name: null,
        description: null
    };

    // Adds or removes the class depending on if the class is currently in the users class array
    $scope.updateClasses = ClassFactory.updateClasses;

    $scope.makeNewClass = () => {
        ClassFactory.create($scope.newClass)
            .then( () => {
                $state.reload();
                $uibModalInstance.close();
            });
    };

    $scope.cancel = () => {
        $uibModalInstance.dismiss('cancel');
    };
});

