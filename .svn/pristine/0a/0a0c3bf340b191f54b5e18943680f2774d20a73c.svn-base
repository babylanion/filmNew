angular.module('app')
    .filter('toFix', function () {
        //截断补零
        return function (x) {
            var f_x = parseFloat(x);
            if (isNaN(f_x)) {
                return 0;
            }
            f_x = Math.round(x * 100) / 100;
            var s_x = f_x.toString();
            var pos_decimal = s_x.indexOf('.');
            if (pos_decimal < 0) {
                pos_decimal = s_x.length;
                s_x += '.';
            }
            while (s_x.length <= pos_decimal + 2) {
                s_x += '0';
            }
            return s_x;
        }
    });
