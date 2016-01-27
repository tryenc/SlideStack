app.directive('slide', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/slide/slide.html',
        scope: {
          parsed: '='
        }
    };
});
