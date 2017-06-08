(function () {
    'use strict';

    angular.module('app.shard').factory('tableService', TableService);

    TableService.$inject = [];

    function TableService() {
        var service = {
            run: run
        };

        return service;

        function run(options) {
            handleRecords(options);
        }

        function handleRecords(options) {

            options = $.extend(true, {
                src: '',
                onSuccess: function (grid) {
                    // execute some code after table records loaded
                },
                onError: function (grid) {
                    // execute some code on network or other general error
                },
                loadingMessage: '正在加载中...',
                dataTable: {
                    'ajax': '',
                    'language': {
                        'metronicGroupActions': '_TOTAL_ 条已选中: ',

                        'metronicAjaxRequestGeneralError': '请求失败. 请检查你的网络连接.',
                        'aria': {
                            'sortAscending': ': activate to sort column ascending',
                            'sortDescending': ': activate to sort column descending'
                        },
                        'emptyTable': 'No data available in table',
                        'info': '<span class="seperator">|</span>共找到 _TOTAL_ 条记录',
                        'infoEmpty': '无记录',
                        'infoFiltered': '(从 _MAX_ 条记录过滤)',
                        'lengthMenu': '页<span class="seperator">|</span>每页 _MENU_ 条记录',
                        'search': '搜索:',
                        'zeroRecords': '没有找到记录',
                        'paginate': {
                            'previous': '上一页',
                            'next': '下一页',
                            'last': '末页',
                            'first': '首页',
                            'page': '第',
                            'pageOf': '页, 共'
                        }
                    },
                    'bStateSave': false, // save datatable state(pagination, sort, etc) in cookie.
                    'lengthMenu': [
                        [5, 10, 20, 50, 100, -1],
                        [5, 10, 20, 50, 100, '全部']
                    ],
                    'pageLength': 5,
                    'columnDefs': [{
                        'targets': '_all',
                        'orderable': false,
                        'searchable': false
                    }, {
                        'targets': 0,
                        'render': function (data, type, full, meta) {
                            return '<input type="checkbox" name="id[]" value="' + data + '">';
                        }
                    }],
                    'order': []
                }
            }, options);

            var grid = new Datatable();

            grid.init(options);

            // handle group actionsubmit button click
            grid.getTableWrapper().on('click', '.table-group-action-submit', function (e) {
                e.preventDefault();
                var action = $('.table-group-action-input', grid.getTableWrapper());
                if (action.val() != '' && grid.getSelectedRowsCount() > 0) {
                    grid.setAjaxParam('customActionType', 'group_action');
                    grid.setAjaxParam('customActionName', action.val());
                    grid.setAjaxParam('id', grid.getSelectedRows());
                    grid.getDataTable().ajax.reload();
                    grid.clearAjaxParams();
                } else if (action.val() == '') {
                    App.alert({
                        type: 'danger',
                        icon: 'warning',
                        message: '请选择操作',
                        container: grid.getTableWrapper(),
                        place: 'prepend'
                    });
                } else if (grid.getSelectedRowsCount() === 0) {
                    App.alert({
                        type: 'danger',
                        icon: 'warning',
                        message: '未选择记录',
                        container: grid.getTableWrapper(),
                        place: 'prepend'
                    });
                }
            });
        }

    }

})();
