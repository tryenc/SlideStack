app.directive('ssSlideshow', function () {
    return {
        restrict: 'E',
        scope: {},
        transclude: true,
        templateUrl: 'js/common/directives/slideshow/slideshow.html',
        controller: function ($scope) {

            var slides = [];
            var currentSlide = 0;

            var activate = function (index) {
                slides[index].selected = true;
            };

            var deactivate = function (index) {
                slides[index].selected = false;
            };

            this.addSlide = function (slide) {
                slides.push(slide);
                if (slides.length === 1) activate(0);
                console.log(slides);
            };

            this.nextSlide = function () {
                if (currentSlide === slides.length - 1) return;
                deactivate(currentSlide);
                currentSlide++;
                activate(currentSlide);
            };

            this.prevSlide = function () {
                if (currentSlide === 0) return;
                deactivate(currentSlide);
                currentSlide--;
                activate(currentSlide);
            }
        }
    }
});
