// Directive to set an element's height based on its width
app.directive('ratio', function () {
    return {
        restrict: 'A',
        scope: {
            ratio: '@',
            fullscreen: '='
        },
        link: function (scope, element, attrs) {
            const sizeDiv = function () {
                let width = element[0].scrollWidth;
                let ratio = parseFloat(scope.ratio, 10);
                let height = width / ratio;

                if (Number.isNaN(ratio)) return;
                element.css('height', height.toString() + 'px');

            };

            console.log('fullscreen? ', scope.fullscreen);

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
            const baseHeight = 853;
            const windowWidth = document.body.clientWidth;
            const windowHeight = document.body.clientHeight;
            const offset = windowWidth / baseWidth;

            // adjust for different height/width ratios
            const heightWidthRat = (windowWidth / windowHeight) / 1.77;

            console.log(heightWidthRat);

            const container = el[0];
            const setSizes = function () {
                let ratio = container.clientWidth / document.body.clientWidth;
                let fontSize = 36 * offset * ratio;

                el[0].style.fontSize = fontSize.toString() + 'px';
            }

            setSizes();

            window.addEventListener('resize', function (e) {
                setSizes();
                scope.$digest();
            });

            // Resize when container size changes - how????
        }
    }
});
