/**
 * Created by Jon on 2/5/16.
 */
app.directive('progressBar', (Socket) => {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/progressBar/progressBar.html',
        scope: {
          confusion: '='
        },
        link: (scope) => {
            scope.max = 200;

            //console.log("confusion level", scope.confusion.level)
            scope.type = 'success';
            //scope.$watch(scope.confusionLevel, )
            //scope.confusionLevel = 0;

            scope.$watch('confusion.level', (newVal, oldVal) => {
                if (newVal == oldVal) return;
                console.log("confusionLevel:", scope.confusion.level);

                if (scope.confusion.level < 25) {
                    scope.type = 'success';
                } else if (scope.confusion.level < 50) {
                    scope.type = 'info';
                } else if (scope.confusion.level < 75) {
                    scope.type = 'warning';
                } else {
                    scope.type = 'danger';
                }

                scope.showWarning = scope.type === 'danger' || scope.type === 'warning';
            });

        }
    };
});
