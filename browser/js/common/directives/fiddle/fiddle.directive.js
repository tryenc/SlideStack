app.directive('fiddle', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/fiddle/fiddle.html',
        controller: function ($scope, $element) {
            $scope.tabs = [];
            let viewTab;
            let libraries = '';


            this.addTab = function (tab) {
                $scope.tabs.push(tab);
                if ($scope.tabs.length === 1) tab.selected = true;
            };

            $scope.libraries = [
                {
                    name: 'Angular',
                    url: 'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular.min.js',
                    checked: false
                },
                {
                    name: 'JQuery',
                    url: 'https://code.jquery.com/jquery-2.2.0.min.js',
                    checked: false
                }
            ];

            // TODO do this for CSS libraries too
            $scope.addLibrary = function (newLib) {
                newLib.name = newLib.url.match(
                    /(?:\/)[\w*\d*\.*\-*\_*]*\.(js|css)$/
                )[0].slice(1);

                newLib.checked = true;
                $scope.libraries.push(newLib);
                $scope.newLib = {};
            };

            const showPage = function () {
                let html = $scope.tabs[0].code.text;
                let css = $scope.tabs[1].code.text;
                let js = $scope.tabs[2].code.text;

                let scriptLibs = '';
                let styleLibs = '';

                $scope.libraries.forEach(lib => {
                    if (lib.checked && /\.js$/.test(lib.url)) {
                        scriptLibs += '<script src="' + lib.url + '"></script>';
                    }
                    if (lib.checked && /\.css$/.test(lib.url)) {
                        styleLibs += '<link rel="stylesheet" href="' + lib.url + '">'
                    }
                });

                html = '<head>' +
                           styleLibs +
                           '<style>' + css + '</style>' +
                           scriptLibs +
                       '</head>' +
                       '<body>' +
                           html +
                           '<script>' + js + '</script>' +
                       '</body>';

                $element.find('iframe').attr('srcdoc', html);
            };

            $scope.select = function (selectedTab) {
                $scope.tabs.forEach(tab => tab.selected = false);
                if (selectedTab.mode === 'View') showPage();
                selectedTab.selected = true;

                // need to rerender the ace editor when showing the tab
                if (!selectedTab.editor) return;
                selectedTab.editor.renderer.updateFull();
            };

        }
    }
})
