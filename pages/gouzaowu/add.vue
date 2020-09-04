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
				<picker @change="getCouponSelected" :value="index" :range="couponList">
					<view ref="addRequestState" class="uni-input">{{couponList[index]}}</view>
				</picker>
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
				<p class="choice" @tap="change(0)" :class="{btna:btnnum == 0}">桥梁</p>
				<p class="choice" @tap="change(1)" :class="{btna:btnnum == 1}">涵洞</p>
				<p class="choice" @tap="change(2)" :class="{btna:btnnum == 2}">隧道</p>
			</view>
			<view class="list-1 surveyBox" :class="{dis:btnnum == 0}">
				<view class="contentItem" v-for="(item,index) in surveyArr0" v-if="item.countScore2!==null" :key="index" @click="selectType(index,item)"
				 :class="{active:nowIndex==index}">{{item.grade}}</view>
				<view class="desc">{{nowItem.grade}}</view>
				<view>
					<span>百米损坏</span>
					<span>以千米为检测单元，每个数字，代表第 * 百米 区间。</span>
				</view>
				<view v-for="(item,index) in inspect" v-show="nowIndex==index">
					<view class="rankbox">
						<p style="background-color: #ffd978;">{{proprityItem.degree}}</p>
						<p>单位扣分：{{item.unitPoint}} 单位：{{item.unit}}</p>
					</view>
					<view class="table">
						<table border="1" cellspacing="0" cellpadding="0">
							<tr v-model="proprityItem">
								<td>
									<view class>
										<span>1</span>
										<input type="number" @input="newValue(index)" v-model="item.one" maxlength="2" />
									</view>
								</td>
								<td>
									<view class>
										<span>2</span>
										<input type="number" @input="newValue(index)" v-model="item.two" />
									</view>
								</td>
								<td>
									<view class>
										<span>3</span>
										<input type="number" @input="newValue(index)" v-model="item.three" />
									</view>
								</td>
								<td>
									<view class>
										<span>4</span>
										<input type="number" @input="newValue(index)" v-model="item.four" />
									</view>
								</td>
								<td>
									<view class>
										<span>5</span>
										<input type="number" @input="newValue(index)" v-model="item.five" />
									</view>
								</td>
							</tr>
							<tr>
								<td>
									<view class>
										<span>6</span>
										<input type="number" @input="newValue(index)" v-model="item.six" />
									</view>
								</td>
								<td>
									<view class>
										<span>7</span>
										<input type="number" @input="newValue(index)" v-model="item.seven" />
									</view>
								</td>
								<td>
									<view class>
										<span>8</span>
										<input type="number" @input="newValue(index)" v-model="item.eight" />
									</view>
								</td>
								<td>
									<view class>
										<span>9</span>
										<input type="number" @input="newValue(index)" v-model="item.nine" />
									</view>
								</td>
								<td>
									<view class>
										<span>10</span>
										<input type="number" @input="newValue(index)" v-model="item.ten" />
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
				<view class="contentItem" v-for="(item,index) in surveyArr1" v-if="item.countScore2!==null" :key="index" @click="selectType(index,item)"
				 :class="{active:nowIndexZ==index}">{{item.grade}}</view>
				<view class="desc">{{nowItem.grade}}</view>
				<view>
					<span>百米损坏</span>
					<span>以千米为检测单元，每个数字，代表第 * 百米 区间。</span>
				</view>
				<view v-for="(item,index) in inspect1" v-show="nowIndexZ==index">
					<view class="rankbox">
						<p style="background-color: #ffd978;">{{proprityItemZ.degree}}</p>
						<p>单位扣分：{{item.unitPoint}} 单位：{{item.unit}}</p>
					</view>
					<view class="table">
						<table border cellspacing cellpadding>
							<tr>
								<td>
									<view class>
										<span>1</span>
										<input type="number" @input="newValue(index)" v-model="item.one" maxlength="2" />
									</view>
								</td>
								<td>
									<view class>
										<span>2</span>
										<input type="number" @input="newValue(index)" v-model="item.two" />
									</view>
								</td>
								<td>
									<view class>
										<span>3</span>
										<input type="number" @input="newValue(index)" v-model="item.three" />
									</view>
								</td>
								<td>
									<view class>
										<span>4</span>
										<input type="number" @input="newValue(index)" v-model="item.four" />
									</view>
								</td>
								<td>
									<view class>
										<span>5</span>
										<input type="number" @input="newValue(index)" v-model="item.five" />
									</view>
								</td>
							</tr>
							<tr>
								<td>
									<view class>
										<span>6</span>
										<input type="number" @input="newValue(index)" v-model="item.six" />
									</view>
								</td>
								<td>
									<view class>
										<span>7</span>
										<input type="number" @input="newValue(index)" v-model="item.seven" />
									</view>
								</td>
								<td>
									<view class>
										<span>8</span>
										<input type="number" @input="newValue(index)" v-model="item.eight" />
									</view>
								</td>
								<td>
									<view class>
										<span>9</span>
										<input type="number" @input="newValue(index)" v-model="item.nine" />
									</view>
								</td>
								<td>
									<view class>
										<span>10</span>
										<input type="number" @input="newValue(index)" v-model="item.ten" />
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
			<view class="list-1 surveyBox" :class="{dis:btnnum == 2}">
				<view class="contentItem" v-for="(item,index) in surveyArr2" v-if="item.countScore2!==null" :key="index" @click="selectType(index,item)"
				 :class="{active:nowIndexZ==index}">{{item.grade}}</view>
				<view class="desc">{{nowItem.grade}}</view>
				<view>
					<span>百米损坏</span>
					<span>以千米为检测单元，每个数字，代表第 * 百米 区间。</span>
				</view>
				<view v-for="(item,index) in inspect2" v-show="nowIndexZ==index">
					<view class="rankbox">
						<p style="background-color: #ffd978;">{{proprityItemZ.degree}}</p>
						<p>单位扣分：{{item.unitPoint}} 单位：{{item.unit}}</p>
					</view>
					<view class="table">
						<table border cellspacing cellpadding>
							<tr>
								<td>
									<view class>
										<span>1</span>
										<input type="number" @input="newValue(index)" v-model="item.one" maxlength="2" />
									</view>
								</td>
								<td>
									<view class>
										<span>2</span>
										<input type="number" @input="newValue(index)" v-model="item.two" />
									</view>
								</td>
								<td>
									<view class>
										<span>3</span>
										<input type="number" @input="newValue(index)" v-model="item.three" />
									</view>
								</td>
								<td>
									<view class>
										<span>4</span>
										<input type="number" @input="newValue(index)" v-model="item.four" />
									</view>
								</td>
								<td>
									<view class>
										<span>5</span>
										<input type="number" @input="newValue(index)" v-model="item.five" />
									</view>
								</td>
							</tr>
							<tr>
								<td>
									<view class>
										<span>6</span>
										<input type="number" @input="newValue(index)" v-model="item.six" />
									</view>
								</td>
								<td>
									<view class>
										<span>7</span>
										<input type="number" @input="newValue(index)" v-model="item.seven" />
									</view>
								</td>
								<td>
									<view class>
										<span>8</span>
										<input type="number" @input="newValue(index)" v-model="item.eight" />
									</view>
								</td>
								<td>
									<view class>
										<span>9</span>
										<input type="number" @input="newValue(index)" v-model="item.nine" />
									</view>
								</td>
								<td>
									<view class>
										<span>10</span>
										<input type="number" @input="newValue(index)" v-model="item.ten" />
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
					mindata:''
				},
				nowIndex: 0,
				nowIndexZ: 0,
				extent: "",
				width: "",
				zh1: "", //起点桩号
				zh2: "",
				weekday:"",
				btnnum: 0, //tab选项卡
				e: null, //非空判断
				e0: null, //非空判断
				time: new Date().toISOString().slice(0, 10), //日期
				index: 0,
				index0: 0,
				nowItem: "路肩损坏",
				roadDataList: ['请选择'],
				roadData: [],
				couponList: ['请选择', '上行线', '下行线'],
				direction: "",
				direction0: "",
				roadDataId: "",
				time: currentDate,
				staff: "",
				surveyArr: [],
				surveyArr0: [],
				surveyArr1: [],
				surveyArr2: [],
				Array: [],
				list: [],
				inspect: [],
				inspect1: [],
				inspect2: [],
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
				this.form.detailList = [...this.inspect, ...this.inspect1, ...this.inspect2]
				var Sum = 0;
					this.form.detailList.forEach(res => {
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
						res.score = (res.total * res.unitPoint)
						Sum += res.score
						this.form.countScore = (Sum).toFixed(2)
						this.form.totalScore = (100 - this.form.countScore).toFixed(2)
					})
					 var inspectand = 0;
					 var inspectand1 = 0;
					 var inspectand2 = 0;
					 var difference=0;
					 var difference1=0;
					 var difference2=0;
					this.inspect.forEach(res=>{
						inspectand+=res.score
						difference=100-inspectand
					})
					this.inspect1.forEach(res=>{
						inspectand1+=res.score
						difference1=100-inspectand1
					})
					this.inspect2.forEach(res=>{
						inspectand2+=res.score
						difference2=100-inspectand2
					})
					this.mindata=Math.min(difference,difference1,difference2)
			},
			selectType(i, v) {
				this.nowIndex = i;
				this.nowIndexZ = i;
				this.nowItem = v;
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
				console.log(this.form.totalScore)
				this.btnnum = e
				console.log(this.btnnum)
			},
			getCouponSelected0(e) {
				console.log(e)
				this.e0 = e
				this.index0 = e.target.value;
				this.direction0 = this.roadDataList[e.target.value]
				console.log(this.roadDataList[e.target.value])
				this.roadData.forEach(res => {
					if (this.direction0 === res.name) {
						this.roadDataId = res.id
						this.rankData.name = res.rankData.name
					}
				})
				let data = {
					currentPage: 1,
					startStake: "",
					time:""
				};
				uni.request({
					header: {
						'content-Type': 'application/json'
					},
					url: "http://119.27.171.77:8077/bridgecSurvey/page/list", //仅为示例，并非真实接口地址。
					method: 'POST',
					data: data,
				
					success: (res) => {
						if(res.data.data.list[0].direction=='上行线'){
							this.index=1
							this.e=e
						}else{
							this.index=2
							this.e=e
						}
						this.zh1 = res.data.data.list[0].startStake.substring(res.data.data.list[0].startStake.indexOf('k') + 1, res.data.data.list[0].startStake.lastIndexOf('+'))
						this.zh2 = res.data.data.list[0].startStake.substr(res.data.data.list[0].startStake.indexOf('+') + 1);
						this.extent = res.data.data.list[0].extent
						this.width = res.data.data.list[0].width
						this.staff = res.data.data.list[0].staff
						this.direction = res.data.data.list[0].direction
				
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
							this.roadDataList.push(item.name)
							console.log(this.roadDataList)
							this.roadData.push(item)
							console.log(this.roadData)
						})
					}
				});
				uni.request({
					header: {
						'Content-Type': 'application/json'
					},
					url: "http://119.27.171.77:8077/bcStructure/listAll", //仅为示例，并非真实接口地址。
					method: 'POST',
					data: {},
					dataType: 'json',
					success: (res) => {
						// var result = JSON.parse(res.data.projectList);
						console.log(res)
						res.data.data.forEach(item => {
							console.log(item)
							if (item.name == "桥梁") {
								this.surveyArr0.push(item)
								console.log(this.surveyArr0)
								this.inspect = []
								for (let i = 0; i < this.surveyArr0.length; i++) {
									console.log(this.surveyArr0[i])
									this.inspect.push({
										degree: this.surveyArr0[i].grade,
										mark: this.surveyArr0[i].unitPoint,
										damageType: this.surveyArr0[i].name,
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
									console.log(this.inspect)
								}
							} else if (item.name == "涵洞") {
								this.surveyArr1.push(item)
								this.inspect1 = []
								for (let i = 0; i < this.surveyArr1.length; i++) {
									console.log(this.surveyArr1[i])
									this.inspect1.push({
										degree: this.surveyArr1[i].grade,
										mark: this.surveyArr1[i].unitPoint,
										damageType: this.surveyArr1[i].name,
										unitPoint: this.surveyArr1[i].unitPoint,
										unit: this.surveyArr1[i].unit,
										damageType: this.surveyArr1[i].name,
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
							} else if (item.name == "隧道") {
								this.surveyArr2.push(item)
								this.inspect2 = []
								for (let i = 0; i < this.surveyArr2.length; i++) {
									console.log(this.surveyArr2[i])
									this.inspect2.push({
										degree: this.surveyArr2[i].grade,
										mark: this.surveyArr2[i].unitPoint,
										damageType: this.surveyArr2[i].name,
										unitPoint: this.surveyArr2[i].unitPoint,
										unit: this.surveyArr2[i].unit,
										damageType: this.surveyArr2[i].name,
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
									console.log(this.inspect2)
								}
							}
						})
					}
				});
			},
			save() {
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
					console.log(this.form.detailList)
					this.form.detailList.forEach(ite=>{
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
					uni.request({
						header: {
							'Content-Type': 'application/json'
						},
						url: "http://119.27.171.77:8077/bridgecSurvey/add", //仅为示例，并非真实接口地址。
						method: 'POST',
						data: {
							direction: this.direction,
							roadDataId: this.roadDataId,
							startStake: "k" + this.zh1 + "+" + this.zh2,
							extent: this.extent,
							width: this.width,
							staff: this.staff,
							time: this.time,
							rankData: this.rankData,
							detailList: this.form.detailList,
							totalScore: this.mindata
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
					uni.setStorageSync("username", "3")
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
		color: #333;
		font-size: 14px;
		background-color: #f7f4ed;
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
