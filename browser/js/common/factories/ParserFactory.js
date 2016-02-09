app.factory('Parser', function (marked) {

    const renderer = new marked.Renderer();

    // Change default marked renderer so it doesn't
    // wrap custom directives in paragraph tags
    renderer.paragraph = function (text) {
        if (/^<\/?.*>$/.test(text)) return text;
        else return '<p>' + text + '</p>';
    };

    const customParse = function (string) {
        let lines = string.split('\n');
        let openDirectives = {};
        let fiddleContent = '';

        lines.forEach((line, i) => {

            // Turn '@ directivename @' into '<directivename>'
            if (/^@\s\w*\s@$/.test(line)) {

                /* The function creates a hash table that maps each open
                directive's text to the line that it appears on. This allows
                us to have nested directives and to automatically add
                closing tags for directives that are left open. */
                if (!openDirectives[line]) {
                    openDirectives[line] = {
                        lineIdx: i,
                        content: ''
                    };

                    // lines[i] = lines[i].replace('@ ', '<').replace(' @', ' index="{{index}}">');
                } else {

                    // Create the opening directive tag, with the content passed in
                    let openingLine = openDirectives[line].lineIdx;
                    let content = openDirectives[line].content;

                    // Pass the content in to the directive tag
                    lines[openingLine] = lines[openingLine].replace('@ ', '<').replace(' @', ' index="{{index}}" content="' + content + '">');

                    // Delete the content from the lines in between opening and closing tags
                    for (let j = openingLine + 1; j < i; j++) {
                        lines[j] = '';
                    }

                    // Add the closing tag
                    lines[i] = lines[i].replace('@ ', '</').replace(' @', '>');

                    delete openDirectives[line];
                }
            } else {

                // If there are open directives track the content
                Object.keys(openDirectives).forEach(key => {
                    openDirectives[key].content += line + '\n';
                });
            }
        });

        // Close any directives without closing tags
        Object.keys(openDirectives).forEach(key => {
            let i = openDirectives[key].lineIdx;
            lines[i] = lines[i].replace('@ ', '<').replace(' @', '>') + lines[i].replace('@ ', '</').replace(' @', '>');
        });

        return lines.join('\n');
    }

    return {
        parse: function (string) {
            // console.log(marked(customParse(string), { renderer: renderer }));
            return marked(customParse(string), { renderer: renderer });
        }
    }
})
