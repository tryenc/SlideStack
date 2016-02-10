app.directive('questionSidebar', function ($rootScope, $state, Socket, AuthService) {
    return {
        restrict: 'E',
        // scope: {
        //     // peers: '=',
        //     // user: '=',
        //     // file: '=',
        // },
        templateUrl: 'js/common/directives/question-sidebar/question-sidebar.html',
        link: function (scope, element, attrs) {
            scope.expanded = false;
            //Student asking question to the teacher
            Socket.questionAsked(studentObj => {
                if (studentObj.anonymous) {
                    $('#questionBox').append
                        ('Anonymous: ' + studentObj.question+ '\n')
                } else {
                    $('#questionBox').append
                        (studentObj.user.name + ': ' + studentObj.question + '\n')
                }
            });

            scope.expand = function () {

                if (scope.expanded){
                  element.css('width', '50px');
                  element.css('height', '10vh');
                }
                else{
                  element.css('width', '250px');
                  element.css('height', '75vh');
                }
                scope.expanded = !scope.expanded;
            };

            $rootScope.$on('collapse sidebar', function () {
                if (scope.expanded) scope.expand();
            });


        }
    }
})
