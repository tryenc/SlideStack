app.directive('ssSlideshow', function () {
    return {
        restrict: 'E',
        scope: {
            display: '='
        },
        transclude: true,
        templateUrl: 'js/common/directives/slideshow/slideshow.html',
        controller: function ($scope, Socket) {

            // share display data with inner directives
            this.display = $scope.display;

            const slides = [];
            $scope.currentSlide = 0;

            this.addSlide = function (slide) {
                slides.push(slide);
                slide.index = (slides.length - 1).toString();
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

            // set up event listeners for internal directives to listen for changes to code
            const listeners = {};
            this.onCodeChange = function (editor, fn) {
                listeners[editor] = fn;
            }

            // track changes to code on all slides
            this.codeSnippets = {};
            Socket.onCodeChange(code => {
                this.codeSnippets[code.editor] = code.text;
                listeners[code.editor](code.text);
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

            // handle socket slide change events
            Socket.onSlideChange(function (slideNumber) {
                console.log('slideNumber', slideNumber);
                currentTeacherSlide = slideNumber;
                if ($scope.syncedWithTeacher) {
                    $scope.currentSlide = currentTeacherSlide;
                    $scope.$digest();
                }
            });



        }
    }
});
