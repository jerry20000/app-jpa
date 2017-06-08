(function () {
    'use strict';

    angular.module('app.statistics').factory('statisticsService', StatisticsService);

    StatisticsService.$inject = ['$rootScope', '$timeout'];

    function StatisticsService($rootScope, $timeout) {
        var service = {
            init: init
        };

        return service;

        function init() {
            $timeout(timeoutFn, 0);
        }

        function timeoutFn() {
            ChartsFlotcharts.initBarCharts();
            ChartsFlotcharts.initPieCharts();
            ChartsFlotcharts.initCharts();
        }


    }

    var ChartsFlotcharts = function () {

        return {
            //main function to initiate the module

            init: function () {

                App.addResizeHandler(function () {
                    Charts.initPieCharts();
                });

            },

            initBarCharts: function () {

                // bar chart:
                var data = GenerateSeries(0);

                data = [
                    [1, 123],
                    [2, 321],
                    [3, 1100],
                    [4, 12],
                    [5, 1345],
                    [6, 1232],
                    [7, 50],
                    [8, 231],
                    [9, 1221]
                ];

                function GenerateSeries(added) {
                    var data = [];
                    var start = 100 + added;
                    var end = 200 + added;

                    for (var i = 1; i <= 20; i++) {
                        var d = Math.floor(Math.random() * (end - start + 1) + start);
                        data.push([i, d]);
                        start++;
                        end++;
                    }

                    return data;
                }

                var options = {
                    series: {
                        bars: {
                            show: true
                        }
                    },
                    xaxis: {
                        show: true,
                        ticks: [
                            [1, "油品"],
                            [2, "滤芯"],
                            [3, "火花塞"],
                            [4, "玻璃水"],
                            [5, "保险杠"],
                            [6, "叶子板"],
                            [7, "轮毂"],
                            [8, "灯具"],
                            [9, "电瓶"]
                        ]
                    },
                    bars: {
                        barWidth: 0.8,
                        lineWidth: 0, // in pixels
                        shadowSize: 0,
                        align: 'left',
                        fillColor: '#67b7dc'
                    },
                    grid: {
                        tickColor: "#eee",
                        borderColor: "#eee",
                        borderWidth: 1,
                        hoverable: true
                    }

                };

                if ($('#chart_3').size() !== 0) {
                    $.plot($("#chart_3"), [{
                        data: data,
                        lines: {
                            lineWidth: 1
                        },
                        shadowSize: 0
                    }], options);
                }
            },

            initPieCharts: function () {

                var data = [];
                var series = Math.floor(Math.random() * 10) + 1;
                series = series < 5 ? 5 : series;

                for (var i = 0; i < series; i++) {
                    data[i] = {
                        label: "Series" + (i + 1),
                        data: Math.floor(Math.random() * 100) + 1
                    };
                }

                data = [
                    {
                        label: "保养件",
                        data: 200
                    }, {
                        label: "碰撞易碎件",
                        data: 100
                    }, {
                        label: "维修件",
                        data: 150
                    }, {
                        label: "结构件",
                        data: 10
                    }, {
                        label: "其他分类",
                        data: 100
                    }
                ];

                if ($('#chart_1').size() !== 0) {
                    $.plot($("#chart_1"), data, {
                        series: {
                            pie: {
                                show: true
                            }
                        },
                        legend: {
                            show: false
                        }
                    });
                }

            },

            initCharts: function () {

                function showChartTooltip(x, y, xValue, yValue) {
                    $('<div id="tooltip" class="chart-tooltip">' + yValue + '<\/div>').css({
                        position: 'absolute',
                        display: 'none',
                        top: y - 40,
                        left: x - 40,
                        border: '0px solid #ccc',
                        padding: '2px 6px',
                        'background-color': '#fff'
                    }).appendTo("body").fadeIn(200);
                }

                if ($('#chart_2').size() != 0) {
                    //site activities
                    var previousPoint2 = null;
                    $('#chart_2_loading').hide();
                    $('#chart_2_content').show();

                    var data1 = [
                        ['DEC', 300],
                        ['JAN', 600],
                        ['FEB', 1100],
                        ['MAR', 1200],
                        ['APR', 860],
                        ['MAY', 1200],
                        ['JUN', 1450],
                        ['JUL', 1800],
                        ['AUG', 1200],
                        ['SEP', 600]
                    ];


                    var plot_statistics = $.plot($("#chart_2"),

                        [{
                            data: data1,
                            lines: {
                                fill: 0.2,
                                lineWidth: 0,
                            },
                            color: ['#BAD9F5']
                        }, {
                            data: data1,
                            points: {
                                show: true,
                                fill: true,
                                radius: 4,
                                fillColor: "#9ACAE6",
                                lineWidth: 2
                            },
                            color: '#9ACAE6',
                            shadowSize: 1
                        }, {
                            data: data1,
                            lines: {
                                show: true,
                                fill: false,
                                lineWidth: 3
                            },
                            color: '#9ACAE6',
                            shadowSize: 0
                        }],

                        {

                            xaxis: {
                                tickLength: 0,
                                tickDecimals: 0,
                                mode: "categories",
                                min: 0,
                                font: {
                                    lineHeight: 18,
                                    style: "normal",
                                    variant: "small-caps",
                                    color: "#6F7B8A"
                                }
                            },
                            yaxis: {
                                ticks: 5,
                                tickDecimals: 0,
                                tickColor: "#eee",
                                font: {
                                    lineHeight: 14,
                                    style: "normal",
                                    variant: "small-caps",
                                    color: "#6F7B8A"
                                }
                            },
                            grid: {
                                hoverable: true,
                                clickable: true,
                                tickColor: "#eee",
                                borderColor: "#eee",
                                borderWidth: 1
                            }
                        });

                    $("#chart_2").bind("plothover", function (event, pos, item) {
                        $("#x").text(pos.x.toFixed(2));
                        $("#y").text(pos.y.toFixed(2));
                        if (item) {
                            if (previousPoint2 != item.dataIndex) {
                                previousPoint2 = item.dataIndex;
                                $("#tooltip").remove();
                                var x = item.datapoint[0].toFixed(2),
                                    y = item.datapoint[1].toFixed(2);
                                showChartTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1] + 'M$');
                            }
                        }
                    });

                    $('#chart_2').bind("mouseleave", function () {
                        $("#tooltip").remove();
                    });
                }
            }
        };
    }();

})();
