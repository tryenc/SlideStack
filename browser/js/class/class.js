app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/classes/:id', '/classes/:id/presentations');
    $stateProvider
    .state('class', {
        url: '/classes/:id',
        templateUrl: 'js/class/class.html',
        controller: 'classCtrl',
        resolve: {
          currClass: function(ClassFactory, $stateParams){
              return ClassFactory.fetchById($stateParams.id);
          },
          loggedInUser: function (AuthService) {
              return AuthService.getLoggedInUser();
          }
        }
    })
    .state('class.presentations', {
        url: '/presentations',
        templateUrl: 'js/class/classPresentations/classPresentations.html',
        controller: 'classPresCtrl'
    })
    .state('class.students', {
        url: '/students',
        templateUrl: 'js/class/classStudents/classStudents.html',
        controller: 'classStudsCtrl'
    })

});

app.controller('classCtrl', function ($scope, $state, currClass, loggedInUser, UserFactory, ClassFactory) {
  $scope.className = currClass.foundClass.name;
  $scope.image = currClass.foundClass.imageUrl;
  $scope.teacher = currClass.foundClass.teacher;
  $scope.description = currClass.foundClass.description;
  $scope.loggedInUser = loggedInUser;
});
