(function () {
    'use strict';

    angular.module('app.statistics')
        .controller('StatisticsController', StatisticsController);

    StatisticsController.$inject = ['statisticsService'];

    function StatisticsController(statisticsService) {

        activate();

        function activate() {
            statisticsService.init();
        }
    }

})();