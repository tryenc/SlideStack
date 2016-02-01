app.factory('ClassFactory', function($http) {

	return {

		create: function (newClass) {
			return $http({
				url: '/api/classes/',
				method: 'POST',
				data: newClass
			})
			.then(res => res.data);
		},

		fetchById: function (classId) {
			return $http({
				url: '/api/classes/' + classId,
				method: 'GET'
			})
			.then(res => res.data);
		},

		fetchAll: function () {
			return $http({
				url: '/api/classes/',
				method: 'GET'
			})
			.then(res => res.data);
		},

		update: function (classToUpdate) {
			return $http({
				url: '/api/classes/' + classToUpdate._id,
				method: 'PUT',
				data: classToUpdate
			})
			.then(res => res.data);
		},

		delete: function (classId) {
			return $http({
				url: '/api/classes/' + classId,
				method: 'DELETE'
			})
			.then(res => res.data);
		},

        updateClasses (classToAddOrRemove, user) {
            const classIndexOfUser = user.classes.indexOf(classToAddOrRemove);
            if (classIndexOfUser === -1) {   // Class not found
                user.classes.push(classToAddOrRemove)
            } else {
                user.classes.splice(classIndexOfUser, 1)
            }
        }
	};
});
