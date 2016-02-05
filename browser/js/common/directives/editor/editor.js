app.directive('editor', function (Socket) {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'js/common/directives/editor/editor.html',
        link: function (scope, element, attrs, ctrl, transclude) {

            // Initialize code as empty string to prevent errors
            scope.code = { text: '' };

            // editCode is false - this only effects students
            scope.editCode = false;

            // Track teacher's code when students edit their own code
            let teacherCode = '';

            // Sharing is false by default for students, true for teachers
            let sharing = scope.display.mode === 'teacher' ? true : false;

            // If there's any predefined text, load it
            if (transclude().text().trim()) {
                scope.code.text = transclude().text().trim();
            }

            // Set up Ace editor
            const editor = window.ace.edit('ace-editor');
            editor.$blockScrolling = Infinity;
            editor.getSession().setMode("ace/mode/javascript");
            editor.insert(scope.code.text);

            // Listen for typing events in Ace editor
            const editorDiv = document.getElementById('ace-editor');
            editorDiv.addEventListener('keyup', function (e) {

                scope.code.text = editor.getValue().trim();

                // Emit socket event if sharing code
                if (sharing) Socket.emit('editing code', scope.code.text);

            });

            // Listen for edit events from sockets
            Socket.on('code change', function (newCode) {

                // If currently editing, track teacher's changes but don't update
                if (scope.editCode) return teacherCode = newCode;

                scope.code.text = newCode;
                editor.setValue(newCode, 1);
            });

            // Enable sharing when called on
            Socket.on('called', function () {
                sharing = true;
                Socket.emit('editing code', scope.code.text);
            });

            // Cancel sharing when called on ends
            Socket.on('not called', function () {
                sharing = false;
            });

            // Toggle edit mode
            scope.toggleEdit = function () {
                if (scope.editCode) {
                    scope.code.text = teacherCode;
                    editor.setValue(scope.code.text, 1);
                }
                scope.editCode = !scope.editCode;
            };

            // Show relevant buttons when the slide also contains a console
            scope.consolePresent = !!element.parent().find('console')[0];

            // Allow running code in ifram on the same slide
            scope.runCode = function (code) {
                const consoleFrame = element.parent().find('iframe')[0].contentWindow;
                consoleFrame.postMessage(code, '*');
            };

        }
    }
})
