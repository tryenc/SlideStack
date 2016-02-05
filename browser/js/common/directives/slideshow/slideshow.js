app.directive('ssSlideshow', function () {
    return {
        restrict: 'E',
        scope: {
            display: '=',
            presentationMarkdown: '@'
        },
        transclude: true,
        templateUrl: 'js/common/directives/slideshow/slideshow.html',
        controller: function ($scope, Socket) {

            $scope.rawSlides = $scope.presentationMarkdown.split('$$$');
            this.display = $scope.display;

            $scope.$watch('presentationMarkdown', function (newVal, oldVal) {
                if (newVal === oldVal) return;
                $scope.rawSlides = newVal.split('$$$');
                console.log($scope.rawSlides);
            });

            const slides = [];
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
                if ($scope.display.mode === 'student' && $scope.syncedWithTeacher) return;

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

                if ($scope.display.mode === 'teacher') {
                    Socket.changeSlide(newIdx)
                }
            });

            // controls for student view
            if ($scope.display.mode !== 'student') return;

            let currentTeacherSlide = 0;
            $scope.syncedWithTeacher = true;

            $scope.toggleSync = function () {
                if (!$scope.syncedWithTeacher) {
                    $scope.currentSlide = currentTeacherSlide;
                }
                $scope.syncedWithTeacher = !$scope.syncedWithTeacher;
            }

            // handle socket events
            Socket.onSlideChange(function (slideNumber) {
                console.log('slideNumber', slideNumber);
                currentTeacherSlide = slideNumber;
                if ($scope.syncedWithTeacher) {
                    $scope.currentSlide = currentTeacherSlide;
                    $scope.$digest();
                    console.log("$scope.currentSlide", $scope.currentSlide);
                }
            })


        }
    }
});
