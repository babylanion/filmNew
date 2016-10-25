'use strict';
angular.module('app')
    .controller('DatePickCtrl', ["$scope", "$state", "$rootScope", "$filter", function ($scope, $state, $rootScope, $filter) {
        $scope.status = $state.params.status || '';
        $scope.id = $state.params.id || '';
        $scope.cinemaName = $state.params.cinemaName || '';
        $scope.movieNum = $state.params.movieNum || '';
        $scope.movieNumS = $state.params.movieNumS || '';
        $scope.movieName = $state.params.movieName || '';
        $scope.back = $state.params.back || '';
        $scope.select = function (date) {
            $state.go($rootScope.previousState, {date: date,back:$scope.back,id:$scope.id,cinemaName:$scope.cinemaName,movieNum:$scope.movieNum,movieNumS:$scope.movieNumS,movieName:$scope.movieName});
        };

        var data = new Date();
        var time = data.getTime();


        if($scope.status == '')
        {
            $scope.selected = $state.params.date;

            //当前月和上个月
            /*var year = data.getFullYear();
            var month = data.getMonth();
            year = month - 1 != -1 ? year: year - 1;
            month = month - 1 != -1 ? month : 12;
            $scope.startDate = year + "-" + month + "-" + 1;*/

            $scope.startDate = $filter('date')(time - 60*86400000, 'yyyy-MM-dd');
            $scope.endDate = $filter('date')(new Date(), 'yyyy-MM-dd');
        } else {
            console.log(time);
            $scope.selected = $filter('date')(time + 86400000, 'yyyy-MM-dd');
            $scope.startDate = $scope.selected;
            $scope.endDate = $filter('date')(time + 7*86400000, 'yyyy-MM-dd');
        }



    }]);