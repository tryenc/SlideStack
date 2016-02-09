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
});

app.directive('relativeSizes', function () {
    return {
        restrict: 'A',
        link: function (scope, el, attrs) {

            const container = el[0];
            const setSizes = function () {
                let windowWidth = document.body.clientWidth;
                let containerWidth = container.clientWidth;
                let ratio = containerWidth / windowWidth;
                let fontSize = 36 * ratio;

                el[0].style.fontSize = fontSize.toString() + 'px';
            }

            setSizes();

            // Resize when container size changes - how????
        }
    }
})
