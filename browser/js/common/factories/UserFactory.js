app.factory('UserFactory', function($http) {

	return {

		create: function (newUser) {
			return $http({
				url: '/api/users/',
				method: 'POST',
				data: newUser
			})
			.then(res => res.data);
		},

		fetchById: function (userId) {
			return $http({
				url: '/api/users/' + userId,
				method: 'GET'
			})
			.then(res => res.data);
		},

		fetchAll: function () {
			return $http({
				url: '/api/users/',
				method: 'GET'
			})
			.then(res => res.data);
		},

		udpate: function (user) {
			return $http({
				url: '/api/users/' + user._id,
				method: 'PUT',
				data: user
			})
			.then(res => res.data);
		},

		delete: function (userId) {
			return $http({
				url: '/api/users/' + userId,
				method: 'DELETE'
			})
			.then(res => res.data);
		}

	};
});
