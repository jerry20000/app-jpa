(function () {
    'use strict';

    angular.module('app')
        .controller('FooterController', FooterController);

    FooterController.$inject = ['$scope'];

    function FooterController($scope) {
        $scope.$on('$includeContentLoaded', function () {
            Layout.initFooter();
        });
    }
})();