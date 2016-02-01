/**
 * Created by Jon on 2/1/16.
 */
/**
 * Created by Jon on 2/1/16.
 */
app.directive('classesPanel', () => {
    return {
        restrict: 'E',
        scope: {
            classes: '='
        },
        templateUrl: 'js/admin/directives/classesPanel/classesPanel.html'
    };
});
