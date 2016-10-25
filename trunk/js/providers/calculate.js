'use strict';
angular.module('app')
    .factory('baseData', function () {
        return {
            theatreId: 1
        }
    })
    .factory('calculate', function ($filter) {
        return {
            // 日历的月份长度计算，返回array
            monthCourse: function (start, end) {
                var months = [];
                start = new Date(start);
                end = new Date(end);
                var differ = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()) + 1;
                for (var i = 0; i < differ; i++) {
                    var newMonth = new Date(start.getFullYear(), start.getMonth() + i, 1);
                    months.push($filter('date')(newMonth, 'yyyy-MM-dd'));
                }
                return months;
            },
            // 翻页前一天后一天
            neighborDay: function (date, offset) {
                var day = new Date(new Date(date).getFullYear(), new Date(date).getMonth(), new Date(date).getDate() + offset);
                return $filter('date')(day, 'yyyy-MM-dd');
            },
            // 输入日期，输出今天明天前天
            coorDay: function (date) {
                var today = $filter('date')(new Date(), 'yyyy-MM-dd');
                if (today.split('-')[0] == date.split('-')[0] && today.split('-')[1] == date.split('-')[1]) {
                    var differ = today.split('-')[2] - date.split('-')[2];
                    var name;
                    switch (differ) {
                        case 0:
                            name = '今天';
                            break;
                        case 1:
                            name = '昨天';
                            break;
                        case 2:
                            name = '前天';
                            break;
                        case -1:
                            name = '明天';
                            break;
                        case -2:
                            name = '后天';
                            break;
                        default:
                            name = '';
                    }
                }
                return name;
            }
        };
    })

;