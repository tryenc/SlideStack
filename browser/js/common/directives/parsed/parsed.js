app.directive('parsed', function (Parser, $compile) {
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            presentation: '='
        },
        link: function (scope, element, attrs) {

            scope.$watch('presentation.markdown', function (newVal, oldVal) {
                element.empty();

                const compiled = $compile(
                    Parser.parse(scope.presentation.markdown)
                )(scope);

                element.append(compiled);
            });
        }
    }
})
