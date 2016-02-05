app.directive('editor', function (Socket) {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'js/common/directives/editor/editor.html',
        link: function (scope, element, attrs, ctrl, transclude) {
            scope.code = { text: '' };
            scope.editCode = false;

            let sharing = scope.display.mode === 'teacher' ? true : false;

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

                if (sharing) Socket.emit('editing code', scope.code.text);

                scope.$parent.$digest();
            });

            Socket.on('code change', function (newCode) {
                if (scope.editCode) return;
                scope.code.text = newCode;
                editor.setValue(newCode, 1);
            });

            Socket.on('called', function () {
                sharing = true;
            });

            Socket.on('not called', function () {
                sharing = false;
            });

            scope.consolePresent = !!element.parent().find('console')[0];

            scope.runCode = function (code) {
                const consoleFrame = element.parent().find('iframe')[0].contentWindow;
                consoleFrame.postMessage(code, '*');
            };

            scope.toggleEdit = function () {
                scope.editCode = !scope.editCode;
                // sync back with teacher's code
            };

        }
    }
})
