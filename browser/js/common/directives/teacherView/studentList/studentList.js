/**
 * Created by Jon on 2/2/16.
 */
app.directive('ssStudentList', () => {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/teacherView/studentList/studentList.html',
        //link: (scope) => {
        //
        //},
        scope: {
            studentList: '='
        }
    };
});
