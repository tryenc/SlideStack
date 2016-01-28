app.directive('parsed', function (Parser) {
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            presentation: '='
        },
        link: function (scope, element, attrs) {
            // element.html(Parser.parse(
            //     scope.presentation.markdown || '# Markdown goes here')
            // );

            scope.$watch('presentation.markdown', function (newVal, oldVal) {
                element.html(Parser.parse(scope.presentation.markdown));
            });
        }
    }
})
