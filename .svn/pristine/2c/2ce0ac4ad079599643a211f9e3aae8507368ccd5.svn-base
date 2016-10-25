'use strict';
angular.module('app')
    .controller('PreOfficeCtrl',["$scope", "$state", "$rootScope","$cookies", "movieService", "calculate", "baseData", "$filter", function ($scope, $state, $rootScope,$cookies, movieService, calculate, baseData, $filter) {
        //首页date
        $scope.homeDate = $state.params.date;

        //时间选择器date
        $scope.date = $filter('date')(new Date().getTime() + 86400000, 'yyyy-MM-dd');

        // 可否编辑
        var datePre = calculate.neighborDay($scope.date, -1);
        datePre == $filter('date')(new Date(), 'yyyy-MM-dd') ? $scope.isEditable = false : $scope.isEditable = true;
        $scope.date == $filter('date')(new Date().getTime() + 7 * 86400000, 'yyyy-MM-dd') ? $scope.isEditable1 = true : $scope.isEditable1 = false;

        $scope.coorDay = calculate.coorDay($scope.date);
        $scope.select = function (date) {
            $state.go($rootScope.previousState, {date: date});
        };

        $scope.datePre = datePre.slice(5);
        $scope.prevDay = function () {
            if ($scope.date == $filter('date')(new Date().getTime() + 86400000, 'yyyy-MM-dd')) {
                return false;
            }
            $state.go('preOffice', {date: datePre});
        };
        var dateNext = calculate.neighborDay($scope.date, 1);
        $scope.dateNext = dateNext.slice(5);
        $scope.nextDay = function () {
            if ($scope.date == $filter('date')(new Date(), 'yyyy-MM-dd')) {
                return false;
            }
            if($scope.date == $filter('date')(new Date().getTime() + 7 * 86400000, 'yyyy-MM-dd')) return;
            $state.go('preOffice', {date: dateNext});
        };
        //初始化排序，true为由大到小
        $scope.orderByFeild = '';
        $scope.reverseSort = true;

        var dateArray = $scope.date.split('-');
        var timeArray = $filter('date')(new Date(), 'HH:mm').split(':');
        //查看时间戳转日期
        function getLocalTime(nS) {
            return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
        }

        //更新时间
        $scope.currentDate = new Date();
        //影片详情接口
        $scope.isPullDown = false;//初始化下拉为false启用loading
        $scope.getpresell = function () {
            if($scope.isPullDown == false){
                $scope.loadingShow = true;
            }
            dateArray = $scope.date.split('-');
            timeArray = $filter('date')(new Date(), 'HH:mm').split(':');
            $scope.params = {
                theatreId:$cookies.get('theatreId'),
                qTime: (new Date(dateArray[0], dateArray[1] - 1, dateArray[2], timeArray[0], timeArray[1], 0)).getTime() / 1000
            };
            //打印当前请求时间戳转换日期
            console.log(getLocalTime($scope.params.qTime));
            $scope.dataNone = false;//是否显示无数据提示
            movieService.presell($scope.params)
                .error(function(){
                    $scope.isPullDown = true;
                    $scope.loadingShow = true;
                    hideLoading("#container");
                    $('#loadTip').css('visibility','hidden');
                })
                .then(function (datas) {
                $scope.preOffice = datas.data;
                if($scope.preOffice == undefined || $scope.preOffice.results == null || $scope.preOffice.results.movieList == undefined || $scope.preOffice.results.movieList == null || $scope.preOffice.results.movieList.length == 0){
                    $scope.loadingShow = false;
                    $scope.dataNone = true;
                }
                $scope.loadingShow = false;
                $scope.isPullDown = true;
                hideLoading("#container");
                $('#loadTip').css('visibility','hidden');
            });
        };
        $scope.orderByFeild = 'grossAll';
        $scope.getpresell();
        //loading
        $scope.boxOfficeSearch = function(){
            $scope.loadingShow = !$scope.loadingShow;
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
                //setTimeout(function () {
                //    that.back.call(
                        //console.log('aaa'),
                        //$scope.preOffice= {},
                        $scope.currentDate = new Date();
                        $scope.isPullDown = true;
                        $scope.getpresell();
                //    );
                //}, 1000);

            });
        });
    }]);