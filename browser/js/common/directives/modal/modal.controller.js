/**
 * Created by Jon on 1/29/16.
 */
app.controller('ModalCtrl', ($scope, $uibModal, $log) => {

    $scope.editUser = function (modalSize) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'editModal.html',
            controller: 'ModalInstanceCtrl',
            size: modalSize,
            resolve: {
                user : function() {
                    return $scope.user;
                }
            }
        });
    };

    $scope.deleteUser = function(modalSize) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'deleteModal.html',
            controller: 'ModalInstanceCtrl',
            size: modalSize,
            resolve: {
                user : function() {
                    return $scope.user;
                }
            }
        });
    }

}).controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, user, UserFactory) {
    $scope.user = user;

    $scope.ok = function (user) {
        if (user) {
            UserFactory.delete(user._id);
        }
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
