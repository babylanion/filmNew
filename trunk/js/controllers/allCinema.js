'use strict';
angular.module('app')
    .controller('allCinemaCtrl',["$scope","movieService","$cookies","$state", "$rootScope", "$filter","calculate","baseData", function($scope,movieService, $cookies,$state, $rootScope, $filter,calculate,baseData) {
        // 日期插件
        if (!$state.params.date) {
            $scope.date = $filter('date')(new Date(), 'yyyy-MM-dd');
        } else {
            $scope.date = $state.params.date;
        }
        // 可否编辑
        $scope.date == $filter('date')(new Date(), 'yyyy-MM-dd') ? $scope.isEditable = true : $scope.isEditable = false;

        $scope.coorDay = calculate.coorDay($scope.date);
        $scope.select = function(date) {
            $state.go($rootScope.previousState, {date: date});
        };

        $scope.startDate = '2015-09-01';
        $scope.endDate = $filter('date')(new Date(), 'yyyy-MM-dd');
        $scope.selected = $state.params.date;
        var datePre = calculate.neighborDay($scope.date, -1);
        $scope.datePre = datePre.slice(5);
        $scope.prevDay = function() {
            $state.go('allCinema', {date: datePre});
        };
        var dateNext = calculate.neighborDay($scope.date, 1);
        $scope.dateNext = dateNext.slice(5);
        $scope.nextDay = function() {
            if ($scope.date == $filter('date')(new Date(), 'yyyy-MM-dd')) {
                return false;
            }
            $state.go('allCinema', {date: dateNext});
        };

        //实时票房
        //初始化排序，true为由大到小
        $scope.orderByFeild = '';
        $scope.reverseSort = true;

        $scope.id = $state.params.id;

        //更新时间
        $scope.currentDate = new Date();
        //搜索功能
        $scope.searchShow = true;
        $scope.allCinemaSearch = function(){
            $scope.searchShow = !$scope.searchShow;
        };
        //影片详情接口
        var dateArray = $scope.date.split('-');
        var timeArray = $filter('date')(new Date(), 'HH:mm').split(':');
        //查看时间戳转日期
        function getLocalTime(nS) {
            return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
        }
        $scope.isPullDown = false;//初始化下拉为false启用loading
        $scope.getallCinemasDistribution = function () {
            if($scope.isPullDown == false){
                $scope.loadingShow = true;
            }
            dateArray = $scope.date.split('-');
            timeArray = $filter('date')(new Date(), 'HH:mm').split(':');
            var params = {
                theatreId: $cookies.get('theatreId'),
                qTime: (new Date(dateArray[0], dateArray[1] - 1, dateArray[2], timeArray[0], timeArray[1], 0)).getTime() / 1000
            };
            //打印当前请求时间戳转换日期
            console.log(getLocalTime(params.qTime));
            $scope.dataNone = false;//是否显示无数据提示
            movieService.allCinemasDistribution(params).error(function(){
                $scope.isPullDown = true;
                $scope.loadingShow = true;
                hideLoading("#container");
                $('#loadTip').css('visibility','hidden');
            }).then(function (res) {
                $scope.allCinemasDistribution = res.data;
                if($scope.allCinemasDistribution == undefined ||$scope.allCinemasDistribution.results==null|| $scope.allCinemasDistribution.results.cinemaList.length == 0){
                    $scope.loadingShow = false;
                    $scope.dataNone = true;
                }else {
                    angular.forEach($scope.allCinemasDistribution.results.cinemaList, function (val, item) {
                        val.grossAll = val.grossAll * 1;
                        val.ticketAll = val.ticketAll * 1;
                        val.averageTicket = val.averageTicket * 1;
                    });
                }
                $scope.loadingShow = false;
                $scope.isPullDown = true;
                hideLoading("#container");
                $('#loadTip').css('visibility','hidden');
            })
        };
        //默认按什么排序
        $scope.orderByFeild = 'grossAll';
        $scope.getallCinemasDistribution();
        //loading
        $scope.boxOfficeSearch = function(){
            $scope.loadingShow = !$scope.loadingShow;
        };
        $scope.dataNoneSearch = false;//是否显示无数据提示
        $scope.searchCinemasDistribution = function () {
            timeArray = $filter('date')(new Date(), 'HH:mm').split(':');
            var params = {
                theatreId: $cookies.get('theatreId'),
                qTime: (new Date(dateArray[0], dateArray[1] - 1, dateArray[2], timeArray[0], timeArray[1], 0)).getTime() / 1000,
                search:$scope.search
            };
            movieService.allCinemasDistribution(params).then(function (res) {
                $scope.allCinemasDistributionSearch = res.data;
                if($scope.allCinemasDistributionSearch.results.cinemaList.length==0){
                    $scope.dataNoneSearch = true;
                }
            })
        };

        //下拉刷新调用
        var hideLoading = function(obj1){
            var obj = $(obj1);
            var fn1 =
            {
                //移动容器
                translate: function (diff) {
                    obj.css({
                        "-webkit-transform": "translate(0," + diff + "px)",
                        "transform": "translate(0," + diff + "px)"
                    });
                },
                //返回到初始位置
                back: function () {
                    fn1.translate(0 - 61);
                }
            };
            fn1.back();
        };
        $(function () {
            slide("#container", 61, function (e) {
                var that = this;
                        $scope.currentDate = new Date();
                        $scope.isPullDown = true;
                        $scope.getallCinemasDistribution();
            });
        });

    }]);