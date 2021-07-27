<template>
	<view class="body">
		<view class="Neck">
			<span class="time">{{time}} {{weekday}}</span>
			<view class="weather">
				<span>{{type}}{{temperature}}</span>
			</view>
		</view>
<!-- 		<view class="top">
			<view class="years">
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							选择日期:
						</view>
						<view class="uni-list-cell-db">
							<picker mode="date" :value="time1" :start="startDate" :end="endDate"
								@change="bindPickerChange">
								<view class="uni-input">{{time1}}</view>
							</picker>
						</view>
					</view>
				</view>
			</view>
			<navigator class="add" url="../Journal/add">新增</navigator>
		</view> -->
		<view class="cu-list menu-avatar">
			<view class="cu-item" @click="getId(index)" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(item,index) in list"
				:key="index" @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd"
				:data-target="'move-box-' + index">
				<view class="cu-avatar round lg"
					:style="[{backgroundImage:'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big2100'+ (index+2) +'.jpg)'}]">
				</view>
				<view class="content">
					<view class="text-grey">{{item.enforce.level}}</view>
					<view class="text-gray text-sm">
						<!-- <text class="cuIcon-infofill text-red  margin-right-xs"></text> -->
						<!-- 消息未送达 -->
						{{item.enforce.type}}
					</view>
				</view>
				<view class="action" style="width: 70px;">
					<view class="text-grey text-xs">{{item.enforce.time}}</view>
					<!-- <view class="cu-tag round bg-grey sm">5</view> -->
					{{item.enforce.lawType}}
				</view>
				<view class="move">
					<!-- <view class="bg-grey">置顶</view> -->
					<view class="bg-red" @tap.stop="deleteIndex(item.id)">删除</view>
				</view>
			</view>
		</view>
<!-- 		<view class="table" style="margin-top: 18px;padding-bottom: 20%;">
			<table style="width: 100%;" border="1" cellspacing="0" cellpadding="0">
				<tr style="width: 100%;">
					<th>巡查类型</th>
					<th>巡查区域</th>
					<th>巡查时间</th>
					<th>巡查结果</th>
				</tr>
				<tr style="width: 100%;" v-for="(item,index) in list" @click="getId(index)" :key="index">
					<td>{{item.type==1?'专项':'日常'}}</td>
					<td>{{item.area}}</td>
					<td>{{item.time.substr(0,10)}}</td>
					<td :style="{'background':item.result==1?'#5FB456':'#FF0100'}">{{item.result==1?'正常':'异常'}}</td>
				</tr>

			</table>
		</view>
		<view class="bottom" style="text-align: center;margin-top: -19%;">
			<p v-show="flag">{{text.load}}</p>
			<p v-show="flag1">{{text.normal}}</p>
			<p v-show="flag2">{{text.none}}</p>
		</view> -->
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex';
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				userId:"",
				modalName: null,
				gridBorder: false,
				skin: false,
				listTouchStart: 0,
				listTouchDirection: null,
				Inspectionresults: {
					normal: "",
					abnormal: ""
				},
				list: [],
				position: '',
				temperature: '', //温度
				type: '', //天气类型
				data: '', //星期
				weekday: '', //星
				year: '',
				time1:'请选择',
				patrolTime:'',
				time: new Date().toISOString().slice(0, 10), //日期
				array: ['2020', '2019', '2018', '2017'],
				index: 0,
				params: {
					currentPage: 1,
				},
				total: '',
				flag: false,
				flag1: false,
				flag2: true,
				text: {
					none: '上拉加载',
					normal: '没有更多的数据了...',
					load: '正在加载中...'
				}
			};
		},
		watch: {
			list() {
				if (this.list.length >= this.total) {
					this.flag1 = true
					this.flag = false
					this.flag2 = false
					return;
				} else {
					this.flag == true
				}
			}
		},
		onShow() {
			console.log('跳转')
			// this.$forceUpdate()
			// this.surveyList(1)
		},
		computed: {
			...mapState(['loginData']),
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		mounted() {
			this.userId = uni.getStorageSync("currentUser").id
			var mydate = new Date();
			var myddy = mydate.getDay(); //获取存储当前日期
			var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
			console.log(weekday[myddy])
			this.weekday = weekday[myddy]
			// this.surveyList(1)
		},
		methods: {
			childMethod1() {
				this.surveyList(1)
			},
			childMethod() {
				if (this.list.length >= this.total) {
					this.flag1 = true
					this.flag = false
					this.flag2 = false
					return;
				} else {
					this.flag == true
				}
				uni.showNavigationBarLoading(); //显示加载动画
				this.params.currentPage++;
				this.surveyList()
			},
			deleteIndex(e) {
				console.log(e)
				let data = {
					id: e
				};
				let opts = {
					url: '/roadWorkLog/delete',
					method: 'post'
				};
				console.log(data)
				this.$http.httpRequest(opts, data).then(res => {
					console.log(res)
					// this.surveyList(1)
					// this.list.forEach(item=>{
					// 	if(item.id==e){
					// 		console.log(item)
					// 		this.list.splice(item,1)
					// 	}
					// })
					
					// this.total = res.data.data.total
					// uni.hideNavigationBarLoading(); //关闭加载动画
					// this.list = this.list.concat(res.data.data.list); //合并数组
				})
			},
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},

			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},

			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.patrolTime = e.target.value
				this.time1 = e.target.value
				this.params.currentPage = 1
				this.list = []
				// this.surveyList(1)
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			getId(index) {
				console.log(index)
				console.log(this.list[index])
				uni.navigateTo({ //点击跳转的方法
					url: '../query/add?id=' + encodeURIComponent(JSON.stringify(this.list[index])) //需要跳转的页面路径，使用问号进行id的传值，然后再拼接一个要传入的id
				})
			},
			surveyList(page) {
				console.log(page)
				this.list = []
				// if (page == 1) {
				// 	this.list = []
				// 	this.params.currentPage = 1
				// }
				let data = {
					// currentPage: this.params.currentPage,
					// number:''
					// // workTime: this.patrolTime
					// // workTime:this.patrolTime
				};
				let opts = {
					url: '/approveEnforce/listAll',
					method: 'post'
				};
				console.log(data)
				this.$http.httpRequest(opts, data).then(res => {
					console.log(res)
					uni.hideNavigationBarLoading(); //关闭加载动画
					res.data.data.forEach(ite=>{
						console.log(this.userId)
						// if(ite.status=='1'&&ite.userId==this.userId){
						// 	console.log(ite)
						// 	// ite.shift()
						// 	// return ite
						// 	this.list.push(ite)
						// }
						this.list.push(ite)
					})
					// this.list = this.list.concat(res.data.data); //合并数组
					this.total = this.list.length
					console.log(this.list)						

				})
				let opts1 = {
					url: '/securityPatrol/getNormalTimes',
					method: 'post'
				};
				this.$http.httpRequest(opts1, {}).then(res => {
					console.log(res)
					this.Inspectionresults.normal = res.data.data.normal
					this.Inspectionresults.abnormal = res.data.data.abnormal
				})
				uni.request({
					url: 'http://wthrcdn.etouch.cn/weather_mini?city=西安',
					method: 'GET',
					success: res => {
						console.log(res.data.data.forecast[0]);
						this.type = res.data.data.forecast[0].type
						uni.setStorageSync('type', this.type);
						this.date = res.data.data.forecast[0].date.slice(3)
						// this.temperature = res.data.data.forecast[0].high.slice(3)
					},
					fail: () => {
						this.openmsg("警告", "天气接口获取失败")
					},
					complete: () => {}
				});
			},

		}
	};
