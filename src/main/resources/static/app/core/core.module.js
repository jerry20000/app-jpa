(function () {
    'use strict';

    angular.module('app.core', []);

    angular.module('app.core').run(['$ocLazyLoad', function ($ocLazyLoad) {
        $ocLazyLoad.load([
            'app/core/core.controller.js'
        ]);
    }]);
})();