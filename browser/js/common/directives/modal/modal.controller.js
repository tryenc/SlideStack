/**
 * Created by Jon on 1/29/16.
 */
app.controller('ModalCtrl', ($scope, $uibModal, $log) => {

    $scope.editUser = function (modalSize) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'editModal.html',
            controller: 'EditUserModalCtrl',
            size: modalSize,
            resolve: {
                user() {
                    return $scope.user;
                }
            }
        });
    };

    $scope.deleteUser = function(modalSize) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'deleteModal.html',
            controller: 'DeleteUserModalCtrl',
            size: modalSize,
            resolve: {
                user() {
                    return $scope.user;
                }
            }
        });
    }

}).controller('EditUserModalCtrl', function ($scope, $uibModalInstance, user, UserFactory) {
    $scope.user = user;

    $scope.ok = (user) => {
        $uibModalInstance.close();
    };

    $scope.cancel = () => {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.addClass = () => {
        document.getElementsByClassName("modal-body").append('<input type="text">');
    };

}).controller('DeleteUserModalCtrl', function ($scope, $uibModalInstance, user, UserFactory, $state) {
    $scope.user = user;

    $scope.ok = function (user) {
        if (user) {

            UserFactory.delete(user._id).then( () => {
                $state.reload();
            });
        }
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});

