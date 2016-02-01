app.directive('console', function () {
    return {
        restrict: 'E',
        scope: {
            code: '='
        },
        templateUrl: 'js/common/directives/console/console.html',
        link: function (scope, el) {
            //
            // let allScripts = '';
            // let prompt = '<script>' +
            //                 'document.write("<div>>> <span contenteditable></span></div>")' +
            //             '</script>';
            //
            // el.find('iframe').prop('srcdoc', allScripts + prompt);
            //
            // scope.runCode = function ($event, code) {
            //     if ($event.which !== 13) return;
            //     $event.preventDefault();
            //     code = code || el.find('span').text();
            //
            //     code = code.replace(/console.log/gm, 'document.writeln');
            //
            //     // TODO needs a lot of clean up
            //     let script = '<script>' +
            //                     'document.writeln("<pre>"); ' +
            //                     'document.writeln(eval(' + code + '))' +
            //                  '</script>';
            //
            //     allScripts += script;
            //
            //     el.find('iframe').prop('srcdoc', allScripts + prompt);
            // }

        }


    }
})
