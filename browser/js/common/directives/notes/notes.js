app.directive('notes', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/notes/notes.html',
        transclude: true
    }
});
