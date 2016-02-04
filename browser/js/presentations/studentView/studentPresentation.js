/**
 * Created by Jon on 2/4/16.
 */

// Students
app.config(function ($stateProvider) {
    $stateProvider.state('viewPres', {
        url: '/presentations/:id/student',
        templateUrl: 'js/presentations/studentView/studentPresentation.html',
        resolve: {
            presentation: function (PresentationFactory, $stateParams) {
                return PresentationFactory.fetchById($stateParams.id);
            },
            user: function (AuthService) {
                return AuthService.getLoggedInUser();
            }
        },
        controller: function ($scope, presentation, Socket, user) {
            $scope.slides = presentation.markdown.split('$$$');

            Socket.on('connect', function () {
                console.log("Connected!");
            });

            Socket.emit('request join', {
                presentation: presentation._id,
                student: user
            });
        }
    })
});
