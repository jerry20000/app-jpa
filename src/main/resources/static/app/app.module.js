(function () {
    'use strict';

    angular.module('app', [
        'ui.router',
        'ui.bootstrap',
        'oc.lazyLoad',
        'ngSanitize',
        'ngResource'
        //'app.shared',
        //'app.auth',
        //'app.setting'
    ]);

    angular.module('app').run(['$ocLazyLoad', function ($ocLazyLoad) {
        $ocLazyLoad.load([
            'app/core/core.module.js',
            'app/shard/shard.module.js',
            'app/page/myPagination.module.js',
            'app/dashboard/dashboard.module.js',
            'app/statistics/statistics.module.js',
            'app/user/user.module.js'
        ]);
    }]);

})();
