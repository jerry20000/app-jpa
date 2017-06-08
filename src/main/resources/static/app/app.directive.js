(function () {
    'use strict';

    angular.module('app').directive('ngSpinnerBar', ngSpinnerBarDirective);
    angular.module('app').directive('a', aDirective);
    angular.module('app').directive('dropdownMenuHover', dropdownMenuHoverDirective);

    ngSpinnerBarDirective.$inject = ['$rootScope'];

    function ngSpinnerBarDirective($rootScope) {
        return {
            link: function (scope, element, attrs) {
                element.addClass('hide');

                $rootScope.$on('$stateChangeStart', function () {
                    element.removeClass('hide');
                });

                $rootScope.$on('$stateChangeSuccess', function () {
                    element.addClass('hide');
                    $('body').removeClass('page-on-load');
                    Layout.setSidebarMenuActiveLink('match');

                    setTimeout(function () {
                        App.scrollTop();
                    }, $rootScope.settings.layout.pageAutoScrollOnLoad);
                });

                $rootScope.$on('$stateNotFound', function () {
                    element.addClass('hide');
                });

                $rootScope.$on('$stateChangeError', function () {
                    element.addClass('hide');
                });
            }
        };
    }

    function aDirective() {
        return {
            restrict: 'E',
            link: function (scope, elem, attrs) {
                if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                    elem.on('click', function (e) {
                        e.preventDefault();
                    });
                }
            }
        };
    }

    function dropdownMenuHoverDirective() {
        return {
            link: function (scope, elem) {
                elem.dropdownHover();
            }
        };
    }

})();