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
				<p>
					<span>G7001十天高速白泉段</span>
					<span>白河管理所</span>
				</p>
			</view>
			<view class="list-1">
				<view>调查路段</view>
				<picker :value="index" @change="getCouponSelected0" :range="roadDataList">
					<view ref="addRequestState" class="uni-input">{{roadDataList[index0]}}</view>
				</picker>
			</view>
			<view class="list-1">
				<view>调查方向</view>
				<picker @change="getCouponSelected2" :value="index" :range="couponList">
					<view ref="addRequestState" class="uni-input">{{couponList[index1]}}</view>
				</picker>
			</view>
			<view class="list-1">
				<view>线路编号</view>
				<view class="zhInput">
					<!-- <text>k</text> -->
					<input style="border: none;text-align: right;font-size: 15px;width: auto;" class="zhNum" disabled v-model="form.highData.number"
					 type="text" />
				</view>
			</view>
			<view class="list-1">
				<view>管理公司</view>
				<view class="zhInput">
					<!-- <text>k</text> -->
					<input style="border: none;text-align: right;font-size: 15px;width: auto;" class="zhNum" disabled v-model="rankData.name"
					 type="text" />
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
				<view style="display:flex;align-items: center;">
					<span style="margin-right:5px;">单元长度</span>
					<input v-model="extent" type="number" class="lengthValue" />
					<span style="margin-left:5px;">米</span>
				</view>
				<view style="display:flex;align-items: center;">
					<span style="margin-right:5px;">路面宽度</span>
					<input v-model="width" type="number" class="widthValue" />
					<span style="margin-left:5px;">米</span>
				</view>
			</view>
			<view class="btn-3" style="margin-left: 10px;">调查内容</view>
			<view class="typebox">
				<p class="choice" @tap="change(0)" :class="{btna:btnnum == 0}">水泥路</p>
				<p class="choice" @tap="change(1)" :class="{btna:btnnum == 1}">沥青路</p>
			</view>
			<view class="list-1 surveyBox" :class="{dis:btnnum == 0}">
				<picker :value="index" @change.prevent.stop="getCouponSelected($event,index)" :range="selectArray" style="width: 100%;">
					<view class="picker_box" style="-webkit-flex-wrap: wrap;
    flex-wrap: wrap;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;width: 100%;">
						<view class="contentItem" v-for="(item,index) in butten" v-if="item.countScore2!==null" :key="index" @click="selectType(index,item)"
						 :class="{active:nowIndex1==index}"> {{item}}</view>
					</view>
				</picker>
				<view class="desc">
					{{nowItem}}-{{endqz}}
				</view>
				<view>
					<span>百米损坏</span>
					<span>以千米为检测单元，每个数字，代表第 * 百米 区间。</span>
				</view>
				<view v-for="(item,index) in inspect" v-show="nowIndex==index">
					<view class="rankbox">
						<p style="background-color: #ffd978;">{{endqz}}</p>
						<p>权重：{{end.weight}}单位扣分：{{end.unitPoint}} 单位：{{end.unit}}</p>
					</view>
					<view class="table">
						<table border="1" cellspacing="0" cellpadding="0">
							<tr v-model="proprityItem">
								<td>
									<view class>
										<span>1</span>
										<input type="number" :disabled="endqz?false:true" @input="newValue(index)" v-model="item.one" maxlength="2" />
									</view>
								</td>
								<td>
									<view class>
										<span>2</span>
										<input type="number" :disabled="endqz?false:true" @input="newValue(index)" v-model="item.two" />
									</view>
								</td>
								<td>
									<view class>
										<span>3</span>
										<input type="number" :disabled="endqz?false:true" @input="newValue(index)" v-model="item.three" />
									</view>
								</td>
								<td>
									<view class>
										<span>4</span>
										<input type="number" :disabled="endqz?false:true" @input="newValue(index)" v-model="item.four" />
									</view>
								</td>
								<td>
									<view class>
										<span>5</span>
										<input type="number" :disabled="endqz?false:true" @input="newValue(index)" v-model="item.five" />
									</view>
								</td>
							</tr>
							<tr>
								<td>
									<view class>
										<span>6</span>
										<input type="number" :disabled="endqz?false:true" @input="newValue(index)" v-model="item.six" />
									</view>
								</td>
								<td>
									<view class>
										<span>7</span>
										<input type="number" :disabled="endqz?false:true" @input="newValue(index)" v-model="item.seven" />
									</view>
								</td>
								<td>
									<view class>
										<span>8</span>
										<input type="number" :disabled="endqz?false:true" @input="newValue(index)" v-model="item.eight" />
									</view>
								</td>
								<td>
									<view class>
										<span>9</span>
										<input type="number" :disabled="endqz?false:true" @input="newValue(index)" v-model="item.nine" />
									</view>
								</td>
								<td>
									<view class>
										<span>10</span>
										<input type="number" :disabled="endqz?false:true" @input="newValue(index)" v-model="item.ten" />
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
			</view>

			<view class="list-1 surveyBox" :class="{dis:btnnum == 1}">
				<picker :value="index" @change.prevent.stop="getCouponSelected($event,index)" :range="selectArray" style="width: 100%;">
					<view class="picker_box" style="-webkit-flex-wrap: wrap;
				flex-wrap: wrap;
				display: -webkit-box;
				display: -webkit-flex;
				display: flex;width: 100%;">
						<view class="contentItem" v-for="(item,index) in butten0" v-if="item.countScore2!==null" :key="index" @click="selectType(index,item)"
						 :class="{active:nowIndexZ1==index}">{{item}}</view>
					</view>
				</picker>
				<view class="desc">
					{{nowItem}}-{{endqz}}
				</view>
				<view>
					<span>百米损坏</span>
					<span>以千米为检测单元，每个数字，代表第 * 百米 区间。</span>
				</view>
				<view v-for="(item,index) in inspect1" v-show="nowIndexZ==index">
					<view class="rankbox">
						<p style="background-color: #ffd978;">{{endqz}}</p>
						<p>权重{{end.weight}}单位扣分：{{end.unitPoint}} 单位：{{end.unit}}</p>
					</view>
					<view class="table">
						<table border cellspacing cellpadding>
							<tr>
								<td>
									<view class>
										<span>1</span>
										<input type="number" :disabled="endqz?false:true" @input="newValue(index)" v-model="item.one" maxlength="2" />
									</view>
								</td>
								<td>
									<view class>
										<span>2</span>
										<input type="number" :disabled="endqz?false:true" @input="newValue(index)" v-model="item.two" />
									</view>
								</td>
								<td>
									<view class>
										<span>3</span>
										<input type="number" :disabled="endqz?false:true" @input="newValue(index)" v-model="item.three" />
									</view>
								</td>
								<td>
									<view class>
										<span>4</span>
										<input type="number" :disabled="endqz?false:true" @input="newValue(index)" v-model="item.four" />
									</view>
								</td>
								<td>
									<view class>
										<span>5</span>
										<input type="number" :disabled="endqz?false:true" @input="newValue(index)" v-model="item.five" />
									</view>
								</td>
							</tr>
							<tr>
								<td>
									<view class>
										<span>6</span>
										<input type="number" :disabled="endqz?false:true" @input="newValue(index)" v-model="item.six" />
									</view>
								</td>
								<td>
									<view class>
										<span>7</span>
										<input type="number" :disabled="endqz?false:true" @input="newValue(index)" v-model="item.seven" />
									</view>
								</td>
								<td>
									<view class>
										<span>8</span>
										<input type="number" :disabled="endqz?false:true" @input="newValue(index)" v-model="item.eight" />
									</view>
								</td>
								<td>
									<view class>
										<span>9</span>
										<input type="number" :disabled="endqz?false:true" @input="newValue(index)" v-model="item.nine" />
									</view>
								</td>
								<td>
									<view class>
										<span>10</span>
										<input type="number" :disabled="endqz?false:true" @input="newValue(index)" v-model="item.ten" />
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
										<input type="number" disabled v-model="form.countScoreZ">
									</view>
								</td>
							</tr>
							<tr width="25%">
								<td width="25">检测得分</td>
								<td style="border-bottom: 1px solid #ddd;">
									<view class="">
										<input type="number" disabled v-model="form.totalScoreZ">
									</view>
								</td>
							</tr>
						</table>
					</view>
				</view>
			</view>
			<view class="list-1">
				<view>调查人员：</view>
				<input type="text" v-model="staff" class="dcinput" />
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
			<view class="submit" @click="save">提交</view>
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
					countScoreZ: '',
					totalScore: '',
					totalScoreZ: '',
					detailList: [],
				},
				nowIndex: 0,
				nowIndexZ: 0,
				nowIndex1: 0,
				nowIndexZ1: 0,
				extent: "",
				width: "",
				zh1: "", //起点桩号
				zh2: "",
				btnnum: 0, //tab选项卡
				e: null, //非空判断
				e0: null, //非空判断
				time: new Date().toISOString().slice(0, 10), //日期
				index: 0,
				index0: 0,
				index1:0,
				nowItem: "路肩损坏",
				roadDataList: ['请选择'],
				butten: [],
				butten0: [],
				roadData: [],
				couponList: ['请选择', '上行线', '下行线'],
				butten: [],
				selectArray: [],
				endqz: "",
				end: {}, //最后选中的部件
				direction: "",
				weekday: "",
				direction0: "",
				roadDataId: "",
				time: currentDate,
				staff: "",
				surveyArr: [],
				surveyArr0: [],
				Array: [],
				list: [],
				inspect: [],
				inspect1: [],
				rankData: {
					name: ""
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
					value: ""
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
					total: ""
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
					total: ""
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
					total: ""
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
					total: ""
				},
				proprityItem5: {
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
					total: ""
				},
				proprityItem6: {
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
					total: ""
				},
				proprityItemZ: {
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
					total: ""
				},
				proprityItemZ1: {
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
					total: ""
				},
				proprityItemZ2: {
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
					total: ""
				},
				proprityItemZ3: {
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
					total: ""
				},
				proprityItemZ4: {
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
					total: ""
				},
				proprityItemZ5: {
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
					total: ""
				},
				proprityItemZ6: {
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
					total: ""
				},
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
		created() {
			this.surveyList()
		},
		onShow() {
			this.weekday = uni.getStorageSync('type');
		},
		methods: {
			newValue(index) {
				if (this.btnnum == 0) {
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
				} else {
					var Sum1 = 0;
					this.inspect1.forEach(res => {
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
						Sum1 += res.score
						this.form.countScoreZ = (Sum1).toFixed(2)
						this.form.totalScoreZ = (100 - this.form.countScoreZ).toFixed(2)
					})

				}
			},
			selectType(i, v) {
				this.index = 0
				this.endqz = ""
				this.end = ""
				if (this.btnnum == 0) {
					this.nowIndex = i;
					this.nowIndex1 = i;
					this.nowItem = v;
					let selectArray1 = []
					this.surveyArr.forEach(res => {
						console.log(res)
						if (res.name == this.nowItem) {
							console.log(res.extent)
							selectArray1.push(res.extent)
						}
					})
					this.selectArray = [...new Set(selectArray1)]
				} else {
					this.nowIndexZ = i;
					this.nowIndexZ1 = i;
					this.nowItem = v;
					let selectArray1 = []
					this.surveyArr0.forEach(res => {
						console.log(res)
						if (res.name == this.nowItem) {
							console.log(res.extent)
							selectArray1.push(res.extent)
						}
					})
					this.selectArray = [...new Set(selectArray1)]
				}
			},
			bindDateChange: function(e) {
				this.time = e.target.value
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
			change(e) {
				this.btnnum = e
				console.log(this.btnnum)
			},
			getCouponSelected0(e) {
				console.log(e)
				this.e0 = e
				this.index0 = e.target.value;
				this.direction0 = this.roadDataList[e.target.value]
				this.roadData.forEach(res => {
					if (this.direction0 === res.name) {
						console.log(res)
						this.roadDataId = res.id
						this.rankData.name = res.rankData.name
						this.form.highData.number = res.highData.number
					}
				})
				let data = {
					currentPage: 1,
					startStake: "",
				}
				let opts = {
					url: '/roadSurvey/page/list',
					method: 'post'
				};
				this.$http.httpRequest(opts,data).then(res => {
					if(res.data.data.list[0].direction=='上行线'){
						this.index1=1
						this.e=e
					}else{
						this.index1=2
						this.e=e
					}
					this.zh1 = res.data.data.list[0].startStake.substring(res.data.data.list[0].startStake.indexOf('k') + 1, res.data.data.list[0].startStake.lastIndexOf('+'))
					this.zh2 = res.data.data.list[0].startStake.substr(res.data.data.list[0].startStake.indexOf('+') + 1);
					this.extent = res.data.data.list[0].extent
					this.width = res.data.data.list[0].width
					this.staff = res.data.data.list[0].staff
					this.direction = res.data.data.list[0].direction
				})
			},
			getCouponSelected2(e, index) {
				console.log(e)
				this.e = e
				this.index1 = e.target.value;
				this.direction = this.couponList[e.target.value]
				console.log(this.direction)
			},
			getCouponSelected(e) {
				console.log(e)
				this.e = e
				this.index = e.target.value;
				// this.direction = this.couponList[e.target.value]
				this.endqz = this.selectArray[this.index]
				if (this.btnnum == 0) {
					let endObj = []
					let endindex = []
					console.log(this.surveyArr)
					this.surveyArr.forEach((res, index) => {
						if (res.name == this.butten[this.nowIndex] && res.extent == this.selectArray[this.index]) {
							endindex.push(index)
							endObj.push(res)
						}
					})
					this.end = endObj[0]
					this.nowIndex = endindex[0]
				} else {
					let endObj = []
					let endindex = []
					this.surveyArr0.forEach((res, index) => {
						if (res.name == this.butten0[this.nowIndexZ] && res.extent == this.selectArray[this.index]) {
							console.log(res)
							endindex.push(index)
							console.log(res)
							endObj.push(res)
						}
					})
					this.end = endObj[0]
					this.nowIndexZ = endindex[0]
				}
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
				let data = {}
				let opts = {
					url: '/roadData/listAll',
					method: 'post'
				};
				this.$http.httpRequest(opts,data).then(res => {
					console.log(res)
					res.data.data.forEach(item => {
						console.log(item)
						this.roadDataList.push(item.name)
						this.roadData.push(item)
						console.log(this.roadData)
					})
				})
				let data1 = {}
				let opts1 = {
					url: '/cement/listAll',
					method: 'post'
				};
				this.$http.httpRequest(opts1,data1).then(res => {
					console.log(res)
					let surveyNameArr = []
					res.data.data.forEach(item => {
						console.log(item)
						surveyNameArr.push(item.name)
						console.log(surveyNameArr)
						this.butten = [...new Set(surveyNameArr)]
						console.log(this.butten)
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
				})
				let data2 = {}
				let opts2 = {
					url: '/pitch/listAll',
					method: 'post'
				};
				this.$http.httpRequest(opts2,data2).then(res => {
					console.log(res)
					let surveyNameArr = []
					res.data.data.forEach(item => {
						console.log(item)
						surveyNameArr.push(item.name)
						// console.log(surveyNameArr)
						this.butten0 = [...new Set(surveyNameArr)]
						this.surveyArr0.push(item)
						console.log(this.surveyArr0)
						this.inspect1 = []
						for (let i = 0; i < this.surveyArr0.length; i++) {
							this.inspect1.push({
								degree: this.surveyArr0[i].extent,
								mark: this.surveyArr0[i].unitPoint,
								weight: this.surveyArr0[i].weight,
								unitPoint: this.surveyArr0[i].unitPoint,
								unit: this.surveyArr0[i].unit,
								damageType: this.surveyArr0[i].name,
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
							console.log(this.inspect1)
						}
					})
				})
			},
			save() {
				this.form.detailList = []
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
					if (this.btnnum == 0) {
						this.form.countScore2 = '水泥路面'
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
					} else {
						this.form.countScore2 = '沥青路面'
						this.inspect1.forEach((ite, ind) => {
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
					}
					console.log(this.form.detailList)
					let data = {
						direction: this.direction,
						roadDataId: this.roadDataId,
						startStake: "K" + this.zh1 + "+" + this.zh2,
						extent: this.extent,
						width: this.width,
						staff: this.staff,
						time: this.time,
						rankData: this.rankData,
						detailList: this.btnnum == 0 ? this.inspect : this.inspect1,
						countScore: this.btnnum == 0 ? this.form.countScore : this.form.countScoreZ,
						totalScore: this.btnnum == 0 ? this.form.totalScore : this.form.totalScoreZ,
						countScore2: this.form.countScore2
					}
					console.log(this.direction)
					let opts = {
						url: '/roadSurvey/add',
						method: 'post'
					};
					this.$http.httpRequest(opts,data).then(res => {
													console.log(res)
					})
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
					uni.setStorageSync("username", "1")
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
		background-color: #e6f2fe;
		color: #2695cb;
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
		margin-left: 10px;
		color: #333;
		font-size: 14px;
		background-color: #f7f4ed;
		margin-bottom: 10px;
		text-align: center;
		width: 30%;
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
		background-color: #f7f4ed;
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
		color: #ffffff;
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
		color: #ffffff;
		display: inline-block;
		border-radius: 30px;
		background-color: #007aff;
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
		border: 1px solid #cccccc;
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

	.typebox {
		display: flex;
		align-items: center;
		font-size: 14px;
	}

	.location {
		padding: 5px 10px;
		background: #41c7db;
		color: #fff;
		text-align: center;
		border-radius: 5px;
	}

	.typebox .type {
		padding: 8px 0;
		width: 50%;
		color: #ffffff;
		text-align: center;
	}

	.choice {
		width: 100%;
		padding: 8px 0;
		text-align: center;
		background-color: #41c7db;
		color: #ffffff;
	}

	.surveyBox {
		display: none;
	}

	.btna {
		color: #ffffff;
		background: #00a0ff;
	}

	.dis {
		display: block;
		display: flex;
	}
</style>
