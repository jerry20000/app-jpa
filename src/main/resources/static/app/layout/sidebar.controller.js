(function () {
    'use strict';

    angular.module('app')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$scope'];

    function SidebarController($scope) {
        $scope.$on('$includeContentLoaded', function () {
            Layout.initSidebar();
        });
    }
})();