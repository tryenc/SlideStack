var runCode = function (code, shouldShowCommand) {

    // print out the command that was run
    if (shouldShowCommand) {
        var command = document.createElement('div');
        command.innerText = '>> ' + code;
        document.body.appendChild(command);
    }

    // print out whatever was returned
    var result = document.createElement('div');
    result.innerText = eval(code);
    document.body.appendChild(result);
};

var prompt = document.createElement('div');
prompt.innerText = '>> ';

var promptLine = document.createElement('span');
promptLine.innerText = 'Type';
promptLine.setAttribute('contenteditable', true);

prompt.appendChild(promptLine);
document.body.appendChild(prompt);

promptLine.addEventListener('keypress', function (event) {
    if (event.which !== 13) return;
    event.preventDefault();

    runCode(promptLine.innerText, true);

    promptLine.innerText = 'Type';
    document.body.appendChild(prompt);
});

var button = document.getElementById('run-btn');
button.addEventListener('click', function () {
    var code = parent.document.getElementById('iframe-console').getAttribute('code');

    runCode(code);

    promptLine.innerText = 'Type';
    document.body.appendChild(prompt);
});
