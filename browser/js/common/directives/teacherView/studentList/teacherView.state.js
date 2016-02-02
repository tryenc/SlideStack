app.config( ($stateProvider) => {

    $stateProvider
        .state('teacherView', {

            url: '/teacherView',
            template: '<h1>teach view</h1><ui-view></ui-view>',
            resolve: {
                studentList: (ClassFactory) => {
                    return ClassFactory.fetchStudentsByClass('56b0a45e88d653dc0a994f27');
                }
            },
            controller: ($scope, studentList) => {
                $scope.studentList = studentList;
            }
        })
        .state('teacherView.studentList', {
            url: '/studentList',
            template: '<ss-student-list studentList="studentList"></ss-student-list>',
            controller: function($scope, studentList) {
                //$scope.studentList = studentList;
                console.log(studentList);
            }
        });
});
