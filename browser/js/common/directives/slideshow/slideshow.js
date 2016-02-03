app.directive('ssSlideshow', function () {
    return {
        restrict: 'E',
        scope: {},
        transclude: true,
        templateUrl: 'js/common/directives/slideshow/slideshow.html',
        controller: function ($scope) {

            var slides = [];
            $scope.currentSlide = 0;

            this.addSlide = function (slide) {
                slides.push(slide);
                if (slides.length === 1) slide.selected = true;
            };

            $scope.next = function () {
                if ($scope.currentSlide === slides.length - 1) return;
                $scope.currentSlide++;
            };

            $scope.prev = function () {
                if ($scope.currentSlide === 0) return;
                $scope.currentSlide--;
            };

            document.body.addEventListener('keyup', function (e) {
                if (e.which === 39) {
                    $scope.next();
                    $scope.$digest();
                }
                if (e.which === 37) {
                    $scope.prev();
                    $scope.$digest();
                }
            });

            $scope.$watch('currentSlide', function (newIdx, oldIdx) {
                if (newIdx === oldIdx) return;

                slides[oldIdx].selected = false;
                slides[newIdx].selected = true;
            })
        }
    }
});
