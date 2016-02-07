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

            $scope.currentQuestion = null;

            $scope.studentList = [];

            // Student Level of confusion handled in the progress
            // bar directive
            $scope.confusion = {
                level: 0
            };

            console.log("HIT")

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
                if (!studentObj.user.name) {
                    $('#questionBox').append
                        ('Anonymous: ' + studentObj.question)
                } else {
                    $('#questionBox').append
                        (studentObj.user.name + ': ' + studentObj.question)
                }
            });

            Socket.onConfusion(data => {
                console.log("Inside the on confusion listener");
                $scope.confusion.level += 100;
                $scope.$digest();
            });

            Socket.onRetractConfusion(data => {
                console.log("Inside the on retract confusion");
                $scope.confusion.level -= 100;
                $scope.$digest();
            });
        }
    });
});
