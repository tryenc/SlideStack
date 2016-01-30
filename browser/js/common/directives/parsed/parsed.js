app.directive('parsed', function (Parser, $compile) {
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            presentation: '='
        },
        link: function (scope, element, attrs) {

            const parseAndAppend = function (content, element) {
                element.empty();

                if (!content) return;

                element.append(
                    $compile(Parser.parse(content))(scope)
                );
            };

            parseAndAppend(scope.presentation.markdown, element);

            scope.$watch('presentation.markdown', function (newVal, oldVal) {
                if (newVal === oldVal) return;
                parseAndAppend(newVal, element);
            });
        }
    }
})
