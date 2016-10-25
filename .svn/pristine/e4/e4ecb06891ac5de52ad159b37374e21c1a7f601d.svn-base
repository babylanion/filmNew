/**
 * Created by w on 2016/1/25.
 */
/*
 *obj--滑动对象
 *offset--滑动距离（当滑动距离大于等于offset时将调用callback）
 *callback--滑动完成后的回调函数
 */
var slide = function (obj, offset, callback) {
    var start,
        end,
        isLock = false,//是否锁定整个操作
        isCanDo = false,//是否移动滑块
        loadTip = $('#loadTip'),
        bodyBlock = $('body'),
        isTouchPad = (/hp-tablet/gi).test(navigator.appVersion),
        hasTouch = 'ontouchstart' in window && !isTouchPad;
    //将对象转换为jquery的对象
    obj = $(obj);

    var objparent = obj.parent();
var tem =true;
    /*操作方法*/
    var fn =
    {
        //移动容器
        translate: function (diff) {
            obj.css({
                "-webkit-transform": "translate(0," + diff + "px)",
                "transform": "translate(0," + diff + "px)"
            });
        },
        //设置效果时间
        setTranslition: function (time) {
            obj.css({
                "-webkit-transition": "all " + time + "s",
                "transition": "all " + time + "s"
            });
        },
        //返回到初始位置
        back: function () {
            fn.translate(0 - offset);
            //标识操作完成
            isLock = false;

        }
    };
    //fn.translate(0);
    //滑动开始
    obj.bind("touchstart", function (e) {
        if (bodyBlock.scrollTop() <= 0 && !isLock) {
            var even = typeof event == "undefined" ? e : event;
            //标识操作进行中
            //isLock = true;
            //isCanDo = true;
            //保存当前鼠标Y坐标
            start = hasTouch ? even.touches[0].pageY : even.pageY;
            //消除滑块动画时间
            fn.setTranslition(0);
            //loadTip.html('下拉刷新数据');

        }
    });

    //滑动中
    obj.bind("touchmove", function (e) {
        isLock = true;
        isCanDo = true;
        if (bodyBlock.scrollTop() <= 0 && isCanDo && isLock==true) {

            var even = typeof event == "undefined" ? e : event;

            //保存当前鼠标Y坐标
            end = hasTouch ? even.touches[0].pageY : even.pageY;

            if (start < end) {

                even.preventDefault();
                //消除滑块动画时间
                fn.setTranslition(0);
                //移动滑块
                fn.translate(end - start - offset);
                tem =false;
            }

        }
    });


    //滑动结束
    obj.bind("touchcancel touchend", function (e) {
        if (isCanDo) {
            isCanDo = false;
            isLock=false;
            console.log('==========');
            console.log(end);
            console.log(end - start);
            console.log(start);
            console.log('==========');
            //判断滑动距离是否大于等于指定值
            if (end - start >= offset) {
                loadTip.css('visibility','visible');
                //设置滑块回弹时间
                fn.setTranslition(0);
                start =NaN;
                console.log(';;;;;;;;;;;;;;;;;;;;;;;');
                console.log(start);

                //保留提示部分
                fn.translate(0);

                //执行回调函数
                //loadTip.html('正在刷新数据');
                if (typeof callback == "function" &&tem ==false) {
                    callback.call(fn, e);
                    //fn.back();
                    tem = true;

                }
            } else {
                //返回初始状态
                fn.back();
                start =NaN;
                tem = true;
                loadTip.css('visibility','hidden');
            }
        }
    });
};