app.directive('editor', function ($rootScope) {
    return {
        restrict: 'E',
        scope: {
            code: '='
        },
        transclude: true,
        templateUrl: 'js/common/directives/editor/editor.html',
        link: function (scope, element, attrs, ctrl, transclude) {
            scope.code.text = scope.code.text || '';

            if (transclude().text().trim()) {
                scope.code.text = transclude().text().trim();
            }

            const editor = window.ace.edit('ace-editor');
            editor.$blockScrolling = Infinity;
            editor.getSession().setMode("ace/mode/javascript");
            editor.insert(scope.code.text);

            const editorDiv = document.getElementById('ace-editor');
            editorDiv.addEventListener('keyup', function () {
                scope.code.text = editor.getValue().trim();
                scope.$parent.$digest();
            });
        }
    }
})
