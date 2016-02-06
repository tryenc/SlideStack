app.directive('fiddle', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/fiddle/fiddle.html',
        controller: function ($scope, $element) {
            $scope.tabs = [];
            let viewTab;


            this.addTab = function (tab) {
                $scope.tabs.push(tab);
                if ($scope.tabs.length === 1) tab.selected = true;
            };

            const showPage = function () {
                let html = $scope.tabs[0].code.text;
                let css = $scope.tabs[1].code.text;
                let js = $scope.tabs[2].code.text;

                html = '<head>' +
                           '<style>' + css + '</style>' +
                       '</head>' +
                       '<body>' +
                           html +
                           '<script>' + js + '</script>' +
                       '</body>';

                $element.find('iframe').attr('srcdoc', html);
            }

            $scope.select = function (selectedTab) {
                $scope.tabs.forEach(tab => tab.selected = false);
                if (selectedTab.mode === 'View') showPage();
                selectedTab.selected = true;
            };

        }
    }
})
