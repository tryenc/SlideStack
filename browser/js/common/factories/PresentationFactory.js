app.factory('Presentation', function ($http) {
    return {
        create: function (newPres) {
            return $http({
                url: '/api/presentations/',
                method: 'POST',
                data: newPres
            })
            .then(res => res.data);
        },

        fetchById: function (id) {
            return $http({
                url: '/api/presentations/' + id,
                method: 'GET'
            })
            .then(res => res.data);
        },

        update: function (presentation) {
            return $http({
                url: '/api/presentations/' + presentation._id,
                method: 'PUT',
                data: presentation
            })
            .then(res => res.data);
        }
    }
})
