/**
 * Created by Jon on 2/5/16.
 */
app.directive('progressBar', () => {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/progressBar/progressBar.html',
        link: (scope, Socket) => {

            scope.max = 200;

            var type;
            scope.confusionLevel = 100;

            if (scope.confusionLevel < 25) {
                type = 'success';
            } else if (scope.confusionLevel < 50) {
                type = 'info';
            } else if (scope.confusionLevel < 75) {
                type = 'warning';
            } else {
                type = 'danger';
            }

            scope.type = type;
            scope.showWarning = type === 'danger' || type === 'warning';

            Socket.onConfusion(data => {
                //scope.value += data.confusion;
                scope.confusionLevel++;
            });
        }
    };
});
