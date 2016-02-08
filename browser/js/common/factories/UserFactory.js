app.factory('UserFactory', function($http, AuthService) {

	return {
		// create (newUser) {
		// 	return $http({
		// 		url: '/api/users/',
		// 		method: 'POST',
		// 		data: newUser
		// 	})
		// 	.then(res => res.data);
		// },
		signup: function(user){
			return $http({
				url: '/api/users/',
				method: 'POST',
				data: user
			})
			.then(res => res.data);
		},

		fetchById (userId) {
			return $http({
				url: '/api/users/' + userId,
				method: 'GET'
			})
			.then(res => res.data);
		},

		fetchAll () {
			return $http({
				url: '/api/users/',
				method: 'GET'
			})
			.then(res => res.data);
		},

		update (user) {
			return $http({
				url: '/api/users/' + user._id,
				method: 'PUT',
				data: user
			})
			.then(res => res.data);
		},

		delete (userId) {
			return $http({
				url: '/api/users/' + userId,
				method: 'DELETE'
			})
			.then(res => res.data);
		}

	};
});
