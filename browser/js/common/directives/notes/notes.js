app.directive('notes', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/notes/notes.html',
        transclude: true,
        link: (scope) => {
            console.log(scope.display);
        }
        //,
        //scope: {
        //    display: "="
        //}
    }
});
