(function () {
    'use strict';

    angular.module('app.page', []);

    angular.module('app.page').run(['$ocLazyLoad', function ($ocLazyLoad) {
        $ocLazyLoad.load([
            'app/page/myPagination.service.js'
        ]);
    }]);
})();