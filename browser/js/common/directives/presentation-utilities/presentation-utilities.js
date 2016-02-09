// Directive to set an element's height based on its width
app.directive('ratio', function () {
    return {
        restrict: 'A',
        scope: {
            ratio: '@'
        },
        link: function (scope, element, attrs) {
            const sizeDiv = function () {
                let width = element[0].scrollWidth;
                let ratio = parseFloat(scope.ratio, 10);

                if (Number.isNaN(ratio)) return;
                element.css('height', (width / ratio).toString() + 'px');
            }

            sizeDiv();

            window.addEventListener('resize', function (e) {
                sizeDiv();
            });
        }
    }
})
