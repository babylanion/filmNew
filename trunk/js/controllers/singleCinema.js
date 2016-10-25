'use strict';
angular.module('app')
    .controller('singleCinemaCtrl', ["$scope", "$state","$filter","$cookies", "movieService", "calculate",function ($scope, $state, $filter,$cookies, movieService, calculate) {
        // 日期插件
        if (!$state.params.date) {
            $scope.date = $filter('date')(new Date(), 'yyyy-MM-dd');
        } else {
            $scope.date = $state.params.date;
        }
        $scope.id = $state.params.id;

        /*if ($state.params.id) {
            localStorage.setItem('id', $state.params.id);
            $scope.id = $state.params.id;
        } else {
            $scope.id = localStorage.getItem('id');
        }*/
        // 可否编辑
        $scope.date == $filter('date')(new Date(), 'yyyy-MM-dd') ? $scope.isEditable = true : $scope.isEditable = false;

        $scope.coorDay = calculate.coorDay($scope.date);
        var datePre = calculate.neighborDay($scope.date, -1);
        $scope.datePre = datePre.slice(5);
        $scope.prevDay = function () {
            $state.go('singleCinema', {date: datePre});
        };
        var dateNext = calculate.neighborDay($scope.date, 1);
        $scope.dateNext = dateNext.slice(5);
        $scope.nextDay = function () {
            if ($scope.date == $filter('date')(new Date(), 'yyyy-MM-dd')) {
                return false;
            }
            $state.go('singleCinema', {date: dateNext});
        };
        //返回按钮
        $scope.back = $state.params.back;
        $scope.backPre = function(){
            if($scope.back == 2){
                $state.go("boxOffice",{date: $scope.date},{reload:true});
            } else {

                $state.go("allCinema",{date: $scope.date},{reload:true});
            }
        };
        //实时票房
        //初始化排序，true为大到小
        $scope.orderByFeild = '';
        $scope.reverseSort = true;

        var dateArray = $scope.date.split('-');
        var timeArray = $filter('date')(new Date(), 'HH:mm').split(':');
        //查看时间戳转日期
        function getLocalTime(nS) {
            return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
        }
        $scope.cinemaName = $state.params.cinemaName;

        //更新时间
        $scope.currentDate = new Date();
        //影片详情接口
        $scope.isPullDown = false;//初始化下拉为false启用loading
        $scope.getsingleCinema = function () {
            if($scope.isPullDown == false){
                $scope.loadingShow = true;
            }
            dateArray = $scope.date.split('-');
            timeArray = $filter('date')(new Date(), 'HH:mm').split(':');
            $scope.params = {
                theatreId: $cookies.get('theatreId'),
                cinemaId: $scope.id,
                cinemaName:$scope.cinemaName,
                qTime: (new Date(dateArray[0], dateArray[1] - 1, dateArray[2],timeArray[0], timeArray[1], 0)).getTime() / 1000
            };
            //打印当前请求时间戳转换日期
            console.log(getLocalTime($scope.params.qTime));
            $scope.dataNone = false;//是否显示无数据提示
            movieService.singleCinema($scope.params)
                .then(function (res) {
                $scope.singleCinema = res.data;
                if($scope.singleCinema == undefined || $scope.singleCinema.results == null || $scope.singleCinema.results.movieList==undefined||$scope.singleCinema.results.movieList==null){
                    $scope.loadingShow = false;
                    $scope.dataNone = true;
                }else {
                    var movieName = [];
                    var num = [];
                    var grossRate = [];
                    var scheduleRate = [];
                    angular.forEach($scope.singleCinema.results.movieList, function (val, index) {
                        val.mainId = "main" + index;
                        val.grossAll = val.grossAll * 1;
                        val.grossRate = val.grossRate * 1;
                        val.scheduleRate = val.scheduleRate * 1;
                        val.seatOccupancyRate = val.seatOccupancyRate * 1;
                        if(val.movieName == null){
                            val.movieName = "";
                        }
                        if (val.movieName.length < 5) {
                            movieName.push(val.movieName.substring(0, 4).replace("（", "").replace("）", ""));
                        } else {
                            movieName.push(val.movieName.substring(0, 4).replace("（", "").replace("）", "") + '');
                        }
                        grossRate.push(val.grossRate);
                        scheduleRate.push(val.scheduleRate);
                        //票房占比-排片占比
                        for (var i = 0; i < scheduleRate.length; i++) {
                            num[i] = grossRate[i] - scheduleRate[i];
                        }
                    });
                    $scope.tempChart(movieName, num);
                }
                $scope.loadingShow = false;
                $scope.isPullDown = true;
                hideLoading("#container");
                $('#loadTip').css('visibility','hidden');
            })
        };
        //默认按总票房排
        $scope.orderByFeild = 'grossAll';
        $scope.getsingleCinema();
        //loading
        $scope.boxOfficeSearch = function(){
            $scope.loadingShow = !$scope.loadingShow;
        };
        /* 柱状图 */
        $scope.tempChart = function (movieName, num) {
            var option = {
                animation:false,
                grid: {
                    height: 250,
                    y2: -20,
                    y: 25,
                    x: 60,
                    x2: 46,
                    borderWidth: 0
                    //border:0
                },
                xAxis: [
                    {
                        type: 'category',
                        position: 'bottom',
                        boundaryGap: true,
                        axisLine: {    // 轴线
                            show: true,
                            lineStyle: {
                                color: '#e54c37',
                                type: 'solid',
                                width: 3
                            }
                        },
                        axisTick: {    // 轴标记
                            show: true,
                            length: 10,
                            lineStyle: {
                                width: 0
                            }
                        },
                        axisLabel: {
                            show: true,
                            interval: 'auto',    // {number}
                            rotate: 30,

                            formatter: function (val) {
                                return val.split("").join("\n");
                            },
                            top: 0,
                            textStyle: {
                                color: 'black',
                                fontFamily: 'sans-serif',
                                fontSize: 18,
                                fontWeight: 'bold',
                                getCoord: '0',
                                baseline: 'top'
                            }

                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                width: 0
                            }
                        },
                        data: movieName
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        position: 'left',
                        boundaryGap: [0, 0.5],
                        axisLine: {    // 轴线
                            show: true,
                            lineStyle: {
                                color: '#5682dc',
                                type: 'solid',
                                width: 2
                            }
                        },
                        axisLabel: {
                            show: true,
                            interval: 'auto',    // {number}
                            margin: 2,
                            textStyle: {
                                color: '#000000',
                                fontFamily: 'verdana',
                                fontSize: 18,
                                fontStyle: 'normal',
                                fontWeight: 'normal',
                                baseline: 0//垂直对齐方式
                            }
                        },
                        splitLine: {
                            show: true,

                            lineStyle: {
                                color: '#b5b5b5',
                                type: 'dashed',
                                width: 2
                            }
                        },
                        splitArea: {
                            show: false,
                            areaStyle: {
                                color: ['#f9f9f9']
                            }
                        }
                    }
                ],
                series: [
                    {
                        "name": "排片占比1",
                        "type": "bar", /* bar表示柱状图 */
                        "data": num,
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    // build a color map as your need.
                                    var colorList = [
                                        '#5682dc', '#e54c37'
                                    ];
                                    var colorList2 = [];
                                    for (var i = 0; i < num.length; i++) {
                                        if (num[i] < 0) {
                                            colorList2.push(colorList[1]);
                                        } else {
                                            colorList2.push(colorList[0]);
                                        }
                                    }
                                    //console.log(colorList[1]);
                                    return colorList2[params.dataIndex]
                                }
                                //barBorderRadius:[10,10,10,10]
                            }

                        }
                    }
                ]
            };
            var myChart = echarts.init(document.getElementById('main'));
            myChart.setOption(option);
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
                        //$scope.singleCinema= {},
                        $scope.currentDate = new Date();
                        $scope.isPullDown = true;
                        $scope.getsingleCinema();
                //    );
                //}, 1000);

            });
        });
    }]);