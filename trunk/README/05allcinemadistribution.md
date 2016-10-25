/hd/cinema/realtime.action?ownerId=12345&qTime=1452009600&pageIdx=0&search=""
ownerId:横店ID
qTime:查询时间，适用规则#4，#5
pageIdx: 当前分页数
search:  查询内容  ,可输入movieId或者影城名称


{"msg":"success","code":"A00000","qTime":"1452470400","ownerId":12345,"ownerName":"横店","results":{"updateTime":1452521199000,"pageIdx":0,"pageSize":5,"cinemaList":[{"cinemaId":11051801,"cinemaName":"北京传奇时代电影城", "grossAll":123,"hallCount":123,"ticketAll":123,"seatAll":567,"averageTicket":86},{"cinemaId":11001801,"cinemaName":"北京电影城", "grossAll":123,"hallCount":123,"ticketAll":123,"seatAll":567,"averageTicket":86}]}}

更新时间：results/updateTime  注：适用规则#3
当前页码数：/results/ pageIdx
总翻页数：  /results/ pageSize  对于翻页操作：当是首页是前一页不可操作，当是末页时，后一页不可操作
影城名称：/results/ cinemaList / cinemaName
票房：/results/ cinemaList / grossAll  适用规则#1
总人次：/results/ cinemaList / ticketAll  适用规则#1
平均人次: /results/ cinemaList / averageTicket适用规则#1



注：排片分析显示为"今天"数据时，"后一天"的按钮将置灰，不可操作。