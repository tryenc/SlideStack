(function () {
    var prompt;
    var promptLine;

    var consoleDiv = document.getElementById('console');

    var setUpPrompt = function () {
        consoleDiv.innerHTML = '';
        prompt = document.createElement('div');
        prompt.innerText = '>> ';

        promptLine = document.createElement('input');
        promptLine.setAttribute('type', 'text');
        // promptLine.innerText = 'Type';
        // promptLine.setAttribute('contenteditable', true);

        prompt.appendChild(promptLine);
        consoleDiv.appendChild(prompt);

        promptLine.addEventListener('keypress', function (event) {
            if (event.which !== 13) return;
            event.preventDefault();

            runCode(promptLine.value, true);

            promptLine.value = '';
            consoleDiv.appendChild(prompt);
            promptLine.focus();
        });
    };

    var runCode = function (code, shouldShowCommand) {
        code = code.replace(/console.log/gm, 'logOutput');
        console.log(code);
        // print out the command that was run
        if (shouldShowCommand) {
            var command = document.createElement('div');
            command.innerText = '>> ' + code.replace(/logOutput/gm, 'console.log');
            consoleDiv.appendChild(command);
        }

        // print out whatever was returned or print the error
        try {
            var result = document.createElement('div');
            result.innerText = '=> ' + eval(code);
            result.className += 'return';
            consoleDiv.appendChild(result);
            promptLine.value = '';
            consoleDiv.appendChild(prompt);
        } catch (e) {
            logOutput(e, { error: true });
        }
    };

    // recieve code from main app
    window.addEventListener('message', function (event) {
        if (event.origin !== window.location.origin) return;

        setUpPrompt();
        if (event.data) runCode(event.data);
    });

    // replace console.log with this
    var logOutput = function (expression, options) {
        options = options || {};
        var output = document.createElement('div');
        if (options.error) output.className += 'error';
        output.innerText = expression;
        consoleDiv.appendChild(output);
    };

    setUpPrompt();

})();
