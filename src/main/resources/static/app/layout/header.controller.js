(function () {
    'use strict';

    angular.module('app')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$scope'];

    function HeaderController($scope) {
        $scope.$on('$includeContentLoaded', function ($scope) {
            Layout.initHeader();
            App.initAjax();
        });

        var vm = this;
        vm.notifications = [
            {
                message: "新用户已注册.",
                time: "刚才",
                level: "success",
                icon: "plus"
            }, {
                message: "产品服务器超载.",
                time: "3 分钟",
                level: "danger",
                icon: "bolt"
            }, {
                message: "订单服务器未应答.",
                time: "10 分钟",
                level: "warning",
                icon: "bell-o"
            }, {
                message: "应用程序错误.",
                time: "14 小时",
                level: "info",
                icon: "bullhorn"
            }, {
                message: "数据库超载68%.",
                time: "2 天",
                level: "danger",
                icon: "bolt"
            }, {
                message: "一个用户IP被阻止.",
                time: "3 天",
                level: "danger",
                icon: "bolt"
            }, {
                message: "系统错误.",
                time: "5 天",
                level: "info",
                icon: "bullhorn"
            }
        ];

        vm.messages = [];

        vm.user = {
            name: "管理员"
        }
    }
})();