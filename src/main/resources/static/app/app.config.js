(function () {
    'use strict';

    angular.module('app').constant('SERVER_CONFIG', {
        URL: 'http://localhost',
        PORT: '41234'
    });

    angular.module('app').factory('settings', ['$rootScope', 'SERVER_CONFIG', function ($rootScope, SERVER_CONFIG) {
        var settings = {
            layout: {
                pageSidebarClosed: false,
                pageContentWhite: true,
                pageBodySolid: false,
                pageAutoScrollOnLoad: 1000
            },
            assetsPath: 'assets',
            globalPath: 'assets/global',
            layoutPath: 'assets/layouts/layout',
            baseUrl: SERVER_CONFIG.URL + ':' + SERVER_CONFIG.PORT
        };

        $rootScope.settings = settings;

        return settings;
    }]);

    angular.module('app').run(['$rootScope', '$location', '$http', '$log', function ($rootScope, $location, $http, $log) {
        // $http.defaults.headers.common['authorization'] = 'Bearer 4ace45fdc5dd83c93cf644f9b04a0b99';
        $rootScope.$on('$routeChangeStart', function (evt, next, current) {
            console.log(next);
            if (!next.allowAnonymous && !$rootScope.currentUser) {
                $log.log('Authentication required, redirect to login.');
                var returnUrl = $location.url();
                $log.log('return url is ' + returnUrl);
                //
                event.preventDefault();
                $location.path('/login').search({returnUrl: returnUrl});
            }
        });
    }]);

    angular.module('app').run(['$rootScope', 'settings', '$state', function ($rootScope, settings, $state) {
        $rootScope.$state = $state;
        $rootScope.$settings = settings;
    }]);

    angular.module('app').run(handleRoutingErrors);

    handleRoutingErrors.$inject = ['$rootScope'];

    var handlingRouteChangeError = false;

    function handleRoutingErrors($rootScope) {
        $rootScope.$on('$routeChangeError',
            function (event, current, previous, rejection) {
                if (handlingRouteChangeError) {
                    return;
                }
                handlingRouteChangeError = true;
                var destination = (current && (current.title ||
                    current.name || current.loadedTemplateUrl)) ||
                    'unknown target';
                var msg = 'Error routing to ' + destination + '. ' +
                    (rejection.msg || '');

                /**
                 * Optionally log using a custom service or $log.
                 * (Don't forget to inject custom service)
                 */
                logger.warning(msg, [current]);

                /**
                 * On routing error, go to another route/state.
                 */
                $location.path('/');

            }
        );
    }
})();
