/**
 * Created by Jon on 2/2/16.
 */
app.controller('EditPresentationCtrl', ($scope, $uibModal) => {

    $scope.editPresentation = function (modalSize) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'editPresentationModal.html',
            controller: 'EditPresentationModalCtrl',
            size: modalSize,
            resolve: {
                presentation() {
                    return $scope.presentation;
                },
                classes() {
                    return $scope.classes;
                }
            }
        });
    };

    $scope.deletePresentation = function(modalSize) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'deletePresentationModal.html',
            controller: 'DeletePresentationModalCtrl',
            size: modalSize,
            resolve: {
                presentation() {
                    return $scope.presentation;
                }
            }
        });
    }



}).controller('EditPresentationModalCtrl', function ($scope, $uibModalInstance, PresentationFactory, presentation, classes, $state) {

    $scope.presentation = presentation;
    $scope.classes = classes;
    console.log(classes);

    $scope.ok = () => {
        PresentationFactory.update($scope.presentation)
            .then( () => {
                $state.reload();
                $uibModalInstance.close();
            });
    };

    $scope.cancel = () => {
        $state.reload();
        $uibModalInstance.dismiss('cancel');
    };

}).controller('DeletePresentationModalCtrl', function ($scope, $uibModalInstance, presentation, PresentationFactory, $state) {
    $scope.presentation = presentation;

    $scope.ok = function () {
        PresentationFactory.delete(presentation)
            .then( () => {
                $state.reload();
                $uibModalInstance.close();
            });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
