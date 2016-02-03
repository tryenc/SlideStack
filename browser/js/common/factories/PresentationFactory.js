app.factory('PresentationFactory', function ($http) {
    return {
        create (newPres) {
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

        update (presentation) {
            return $http({
                url: '/api/presentations/' + presentation._id,
                method: 'PUT',
                data: presentation
            })
            .then(res => res.data);
        },

        updatePresentationClass(singleClass, presentation) {
            presentation.class = singleClass._id;
        }
    }
});
