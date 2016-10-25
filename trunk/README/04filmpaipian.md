/hd/movie/realtime.action?ownerId=12345&movieId=6023&qTime=1452009600&pageIdx=0
ownerId:横店ID
qTime:查询时间，适用规则#4，#5
movieId：影片ID
pageIdx: 当前分页数

{"msg":"success","code":"A00000","qTime":"1452470400","ownerId":12345,"ownerName":"横店","results":{"recmdIdx":27.6,"updateTime":1452521199000,"pageIdx":0,"pageSize":5,"movieId":6013,"movieName":"小门神（3D）","movieNum":"001c06162015","cinemaList":[{"cinemaId":11051801,"cinemaName":"中国横店","scheduleRate":"0.1","grossRate":"21.5","showRate":-1.5, "grossAll":123,"ticketAll":123,"seatAll":5768,"hallCount":1234},{"cinemaId":11051802,"cinemaName":"中国横店2","scheduleRate":"0.2","grossRate":"21.5","showRate":1.5, "grossAll":123,"ticketAll":123,"seatAll":5768,"hallCount":1234}]}}

更新时间：/results/updateTime  注：适用规则#3
推荐排片指数：/results/recmdIdx  规则#2
当前页码数：/results/ pageIdx
总翻页数：  /results/ pageSize  对于翻页操作：当是首页是前一页不可操作，当是末页时，后一页不可操作
影院名称 /results/ cinemaList/ cinemaName
票房占比: /results/ cinemaList/ grossRate  规则#2
排比占比: /results/ cinemaList/ scheduleRate规则#2
观影预期：/results/ cinemaList/ showRate规则#2



注：显示为"今天"数据时，"后一天"的按钮将置灰，不可操作。
