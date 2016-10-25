'use strict';
var mock = true;
angular.module('app')
    .filter("weekend", function () {
        return function (time) {
            var day = new Date(time).getDay();
            if (day == 6 || day == 0) {
                return 'red';
            } else {
                return '';
            }
        }
    })
    /* 序号 */
    .filter("secondNumFilter", function () {
        return function (num) {
            if (num < 10) {
                return "0" + num;
            } else {
                return num;
            }
        }
    })

    .factory('path', function () {
        return {
            login: '/ajax-default/stats/security/login.action',
            //01首页
            realtime: '/ajax-default/stats/gross/realtime.action',
            //01预售影片
            presell: '/ajax-default/stats/presell/movie/detail.action',
            //1-2预排片-影城
            presellCinema: '/ajax-default/stats/presell/movie/cinema/detail.action',
            //2推荐排片
            recommended: '/ajax-default/stats/recommended/movie/schedule.action',
            //3影片票房
            movieBoxOffice: '/ajax-default/stats/gross/movie/realtime.action',
            //4影片排名
            movieRanking: '/ajax-default/stats/movie/realtime.action',
            //总影院分布
            allCinemasDistribution: '/ajax-default/stats/cinema/realtime.action',
            //单影院
            singleCinema: '/ajax-default/stats/cinema/detail.action'
        }
    })
    .factory('movieService', function ($http, path,$timeout) {
        return {
            //00登陆页
            login: function (params) {
                if (mock) {
                    return $http.post(path.login,params);
                } else {
                    return $http.get("mock/login.json", {params: params});
                }
            },
            //01首页
            realtime: function (params) {
                if (mock) {
                    return $http.get(path.realtime, {params: params});

                } else {
                    return $http.get("mock/index.json", {params: params});
                }
            },
            //01预排影片
            presell: function (params) {
                if (mock) {
                    return $http.get(path.presell, {params: params});
                } else {
                    return $http.get("mock/01pre-sale.json", {params: params});
                }

            },
            //012预排片-影城
            presellCinema: function (params) {

                if (mock) {
                    return $http.get(path.presellCinema, {params: params});
                } else {
                    return $http.get("mock/012prepaipiancinema.json", {params: params});
                }
            },
            //2推荐排片
            recommended: function (params) {

                if (mock) {
                    return $http.get(path.recommended, {params: params});
                } else {
                    return $http.get("mock/02tuijianpaipian.json", {params: params});
                }
            },
            //3影片票房
            movieBoxOffice: function (params) {

                if (mock) {
                    return $http.get(path.movieBoxOffice, {params: params});
                } else {
                    return $http.get("mock/03filmpiaofang.json", {params: params});
                }
            },
            //4影片排名
            movieRanking: function (params) {
                if (mock) {
                    return $http.get(path.movieRanking, {params: params});
                } else {
                    return $http.get("mock/04filmpaipian.json", {params: params});
                }
            },
            //5总影院分布
            allCinemasDistribution: function (params) {
                if (mock) {
                    return $http.get(path.allCinemasDistribution, {params: params});
                } else {
                    return $http.get("mock/05allcinema.json", {params: params});
                }
            },
            //6单影院
            singleCinema: function (params) {

                if (mock) {
                    return $http.get(path.singleCinema, {params: params});
                } else {
                    return $http.get("mock/06singlecinema.json", {params: params});
                }
            }
        }

    });

