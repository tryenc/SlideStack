app.config($stateProvider => {
    $stateProvider
        .state('teacherView', {
            url: '/teacherView/:presId',
            templateUrl: 'js/teacherView/teacherView.template.html',
            resolve: {
                presentation: (PresentationFactory, $stateParams) => {
                    return PresentationFactory.fetchById($stateParams.presId);
                },
                studentList: UserFactory => UserFactory.fetchAll()
            },
            controller: ($scope, presentation, studentList, Socket) => {
                $scope.display =  {
                    mode: 'teacher'
                };

                $scope.studentList = [];

                Socket.emit('request join', {
                    presentation: presentation._id
                });

                Socket.on("student joined", function(student){
                    $scope.studentList.push(student);
                })
                $scope.presentation = presentation;
                // $scope.studentList = studentList;
                $scope.slides = presentation.markdown.split('$$$');

                Socket.on("somebody left", function(studentId){
                    $scope.studentList = $scope.studentList.filter(function(student){
                        return student._id !== studentId;
                    })
                })
            }
        });
});
