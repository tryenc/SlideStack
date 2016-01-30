/**
 * Created by Jon on 1/29/16.
 */
app.directive('adminModal', () => {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/modal/modal.html',
        controller: 'ModalCtrl',
        scope: {
            user: '='
        }
    };
});
