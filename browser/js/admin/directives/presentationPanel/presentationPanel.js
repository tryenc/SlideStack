/**
 * Created by Jon on 2/1/16.
 */
app.directive('presentationPanel', () => {
    return {
        restrict: 'E',
        scope: {
            presentations: '='
        },
        templateUrl: 'js/admin/directives/presentationPanel/presentationPanel.html'
    };
});
