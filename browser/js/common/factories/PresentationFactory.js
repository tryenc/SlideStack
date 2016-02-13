app.factory('PresentationFactory', function ($http) {
    return {
        create (newPres) {
            console.log(newPres);
            return $http({
                url: '/api/presentations/',
                method: 'POST',
                data: newPres
            })
            .then(res => res.data);
        },

        fetchAll () {
            return $http({
                url: '/api/presentations/',
                method: 'GET'
            })
            .then(res => res.data);
        },

        fetchById (id) {
            return $http({
                url: '/api/presentations/' + id,
                method: 'GET'
            })
            .then(res => res.data);
        },

        fetchByOwner (userId) {
            return $http({
                url: '/api/users/' + userId + '/presentations',
                method: 'GET'
            })
            .then(res => res.data);
        },

        update (presentation) {
            return $http({
                url: '/api/presentations/' + presentation._id,
                method: 'PUT',
                data: presentation
            })
            .then(res => res.data);
        },

        delete (presentation) {
            return $http({
                url: '/api/presentations/' + presentation._id,
                method: 'DELETE',
                data: presentation
            }).then(res => res.data);

        }
    }
});
