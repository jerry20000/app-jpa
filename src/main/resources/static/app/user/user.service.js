(function () {
    'use strict';

    angular.module('app.user').factory('userService', UserService);

    UserService.$inject = ['$rootScope', '$timeout', '$resource', '$filter'];

    function UserService($rootScope, $timeout, $resource, $filter) {
        var url = $rootScope.settings.baseUrl + '/api/user';

        var userListApi = $resource(url+'/list'); //查询
        //获取
        var userGetApi = $resource(url + '/:id', {
            id: '@id'
        });

        //修改
        var userUpdateApi = $resource(url + '/update/:id', {
            id: '@id'
        }, {
            update: {
                method: 'PUT'
            }
        });

        //新增
        var userSaveApi = $resource(url+'/save');
        //删除
        var userRemoveApi = $resource(url+'/remove'+'/:id',{
            id: '@id'
        });

        var service = {
            list: list,
            get: get,
            save: save,
            update: update,
            remove: remove
        };

       return service;

        function list(user) {
            return userListApi.get(user).$promise;
        }

        function get(id) {
            return userGetApi.get(id).$promise;
        }

        function save(user) {
            return userSaveApi.save(user).$promise;
        }

        function update(user) {
            return userUpdateApi.update(user).$promise;
        }

        function remove(id) {
            return userRemoveApi.remove(id).$promise;
        }



    }

})();