</script>

<style lang="less">
	.top {
		display: flex;
		flex-direction: row;
		margin-top: 15px;
		height: 21px;
		width: 100%;
	}

	.top .years {
		padding-left: 18px;
		padding-right: 120px;

		.uni-list-cell {
			display: flex;
			width: 170px;

			.uni-list-cell-db {
				line-height: 20px;
				color: #088AFF;
			}
		}
	}

	.top .add {
		font-size: 14px;
		position: absolute;
		background: #E6F2FF;
		color: #088AFF;
		text-align: center;
		border-radius: 5%;
		right: 20px;
	}

	.top .search {
		font-size: 14px;
		width: 20%;
		background: #0086FE;
		text-align: center;
		color: #FFFFFF;
		border-radius: 10%;
		margin-right: 5%;
	}

	.neck {
		display: flex;
		flex-direction: row;
		margin-top: 14px;
	}

	.neck .subgrade {
		font-size: 13px;
		padding-left: 14px;
		border-left: 3px solid #0086FE;
		margin-left: 19px;
		width: 119px;
		margin-top: -13px;
	}

	.neck .baihe {
		font-size: 14px;
		width: 87px;
		background: rgb(0, 204, 255);
		text-align: center;
		color: white;
		border-radius: 10%;
		margin-left: 35%;
	}

	.Range {
		margin-top: 5px;
		font-size: 14px;
		height: 33px;
		line-height: 30px;
		display: flex;
		width: 100%;

		h5 {
			font-size: 15px !important;
			padding-left: 17px;
			width: 152%;
		}

		view {
			background-color: #03CCFF;
			color: #FFFFFF;
			height: 24px;
			border-radius: 5%;
			width: 67%;
			text-align: center;
			line-height: 23px;
			margin-left: 52px;
			margin-right: 4%;
		}
	}

	.table {
		border: none;

		table {
			border-bottom: 1px solid #E9E9E9;
		}
	}

	.table tr th {
		font-size: 15px;
		border: 1px solid #E9E9E9;
		width: 25%;
		border-left: none;
		border-bottom: none;
		border-top: none;
		background-color: #0086FE;
		color: #FFFFFF;
		font-weight: normal;
		height: 33px;
	}

	.table tr td {
		width: 25%;
		font-size: 14px;
		border: 1px solid #E9E9E9;
		text-align: center;
		border-left: none;
		border-bottom: none;
		height: 33px;
		margin: 0;
	}

	.head uni-navigator {
		height: 30px;
		width: 33%;
		text-align: center;
	}

	.two1 {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		font-size: 14px;
		color: #fff;
		line-height: 20px;
		text-align: center;
		/* margin: 0px 42px 0px 18px; */
		float: right;
		margin-right: 12px;
	}

	.head {
		width: 100%;
		height: 20px;
		display: flex;
		font-size: 16px;

	}

	.Neck {
		display: flex;
		margin-top: 28px;

		.time {
			font-size: 14px;
			font-weight: 700;
			padding-left: 18px;
			display: inline-table;
			width: 60%;
		}

		.weather {
			margin-left: 60px;

			span {
				font-size: 14px;
				float: right;
			}
		}
	}
</style>
