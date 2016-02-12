app.factory('ClassFactory', function($http) {

	return {

		create (newClass) {
			return $http({
				url: '/api/classes/',
				method: 'POST',
				data: newClass
			})
			.then(res => res.data);
		},

		fetchById (classId) {
			return $http({
				url: '/api/classes/' + classId,
				method: 'GET'
			})
			.then(res => res.data);
		},

		fetchAll () {
			return $http({
				url: '/api/classes/',
				method: 'GET'
			})
			.then(res => res.data);
		},

		fetchByTeacher (userId) {
			return $http({
                url: '/api/classes/teacher/' + userId,
				method: 'GET'
			})
			.then(res => res.data);
		},

    fetchByStudent (userId) {
        return $http({
            url: '/api/classes/student/' + userId,
            method: 'GET'
        })
        .then(res => res.data);
    },

		update (classId, updates) {
			return $http({
				url: '/api/classes/' + classId,
				method: 'PUT',
				data: updates
			})
			.then(res => res.data);
		},

		delete (classId) {
			return $http({
				url: '/api/classes/' + classId,
				method: 'DELETE'
			})
			.then(res => res.data);
		}
	};
});
