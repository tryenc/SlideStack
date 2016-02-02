app.config( $stateProvider => {

    $stateProvider.state('teacherView', {

        url: '/teacherView',
        template: '<ss-student-list></ss-student-list>',
        resolve: {
            userList (UserFactory) {

            }
        }
    });

});
