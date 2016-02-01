/**
 * Created by Jon on 1/29/16.
 */
app.directive('userPanel', () => {
   return {
       restrict: 'E',
       scope: {
           users: '=',
           type: '@'
       },
       templateUrl: 'js/admin/directives/userPanel/userPanel.html',
       controller: 'UserPanelCtrl'
   };
});

app.controller('UserPanelCtrl', ($scope, $uibModal) => {

    $scope.addUser = function(modalSize) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'addModal.html',
            controller: 'AddUserModalCtrl',
            size: modalSize,
            resolve: {
                users() {
                    return $scope.users;
                }
            }
        });
    }
}).controller('AddUserModalCtrl', ($scope, $uibModalInstance, UserFactory, users) => {
    $scope.newUser = {
        role: $scope.type
    };

    $scope.makeNewUser = () => {
        UserFactory.create($scope.newUser)
            .then( (userFromDb) => {
                users.push(userFromDb);
            });
        $uibModalInstance.close();
    };

    $scope.cancel = () => {
        $uibModalInstance.dismiss('cancel');
    };
});

