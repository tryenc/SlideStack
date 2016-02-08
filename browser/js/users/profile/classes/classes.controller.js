/**
 * Created by Jon on 2/4/16.
 */
app.controller('ProfileClassesCtrl', ($scope, ClassFactory) => {
    $scope.user.classes.forEach(singleClass => {

        ClassFactory.fetchStudentsByClass(singleClass._id)
            .then(classOfStudents => {
                singleClass.students = classOfStudents;
            });
    });
	// let classes = $scope.user.classes;    

	// Promise.map(classes, function(singleClass) {

	// 	let promises = [
	// 		ClassFactory.fetchStudentsByClass(singleClass._id),
	// 		ClassFactory.fetchPresentationsByClass(singleClass._id)
	// 	];

	// 	return Promise.all(promises).then((values) => {
	// 		singleClass.students = values[0];
	// 		singleClass.presentations = values[1];
	// 	})
	// })
});

