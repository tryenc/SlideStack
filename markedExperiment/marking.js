var marked = require('marked');
var fs = require('fs');
var path = require('path');

var md = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true
});

var source = String(fs.readFileSync(path.normalize(__dirname + '/markDownSample.txt')));

function deMarkdown(string) {
    return md.render(string).split('\n').map(line => {
        return line.replace("<p>$$$</p>", '<slide></slide>').replace('<p>@', '@').replace('@</p>', '@');
    });
}

var mdArray = deMarkdown(source);

function buildDirective(markDown) {
    var stringBuilder = '';
    var startedDirective = false;
    markDown.forEach(line => {
        var newLine = '';
        if (line[0] === '@') {
            line = line.split(' ');
            if (!startedDirective) {
                startedDirective = true;
                newLine = '<' + line[1].toString() + '>' + '\n';
                stringBuilder += newLine;
            } else {
                startedDirective = false;
                newLine = '</' + line[1].toString() + '>' + '\n';
                stringBuilder += newLine;
            }
        } else {
            stringBuilder += (line + '\n');
        }
    });
    return stringBuilder;
}
console.log(buildDirective(mdArray));

//console.log(mdArray);
