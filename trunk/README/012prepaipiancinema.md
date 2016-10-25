/hd/presell/movie/cenima/detail.action?ownerId=12345&qTime=1452009600&pageIdx=0

ownerId:横店ID
qTime:查询时间，适用规则#4，#5
pageIdx: 分页数据，默认首页为0

{"msg":"success","code":"A00000","qTime":"1452470400","ownerId":12345,"ownerName":"横店","results":{"updateTime":1452521199000,"movieId":6013,"movieName":"小门神（3D）","movieNum":"001c06162015","pageIdx":0,"pageSize":5,"cenimaList":[{"cinemaId":11051801,"cinemaName":"中国横店","grossAll":1234,"hallcount":1234,"ticketAll":1234,”seatAll":5768},{"cinemaId":11051802,"cinemaName":"中国横店2","grossAll":1234,"hallcount":1234,"ticketAll":1234,”seatAll":5768}]}}

更新时间：results/updateTime  注：适用规则#3
当前页码数：/results/ pageIdx
总翻页数：  /results/ pageSize  对于翻页操作：当是首页是前一页不可操作，当是末页时，后一页不可操作
影院名称：/results/ cenimaList/ cinemaName
预售票房：/results/cinemaList/ grossAll适用规则#1
排片场次：/results/cinemaList/hallCount适用规则#1
预售人次: /results/cinemaList/ ticketAll  适用规则#1

支持翻页
“今天”以前历史数据不可查看。