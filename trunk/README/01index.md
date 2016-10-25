推荐图是到饼图或者双环图
饼图或者双环图二选一
顶层日期问题确认
首页—》影片票房—》3影片票房 —》影片排名1
首页—》影城票房-》影城分布—》柱状图 —》end
首页—》预票房—》01预拍片—》1-2预拍片
首页—》
测试服网址：movie.ptteng.com
不要了：所有关于影城的排序都不要了。
 不要了：因为影院有100多个，所以通过下拉刷新，一次加载20个


/hd/gross/realtime.action?ownerId=12345&qTime=1452009600

ownerId:横店ID
qTime:查询时间，适用规则#4，#5

{"msg":"success","code":"A00000","qTime":"1452470400","ownerId":12345,"ownerName":"横店","results":{"seatOccupancyRateAll":"16.2","ticketAll":936,"updateTime":1452521199000,"interval":30,"grossAll":59254,"seatAll":5768,"hallCount":1234,"movieList":[{"scheduleRate":"0.1","grossRate":"21.5","grossAll":59254,"seatAll":5768,"hallCount":1234,"ticketAll":936,"seatOccupancyRate":"2.5","movieId":6013,"movieName":"小门神（3D）","movieNum":"001c06162015"},{"scheduleRate":"1.1","grossRate":"61.5","grossAll":59254,"seatAll":5768,"hallCount":1234,"ticketAll":936,"seatOccupancyRate":"37.7","movieId":6016,"movieName":"寻龙诀（3D）","movieNum":"001205952015"}],"cinemaList":[{"cinemaId":11051801,"cinemaName":"北京传奇时代电影城","grossAll":123,"ticketAll":123,"seatAll":5768,"hallCount":1234,"averageTicket":86},{"cinemaId":11001801,"cinemaName":"北京电影城","grossAll":123,"ticketAll":123,"seatAll":5768,"hallCount":1234,"averageTicket":86}]}}

更新时间：results/updateTime            注：适用规则#3
总票房：results/grossAll                 注：适用规则#1
总排片：results/hallCount                注：适用规则#1
上座率：results/seatOccupancyRateAll     注：适用规则#2

影片票房 
影片名称：results/movieList/movieName
票房：    results/movieList/grossAll     注：适用规则#1
票房比：  results/movieList/grossRate    注：适用规则#2
排片比：  results/movieList/scheduleRate 注：适用规则#2
上座率：  results/movieList/seatOccupancyRate  注：适用规则#2

所有影片全部传入前端，具体需要显示数页面端控制。
“查看更多” 链接，见03 影片票房。

影院票房
影院名称：results/cinemaList/cinemaName
总票房：  results/cinemaList/grossAll   适用规则#1
总人数：  results/cinemaList/ticketAll  适用规则#1
场均人次: results/cinemaList/averageTicket 

10个影院数据传入前端，具体需要显示数页面端控制。
"查看更多" 链接，见“05 影城分布”。

注：排片分析显示为"今天"数据时，"后一天"的按钮将置灰，不可操作。