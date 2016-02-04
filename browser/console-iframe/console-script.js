var runCode = function (code, shouldShowCommand) {

    // print out the command that was run
    if (shouldShowCommand) {
        var command = document.createElement('div');
        command.innerText = '>> ' + code;
        consoleDiv.appendChild(command);
    }

    // print out whatever was returned
    try {
        var result = document.createElement('div');
        result.innerText = '=> ' + eval(code);
        consoleDiv.appendChild(result);
    }
};

var consoleDiv = document.getElementById('console');
var prompt = document.createElement('div');
prompt.innerText = '>> ';

var promptLine = document.createElement('span');
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

var button = document.getElementById('run-btn');
button.addEventListener('click', function () {
    var code = parent.document.getElementById('iframe-console').getAttribute('code');

    runCode(code);

    promptLine.innerText = 'Type';
    consoleDiv.appendChild(prompt);
});

// overwrite console.log - is this bad?
console.log = function (expression) {
    var output = document.createElement('div');
    output.innerText = expression;
    consoleDiv.appendChild(output);
}
