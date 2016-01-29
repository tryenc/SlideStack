/**
 * Created by Jon on 1/29/16.
 */
app.directive('userPanel', () => {
   return {
       restrict: 'E',
       scope: {
           users: '=',
           type: '@'
       },
       templateUrl: 'js/common/directives/userPanel/userPanel.html'
   };
});
