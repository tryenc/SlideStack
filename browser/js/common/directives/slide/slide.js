app.directive('ssSlide', function (Parser, $compile) {
    return {
        restrict: 'E',
        scope: {
            markdown: '@'
        },
        templateUrl: 'js/common/directives/slide/slide.html',
        // transclude: true,
        require: '^ssSlideshow',
        link: function (scope, element, attrs, ctrl, transclude) {

            ctrl.addSlide(scope);

            scope.prev = ctrl.prevSlide;
            scope.next = ctrl.nextSlide;

            scope.display = ctrl.display;

        }
    }
});
