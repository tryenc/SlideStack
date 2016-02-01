/**
 * Created by Jon on 1/29/16.
 */
app.directive('editDeleteModal', () => {
    return {
        restrict: 'E',
        templateUrl: 'js/admin/directives/editDeleteModal/editDeleteModal.html',
        controller: 'ModalCtrl',
        scope: {
            user: '='
        }
    };
});
