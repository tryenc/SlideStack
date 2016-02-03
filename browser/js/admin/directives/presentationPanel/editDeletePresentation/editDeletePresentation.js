/**
 * Created by Jon on 2/2/16.
 */
app.directive('editDeletePresentation', () => {
    return {
        restrict: 'E',
        templateUrl: 'js/admin/directives/presentationPanel/editDeletePresentation/editDeletePresentation.html',
        controller: 'EditPresentationCtrl'
    };
});
