<template>
	<view class="body">
		<view class="Neck">
			<span class="time">{{time}} {{weekday}}</span>
			<view class="weather">
				<span>{{type}}{{temperature}}</span>
			</view>
		</view>
		<view class="top">
			<view class="years">
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-left">
							选择年份:
						</view>
						<view class="uni-list-cell-db">
							<picker @change="bindPickerChange" :value="index" :range="array">
								<view class="uni-input">{{array[index]}}</view>
							</picker>
						</view>
						<view class="uni-list-cell-left">
							至
						</view>
						<view class="uni-list-cell-db">
							<picker @change="bindPickerChange1" :value="index1" :range="array1">
								<view class="uni-input">{{array1[index1]}}</view>
							</picker>
						</view>
					</view>
				</view>
			</view>
			<navigator class="add" url="../handong/add">添加检查单</navigator>
		</view>
		<!-- 		<view class="neck">
			<span class="subgrade">G7001十天高速白泉</span>
		</view>
		<view class="Range">
			<h5>桩号范围：K73+500 ~ K100</h5>
			<view>
				白河管理所
			</view>
		</view> -->
		<view class="table" style="margin-top: 18px;padding-bottom: 20%;">
			<table style="width: 100%;" border="1" cellspacing="0" cellpadding="0">
				<tr style="width: 100%;">
					<th>涵洞桩号</th>
					<th>桥梁名称</th>
					<th>检测时间</th>
				</tr>
				<tr style="width: 100%;" v-for="(item,index) in list" @click="getId(index)" :key="index">
					<td>{{item.stake}}</td>
					<td>{{item.culvert.culvertType}}</td>
					<td>{{item.time.substring(0,10)}}</td>
				</tr>

			</table>
		</view>
		<view class="bottom" style="text-align: center;margin-top: -19%;">
			<p v-show="flag2">{{text.none}}</p>
			<p v-show="flag">{{text.load}}</p>
			<p v-show="flag1">{{text.normal}}</p>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex';
	export default {
		data() {
			return {
				list: [],
				position: '',
				temperature: '', //温度
				type: '', //天气类型
				data: '', //星期
				weekday: '',
				startTime: '2019-01-01',
				endTime: '2020-12-30',
				time: new Date().toISOString().slice(0, 10), //日期
				array: ['2020', '2019', '2018', '2017'],
				array1: ['2020', '2019', '2018', '2017'],
				index: 1,
				index1: 0,
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
		created() {
			this.surveyList()
			let data = {
				id: this.loginData,
			};
			let opts = {
				url: '/rankData/findById',
				method: 'post'
			};
			this.$http.httpRequest(opts, data).then(res => {
									this.position = res.data.data.name
			})
		},
		computed: {
			...mapState(['loginData'])
		},
		mounted() {
			var mydate = new Date();
			var myddy = mydate.getDay(); //获取存储当前日期
			var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
			console.log(weekday[myddy])
			this.weekday = weekday[myddy]
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
				this.startTime = this.array[e.target.value] + '-01-01'
				this.params.currentPage = 1
				this.list = []
				this.surveyList()
			},
			bindPickerChange1: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index1 = e.target.value
				this.endTime = this.array1[e.target.value] + '-12-30'
				this.params.currentPage = 1
				this.list = []
				this.surveyList()
			},
			childMethod1() {
				this.surveyList(1)
			},
			childMethod() {
				console.log(this.list.length, this.total)
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
			getId(index) {
				console.log(this.list[index])
				uni.setStorageSync("indexObj", this.list[index])
				let data = {
					areaId: "",
					circuitType: "",
					culvertType: "",
					currentPage: 1,
					keyword: "",
					searchTxt: ""
				};
				let opts = {
					url: '/culvert/page/list',
					method: 'post'
				};
				this.$http.httpRequest(opts, data).then(res => {
					var arr = []
					res.data.data.list.forEach(item => {
						console.log(item.id)
						if (item.id == this.list[index].culverId) {
							arr.push(item)
						}
					})
					let _self = this;
					console.log(_self.list[index])
					uni.setStorage({
						key: 'indexObj1',
						data: arr[0],
						success: function() {
					
							uni.navigateTo({
								url: '../handong/list?id=' + _self.list[index].culverId + _self.list[index].time.substring(0, 7) //需要跳转的页面路径，使用问号进行id的传值，然后再拼接一个要传入的id
							})
						}
					})
				})
			},
			surveyList(page) {
				if(page==1){
					this.list=[]
					this.params.currentPage=1
				}
				let data = {
						currentPage: this.params.currentPage,
						stake: "",
						startTime: this.startTime,
						endTime: this.endTime
				};
				let opts = {
					url: '/culvertExamine/page/list',
					method: 'post'
				};
				this.$http.httpRequest(opts, data).then(res => {
					this.total = res.data.data.total
					uni.hideNavigationBarLoading(); //关闭加载动画
					this.list = this.list.concat(res.data.data.list); //合并数组
				})
				uni.request({
					url: 'http://wthrcdn.etouch.cn/weather_mini?city=西安',
					method: 'GET',
					success: res => {
						console.log(res)
						console.log(res.data.data.forecast[0]);
						this.type = res.data.data.forecast[0].type
						this.date = res.data.data.forecast[0].date.slice(3)
						this.temperature = res.data.data.forecast[0].high.slice(3)
						console.log(this.temperature)
						this.cylinderEmpty.temperature = Math.round(res.data.data.wendu);
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
		padding-right: 103px;

		.uni-list-cell {
			display: flex;

			.uni-list-cell-db {
				line-height: 20px;
				color: #088AFF;
			}
		}
	}

	.top .quarter {
		padding-right: 18px;
	}

	.top .add {
		font-size: 14px;
		width: 30%;
		background: #E6F2FF;
		color: #088AFF;
		text-align: center;
		border-radius: 5%;
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
