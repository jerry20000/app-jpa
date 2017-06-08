(function () {
    'use strict';

    angular.module('app.statistics', []);

    angular.module('app.statistics').run(['$ocLazyLoad', function ($ocLazyLoad) {
        $ocLazyLoad.load([
            'app/statistics/statistics.controller.js',
            'app/statistics/statistics.service.js'
        ]);
    }]);
})();