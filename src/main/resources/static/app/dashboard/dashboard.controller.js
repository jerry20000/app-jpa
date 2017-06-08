(function () {
    'use strict';

    angular.module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$rootScope', '$scope'];

    function DashboardController($rootScope, $scope) {

        activate();

        function activate() {
            setTimeout(function () {
                EcommerceDashboard.init();
            }, 0);

        }
    }

    var EcommerceDashboard = function() {

        function showTooltip(x, y, labelX, labelY) {
            $('<div id="tooltip" class="chart-tooltip">' + (labelY.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')) + 'RMB<\/div>').css({
                position: 'absolute',
                display: 'none',
                top: y - 40,
                left: x - 60,
                border: '0px solid #ccc',
                padding: '2px 6px',
                'background-color': '#fff'
            }).appendTo('body').fadeIn(200);
        }

        var initChart1 = function() {

            var data = [
                ['01', 4],
                ['02', 8],
                ['03', 10],
                ['04', 12],
                ['05', 2125],
                ['06', 324],
                ['07', 1223],
                ['08', 1365],
                ['09', 250],
                ['10', 999],
                ['11', 390]
            ];

            var plot_statistics = $.plot(
                $('#statistics_1'), [{
                    data: data,
                    lines: {
                        fill: 0.6,
                        lineWidth: 0
                    },
                    color: ['#f89f9f']
                }, {
                    data: data,
                    points: {
                        show: true,
                        fill: true,
                        radius: 5,
                        fillColor: '#f89f9f',
                        lineWidth: 3
                    },
                    color: '#fff',
                    shadowSize: 0
                }], {

                    xaxis: {
                        tickLength: 0,
                        tickDecimals: 0,
                        mode: 'categories',
                        min: 0,
                        font: {
                            lineHeight: 15,
                            style: 'normal',
                            variant: 'small-caps',
                            color: '#6F7B8A'
                        }
                    },
                    yaxis: {
                        ticks: 3,
                        tickDecimals: 0,
                        tickColor: '#f0f0f0',
                        font: {
                            lineHeight: 15,
                            style: 'normal',
                            variant: 'small-caps',
                            color: '#6F7B8A'
                        }
                    },
                    grid: {
                        backgroundColor: {
                            colors: ['#fff', '#fff']
                        },
                        borderWidth: 1,
                        borderColor: '#f0f0f0',
                        margin: 0,
                        minBorderMargin: 0,
                        labelMargin: 20,
                        hoverable: true,
                        clickable: true,
                        mouseActiveRadius: 6
                    },
                    legend: {
                        show: false
                    }
                }
            );

            var previousPoint = null;

            $('#statistics_1').bind('plothover', function(event, pos, item) {
                $('#x').text(pos.x.toFixed(2));
                $('#y').text(pos.y.toFixed(2));
                if (item) {
                    if (previousPoint != item.dataIndex) {
                        previousPoint = item.dataIndex;

                        $('#tooltip').remove();
                        var x = item.datapoint[0].toFixed(2),
                            y = item.datapoint[1].toFixed(2);

                        showTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1]);
                    }
                } else {
                    $('#tooltip').remove();
                    previousPoint = null;
                }
            });

        }

        var initChart2 = function() {

            var data = [
                ['01', 10],
                ['02', 0],
                ['03', 10],
                ['04', 12],
                ['05', 212],
                ['06', 324],
                ['07', 122],
                ['08', 136],
                ['09', 250],
                ['10', 99],
                ['11', 190]
            ];

            var plot_statistics = $.plot(
                $('#statistics_2'), [{
                    data: data,
                    lines: {
                        fill: 0.6,
                        lineWidth: 0
                    },
                    color: ['#BAD9F5']
                }, {
                    data: data,
                    points: {
                        show: true,
                        fill: true,
                        radius: 5,
                        fillColor: '#BAD9F5',
                        lineWidth: 3
                    },
                    color: '#fff',
                    shadowSize: 0
                }], {

                    xaxis: {
                        tickLength: 0,
                        tickDecimals: 0,
                        mode: 'categories',
                        min: 0,
                        font: {
                            lineHeight: 14,
                            style: 'normal',
                            variant: 'small-caps',
                            color: '#6F7B8A'
                        }
                    },
                    yaxis: {
                        ticks: 3,
                        tickDecimals: 0,
                        tickColor: '#f0f0f0',
                        font: {
                            lineHeight: 14,
                            style: 'normal',
                            variant: 'small-caps',
                            color: '#6F7B8A'
                        }
                    },
                    grid: {
                        backgroundColor: {
                            colors: ['#fff', '#fff']
                        },
                        borderWidth: 1,
                        borderColor: '#f0f0f0',
                        margin: 0,
                        minBorderMargin: 0,
                        labelMargin: 20,
                        hoverable: true,
                        clickable: true,
                        mouseActiveRadius: 6
                    },
                    legend: {
                        show: false
                    }
                }
            );

            var previousPoint = null;

            $('#statistics_2').bind('plothover', function(event, pos, item) {
                $('#x').text(pos.x.toFixed(2));
                $('#y').text(pos.y.toFixed(2));
                if (item) {
                    if (previousPoint != item.dataIndex) {
                        previousPoint = item.dataIndex;

                        $('#tooltip').remove();
                        var x = item.datapoint[0].toFixed(2),
                            y = item.datapoint[1].toFixed(2);

                        showTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1]);
                    }
                } else {
                    $('#tooltip').remove();
                    previousPoint = null;
                }
            });

        }

        return {

            //main function
            init: function() {
                initChart1();

                $('#statistics_orders_tab').on('shown.bs.tab', function(e) {
                    initChart2();
                });
            }

        };

    }();


})();