<template>
	<view class="body">
		<view class="content-head">
			<view class="spanTime" style="padding-top: 5px;font-size: 14px;color:gray">{{time}}</view>
			<view>
				<span class="weather">{{weekday}}</span>
				<span class="city">西安</span>
			</view>
		</view>
		<view class="content">
			<view class="mainInfo">
				<p class="btn-1">基础信息</p>
				<p><span>G7001十天高速白泉段</span><span>白河管理所</span></p>
			</view>
			<view class="list-1">
				<view>调查路段</view>
				<picker :value="index" @change.prevent.stop="getCouponSelected0" :range="roadDataList">
					<view ref="addRequestState" class="uni-input">{{roadDataList[index0]}}</view>
				</picker>
			</view>
			<view class="list-1">
				<view>调查方向</view>
				<picker @change.prevent.stop="getCouponSelected" :value="index" :range="couponList">
					<view ref="addRequestState" class="uni-input">{{couponList[index]}}</view>
				</picker>
			</view>
			<view class="list-1">
				<view>线路编号</view>
				<view class="zhInput">
					<!-- <text>k</text> -->
					<input style="border: none;text-align: right;font-size: 15px;width: auto;" class="zhNum" disabled v-model="form.highData.number" type="text" />
				</view>
			</view>
			<view class="list-1">
				<view>管理公司</view>
				<view class="zhInput">
					<!-- <text>k</text> -->
					<input style="border: none;text-align: right;font-size: 15px;width: auto;" class="zhNum" disabled v-model="rankData.name" type="text" />
				</view>
			</view>
			<view class="list-1">
				<view>起点桩号</view>
				<view class="zhInput">
					<text>k</text>
					<input class="zhNum" v-model="zh1" type="number" />
					<text>+</text>
					<input class="zhNum" v-model="zh2" type="number" />
				</view>
			</view>
			<view class="list-1">
				<view style="display:flex;align-items: center;"><span style="margin-right:5px;">单元长度</span><input v-model="extent"
					 type="number" class="lengthValue" /><span style="margin-left:5px;">米</span></view>
				<view style="display:flex;align-items: center;"><span style="margin-right:5px;">路面宽度</span><input v-model="width"
					 type="number" class="widthValue" /><span style="margin-left:5px;">米</span></view>
			</view>
			<view class="btn-3" style="margin-left: 10px;">
				调查内容
			</view>
			<view class="list-1 surveyBox">
				<view class="contentItem" v-if="item.name!==null" v-for="(item,index) in surveyArr" :key="index" @click="selectType(index,item)"
				 :class="{active:nowIndex==index}">
					{{item.name}}-{{item.extent}}
				</view>
			</view>
			<view class="desc">
				{{nowItem.name}}
			</view>
			<view>
				<span>百米损坏</span>
				<span>以千米为检测单元，每个数字，代表第 * 百米 区间。</span>
			</view>
			<view v-for="(item,index) in inspect" v-show="nowIndex==index">
				<view class="rankbox">
					<p style="background-color: #ffd978;">{{proprityItem.degree}}</p>
					<p>权重{{surveyArr[index].weight}}单位扣分：{{surveyArr[index].unitPoint}} 单位：{{surveyArr[index].unit}}</p>
				</view>
				<view class="table">
					<table border="" cellspacing="" cellpadding="">
						<tr v-model="proprityItem">
							<td>
								<view class="">
									<span>1</span><input type="number" @input="newValue(index)" v-model="item.one" maxlength="2">
								</view>
							</td>
							<td>
								<view class="">
									<span>2</span><input type="number" @input="newValue(index)" v-model="item.two">
								</view>
							</td>
							<td>
								<view class="">
									<span>3</span><input type="number" @input="newValue(index)" v-model="item.three">
								</view>
							</td>
							<td>
								<view class="">
									<span>4</span><input type="number" @input="newValue(index)" v-model="item.four">
								</view>
							</td>
							<td>
								<view class="">
									<span>5</span><input type="number" @input="newValue(index)" v-model="item.five">
								</view>
							</td>
						</tr>
						<tr>
							<td>
								<view class="">
									<span>6</span><input type="number" @input="newValue(index)" v-model="item.six">
								</view>
							</td>
							<td>
								<view class="">
									<span>7</span><input type="number" @input="newValue(index)" v-model="item.seven">
								</view>
							</td>
							<td>
								<view class="">
									<span>8</span><input type="number" @input="newValue(index)" v-model="item.eight">
								</view>
							</td>
							<td>
								<view class="">
									<span>9</span><input type="number" @input="newValue(index)" v-model="item.nine">
								</view>
							</td>
							<td>
								<view class="">
									<span>10</span><input type="number" @input="newValue(index)" v-model="item.ten">
								</view>
							</td>
						</tr>
						<tr>
							<td>损坏</td>
							<td>
								<view class="">
									<input type="number" disabled v-model="item.total">
								</view>
							</td>
							<td>扣分</td>
							<td>
								<view class="">
									<input type="number" disabled v-model="item.score">
								</view>
							</td>
							<td></td>
						</tr>
					</table>
				</view>
				<view class="table">
					<table border="0" cellspacing="0" cellpadding="0">
						<tr width="25%">
							<td width="25%">累计扣分</td>
							<td style="border-bottom: 1px solid #ddd;">
								<view class="">
									<input type="number" disabled v-model="form.countScore">
								</view>
							</td>
						</tr>
						<tr width="25%">
							<td width="25">检测得分</td>
							<td style="border-bottom: 1px solid #ddd;">
								<view class="">
									<input type="number" disabled v-model="form.totalScore">
								</view>
							</td>
						</tr>
					</table>
				</view>
			</view>
			<view class="list-1">
				<view>调查人员： </view>
				<input type="text" value="" v-model="staff" class="dcinput" />
			</view>
			<view class="list-1">
				<view>调查时间： </view>
				<view class="uni-list-cell-db">
					<picker mode="date" :value="time" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{time}}</view>
					</picker>
				</view>
				<!-- <view class="input-time-img" style="padding-top:6px">
					<input id="mydatepicker" placeholder="请输入日期" class="laydate-icon" style="width: 200px;" onclick="laydate({istime: true, format: 'YYYY-MM-DD hh:mm:ss'})" />
				</view> -->
			</view>
			<view class="submit" @click="save">
				提交
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				form: {
					roadDataId: '',
					name: '',
					rankData: {
						name: '',
					},
					highData: {
						number: '',
					},
					roadData: {
						name: '',
					},
					direction: '',
					startStake: '',
					extent: '',
					width: '',
					staff: '',
					time: '',
					countScore: '',
					totalScore: '',
					detailList: [],
				},
				nowIndex: 0,
				extent: "",
				width: "",
				zh1: "",
				zh2: "",
				index: 0,
				weekday:"",
				index0: 0,
				nowItem: "路肩损坏",
				roadDataList: ['请选择'],
				roadData: [],
				couponList: ['请选择', '上行线', '下行线'],
				time: new Date().toISOString().slice(0, 10), //日期
				direction: "",
				direction0: "",
				roadDataId: "",
				time: currentDate,
				staff: "",
				e0: null,
				e: null,
				surveyArr: [],
				list: [],
				inspect: [],
				rankData:{
					name:""
					},
				proprityItem: {
					degree: "",
					mark: "",
					weight: "",
					unit: "",
					one: "",
					two: "",
					three: "",
					four: "",
					five: "",
					six: "",
					seven: "",
					eight: "",
					nine: "",
					ten: "",
					total: "",
					value: "",
					score: ""
				},
				proprityItem1: {
					degree: "",
					mark: "",
					weight: "",
					unit: "",
					one: "",
					two: "",
					three: "",
					four: "",
					five: "",
					six: "",
					seven: "",
					eight: "",
					nine: "",
					ten: "",
					total: "",
					value: "",
					score: ""
				},
				proprityItem2: {
					degree: "",
					mark: "",
					weight: "",
					unit: "",
					one: "",
					two: "",
					three: "",
					four: "",
					five: "",
					six: "",
					seven: "",
					eight: "",
					nine: "",
					ten: "",
					total: "",
					value: "",
					score: ""
				},
				proprityItem3: {
					degree: "",
					mark: "",
					weight: "",
					unit: "",
					one: "",
					two: "",
					three: "",
					four: "",
					five: "",
					six: "",
					seven: "",
					eight: "",
					nine: "",
					ten: "",
					total: "",
					value: "",
					score: ""
				},
				proprityItem4: {
					degree: "",
					mark: "",
					weight: "",
					unit: "",
					one: "",
					two: "",
					three: "",
					four: "",
					five: "",
					six: "",
					seven: "",
					eight: "",
					nine: "",
					ten: "",
					total: "",
					value: "",
					score: ""
				},
				proprityItem5: {
					degree: "轻",
					mark: "",
					weight: "",
					unit: "",
					one: "",
					two: "",
					three: "",
					four: "",
					five: "",
					six: "",
					seven: "",
					eight: "",
					nine: "",
					ten: "",
					total: "",
					value: "",
					score: ""
				},
				proprityItem6: {
					degree: "轻",
					mark: "",
					weight: "",
					unit: "",
					one: "",
					two: "",
					three: "",
					four: "",
					five: "",
					six: "",
					seven: "",
					eight: "",
					nine: "",
					ten: "",
					total: "",
					value: "",
					score: ""
				},
				proprityItem7: {
					degree: "轻",
					mark: "",
					weight: "",
					unit: "",
					one: "",
					two: "",
					three: "",
					four: "",
					five: "",
					six: "",
					seven: "",
					eight: "",
					nine: "",
					ten: "",
					total: "",
					value: "",
					score: ""
				},
				proprityItem8: {
					degree: "轻",
					mark: "",
					weight: "",
					unit: "",
					one: "",
					two: "",
					three: "",
					four: "",
					five: "",
					six: "",
					seven: "",
					eight: "",
					nine: "",
					ten: "",
					total: "",
					value: "",
					score: ""
				},
				proprityItem9: {
					degree: "轻",
					mark: "",
					weight: "",
					unit: "",
					one: "",
					two: "",
					three: "",
					four: "",
					five: "",
					six: "",
					seven: "",
					eight: "",
					nine: "",
					ten: "",
					total: "",
					value: "",
					score: ""
				}
			}
		},
		computed: {
			listenData() {
				const {
					proprityItem
				} = this
				return {
					proprityItem
				}
			},
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		watch: {
			getCouponSelected0(newVal, oldVal) {
				console.log(newVal, oldVal)
			}
		},
		created() {
			this.surveyList()
			var that = this;
			// uni.getStorage({
			// 	key: 'currentUser',
			// 	success: function(res) {
			// 		if (JSON.parse(res.data)) {
			// 		}
			// 	}
			// });
		},
		methods: {
			newValue(index) {
				console.log(this.inspect)
				var Sum = 0;
				this.inspect.forEach(res => {
					res.total = Number(res.one) +
						Number(res.two) +
						Number(res.three) +
						Number(res.four) +
						Number(res.five) +
						Number(res.six) +
						Number(res.seven) +
						Number(res.eight) +
						Number(res.nine) +
						Number(res.ten)
					res.score = (res.total * res.weight * res.unitPoint)
					console.log(res.score)
					Sum += res.score
					this.form.countScore = (Sum).toFixed(2)
					this.form.totalScore = (100 - this.form.countScore).toFixed(2)
				})
			},
			selectType(i, v) {
				this.nowIndex = i;
				this.nowItem = v;
			},
			bindDateChange: function(e) {
				this.time = e.target.value
			},
			onShow() {
				this.weekday = uni.getStorageSync('type');
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
			getCouponSelected0(e) {
				console.log(e)
				this.e0 = e
				this.index0 = e.target.value;
				this.direction0 = this.roadDataList[e.target.value]
				this.roadData.forEach(res => {
					if (this.direction0 === res.name) {
						this.roadDataId = res.id
						this.rankData.name=res.rankData.name
						this.form.highData.number=res.highData.number
					}
				})
				let data = {
					currentPage: "1",
					startStake: "",
				};
				uni.request({
					header: {
						'content-Type': 'application/json'
					},
					url: "http://119.27.171.77:8077/roadbedSurvey/page/list", //仅为示例，并非真实接口地址。
					method: 'POST',
					data: data,
				
					success: (res) => {
						console.log(res.data.data.list[1])
						this.zh1 = res.data.data.list[0].startStake.substring(res.data.data.list[1].startStake.indexOf('k')+1,res.data.data.list[1].startStake.lastIndexOf('+'))
						this.zh2 = (res.data.data.list[1].startStake.split('+')[1])
						this.extent=res.data.data.list[1].extent
						this.width=res.data.data.list[1].width
						this.staff=res.data.data.list[1].staff
				
					}
				});
			},
			getCouponSelected(e) {
				console.log(e)
				this.e = e
				this.index = e.target.value;
				this.direction = this.couponList[e.target.value]
			},
			weatherFun() {
				this.$http.weather(101110410).then(res => {
					// console.log(res);
				}, error => {
					console.log(error);
				})
			},
			city() {
				var that = this;
				let opts = {
					url: '/user/getCityCode',
					method: 'post'
				};
				that.$http.httpRequest(opts, {}).then(res => {
					console.log(res)
				}, error => {
					console.log(error);
				})
			},
			// zhList() {
			// 	let opts = {
			// 		url: '/pilenumber/listAll',
			// 		method: 'post'
			// 	};
			// 	this.$http.httpRequest(opts, {}).then(res => {
			// 		console.log(res)
			// 	}, error => {
			// 		console.log(error);
			// 	})
			// },
			surveyList() {
				uni.request({
					header: {
						'Content-Type': 'application/json'
					},
					url: "http://119.27.171.77:8077/roadData/listAll", //仅为示例，并非真实接口地址。
					method: 'POST',
					data: {},
					dataType: 'json',
					success: (res) => {
						console.log(res)
						res.data.data.forEach(item => {
							console.log(item)
							this.roadDataList.push(item.name)
							this.roadData.push(item)
							console.log(this.roadData)
						})
					}
				});
				uni.request({
					header: {
						'Content-Type': 'application/json'
					},
					url: "http://119.27.171.77:8077/roadbed/listAll", //仅为示例，并非真实接口地址。
					method: 'POST',
					data: {},
					dataType: 'json',
					success: (res) => {
						// var result = JSON.parse(res.data.projectList);
						console.log(res)
						res.data.data.forEach(item => {
							console.log(item)
							this.surveyArr.push(item)
							console.log(this.surveyArr)
							this.inspect = []
							for (let i = 0; i < this.surveyArr.length; i++) {
								console.log(this.surveyArr[i])
								this.inspect.push({
									degree: this.surveyArr[i].extent,
									mark: this.surveyArr[i].unitPoint,
									weight: this.surveyArr[i].weight,
									unitPoint: this.surveyArr[i].unitPoint,
									unit: this.surveyArr[i].unit,
									damageType: this.surveyArr[i].name,
									one: "",
									two: "",
									three: "",
									four: "",
									five: "",
									six: "",
									seven: "",
									eight: "",
									nine: "",
									ten: "",
									total: "",
									value: "",
									score: ""
								})
								console.log(this.inspect)
							}
						})
					}
				});
			},
			save() {
				// console.log(this.e, this.e0)
				if (this.e0 === null) {
					uni.showModal({
						title: '提示',
						content: '请先选择调查路段！',
					});
				} else
				if (this.e === null) {
					uni.showModal({
						title: '提示',
						content: '请先选择调查方向！',
					});
				} else {
					this.inspect.forEach((ite, ind) => {
						if (ite.one === "") {
							ite.one = "0"
						}
						if (ite.two === "") {
							ite.two = "0"
						}
						if (ite.three === "") {
							ite.three = "0"
						}
						if (ite.four === "") {
							ite.four = "0"
						}
						if (ite.five === "") {
							ite.five = "0"
						}
						if (ite.six === "") {
							ite.six = "0"
						}
						if (ite.seven === "") {
							ite.seven = "0"
						}
						if (ite.eight === "") {
							ite.eight = "0"
						}
						if (ite.nine === "") {
							ite.nine = "0"
						}
						if (ite.ten === "") {
							ite.ten = "0"
						}
					})
					console.log(this.form.detailList)
					uni.request({
						header: {
							'Content-Type': 'application/json'
						},
						url: "http://119.27.171.77:8077/roadbedSurvey/add", //仅为示例，并非真实接口地址。
						method: 'POST',
						data: {
							direction: this.direction,
							roadDataId: this.roadDataId,
							startStake: "k" + this.zh1 + "+" + this.zh2,
							rankData:this.rankData,
							extent: this.extent,
							width: this.width,
							staff: this.staff,
							time: this.time,
							detailList: this.inspect,
							countScore: this.form.countScore,
							totalScore: this.form.totalScore
						},
						dataType: 'json',
						success: (res) => {
							console.log(res)
						}
					});
					uni.showToast({
						title: "添加成功！",
						icon: "none",
						duration: 1500
					});
					setTimeout(() => {
						uni.switchTab({
							url: "../pingding/index",
							success() {
								let page = getCurrentPages().pop(); //跳转页面成功之后                 
								console.log(page)
								if (!page) return;
								page.onLoad(); //如果页面存在，则重新刷新页面
							}
						})
					}, 1500)
					uni.setStorageSync("username", "2")

				}
			}
		},
		mounted() {
			this.weatherFun()
			// this.city()
			// this.zhList()
		}
	}
</script>

<style scoped>
	/* 弹性盒头部固定,其余自适应 */
	html,
	body,
	.body {
		width: 100%;
		height: 100%;
		font-size: 14px;
	}

	.mui-title {
		font-size: 16px;
		padding: 0 10px;
	}

	.content-head {
		padding: 0 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.body {
		display: flex;
		flex-direction: column;
	}

	.spanTime,
	.weather,
	.city {
		font-size: 14px;
		color: #666;
	}

	.content {
		flex: 1;
	}

	.mainInfo {
		padding: 0 10px;
	}

	.mainInfo>p:last-child {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.btn-1,
	.btn-2,
	.btn-3 {
		width: 7rem;
		background-color: #E6F2FE;
		color: #2695CB;
		padding: 0.3125rem 0;
		text-align: center;
		border-radius: 0.75rem;
		margin: 10px 0;
		font-size: 14px;
	}

	.btn-2 {
		color: #ffffff;
		background-color: #ffaa00;
	}

	.btn-3 {
		color: #ffffff;
		background-color: #20a6ff;
		padding: 0.3125rem 0;
		margin: 10px 0;
	}

	.mui-btn {
		font-size: 16px;
		padding: 8px;
		margin: 3px;
	}

	.list-1 {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 0.0625rem dashed lightgray;
		padding: 5px 10px;
		box-sizing: border-box;
	}

	.desc+view {
		padding: 5px 10px;
		display: flex;
		flex-direction: column;
		text-align: center;
		background-color: #e8e6dd;
	}

	.contentItem {
		width: 100%;
		padding: 2px 0px;
		color: #333;
		font-size: 14px;
		background-color: #F7F4ED;
		margin-bottom: 10px;
		text-align: center;
		width: 32%;
	}

	.desc {
		width: 100%;
		padding: 10px 0;
		color: #333;
		text-align: center;
		background-color: rgb(255, 204, 0);
		/* margin-top: 10px; */
	}

	.desc+div {
		background-color: #F7F4ED;
		padding: 10px 0;
		color: #333;
		text-align: center;
		display: flex;
		flex-direction: column;
		border-top: 1px dashed #666;
	}

	.desc+div>span:last-child {
		font-size: 12px;
		color: red;
	}

	.rankbox {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 0.0625rem dashed lightgray;
		padding: 0 10px;
		margin-top: 10px;
		background-color: beige;
		height: 34px;
	}

	.rankbox>p:first-child {
		width: 20px;
		height: 20px;
		background-color: orange;
		color: #FFFFFF;
		border-radius: 100px;
		text-align: center;
		line-height: 20px;
		margin-top: 2px;
		margin-right: 5px;
		font-size: 11px;
	}

	.rankbox>p:last-child {
		height: 100%;
		color: red;
		line-height: 35px;
	}

	.table {
		margin: 0 auto;
	}

	.table table {
		border: 1px solid #ddd;
		width: 100%;
		font-size: 13px;
		text-align: center;
		border: 1px solid #ddd;
		border-bottom: none;
		border-right: none;
		border-top: none;
	}

	.table {
		border-top: none;
		border-bottom: none;
	}

	.table td {
		padding: 5px;
		border: none;
		border: 1px solid #ddd;
		border-top: none;
		border-left: none;
		margin: 0 !important;
	}

	.table td {
		padding: 5px;
	}

	.table td view {
		display: flex;
		align-items: center;
	}

	.table td input {
		/* width:30px; */
		margin-left: 10px;
	}

	.dcinput {
		text-align: right;
	}

	.submit {
		padding: 5px 50px;
		color: #FFFFFF;
		display: inline-block;
		border-radius: 30px;
		background-color: #007AFF;
		position: absolute;
		left: 50%;
		/* top: 50%; */
		transform: translate(-50%, 0);
		margin: 20px 0;
	}

	.zhInput {
		display: flex;
		align-items: center;
	}

	.zhNum {
		width: 3rem;
		border: 1px solid #CCCCCC;
		margin-left: 5px;
	}

	.widthValue,
	.lengthValue {
		width: 4rem;
	}

	.surveyBox {
		flex-wrap: wrap;
		display: flex;
		direction: row;
	}

	.active {
		background-color: #ffdde5;
		border: 1px solid red;
		color: red;
	}

	.uni-input-input {
		border: 1px solid #ccc;
	}
</style>
