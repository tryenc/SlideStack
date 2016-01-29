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
               }
           }
       })
       .state('admin.presentations', {
           url: '/presentations',
           templateUrl: 'js/admin/admin.presentations.html'
       })
       .state('admin.users', {
           url: '/users',
           templateUrl: 'js/admin/admin.users.html'
       })
});

app.controller('AdminCtrl', ($scope, presentations, users) => {
    $scope.users = users;
    $scope.users = $scope.users.map(user => {
        user.classNames = fillClassesNames(user);
    });

    $scope.teachers = users.filter(user => {
        return user.isTeacher;
    });

    $scope.students = users.filter(user => {
        return user.isStudent;
    });

    $scope.presentations = presentations;

    $scope.items = [
        { label: 'Users', state: 'admin.users' },
        { label: 'Presentations', state: 'admin.presentations' }
    ];

    function fillClassesNames(user) {
        let classes = '';
        user.classes.forEach(oneClass => {
            classes += (oneClass.name.toString() + ', ');
        });
        return classes;
    }
});
