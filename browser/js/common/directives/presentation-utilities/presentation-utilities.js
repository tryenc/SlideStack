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

            const baseWidth = 1336;
            const windowWidth = document.body.clientWidth;
            const offset = windowWidth / baseWidth;

            const container = el[0];
            const setSizes = function () {
                let ratio = container.clientWidth / document.body.clientWidth;
                let fontSize = 36 * offset * ratio;
                // let fontSize = 36 * ratio;

                el[0].style.fontSize = fontSize.toString() + 'px';
            }

            setSizes();

            window.addEventListener('resize', function () {
                console.log("el[0].style.fontSize", el[0].style.fontSize);
                setSizes();
                scope.$digest();
            });

            // Resize when container size changes - how????
        }
    }
})
