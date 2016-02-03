/**
 * Created by Jon on 2/2/16.
 */
app.directive('editDeleteClass', () => {
    return {
        restrict: 'E',
        templateUrl: 'js/admin/directives/classesPanel/editDeleteCLass/editDeleteClass.html',
        controller: 'EditClassCtrl'
    };
});
