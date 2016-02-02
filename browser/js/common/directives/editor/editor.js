app.directive('editor', function () {
    return {
        restrict: 'E',
        scope: {},
        transclude: true,
        templateUrl: 'js/common/directives/editor/editor.html',
        link: function (scope, element, attrs, ctrl, transclude) {
            scope.code = transclude().text().trim();

            const editor = window.ace.edit('ace-editor');
            debugger;
            editor.$blockScrolling = Infinity;
            editor.getSession().setMode("ace/mode/javascript");
            editor.insert(scope.code);
        }
    }
})
