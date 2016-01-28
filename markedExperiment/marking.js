const marked = require('marked');
const fs = require('fs');
const path = require('path');
const md = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true
});

const source = String(fs.readFileSync(path.normalize(__dirname + '/markDownSample.txt')));
const mdArray = deMarkdown(source);

function deMarkdown(string) {
    return md.render(string).split('\n').map(line => {
        return line.replace("<p>$$$</p>", '<slide></slide>').replace('<p>@', '@').replace('@</p>', '@');
    });
}


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
