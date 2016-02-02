/**
 * Created by Jon on 1/29/16.
 */
app.directive('editDeleteUser', () => {
    return {
        restrict: 'E',
        templateUrl: 'js/admin/directives/userPanel/editDeleteUser/editDeleteUser.html',
        controller: 'ModalCtrl',
        scope: {
            user: '='
        }
    };
});
