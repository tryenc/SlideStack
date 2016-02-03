app.config($stateProvider => {

    $stateProvider
        .state('teacherView', {

            url: '/teacherView/:presId',
            templateUrl: 'js/common/teacherView/teacherViewTemplate.html',
            resolve: {
                presentation: (PresentationFactory, $stateParams) => {
                    return PresentationFactory.fetchById($stateParams.presId);
                },
                studentList: UserFactory => UserFactory.fetchAll()
            },
            controller: ($scope, presentation, studentList) => {
                $scope.display =  {
                    mode: 'teacher'
                };

                $scope.presentation = presentation;
                $scope.studentList = studentList;
                $scope.slides = presentation.markdown.split('$$$');
            }
        });
});
