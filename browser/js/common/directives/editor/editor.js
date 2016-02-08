app.directive('editor', function (Socket) {
    return {
        restrict: 'E',
        scope: {
            mode: '@',
            index: '@',
            content: '@'
        },
        require: ['^ssSlideshow', '?^fiddle'],
        templateUrl: 'js/common/directives/editor/editor.html',
        link: function (scope, element, attrs, ctrl) {

            const slideshowCtrl = ctrl[0];
            const fiddleCtrl = ctrl[1];

            // If we're not inside a fiddle directive make sure selected is true
            if (!fiddleCtrl) scope.selected = true;

            // Initialize code with whatever has been passed in to directive, or empty string
            scope.code = { text: scope.content || '' };

            // editCode is false - this only effects students
            scope.editCode = false;

            // Track teacher's code when students edit their own code
            let teacherCode = '';

            // Get the current display mode
            scope.display = slideshowCtrl.display;

            // Sharing is false by default for students, true for teachers
            scope.sharing = scope.display.mode === 'teacher';

            // Set up Ace editor
            // Have to give the editor div a unique id
            const editorDiv = element.children('code-editor')[0];
            const aceMode = scope.mode || 'javascript';
            const aceId = 'ace-editor-' + scope.index + '-' + aceMode;
            editorDiv.setAttribute('id', aceId);
            let editor = window.ace.edit(aceId);
            editor.$blockScrolling = Infinity;
            editor.getSession().setMode("ace/mode/" + aceMode.toLowerCase());
            editor.insert(scope.code.text);

            // Attach the editor Id to the code object
            // Need to send that along with socket event
            scope.code.editor = aceId;

            // Check to see if code for this slide has already been updated
            if (slideshowCtrl.codeSnippets[aceId]) {
                scope.code.text = slideshowCtrl.codeSnippets[aceId];
                editor.setValue(scope.code.text, 1);
            }

            // Listen for typing events in Ace editor
            editorDiv.addEventListener('keyup', function () {

                scope.code.text = editor.getValue().trim();

                console.log(scope.code.text);

                // Emit socket event if sharing code
                if (scope.sharing) Socket.shareCode(scope.code);

            });

            slideshowCtrl.onCodeChange(aceId, function (newText) {
                if (scope.editCode) return teacherCode = newText;

                scope.code.text = newText;
                editor.setValue(newText, 1);
            });

            // Enable sharing when called on
            Socket.onCalled(function () {
                scope.sharing = true;
                Socket.shareCode(scope.code);
                scope.$digest();
            });

            // Cancel scope.sharing when called on ends
            Socket.onNotCalled(function () {
                scope.sharing = false;
                scope.$digest();
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
            scope.editor = editor;
            fiddleCtrl.addTab(scope);
        }
    }
})
