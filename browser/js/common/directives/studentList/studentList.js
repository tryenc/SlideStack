/**
 * Created by Jon on 2/2/16.
 */
app.directive('ssStudentList', (Socket, $rootScope) => {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/studentList/studentList.html',
        link: (scope) => {
            scope.calledOn = {};

            scope.callOnStudent = student => {
                if (!scope.calledOn[student.socket]) {
                    Socket.callOn(student.socket);
                    scope.calledOn[student.socket] = true;
                } else {
                    Socket.endCallOn(student.socket);
                    scope.calledOn[student.socket] = false;
                }
            };

            // Reset calledOn after slide change
            $rootScope.$on('slide change', () => scope.calledOn = {});
        }
    };
});
