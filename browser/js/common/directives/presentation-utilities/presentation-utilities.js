// Directive to set an element's height based on its width
app.directive('ratio', function () {
    return {
        restrict: 'A',
        scope: {
            ratio: '@'
        },
        link: function (scope, element, attrs) {
            const width = element[0].clientWidth;
            const ratio = parseInt(scope.ratio, 10) / 100;

            if (Number.isNaN(ratio)) return;

            element.css('height', (width / ratio).toString() + 'px');
        }
    }
})
