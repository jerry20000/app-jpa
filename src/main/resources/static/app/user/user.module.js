(function () {
    'use strict';

    angular.module('app.user', []);

    angular.module('app.user').run(['$ocLazyLoad', function ($ocLazyLoad) {
        $ocLazyLoad.load([
            'app/user/user.controller.js',
            'app/user/user.service.js'
        ]);
    }]);
})();