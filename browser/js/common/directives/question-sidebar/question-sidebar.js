app.directive('questionSidebar', function ($rootScope, $state, Socket, AuthService) {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/question-sidebar/question-sidebar.html',
        link: function (scope, element, attrs) {
            scope.expanded = false;
            var newQuestionAsked = false;
            //Student asking question to the teacher
            Socket.questionAsked(studentObj => {
                if (studentObj.anonymous) {
                    $('#questionBox').append
                        ('Anonymous: ' + studentObj.question + "<br>")
                } else {
                    $('#questionBox').append
                        (studentObj.user.name + ': ' + studentObj.question + "<br>")
                }
                if (!scope.expanded){
                  element.css('background-color', 'red');
                }
            });

            scope.expand = function () {
                if (scope.expanded){
                  element.css('width', '50px');
                  element.css('height', '40px');

                }
                else{
                  element.css('width', '400px');
                  element.css('height', '500px');
                  element.css('background-color', 'white');
                }
                scope.expanded = !scope.expanded;
            };

            $rootScope.$on('collapse sidebar', function () {
                if (scope.expanded) scope.expand();
            });


        }
    }
})
