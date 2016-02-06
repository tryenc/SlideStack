app.directive('editor', function (Socket) {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            mode: '@'
        },
        require: ['^ssSlideshow', '?^fiddle'],
        templateUrl: 'js/common/directives/editor/editor.html',
        link: function (scope, element, attrs, ctrl, transclude) {

            const slideshowCtrl = ctrl[0];
            const fiddleCtrl = ctrl[1];

            // If we're not inside a fiddle directive make sure selected is true
            if (!fiddleCtrl) scope.selected = true;

            // Initialize code as empty string to prevent errors
            scope.code = { text: '' };

            // editCode is false - this only effects students
            scope.editCode = false;

            // Track teacher's code when students edit their own code
            let teacherCode = '';

            // Sharing is false by default for students, true for teachers
            let sharing = slideshowCtrl.display.mode === 'teacher' ? true : false;

            // If there's any predefined text, load it
            if (transclude().text().trim()) {
                scope.code.text = transclude().text().trim();
            }

            // Set up Ace editor
            // Have to give the editor div a unique id
            const editorDiv = element.children('code-editor')[0];
            const aceId = 'ace-editor-' + Math.random().toString().slice(2);
            console.log(aceId);
            const aceMode = scope.mode || 'javascript';
            editorDiv.setAttribute('id', aceId);
            let editor = window.ace.edit(aceId);
            editor.$blockScrolling = Infinity;
            editor.getSession().setMode("ace/mode/" + aceMode.toLowerCase());
            editor.insert(scope.code.text);

            // Listen for typing events in Ace editor
            // const editorDiv = document.getElementById('ace-editor');
            editorDiv.addEventListener('keyup', function (e) {

                scope.code.text = editor.getValue().trim();

                // Emit socket event if sharing code
                if (sharing) Socket.shareCode(scope.code.text);

            });

            // Listen for edit events from sockets
            Socket.onCodeChange(function (newCode) {

                // If currently editing, track teacher's changes but don't update
                if (scope.editCode) return teacherCode = newCode;

                scope.code.text = newCode;
                editor.setValue(newCode, 1);
            });

            // Enable sharing when called on
            Socket.onCalled(function () {
                sharing = true;
                Socket.shareCode(scope.code.text);
            });

            // Cancel sharing when called on ends
            Socket.onNotCalled(function () {
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

            // Set up tabs when used in fiddle directive
            if (!fiddleCtrl) return;

            fiddleCtrl.addTab(scope);
        }
    }
})
