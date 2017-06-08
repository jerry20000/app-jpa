(function () {
    'use strict';

    angular.module('app.core').controller('NavController', NavController);

    NavController.$inject = ['$location'];

    function NavController($location) {
        var vm = this;

        vm.areas = [{
            id: 'cq',
            title: '重庆',
            value: 1
        }]

/*
        vm.navItems = [{
            id: 'home',
            title: '首页',
            url: '#/home'
        }, {
            id: 'institution',
            title: '机构',
            url: '#/institution'
        }, {
            id: 'supervision',
            title: '监控',
            url: '#/supervision'
        }];*/

        vm.navItems = [{
            id: 'register',
            title: '免费注册',
            url: '#/register'
        }, {
            id: 'home',
            title: '首页',
            url: '#/home'
        }, {
            id: 'login',
            title: '个人中心',
            url: '#/login'
        }];
        vm.moreItems = [{
            id: 'profile',
            title: '个人资料',
            url: '#/profile'
        }];
        vm.logoutItem = {
            id: 'logout',
            title: '登出',
            url: '#/logout'
        };
        vm.selectedItem = {};
        vm.itemClick = itemClick;

        activate();

        function activate() {
            var items = vm.navItems;
            var defaultItem = 'home';
            var currentPath = $location.path();
            angular.forEach(items, function (v, i, o) {
                if (('#' + currentPath) == v.url) {
                    vm.selectedItem = v;
                }
                if (currentPath == '') {
                    vm.itemClick(defaultItem);
                }
            });
        }

        function itemClick(item) {
            vm.selectedItem = item;
        }

    }
})();
