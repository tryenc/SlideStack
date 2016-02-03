/**
 * Created by Jon on 2/2/16.
 */

app.controller('EditClassCtrl', ($scope, $uibModal) => {

    $scope.editUser = function (modalSize) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'editClassModal.html',
            controller: 'EditClassModalCtrl',
            size: modalSize,
            resolve: {
                singleClass() {
                    return $scope.singleClass;
                }
            }
        });
    };

    $scope.deleteUser = function(modalSize) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'deleteClassModal.html',
            controller: 'DeleteClassModalCtrl',
            size: modalSize,
            resolve: {
                singleClass() {
                    return $scope.singleClass;
                }
            }
        });
    }



}).controller('EditClassModalCtrl', function ($scope, $uibModalInstance, ClassFactory, singleClass, $state) {

    $scope.singleClass = singleClass;
    $scope.ok = () => {
        ClassFactory.update($scope.singleClass)
            .then( () => {
                $state.reload();
                $uibModalInstance.close();
            });
    };

    $scope.cancel = () => {
        $state.reload();
        $uibModalInstance.dismiss('cancel');
    };

}).controller('DeleteClassModalCtrl', function ($scope, $uibModalInstance, singleClass, ClassFactory, $state) {
    $scope.singleClass = singleClass;

    $scope.ok = function () {
        ClassFactory.delete(singleClass._id)
            .then( () => {
                $state.reload();
                $uibModalInstance.close();
            });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
