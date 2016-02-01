// Add this directive to any text editor type elements to prevent
// the slides from changing when you hit the arrow keys
app.directive('dontMoveSlides', function () {
    return {
        restrict: 'A',
        link: function (scope, el, attrs) {

            const element = el[0];

            element.addEventListener('keyup', function (event) {
                event.stopPropagation();
            });
        }
    }
});

app.directive('enableTabs', function () {
    return {
        restrict: 'A',
        link: function (scope, el, attrs) {

            const element = el[0];

            element.addEventListener('keydown', function (event) {
                if (event.which === 9) {
                    event.preventDefault();

                    const start = this.selectionStart;

                    this.value = this.value.substr(0, start) +
                                '\t' +
                                this.value.substr(start);

                    this.selectionStart = this.selectionEnd = start + 1;
                }
            });
        }
    }

});
