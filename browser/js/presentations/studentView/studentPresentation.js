/**
 * Created by Jon on 2/4/16.
 */

// Students
app.config(function ($stateProvider) {
    $stateProvider.state('viewPres', {
        url: '/presentations/:id/student',
        templateUrl: 'js/presentations/studentView/studentPresentation.html',
        resolve: {
            presentation: function (PresentationFactory, $stateParams) {
                return PresentationFactory.fetchById($stateParams.id);
            },
            user: function (AuthService) {
                return AuthService.getLoggedInUser();
            }
        },
        controller: function ($scope, presentation, Socket, user, $uibModal) {
            $scope.slides = presentation.markdown.split('$$$');
            Socket.joinRoom({
                presentation: presentation._id
            });

            $scope.user = user;

            $scope.user.confused = false;

            $scope.toggleConfusion = function(){
                $scope.user.confused = !$scope.user.confused;
                Socket.emitConfusion(user);
            }

            $scope.open = function (size) {

                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'myModalContent.html',
                    controller: 'ModalInstanceCtrl',
                    size: size,
                    resolve: {
                        user: function () {
                            return $scope.user;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };
        }
    })
}).controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, user, Socket) {

  $scope.submitQuestion = function (question) {
    Socket.askQuestion({id: user.id, question: question});
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
