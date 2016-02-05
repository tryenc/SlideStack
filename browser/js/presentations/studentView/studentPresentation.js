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

            Socket.on('connect', function () {
                console.log("Connected!");
            });

            Socket.emit('request join', {
                presentation: presentation._id
            });

            $scope.user = user;
            //where does confusion need to be stored?
            //if it's in the modal, it would get reset to false every time a modal is open
            //if it's store in this controller, how does the modal communicate to this controller when the confusion has been toggled?
            $scope.user.confused = false;


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

    $scope.confused = false;

  $scope.submitQuestion = function (question) {
    console.log("question", question);
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
