app.directive('slideshow', function () {
    return {
        restict: 'E',
        scope: {},
        transclude: true,
        template: '<ng-transclude></ng-transclude>',
        link: function (scope, el, attrs) {
            el.addClass('reveal');
            Reveal.initialize();
        }
    }
})
