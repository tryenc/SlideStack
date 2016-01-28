app.factory('User', function ($http) {
    return {
        fetchById: function (id) {
            return $http({
                url: '/api/users/' + id,
                method: 'GET'
            })
            .then(res => res.data);
        }
    }
})
