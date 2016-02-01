// Add this directive to any text editor type elements to prevent
// the slides from changing when you hit the arrow keys
app.directive('dontMoveSlides', function () {
    return {
        restrict: 'A',
        scope: {},
        link: function (scope, el, attrs) {
            el.on('keyup', function () {
                
            })
        }
    }
})
