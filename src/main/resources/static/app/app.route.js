(function () {
    'use strict';

    angular.module('app').config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            events: true,
            debug: true,
            modules: [{
                name: 'datatables',
                insertBefore: '#ng_load_plugins_before',
                files: [
                    'assets/global/plugins/datatables/datatables.min.css',
                    'assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
                    'assets/global/plugins/datatables/datatables.all.min.js',
                    'assets/global/scripts/datatable.js'
                ]
            }, {
                name: 'datepicker',
                insertBefore: '#ng_load_plugins_before',
                files: [
                    'assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                    'assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                    'assets/global/plugins/bootstrap-maxlength/bootstrap-maxlength.min.js'
                ]
            }, {
                name: 'fileupload',
                insertBefore: '#ng_load_plugins_before',
                files: [
                    'assets/global/plugins/angularjs/plugins/angular-file-upload/angular-file-upload.min.js'
                ]
            }, {
                name: 'ui.select',
                insertBefore: '#ng_load_plugins_before',
                files: [
                    'assets/global/plugins/angularjs/plugins/ui-select/select.min.css',
                    'assets/global/plugins/angularjs/plugins/ui-select/select.min.js'
                ]
            }, {
                name: 'ui.tree',
                insertBefore: '#ng_load_plugins_before',
                files: [
                    'assets/global/plugins/jstree/dist/themes/default/style.min.css',
                    'assets/global/plugins/jstree/dist/jstree.min.js',
                    'assets/pages/scripts/ui-tree.min.js'
                ]
            }, {
                name: 'ui.grid',
                insertBefore: '#ng_load_plugins_before',
                files: [
                    'lib/plugins/angular-ui-grid/ui-grid.css',
                    'lib/plugins/angular-ui-grid/ui-grid.js'
                ]
            }, {
                name: 'charts',
                insertBefore: '#ng_load_plugins_before',
                files: [
                    'assets/global/plugins/morris/morris.css',
                    'assets/global/plugins/morris/morris.min.js',
                    'assets/global/plugins/morris/raphael-min.js',
                    'assets/global/plugins/jquery.sparkline.min.js',
                    'assets/global/plugins/flot/jquery.flot.min.js',
                    'assets/global/plugins/flot/jquery.flot.resize.min.js',
                    'assets/global/plugins/flot/jquery.flot.categories.min.js',
                    'assets/global/plugins/flot/jquery.flot.pie.min.js'
                ]
            }]
        });
    }]);

    angular.module('app').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/dashboard');

        $stateProvider.state('dashboard', {
            url: '/dashboard',
            templateUrl: 'app/dashboard/dashboard.html',
            controller: 'DashboardController as vm',
            data: {
                pageTitle: '首页'
            },
            resolve: loadPlugins(['charts'])
        }).state('statistics', {
            url: '/statistics',
            templateUrl: 'app/statistics/statistics.html',
            controller: 'StatisticsController as vm',
            data: {
                pageTitle: '统计分析'
            },
            resolve: loadPlugins(['charts'])
        }).state('category', {
            abstract: true,
            url: '/category',
            template: '<ui-view/>',
            data: {
                pageTitle: '分类管理'
            },
            resolve: loadPlugins(['datatables', 'datepicker'])
        }).state('category.list', {
            url: '/list',
            controller: 'CategoryListController as vm',
            templateUrl: 'app/catalog/views/category_list.html'
        }).state('category.view', {
            url: '/view/{id}',
            controller: 'CategoryEditController as vm',
            templateUrl: 'app/catalog/views/category_edit.html',
            data: {
                pageTitle: '查看分类'
            }
        }).state('category.new', {
            url: '/new',
            controller: 'CategoryEditController as vm',
            templateUrl: 'app/catalog/views/category_edit.html',
            data: {
                pageTitle: '新增分类'
            }
        }).state('product', {
            abstract: true,
            url: '/product',
            template: '<ui-view/>',
            data: {
                pageTitle: '产品管理'
            },
            resolve: loadPlugins(['datatables', 'datepicker'])
        }).state('product.list', {
            url: '/list',
            controller: 'ProductListController as vm',
            templateUrl: 'app/catalog/views/product_list.html'
        }).state('product.view', {
            url: '/view/{id}',
            controller: 'ProductEditController as vm',
            templateUrl: 'app/catalog/views/product_edit.html',
            data: {
                pageTitle: '查看产品'
            }
        }).state('product.new', {
            url: '/new',
            controller: 'ProductEditController as vm',
            templateUrl: 'app/catalog/views/product_edit.html',
            data: {
                pageTitle: '新增产品'
            }
        }).state('order', {
            abstract: true,
            url: '/order',
            template: '<ui-view/>',
            data: {
                pageTitle: '订单管理'
            },
            resolve: loadPlugins(['datatables', 'datepicker'])
        }).state('order.list', {
            url: '/list',
            controller: 'OrderListController as vm',
            templateUrl: 'app/order/views/order_list.html'
        }).state('order.view', {
            url: '/view/{id}',
            controller: 'OrderEditController as vm',
            templateUrl: 'app/order/views/order_edit.html',
            data: {
                pageTitle: '查看订单'
            }
        }).state('order.new', {
            url: '/new',
            controller: 'OrderEditController as vm',
            templateUrl: 'app/order/views/order_edit.html',
            data: {
                pageTitle: '新增订单'
            }
        }).state('vendor', {
            abstract: true,
            url: '/vendor',
            template: '<ui-view/>',
            data: {
                pageTitle: '商户管理'
            },
            resolve: loadPlugins(['datatables', 'datepicker'])
        }).state('vendor.list', {
            url: '/list',
            controller: 'VendorListController as vm',
            templateUrl: 'app/vendor/vendor_list.html'
        }).state('vendor.view', {
            url: '/view/{id}',
            controller: 'VendorEditController as vm',
            templateUrl: 'app/vendor/vendor_edit.html',
            data: {
                pageTitle: '查看商户'
            }
        }).state('vendor.new', {
            url: '/new',
            controller: 'VendorEditController as vm',
            templateUrl: 'app/vendor/vendor_edit.html',
            data: {
                pageTitle: '新增商户'
            }
        }).state('customer', {
            abstract: true,
            url: '/customer',
            template: '<ui-view/>',
            data: {
                pageTitle: '买家管理'
            },
            resolve: loadPlugins(['datatables', 'datepicker'])
        }).state('customer.list', {
            url: '/list',
            controller: 'CustomerListController as vm',
            templateUrl: 'app/customer/customer_list.html'
        }).state('customer.view', {
            url: '/view/{id}',
            controller: 'CustomerEditController as vm',
            templateUrl: 'app/customer/customer_edit.html',
            data: {
                pageTitle: '查看买家'
            }
        }).state('user', {
            abstract: true,
            url: '/user',
            template: '<ui-view/>',
            data: {
                pageTitle: '用户管理'
            },
            resolve: loadPlugins(['datatables', 'datepicker'])
        }).state('user.list',{
            url: '/list',
            controller: 'UserListController as vm',
            templateUrl: 'app/user/user_list.html'
        }).state('user.view', {
            url: '/view/{id}',
            controller: 'UserEditController as vm',
            templateUrl: 'app/user/user_edit.html',
            data: {
                pageTitle: '查看用户'
            }
        }).state('user.new', {
            url: '/new',
            controller: 'UserEditController as vm',
            templateUrl: 'app/user/user_edit.html',
            data: {
                pageTitle: '新增用户'
            }
        });

        function loadPlugins(modules) {
            return {
                plugins: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(modules, {
                        cache: true,
                        serie: true,
                        timeout: 5000
                    });
                }]
            };
        }
    }]);

})();
