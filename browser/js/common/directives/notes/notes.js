app.directive('notes', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/notes/notes.html',
        require: '^ssSlideshow',
        transclude: true,
        link: function (scope, el, attrs, ctrl) {
            scope.display = ctrl.display;
        }
    }
});
