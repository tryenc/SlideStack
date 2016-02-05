app.config(function ($stateProvider) {

    $stateProvider.state('teacherPres', {
        url: '/presentations/:id/teacher',
        templateUrl: 'js/presentations/teacherView/teacherPresentation.html',
        resolve: {
            presentation: (PresentationFactory, $stateParams) => {
                return PresentationFactory.fetchById($stateParams.id);
            },
            studentList: UserFactory => UserFactory.fetchAll()
        },
        controller: ($scope, presentation, PresentationFactory, Socket) => {
            $scope.display =  {
                mode: 'teacher'
            };

            $scope.studentList = [];

            Socket.joinRoom({
                presentation: presentation._id,
                teacher: true
            });

            Socket.onStudentJoin(student => {
                $scope.studentList.push(student);
            });

            $scope.presentation = presentation; // might not need this
            $scope.slides = presentation.markdown.split('$$$');

            Socket.onStudentLeft(studentId => {
                $scope.studentList = $scope.studentList.filter(student => {
                    return student._id !== studentId;
                });
            });

            Socket.questionAsked(studentObj => {
                console.log("studentObj", studentObj);
            });

        }
    });
});
