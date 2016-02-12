app.config(function ($stateProvider) {
    $stateProvider.state('class', {
        url: '/classes/:id',
        templateUrl: 'js/class/class.html',
        controller: 'classCtrl',
        resolve: {
          currClass: function(ClassFactory, $stateParams){
              return ClassFactory.fetchById($stateParams.id);
          }
        }
    });

});

app.controller('classCtrl', function ($scope, $state, currClass, UserFactory) {

    $scope.className = currClass.foundClass.name;
    $scope.image = currClass.foundClass.imageUrl;
    $scope.teacher = currClass.foundClass.teacher;
    $scope.description = currClass.foundClass.description;
    $scope.students = currClass.foundClass.students;
    $scope.presentations = currClass.presentations;

    $scope.isStudOpen = false
    $scope.isPresOpen = true;
    $scope.presOpen = function(){
      $scope.isPresOpen = true;
      $scope.isStudOpen = false
    }
    $scope.studOpen = function(){
      $scope.isPresOpen = false;
      $scope.isStudOpen = true;
    }

    $scope.findByName = function(query){
      UserFactory.findByName(query)
      .then(foundUsers => {
        if (foundUsers.length === 0){
          //display error
        }
        $scope.foundUsers = foundUsers;
      })
    }


});
