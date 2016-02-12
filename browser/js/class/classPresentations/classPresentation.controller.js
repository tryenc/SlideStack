app.controller('classPresCtrl', function ($scope, $state, currClass, UserFactory, ClassFactory) {
    $scope.presentations = currClass.presentations;
});
