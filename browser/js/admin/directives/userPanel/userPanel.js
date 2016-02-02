/**
 * Created by Jon on 1/29/16.
 */
app.directive('userPanel', (ClassFactory) => {
   return {
       restrict: 'E',
       scope: {
           users: '=',
           type: '@'
       },
       templateUrl: 'js/admin/directives/userPanel/userPanel.html',
       controller: 'UserPanelCtrl'
   };
});
