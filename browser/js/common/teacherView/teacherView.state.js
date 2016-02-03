app.config( ($stateProvider) => {

    $stateProvider
        .state('teacherView', {

            url: '/teacherView/:presId',
            templateUrl: 'js/common/teacherView/teacherViewTemplate.html',
            resolve: {
                presentation: (PresentationFactory, $stateParams) => {
                    return PresentationFactory.fetchById($stateParams.presId);
                },
                studentList: (UserFactory) => {
                    return UserFactory.fetchAll();
                }
            },
            controller: ($scope, presentation, studentList) => {
                $scope.presentation = presentation;
                $scope.studentList = studentList;
                console.log("presentation in teacherView", presentation);
                console.log("studentList in teacherView", studentList);
            }
        });
        //.state('teacherView.studentList', {
        //    url: '/studentList',
        //    template: '<ss-student-list studentList="studentList"></ss-student-list>',
        //    controller: function($scope, studentList) {
        //        //$scope.studentList = studentList;
        //        console.log(studentList);
        //    }
        //});
});
