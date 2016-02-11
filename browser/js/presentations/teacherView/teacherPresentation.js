app.config(function ($stateProvider) {

    $stateProvider.state('teacherPres', {
        url: '/presentations/:id/teacher',
        templateUrl: 'js/presentations/teacherView/teacherPresentation.html',
        resolve: {
            presentation: (PresentationFactory, $stateParams) => PresentationFactory.fetchById($stateParams.id),
            studentList: UserFactory => UserFactory.fetchAll()
        },
        controller: ($scope, $state, presentation, PresentationFactory, Socket) => {

            console.log("presentation",presentation);

            $scope.display =  {
                mode: 'teacher'
            };
            
            $scope.currentQuestion = null;

            $scope.studentList = [];

            // Student Level of confusion handled in the progress
            // bar directive
            $scope.confusion = {
                level: 1
            };

            Socket.joinRoom({
                presentation: presentation._id,
                teacher: true
            });

            Socket.onStudentJoin(student => {
                console.log("Student Joined", student);
                $scope.studentList.push(student);
                $scope.$digest();
            });

            $scope.presentation = presentation;

            $scope.goToEdit = function(){
              $state.go('editPres', { id: $scope.presentation._id });
            }

            $scope.slides = presentation.markdown.split('$$$');

            Socket.onStudentLeft(studentId => {
                $scope.studentList = $scope.studentList.filter(student => student._id !== studentId);
                $scope.$digest();
            });

            Socket.onConfusion(data => {
                $scope.confusion.level += (100 / $scope.studentList.length);
                $scope.$digest();
            });

            Socket.onRetractConfusion(data => {
                $scope.confusion.level -= (100 / $scope.studentList.length);
                $scope.$digest();

            });
        }
    });
});
