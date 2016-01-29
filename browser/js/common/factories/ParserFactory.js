app.factory('Parser', function () {
    return {
        parse: function (string) {
            const md = window.markdownit();

            const deMarkdown = function (str) {
                return md.render(str).split('\n').map(line => {
                    return line.replace("<p>$$$</p>", '<slide></slide>').replace('<p>@', '@').replace('@</p>', '@');
                });
            };

            const buildDirective = function (markDown) {
                var stringBuilder = '';
                var startedDirective = false;
                markDown.forEach(line => {
                    var newLine = '';
                    if (line[0] === '@') {
                        line = line.split(' ');
                        if (!startedDirective) {
                            startedDirective = true;
                            newLine = '<' +
                                (line[1] ? line[1].toString() : '') +
                                '>' +
                                '\n';
                            stringBuilder += newLine;
                        } else {
                            startedDirective = false;
                            newLine = '</' +
                                (line[1] ? line[1].toString() : '') + 
                                '>' +
                                '\n';
                            stringBuilder += newLine;
                        }
                    } else {
                        stringBuilder += (line + '\n');
                    }
                });
                return stringBuilder;
            }

            const mdArray = deMarkdown(string);
            console.log(buildDirective(mdArray));
            return buildDirective(mdArray);
        }
    }
})
