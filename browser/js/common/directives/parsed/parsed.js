app.directive('parsed', function (Parser) {
    return {
        restrict: 'E',
        template: '<div></div>',
        scope: {
            markdown: '='
        },
        link: function (scope, element, attrs) {
            console.log(element);
            // element.html(Parser.parse(
            //     scope.markdown || '# Markdown goes here')
            // );

            scope.$watch('markdown', function (newVal, oldVal) {
                element.html(Parser.parse(scope.markdown));
            });
        }
    }
})
