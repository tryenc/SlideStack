app.config( ($stateProvider) => {

    $stateProvider.state('teacherView', {

        url: '/teacherView',
        template: '<ss-student-list studentList="studentList"></ss-student-list>',
        resolve: {
            studentList: ClassFactory.fetchStudentsByClass()
        }
    });
});
