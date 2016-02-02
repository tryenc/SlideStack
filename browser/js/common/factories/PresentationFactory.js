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

        updatePresentation(singleClass, presentation) {
            console.log("SingleClass ",singleClass)
            for(let i = 0; i < presentation.classes.length; i++) {
                if (presentation.classes[i]._id === singleClass._id) {
                    presentation.classes.splice(i, 1);
                    return;
                }
            }
            presentation.classes.push(singleClass._id)
        }
    }
});
