/**
 * Created by Jon on 1/29/16.
 */
app.config($stateProvider => {
   $stateProvider
       .state('admin', {
           url: '/admin',
           templateUrl: 'js/admin/admin.html',
           controller: 'AdminCtrl',
           resolve: {
               presentations: PresentationFactory => {
                   return PresentationFactory.fetchAll();
               },
               users: UserFactory => {
                   return UserFactory.fetchAll();
               },
               classes: ClassFactory => {
                   return ClassFactory.fetchAll();
               }
           }
       })
       .state('admin.presentations', {
           url: '/presentations',
           template: '<presentation-panel presentations="presentations" classes="classes"></presentation-panel>'
       })
       .state('admin.users', {
           url: '/users',
           templateUrl: 'js/admin/admin.users.html'
       })
       .state('admin.classes', {
           url: '/classes',
           template: '<classes-panel classes="classes"></classes-panel>'
       })
});
