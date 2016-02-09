/**
 * Created by Jon on 1/29/16.
 */
app.config( ($stateProvider, $urlRouterProvider) => {
   $urlRouterProvider.when('/admin', '/admin/classes');
   $stateProvider
       .state('admin', {
           url: '/admin',
           templateUrl: 'js/admin/admin.html',
           controller: 'AdminCtrl',
           abstract: true,
           resolve: {
               presentations: PresentationFactory => PresentationFactory.fetchAll(),
               users: UserFactory => UserFactory.fetchAll(),
               classes: ClassFactory => ClassFactory.fetchAll()
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
