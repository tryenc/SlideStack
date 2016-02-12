app.controller('classStudsCtrl', function ($scope, $state, currClass, UserFactory, ClassFactory) {
  $scope.className = currClass.foundClass.name;
  $scope.image = currClass.foundClass.imageUrl;
  $scope.teacher = currClass.foundClass.teacher;
  $scope.description = currClass.foundClass.description;
  $scope.students = currClass.foundClass.students;

  console.log('scope.teacher: ', $scope.teacher);

  $scope.findByName = function(query){
    UserFactory.findByName(query)
    .then(foundUsers => {
      if (foundUsers.length === 0){
        //display error
      }
      $scope.foundUsers = foundUsers;
    })
  }
  //creates list of student IDs
  var studentIds = $scope.students.map(function(student){
    return student._id;
  })

  $scope.addToClass = function(studentId){
    studentIds.push(studentId);
    var newStudents = {students: studentIds};
    ClassFactory.update(currClass.foundClass._id, newStudents)
    .then(function(){
      $state.reload();
    });
  }

  $scope.deleteStudent = function(studentId){
    studentIds = studentIds.filter(function(student){
        return student != studentId;
    })
    var newStudents = {students: studentIds};
    ClassFactory.update(currClass.foundClass._id, newStudents)
    .then(function(){
      $state.reload();
    });
  }

});
