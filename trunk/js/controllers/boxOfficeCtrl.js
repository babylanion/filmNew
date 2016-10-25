'use strict';
angular.module('app')
    .controller('BoxOfficeCtrl', ["$scope", "$state", "$filter",'$cookies', "movieService", "$timeout", "calculate", "baseData",function ($scope, $state, $filter, $cookies,movieService, $timeout, calculate, baseData) {
        // 日期插件
        if (!$state.params.date) {
            $scope.date = $filter('date')(new Date(), 'yyyy-MM-dd');
        } else {
            $scope.date = $state.params.date;
        }
        // 可否编辑
        $scope.date == $filter('date')(new Date(), 'yyyy-MM-dd') ? $scope.isEditable = true : $scope.isEditable = false;

        $scope.coorDay = calculate.coorDay($scope.date);
        var datePre = calculate.neighborDay($scope.date, -1);
        $scope.datePre = datePre.slice(5);
        $scope.dateRecommended = calculate.neighborDay($scope.date, -1);
        $scope.prevDay = function () {
            $state.go('boxOffice', {date: datePre});
        };
        var dateNext = calculate.neighborDay($scope.date, 1);
        $scope.dateNext = dateNext;
        $scope.nextDay = function () {
            if ($scope.date == $filter('date')(new Date(), 'yyyy-MM-dd')) {
                return false;
            }
            $state.go('boxOffice', {date: dateNext});
        };

        $(function () {
            slide("#container", 61, function (e) {
                var that = this;
                console.log('aaa');
                $scope.currentDate = new Date();
                $scope.isPullDown = true;
                $scope.getrealtime();
            });
        });

        //实时票房
        var dateArray = $scope.date.split('-');
        var timeArray = $filter('date')(new Date(), 'HH:mm').split(':');
        console.log('================');
        console.log(timeArray);
        console.log('================');
        //初始化排序，true为由大到小
        $scope.orderByFeild = '';
        $scope.reverseSort = false;
        //查看时间戳转日期
        function getLocalTime(nS) {
            return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
        }
        //更新时间
        $scope.currentDate = new Date();
        //影片详情接口
        $scope.isPullDown = false;//初始化下拉为false启用loading
        $scope.getrealtime = function () {
            dateArray = $scope.date.split('-');
            timeArray = $filter('date')(new Date(), 'HH:mm').split(':');
            $scope.params = {
                theatreId: $cookies.get('theatreId'),
                qTime: (new Date(dateArray[0], dateArray[1] - 1, dateArray[2], timeArray[0], timeArray[1], 0)).getTime() / 1000
            };
            //打印当前请求时间戳转换日期
            console.log(getLocalTime($scope.params.qTime));
            if($scope.isPullDown == false){
                $scope.loadingShow = true;
            }

            $scope.dataNone = false;//是否显示无数据提示
            movieService.realtime($scope.params).error(function(){
                $scope.isPullDown = true;
                $scope.loadingShow = true;
                hideLoading("#container");
                $('#loadTip').css('visibility','hidden');
            }).then(function (res) {

                $scope.boxoffice = res.data;
                if($scope.boxoffice == undefined || $scope.boxoffice.results == null ||$scope.boxoffice.results.movieList.length == 0 || $scope.boxoffice.results.cinemaList.length == 0){
                    $scope.loadingShow = false;
                    $scope.dataNone = true;
                }else{
                    angular.forEach($scope.boxoffice.results.movieList, function (val, index) {
                        val.mainId = "main" + index;
                    });
                    $scope.li = $scope.boxoffice.results;
                    $scope.li.movieList = $filter('orderBy')($scope.li.movieList,'grossAll',true);
                    $scope.li.cinemaList = $filter('orderBy')($scope.li.cinemaList,'grossAll',true);
                    $scope.renderChart(0,$scope.li.movieList[0].grossRate,$scope.li.movieList[0].scheduleRate,$scope.li.movieList[0].seatOccupancyRate);
                    $scope.renderChart(1,$scope.li.movieList[1].grossRate,$scope.li.movieList[1].scheduleRate,$scope.li.movieList[1].seatOccupancyRate);
                    $scope.renderChart(2,$scope.li.movieList[2].grossRate,$scope.li.movieList[2].scheduleRate,$scope.li.movieList[2].seatOccupancyRate);
                }
                $scope.loadingShow = false;
                $scope.isPullDown = true;
                hideLoading("#container");
                $('#loadTip').css('visibility','hidden');

            });
        };
        $scope.orderByFeild = 'grossAll';
        $scope.getrealtime();

        //loading
        $scope.boxOfficeSearch = function(){
            $scope.loadingShow = !$scope.loadingShow;
        };
        //环状图
        $scope.renderChart = function (index, num, num1, num2) {
            console.log('进入');
            var radius = [33, 43];
            var option = {
                animation:false,
                series: [
                    {
                        type: 'pie',
                        center: ['20%', '50%'],
                        radius: radius,
                        x: '0%', // for funnel
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: 'center',
                                    textStyle: {
                                        fontSize: '18',
                                        color: '#000000'
                                    }
                                },
                                labelLine: {
                                    show: false
                                }
                            },
                            emphasis: {
                                label: {
                                    show: false,
                                    position: 'center',
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            }
                        },
                        data: [
                            {
                                value: 100 - num,
                                itemStyle: {
                                    normal: {
                                        color: '#e7e7e7'
                                    }
                                }
                            },
                            {
                                name: num  + '%',
                                value: num,
                                itemStyle: {
                                    normal: {
                                        color: '#f69b15'
                                    }
                                }
                            }

                        ]
                    },
                    {
                        type: 'pie',
                        center: ['55%', '50%'],
                        radius: radius,
                        x: '0%', // for funnel
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: 'center',
                                    textStyle: {
                                        fontSize: '18',
                                        color: '#000000'
                                    }
                                },
                                labelLine: {
                                    show: false
                                }
                            },
                            emphasis: {
                                label: {
                                    show: false,
                                    position: 'center',
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            }
                        },
                        data: [
                            {
                                value: 100 - num1,
                                itemStyle: {
                                    normal: {
                                        color: '#e7e7e7'
                                    }
                                }
                            },
                            {
                                name: num1  + '%',
                                value: num1,
                                itemStyle: {
                                    normal: {
                                        color: '#10c997'
                                    }
                                }
                            }
                        ]
                    },
                    {
                        type: 'pie',
                        center: ['87%', '50%'],
                        radius: radius,
                        x: '0%', // for funnel
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true,
                                    position: 'center',
                                    textStyle: {
                                        fontSize: '18',
                                        color: '#000000'
                                    }
                                },
                                labelLine: {
                                    show: false
                                }
                            },
                            emphasis: {
                                label: {
                                    show: false,
                                    position: 'center',
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            }
                        },
                        data: [
                            {
                                value: 100 - num2,
                                itemStyle: {
                                    normal: {
                                        color: '#e7e7e7'
                                    }
                                }
                            },
                            {
                                name: num2  + '%',
                                value: num2,
                                itemStyle: {
                                    normal: {
                                        color: '#5682dc'
                                    }
                                }
                            }
                        ]
                    }
                ]
            };
            var myChart = echarts.init(document.getElementById('main' + index));
            myChart.setOption(option);
        };
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
    }]);