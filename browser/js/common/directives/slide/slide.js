app.directive('ssSlide', function () {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/slide/slide.html',
        transclude: true,
        require: '^ssSlideshow',
        link: function (scope, element, attrs, ctrl, transclude) {

            ctrl.addSlide(scope);

            scope.prev = ctrl.prevSlide;
            scope.next = ctrl.nextSlide;

        }
    }
});
