// Directive to set an element's height based on its width
app.directive('ratio', function () {
    return {
        restrict: 'A',
        scope: {
            ratio: '@'
        },
        link: function (scope, element, attrs) {
            const width = element[0].scrollWidth;
            const ratio = parseFloat(scope.ratio, 10);

            if (Number.isNaN(ratio)) return;

            console.log('ratio: ', ratio);
            console.log('width: ', width);
            console.dir(element[0]);
            element.css('height', (width / ratio).toString() + 'px');
        }
    }
})

app.directive('relativeFont', function() {
  return {
      restrict: 'A',
      link: function (scope, element){
        const width = element[0].scrollWidth;
        const height = element[0].scrollHeight;
        element.css('font-size', (width/75).toString() + 'px');
      }
  }
})
