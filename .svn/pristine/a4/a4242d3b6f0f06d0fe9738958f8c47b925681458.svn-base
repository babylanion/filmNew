'use strict';
!(function () {
    angular.module('app', ['oc.lazyLoad', 'ui.router', 'angular-loading-bar', 'ngCookies'])/*删掉了, 'mgcrea.ngStrap'*/
        .config(httpConfig)
        .config(lazyLoadConfig)
        .config(routeConfig)
        .config(loadingBar)
        .run(runInit);
})();
function httpConfig($httpProvider) {
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.common['sessionID'] = 'hengdianly';
    $httpProvider.defaults.headers.patch['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.transformRequest = function (data) {
        if (data === undefined) {
            return data;
        }
        return $.param(data);
    };
    //链接超时
    $httpProvider.interceptors.push(function ($rootScope, $q,$location,$cookies) {
        return {
            request: function (config) {
                config.timeout = 30000;
                return config;
            },
            responseError: function (rejection) {
                if(rejection.status == 404){
                    $('.spinner').html('<p class="reLoad">404错误<br/>请检查网络</p>');
                } else if(rejection.status == 500){
                    $('.spinner').html('<p class="reLoad">500错误</p>');
                } else if(rejection.status == 502){
                    $('.spinner').html('<p class="reLoad">502 bad gateway</p>');
                } else {
                    $('.spinner').html('<p class="reLoad">加载超时<br/>下拉重新加载</p>');
                }
                return $q.reject(rejection);
            },
            response: function (response) {
                if ( response.status === 200&&response.data.code == "A00501") {
                    $location.path("/login");
                    if(document.cookie.indexOf('sessionID') != -1){
                        $cookies.remove('sessionID');
                    }
                }
                // console.log("response is "+response.status);
                // console.log("response is "+response);
                return response;
            }
        }
    });
    //$locationProvider.html5Mode(true);
}
function lazyLoadConfig($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        modules: [
            {
                name: 'angular-chart',
                files: [
                    'lib/chartjs/Chart.js',
                    'lib/angular-chart/angular-chart.css',
                    'lib/angular-chart/angular-chart.js'
                ]
            }, {
                name: 'datepicker',
                files: [
                    'js/directives/datepicker/datepicker.css',
                    'js/directives/datepicker/datepicker.js'
                ]
            }
        ]
    });
}
function routeConfig($stateProvider, $urlRouterProvider, $ocLazyLoadProvider,$httpProvider) {
    var _lazyLoad = function (loaded) {
        return function ($ocLazyLoad) {
            return $ocLazyLoad.load(loaded, {serie: true});
        };
    };
    $ocLazyLoadProvider.config({
        debug: false,
        events: true
    });
    if (document.cookie.indexOf('sessionID') != -1) {
        $urlRouterProvider.otherwise("/boxOffice/");

    } else {
        $urlRouterProvider.otherwise("/login");

    }
    $stateProvider
        .state('404', {
            url: '/404',
            templateUrl: '404.html'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'view/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'login',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/loginCtrl.js',
                    'css/login.css'
                ])
            }
        })

        // 首页
        .state('boxOffice', {
            url: '/boxOffice/:date',
            templateUrl: 'view/boxOffice.html',
            controller: 'BoxOfficeCtrl',
            controllerAs: 'boxOffice',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/boxOfficeCtrl.js',
                    'css/boxOffice.css'
                ])
            }
        })
        //02推荐排片
        .state('recommendedFilm', {
            url: '/recommendedFilm/:date',
            templateUrl: 'view/recommendedFilm.html',
            controller: 'recommendedFilmCtrl',
            controllerAs: 'recommendedFilm',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/recommendedFilm.js',
                    'css/recommendedFilm.css'
                ])
            }
        })
        //01预排片
        .state('preOffice', {
            url: '/preOffice/:date',
            templateUrl: 'view/preOffice.html',
            controller: 'PreOfficeCtrl',
            controllerAs: 'preOffice',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/preOffice.js',
                    'css/PreOffice.css'
                ])
            }
        })
        //012预排片影城
        .state('preStudios', {
            url: '/preStudios/:id/:date/:movieNumS/:movieNum/:movieName/:localStorage',
            templateUrl: 'view/preStudios.html',
            controller: 'PreStudiosCtrl',
            controllerAs: 'preStudios',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/preStudios.js',
                    'css/preStudios.css'
                ])
            }
        })
        //03影片票房
        .state('filmBoxOffice', {
            url: '/filmBoxOffice/:date/:id',
            templateUrl: 'view/filmBoxOffice.html',
            controller: 'filmBoxOfficeCtrl',
            controllerAs: 'filmBoxOffice',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/filmBoxOffice.js',
                    'css/filmBoxOffice.css'
                ])
            }
        })
        //04影片排名
        .state('filmRanking', {
            url: '/filmRanking/:date/:back/:id/:movieNum/:movieNumS/:movieName',
            templateUrl: 'view/filmRanking.html',
            controller: 'filmRankingCtrl',
            controllerAs: 'filmRanking',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/filmRanking.js',
                    'css/filmRanking.css'
                ])
            }
        })
        //05所有影城
        .state('allCinema', {
            url: '/allCinema/:date/:id',
            templateUrl: 'view/allCinema.html',
            controller: 'allCinemaCtrl',
            controllerAs: 'allCinema',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/allCinema.js'
                ])
            }
        })
        //06单个影城
        .state('singleCinema', {
            url: '/singleCinema/:date/:id/:back/:cinemaName',
            templateUrl: 'view/singleCinema.html',
            controller: 'singleCinemaCtrl',
            controllerAs: 'singleCinema',
            resolve: {
                loadMyFile: _lazyLoad([
                    'js/controllers/singleCinema.js',
                    'css/singleCinema.css'
                ])
            }
        })
        .state('datePick', {
            url: '/datePick/:status/:date/:back/:id/:cinemaName/:movieNum/:movieNumS/:movieName',
            templateUrl: 'view/datePick.html',
            controller: 'DatePickCtrl',
            controllerAs: 'datePick',
            resolve: {
                loadMyFile: _lazyLoad(['js/controllers/datePickCtrl.js', 'datepicker'])
            }
        });

}
function loadingBar(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.latencyThreshold = 200;
    cfpLoadingBarProvider.includeSpinner = false;
}
function runInit($rootScope,$cookies,$state,$location,$anchorScroll) {
    $rootScope.isLogin = function() {
        return !!$cookies.get('sessionID');
    };
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

    });
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        if (!$rootScope.isLogin() && $location.path() !== "/login") {
            $state.go("login");
            $cookies.remove('sessionID');
            return false;
        }
        if ($rootScope.isLogin() && $location.path() === "/login") {
            $state.go("boxOffice");
            return false;
        }
        $rootScope.previousState = fromState.name;
        $rootScope.currentState = toState.name;

        console.log('Previous state:'+$rootScope.previousState);
        console.log('Current state:'+$rootScope.currentState);

    });

    $rootScope.$on('$viewContentLoading', function (event) {
        console.log('视图开始加载');
    });
    $rootScope.$on('$viewContentLoaded', function (event) {
        console.log('视图渲染完毕');

        //页面回到顶部
        $location.hash('1');
        $anchorScroll();

    });

}


