app.factory('Parser', function (marked) {

    const renderer = new marked.Renderer();

    renderer.paragraph = function (text) {

        //don't wrap custom directives in paragraph tags
        if (/^@\s[\w]*\s@|^\$\$\$$/.test(text)) return text + '\n';

        return '<p>' + text + '</p>\n';
    };

    const customParse = function (string) {
        let lines = string.split('\n');
        let openDir = false;

        lines.forEach((line, i) => {
            // if the line is $$$, make a new slide
            if (line === '$$$') {

                // if it's the first line just add an opening slide tag
                if (i === 0) lines[i] = '<slide>'

                // otherwise close the previous slide first
                else lines[i] = '</slide>\n<slide>'

            // if there's a custom directive tag, handle it
            } else if (/^@/.test(line)) {

                lines[i] = lines[i].replace('@ ', (openDir ? '</' : '<'))
                                   .replace(' @', '>');

                openDir = !openDir;
            }
        })

        // close the last slide
        lines.push('</slide>');

        // wrap the whole thing in a slides directive
        return '<slides>\n' + lines.join('\n') + '\n</slides>';
    }


    return {
        parse: function (string) {
            return customParse(marked(string, { renderer: renderer }));
        }
    }
})
