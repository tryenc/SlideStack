app.directive('editor', function () {
    return {
        restrict: 'E',
        scope: {},
        transclude: true,
        templateUrl: 'js/common/directives/editor/editor.html',
        link: function (scope, element, attrs) {
        }
    }
})
