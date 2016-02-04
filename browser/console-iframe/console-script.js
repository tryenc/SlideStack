(function () {
    var prompt;
    var promptLine;

    var consoleDiv = document.getElementById('console');

    var setUpPrompt = function () {
        prompt = document.createElement('div');
        prompt.innerText = '>> ';

        promptLine = document.createElement('span');
        promptLine.innerText = 'Type';
        promptLine.setAttribute('contenteditable', true);

        prompt.appendChild(promptLine);
        consoleDiv.appendChild(prompt);

        promptLine.addEventListener('keypress', function (event) {
            if (event.which !== 13) return;
            event.preventDefault();

            runCode(promptLine.innerText, true);

            promptLine.innerText = 'Type';
            consoleDiv.appendChild(prompt);
        });
    };

    var runCode = function (code, shouldShowCommand) {
        code = code.replace('console.log', 'logOutput')
        // print out the command that was run
        if (shouldShowCommand) {
            var command = document.createElement('div');
            command.innerText = '>> ' + code.replace('logOutput', 'console.log');
            consoleDiv.appendChild(command);
        }

        // print out whatever was returned
        try {
            var result = document.createElement('div');
            result.innerText = '=> ' + eval(code);
            result.className += 'return';
            consoleDiv.appendChild(result);
            promptLine.innerText = 'Type';
            consoleDiv.appendChild(prompt);
        } catch (e) {
            logOutput(e, { error: true });
        }
    };

    var runButton = document.getElementById('run-btn');
    runButton.addEventListener('click', function () {
        // var code = window.frameElement.getAttribute('code');

        console.log(window.frameElement);
        runCode(code);
    });

    window.addEventListener('message', function (event) {
        if (event.origin !== window.location.origin) return;

        runCode(event.data);
    });



    var clearButton = document.getElementById('clear-btn');
    clearButton.addEventListener('click', function () {
        consoleDiv.innerHTML = '';
        setUpPrompt();
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
