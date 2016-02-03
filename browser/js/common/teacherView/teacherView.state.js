app.config( ($stateProvider) => {

    $stateProvider
        .state('teacherView', {

            url: '/teacherView/:presId',
            template: '',
            resolve: {
                studentList: (ClassFactory, $stateParams) => {
                    return ClassFactory.fetchStudentsByClass($stateParams.presId);
                }
            },
            controller: ($scope, studentList) => {
                $scope.studentList = studentList;
            }
        })
        //.state('teacherView.studentList', {
        //    url: '/studentList',
        //    template: '<ss-student-list studentList="studentList"></ss-student-list>',
        //    controller: function($scope, studentList) {
        //        //$scope.studentList = studentList;
        //        console.log(studentList);
        //    }
        //});
});
