(function () {
    'use strict';

    angular.module('app.user')
        .controller('UserListController', UserListController)
        .controller('UserEditController', UserEditController);

    UserListController.$inject = ['$scope','userService','myPaginationService'];
    UserEditController.$inject = ['$stateParams', '$window', '$timeout', 'userService'];

    function UserListController($scope,userService,myPaginationService) {
        var vm = this;
        vm.userData = {}; //条件查询
        //分页条件
        $scope.userPageObject= {
            currentPage : 1,
            totalPage : 0,
            pageSize : 10,
            pages : []
        };

        vm.init = function(){
            vm.getUserList();
            $scope.$watch('doorOrderPageObject.totalPage',function(){
                $scope.userPageObject.currentPage = 1;
            });
        };

        vm.getUserList = function() {
            initPickers();
            vm.userData.pageSize=$scope.userPageObject.pageSize; //获取每页条数
            vm.userData.currentPage=$scope.userPageObject.currentPage; //获取当前页面
            userService.list(vm.userData).then(function (data){
                if(data.status == "true"){
                    vm.userLists=data.message;
                    //分页
                    $scope.userPageObject.totalPage = data.message.totalPages; //总页数
                    $scope.userPageObject.pages = [];
                    for(var i=1;i<=$scope.userPageObject.totalPage;i++){
                        $scope.userPageObject.pages.push(i);
                    }
                    console.log('$scope.userPageObject.totalPage='+$scope.userPageObject.totalPage+', $scope.userPageObject.pages length='+$scope.userPageObject.pages.length);
                }else{
                    console.log(data.message);
                }
            },function(data){
                console.log(data.message);
            });
        };

        vm.remove = function(id){
            if (id != null) {
                userService.remove({id: id}).then(function (data) {
                    vm.getUserList();
                });
            }
        };

        vm.init();

        //分页点击
        $scope.initUserPageObject = true;
        $scope.$watch('userPageObject.currentPage',function(){
            if($scope.initUserPageObject){  //lyk  初始化无需调用监控
                $scope.initUserPageObject = false;
                return;
            }
            vm.getUserList();
        });
    }

    function UserEditController($stateParams, $window, $timeout, userService){
        var vm = this;
        vm.activate = function(){
            initPickers();
            if ($stateParams.id == undefined || $stateParams.id == null || $stateParams.id == "") {
                vm.user = {};
                vm.isNew = true;
            } else {
                vm.isNew = false;
                vm._load($stateParams.id);
            }
        };

        vm.save = function() {
            var id = vm.user.id;
            //console.log(" id====="+id+",user name="+vm.user.name);
            var promise = (id !== undefined && id !== null && id !="")
                ? userService.update(vm.user)
                : userService.save(vm.user);
            promise.then(function (data) {
                _showMessageBeforeBack(data);
            });

        };

        vm.remove = function() {
            var id = vm.user.id;
            if (id != null) {
                userService.remove({id: id}).then(function (data) {
                    _showMessageBeforeBack(data);
                })
            }
        };

        vm.back = function() {
            $window.history.back();
        };

        vm._load = function(id){
            userService.get({id: id}).then(function (data) {
                vm.user = data.message;
            });
        };

        function _showMessageBeforeBack(data) {
            var success = data.status == 'true';
            App.alert({
                type: (success ? 'success' : 'danger'),
                icon: (success ? 'check' : 'warning'),
                message: data.message,
                container: $('.portlet-body'),
                place: 'prepend'
            });
            if (success) {
                $timeout(function () {
                    vm.back();
                }, 3000);
            }
        }
        vm.activate();

    }

    function initPickers() {
        //init date pickers
        $('.date-picker').datepicker({
            rtl: App.isRTL(),
            autoclose: true
        });
    }

})();