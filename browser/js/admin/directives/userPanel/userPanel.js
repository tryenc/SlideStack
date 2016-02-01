/**
 * Created by Jon on 1/29/16.
 */
app.directive('userPanel', (ClassFactory) => {
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
                },
                type() {
                    return $scope.type;
                }
            }
        });
    }
}).controller('AddUserModalCtrl', ($scope, $uibModalInstance, ClassFactory, UserFactory, users, type, $state) => {

    if (type === 'Teachers') {
        $scope.newUser = {
            role: 'teacher',
            isTeacher: true,
            classes: []
        };
    }
    else {
        $scope.newUser = {
            role: 'student',
            isStudent: true,
            classes: []
        };
    }

    // Gets all classes to populate
    ClassFactory.fetchAll()
        .then(allClasses => {
            $scope.classes = allClasses;
        });

    // Adds or removes the class depending on if the class is currently in the users class array
    $scope.updateClasses = ClassFactory.updateClasses;

    $scope.makeNewUser = () => {
        UserFactory.create($scope.newUser)
            .then(userFromDb => {
                $state.reload();
            });
        $uibModalInstance.close();
    };

    $scope.cancel = () => {
        $uibModalInstance.dismiss('cancel');
    };
});

