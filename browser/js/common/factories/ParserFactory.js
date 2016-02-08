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
        let openDirective = false;
        let fiddleContent = '';

        lines.forEach((line, i) => {

            // Turn '@ directivename @' into '<directivename>'
            if (/^@\s\w*\s@$/.test(line)) {

                /* The function creates a hash table that maps each open
                directive's text to the line that it appears on. This allows
                us to have nested directives and to automatically add
                closing tags for directives that are left open. */
                if (!openDirectives[line]) {
                    openDirectives[line].line = i;
                    openDirectives[line].content = '';
                    lines[i] = lines[i].replace('@ ', '<').replace(' @', ' index="{{index}}">');
                } else {
                    lines[i] = lines[i].replace('@ ', '</').replace(' @', '>');
                    delete openDirectives[line];
                }
            }
        });

        // Close any directives without closing tags
        Object.keys(openDirectives).forEach(key => {
            let i = openDirectives[key]
            lines[i] = lines[i] + key.replace('@ ', '</').replace(' @', '>');
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
