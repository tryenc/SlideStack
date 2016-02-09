app.directive('teacherTimer', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/teacher-timer/teacher-timer.html',
        controller: 'timerCtrl'
    }
});

app.controller('timerCtrl', function ($scope, $interval) {
      $scope.ms = 0
      $scope.date = new Date();
      $scope.reset = function(){
        $scope.ms = 0;
      };
      $interval(function(){
        $scope.date = new Date();
        $scope.ms+=1000;
      },1000)
});
