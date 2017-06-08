(function () {
    'use strict';

    angular.module('app')
        .controller('AppController', AppController);

    AppController.$inject = ['$scope', '$rootScope'];


    function AppController($scope, $rootScope) {
        $scope.$on('$viewContentLoaded', function () {
            //App.initComponents(); // init core components
            //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive
            App.initAjax();
        });
    }
})();