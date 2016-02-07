app.directive('parse', function (Parser, $compile) {
    return {
        restrict: 'A',
        // scope: {
        //     markdown: '@parse'
        // },
        link: function (scope, element, attrs) {
            const parseAndAppend = function (content) {

                element.empty();

                if (!content) return;

                element.append(
                    $compile(Parser.parse(content))(scope)
                );
            };

            parseAndAppend(scope.markdown);

            scope.$watch('markdown', function (newVal, oldVal) {
                if (newVal === oldVal) return;
                parseAndAppend(newVal, element);
            });

        }
    }
});
