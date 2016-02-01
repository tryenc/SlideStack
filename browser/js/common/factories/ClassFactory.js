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

        updateClasses (classIdToCheck, user) {
            console.log(classIdToCheck);
            let matched = false,
            found = 0;
            for(let i = 0; i < user.classes.length; i++) {
                if (user.classes[i]._id === classIdToCheck._id) {
                    found = i;
                    matched = true;
                }
            }
            if (matched) {
                user.classes.splice(found, 1)
            } else {
                user.classes.push(classIdToCheck)
            }
        }
	};
});
