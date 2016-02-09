app.directive('notes', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/notes/notes.html',
        scope: {
            content: '@'
        },
        require: '^ssSlideshow',
        link: function (scope, element, attrs, slideshowCtrl) {
            scope.display = slideshowCtrl.display;
        }
    }
});
