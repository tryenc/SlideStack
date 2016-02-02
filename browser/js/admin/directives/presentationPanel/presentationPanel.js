/**
 * Created by Jon on 2/1/16.
 */
app.directive('presentationPanel', () => {
    return {
        restrict: 'E',
        scope: {
            presentations: '=',
            classes: '='
        },
        templateUrl: 'js/admin/directives/presentationPanel/presentationPanel.html',
        controller: 'PresentationPanelCtrl'
    };
});
