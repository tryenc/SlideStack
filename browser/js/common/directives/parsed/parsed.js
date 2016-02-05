app.directive('parsed', function (Parser, $compile) {
    return {
        restrict: 'E',
        template: '<div></div>',
        require: '^ssSlideshow',
        scope: {
            markdown: '@',
            // display: '='
        },
        link: function (scope, element, attrs, ctrl) {

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

            scope.display = ctrl.display;
        }
    }
})
