app.directive('fiddleView', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/fiddle/fiddle-view/fiddle-view.html',
        require: '^fiddle',
        scope: {},
        link: function (scope, element, attrs, fiddleCtrl) {
            scope.mode = 'View';
            fiddleCtrl.addTab(scope);
        }
    }
})
