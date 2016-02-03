app.directive('teacherTimer', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/teacher-view/teacher-timer/teacher-timer.html',
        controller: 'timerCtrl'
    }
});

app.controller('timerCtrl', function ($scope, $interval) {
      $scope.ms = 0
      $scope.date = new Date().toLocaleTimeString();
      $scope.reset = function(){
        $scope.ms = 0;
      }
      $interval(function(){
        var date = new Date();
        $scope.date = date.toLocaleTimeString();
        $scope.ms+=1000;
      },1000)
});
