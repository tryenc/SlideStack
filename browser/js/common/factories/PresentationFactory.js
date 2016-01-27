app.factory('Presentation', function ($http) {
    return {
        create: function (newPres) {
            $http({
                url: '/api/presentations/',
                method: 'POST',
                data: newPres
            })
            .then(res => res.data);
        }
    }
})
