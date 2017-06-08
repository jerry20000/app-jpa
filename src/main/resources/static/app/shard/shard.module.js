(function () {
    'use strict';

    angular.module('app.shard', []);

    angular.module('app.shard').run(['$ocLazyLoad', function ($ocLazyLoad) {
        $ocLazyLoad.load([
            'app/shard/shard.table.service.js'
        ]);
    }]);
})();