app.config( ($stateProvider) => {

    $stateProvider
        .state('teacherView', {

            url: '/teacherView/:presId',
            template: '',
            resolve: {
                presentation: (PresentationFactory, $stateParams) => {
                    return PresentationFactory.fetchById($stateParams.presId);
                }
            },
            controller: ($scope, presentation) => {
                $scope.presentation = presentation;
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
