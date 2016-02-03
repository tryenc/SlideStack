/**
 * Created by Jon on 1/29/16.
 */
app.controller('ModalCtrl', ($scope, $uibModal) => {

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



}).controller('EditUserModalCtrl', function ($scope, $uibModalInstance, user, UserFactory, ClassFactory, $state) {
    $scope.user = user;

    $scope.updateClasses = ClassFactory.updateClasses;

    // All Classes
    ClassFactory.fetchAll()
        .then(allClasses => {
            $scope.classes = allClasses;
        });

    $scope.hasClass = (singleClass) => {
        return user.classes.some(userClass => {
            return userClass._id.toString() === singleClass._id.toString();
        });
    };

    $scope.ok = () => {
        UserFactory.update($scope.user)
            .then( () => {
                $uibModalInstance.close();
            });
    };

    $scope.cancel = () => {
        $state.reload();
        $uibModalInstance.dismiss('cancel');
    };

    $scope.addClass = () => {
        ClassFactory.create()
            .then(newClass => {
                user.classes.push(newClass);
            });
    };

}).controller('DeleteUserModalCtrl', function ($scope, $uibModalInstance, user, UserFactory, $state) {
    $scope.user = user;

    $scope.ok = function () {
        UserFactory.delete(user._id)
            .then( () => {
                $state.reload();
            });
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
