app.directive('editor', function (Socket) {
    return {
        restrict: 'E',
        scope: {
        },
        transclude: true,
        templateUrl: 'js/common/directives/editor/editor.html',
        link: function (scope, element, attrs, ctrl, transclude) {
            scope.code = { text: '' };

            if (transclude().text().trim()) {
                scope.code.text = transclude().text().trim();
            }

            let editor = window.ace.edit('ace-editor');
            editor.$blockScrolling = Infinity;
            editor.getSession().setMode("ace/mode/javascript");
            editor.insert(scope.code.text);

            const editorDiv = document.getElementById('ace-editor');
            editorDiv.addEventListener('keyup', function () {
                scope.code.text = editor.getValue().trim();

                // emit socket event - need to find a way to identify the teacher
                Socket.emit('editing code', scope.code.text);

                scope.$parent.$digest();
            });

            Socket.on('code change', function (newCode) {
                scope.code.text = newCode;
                editor.setValue(newCode, 1);
            });

            scope.consolePresent = !!element.parent().find('console')[0];

            scope.runCode = function (code) {
                const consoleFrame = element.parent().find('iframe')[0].contentWindow;
                consoleFrame.postMessage(code, '*');
            }
        }
    }
})
