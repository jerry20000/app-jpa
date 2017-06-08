(function () {
    'use strict';

    angular.module('app.dashboard', []);

    angular.module('app.dashboard').run(['$ocLazyLoad', function ($ocLazyLoad) {
        $ocLazyLoad.load([
            'app/dashboard/dashboard.controller.js'
        ]);
    }]);
})();