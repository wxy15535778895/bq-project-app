<template>
	<view class="body">
		<view class="content">
			<view class="mainInfo">
				<p class="btn-1">基础信息</p>
				<p>G7001十天高速白泉段</p>
			</view>
			<view class="gray">

			</view>
			<view class="list-1">
				<view>涵洞名称</view>
				<picker :value="index" @change.prevent.stop="getCouponSelected0" :range="roadDataList">
					<view ref="addRequestState" class="uni-input">{{roadDataList[index0]}}
						<view class="cu-item" v-for="(item,index) in cuIcon" :key="index" v-if="item.isShow">
							<text class="lg text-gray" :class="'cuIcon-' + item.name"></text>
						</view>
					</view>
				</picker>
			</view>
			<view class="list-1">
				<view>线路名称</view>
				<view class="zhInput">
					<!-- <text>k</text> -->
					<input style="border: none;text-align: right;font-size: 15px;width: auto;" class="zhNum" disabled v-model="zh2"
					 type="text" />
				</view>
			</view>
			<view class="list-1">
				<view>线路编号</view>
				<view class="zhInput">
					<!-- <text>k</text> -->
					<input style="border: none;text-align: right;font-size: 15px;width: auto;" class="zhNum" disabled v-model="bridgeBh"
					 type="text" />
				</view>
			</view>
			<view class="list-1">
				<view>养护单位</view>
				<view class="zhInput">
					<!-- <text>k</text> -->
					<input style="border: none;text-align: right;font-size: 15px;width: auto;" class="zhNum" disabled v-model="governor"
					 type="text" />
				</view>
			</view>
			<view class="list-1">
				<view>养护人</view>
				<view class="zhInput">
					<!-- <text>k</text> -->
					<input style="border: none;text-align: right;font-size: 15px;width: auto;" class="zhNum" disabled v-model="principal"
					 type="text" />
				</view>
			</view>
			<view class="list-1 border">
				<view>涵洞桩号</view>
				<view class="zhInput">
					<text>k</text>
					<input class="zhNum" v-model="centreZh1" type="number" />
					<text>+</text>
					<input class="zhNum" v-model="centreZh2" type="number" />
				</view>
			</view>
			<view class="btn-3" style="margin-left: 10px;">
				调查内容
			</view>
			<!-- 			<view class="list-1 surveyBox">
				<view class="contentItem" v-for="(item,index) in arr" :key="index" @click="selectType(index,item)" :class="{active:nowIndex==index}">
					{{item}}
				</view>
			</view> -->
			<!-- 			<view class="desc" @click="clickTest">
				{{nowItem}}
			</view>
			<view>
				<span>百米损坏</span>
				<span>以千米为检测单元，每个数字，代表第 * 百米 区间。</span>
			</view> -->
			<view class="box">
				<t-table border="1" border-color="#F3F4F6" v-model="table">
					<t-tr font-size="14" color="color: #000000;" align="left">
						<t-th align="center">部件名称</t-th>
						<t-th align="center">缺损类型</t-th>
						<t-th align="center">缺损范围</t-th>
						<t-th align="center">保养措施</t-th>
					</t-tr>
					<t-tr font-size="12" color="color: #000000;" align="center" v-for="(item,index) in arr" :key="index">
						<t-td align="center" v-model="table.name">{{ item }}</t-td>
						<t-td align="center">
							<checkbox-group class="block" @change="changeCheckbox($event,index)">
								<radio-group name="radio" @change="change11($event,index)">
									<label style="padding-bottom: 0px;">
										<view v-if="form.detailList[index].typeList.includes('完好')" style="width: 100%;padding-bottom: 10px;">
											<radio value="完好" :checked="form.detailList[index].damageTypeList.includes('完好')" /><text>完好</text>
										</view>
										<view v-if="form.detailList[index].typeList.includes('其他')" style="width: 100%;padding-bottom: 10px;">
											<radio value="其他" :checked="form.detailList[index].damageTypeList.includes('其他')" /><text>其他</text>
										</view>
										<view v-if="form.detailList[index].typeList.includes('无')" style="width: 100%;padding-bottom: 10px;">
											<radio value="无" :checked="form.detailList[index].damageTypeList.includes('无')" /><text>无</text>
										</view>
									</label>
								</radio-group>
								<view v-if="item=='完好'||item=='其他'||item=='无'?false:true" v-for="item in form.detailList[index].typeList" :key="item.value"
								 style="padding-bottom: 10px;">
									<checkbox :value="String(item)" :checked="form.detailList[index].damageTypeList.includes(String(item))" :class="{'checked':form.detailList[index].damageTypeList.includes(String(item))}"></checkbox>
									<text>{{item}}</text>
								</view>
							</checkbox-group>
						</t-td>
						<t-td align="left"><input v-model="form.detailList[index].damageScope" name="" id="" style="vertical-align:top;outline:none;width: 100%;height: 10%;-webkit-user-select:text !important;"></input></t-td>
						<t-td align="left"><input v-model="form.detailList[index].opinion" name="" id="" style="vertical-align:top;outline:none;width: 100%;height: 10%;-webkit-user-select:text !important;"></textarea></t-td>
					</t-tr>
				</t-table>
			</view>

			<view class="list-1">
				<view>调查人员： </view>
				<input type="text" v-model="rummager" value="" class="dcinput" />
			</view>
			<view class="list-1">
				<view>调查时间： </view>
				<view class="uni-list-cell-db">
					<picker mode="date" :value="time" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{time}}</view>
					</picker>
				</view>
			</view>
			<view class="submit" @click="save">
				提交
			</view>
		</view>
	</view>
</template>

<script>
	import tTable from '@/components/t-table/t-table.vue';
	import tTh from '@/components/t-table/t-th.vue';
	import tTr from '@/components/t-table/t-tr.vue';
	import tTd from '@/components/t-table/t-td.vue';
	export default {
		components: {
			tTable,
			tTh,
			tTr,
			tTd
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				struction:'其他',
				isChecked: false,
				checkboxData: [{
						'value': 0,
						'label': '选项一'
					},
					{
						'value': 1,
						'label': '选项二'
					},
					{
						'value': 2,
						'label': '选项三'
					},
					{
						'value': 3,
						'label': '选项四'
					},
					{
						'value': 4,
						'label': '选项五'
					},
				],
				checkedArr: [], //复选框选中的值
				allChecked: false, //是否全选
				picker: [],
				damage: ['损坏', '未损坏'],
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
					time: '',
					countScore: '',
					totalScore: '',
					detailList: [],
				},
				cuIcon: [{
					name: 'unfold',
					isShow: true
				}],
				nowIndex: 0,
				extent: "",
				circuitBh: "", //路线编号
				bridgeBh: "", //桥梁编号
				zh1: "", //选中桩号
				zh2: "", //选中线路名称
				culverId: "", //选中桥梁id
				governor: "", //选中公司
				principal: "", //责任人
				centreZh1: "", //起点桩号
				centreZh2: "", //终点桩号
				index: 0,
				timeArr: [], //时间数组
				rummager: "", //检查人
				index0: 0,
				nowItem: "路肩损坏",
				roadDataList: ['- 请选择 -'],
				roadData: [],
				couponList: ['请选择', '开裂', '倾斜'],
				direction: "",
				direction0: {}, //当前选择的桥梁
				tableList: [],
				roadDataId: "",
				time: currentDate,
				e0: null,
				e: null,
				surveyArr: [], //接口返回的类型
				surveyArr1: [], //接口返回的数组
				arr: [], //按钮
				list: [],
				table: [],
				Array: [],
				ArrayDate: {}
			}
		},
		computed: {
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
		},
		methods: {
			change11(e, index) {
				console.log(e.detail.value)
				this.form.detailList[index].damageTypeList = []
				this.index = index
				this.form.detailList[index].damageTypeList.push(e.detail.value)
			},
			// 多选复选框改变事件
			changeCheckbox(e, index) {
				this.checkedArr = e.detail.value;
				this.form.detailList[index].damageTypeList = e.detail.value
				console.log(this.checkedArr)
			},
			show() {
				console.log(this.tabs);
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
			getCouponSelected0(e) {
				this.timeArr = []
				console.log(e)
				this.e0 = e
				this.index0 = e.target.value;
				console.log(this.roadData)
				console.log(this.roadData[e.target.value - 1])
				this.culverId = this.roadData[e.target.value - 1].id
				this.zh1 = this.roadData[e.target.value - 1].centreStation
				this.zh2 = this.roadData[e.target.value - 1].roadData.name
				this.bridgeBh = this.roadData[e.target.value - 1].highData.number
				this.governor = this.roadData[e.target.value - 1].governor
				this.principal = this.roadData[e.target.value - 1].principal
				this.centreZh1 = this.roadData[e.target.value - 1].centreStation.substring(this.roadData[e.target.value - 1].centreStation
					.indexOf(
						'K') + 1, this.roadData[e.target.value - 1].centreStation.lastIndexOf('+'))
				this.centreZh2 = (this.roadData[e.target.value - 1].centreStation.split('+')[1])
                let data = {
                	currentPage: 1,
                	stake: "",
                };
                let opts = {
                	url: '/culvertExamine/page/list',
                	method: 'post'
                };
                this.$http.httpRequest(opts, data).then(res => {
					let itemArray = []
					res.data.data.list.forEach(item => {
						if (item.culverId == this.roadData[e.target.value - 1].id) {
							itemArray.push(item)
							this.timeArr.push(item.time.substring(0, 7))
							this.rummager = itemArray[0].rummager
						}
					})
					this.ArrayDate = {
						culverId: itemArray[0].culverId,
						time: itemArray[0].time.substring(0, 7)
					}
					let data1 = this.ArrayDate
					let opts1 = {
						url: '/culvertExamine/findByIdList',
						method: 'post'
					};
					this.$http.httpRequest(opts1, data1).then(res => {
						this.Array = []
						console.log(res)
						this.Array.push(res)
						console.log(this.Array[0].data.data[0].detailList)
						if (this.Array[0].data.data[0].detailList.length) {
							console.log(this.Array[0].data.data[0].detailList)
							console.log(this.form.detailList)
							this.form.detailList = this.Array[0].data.data[0].detailList
							this.form.detailList.forEach(ite => {
								this.surveyArr1.forEach(re => {
									if (re.name == ite.name) {
										this.$delete(ite, 'damageTypeList')
										this.$set(ite, 'damageTypeList', ite.damageType.split(","))
										ite.typeList = re.typeList
									}
								})
								this.$delete(ite, 'culvertExamineId')
								this.$delete(ite, 'id')
							})
							console.log(this.form.detailList)
						}
					})
				})

			},
			getCouponSelected(e, index) {
				console.log(e)
				this.e = e
				console.log(this.form.detailList)
				this.form.detailList[index].damageScope = this.couponList[e.target.value]
				console.log(this.form.detailList[index].damageScope)
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
			surveyList() {
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
					res.data.data.list.forEach(item => {
						console.log(item)
						this.roadDataList.push(item.culvertName)
						this.roadData.push(item)
						// console.log(this.roadData)
					})
				})
				let data1 = {
				};
				let opts1 = {
					url: '/culverParts/listAll',
					method: 'post'
				};
				this.$http.httpRequest(opts1, data1).then(res => {
					res.data.data.forEach(item => {
						this.$delete(item, 'id')
						this.$set(item, 'id', '')
						console.log(item)
						this.surveyArr1.push(item)
						this.surveyArr.push(item.name)
						var arr2 = this.surveyArr.filter(function(value, index, self) {
							return self.indexOf(value) === index;
						});
						this.arr = arr2
						this.form.detailList = this.surveyArr1
						this.form.detailList.forEach(it => {
							this.$set(it, 'damageScope', "")
							this.$set(it, 'damageTypeList', [])
						})
					})
				})
			},
			save() {
				let time = this.time.substring(0, 7);
				let show = []
				this.timeArr.forEach(res => {
					if (res == time) {
						console.log(res)
						show.push(res)
					}
				})
				if (this.e0 === null) {
					uni.showModal({
						title: '提示',
						content: '请先选择涵洞名称！',
					});
				} else {
					let data = {
						direction: this.direction,
						roadDataId: this.roadDataId,
						stake: "k" + this.centreZh1 + "+" + this.centreZh2,
						time: this.time,
						rummager: this.rummager,
						detailList: this.form.detailList,
						culverId: this.culverId
					};
					let opts = {
						url: '/culvertExamine/add',
						method: 'post'
					};
					this.$http.httpRequest(opts, data).then(res => {
						if (res.data.data == -1) {
							uni.showModal({
								title: '提示',
								content: '该涵洞本月已检查两次！',
							});
						} else {
							uni.showToast({
								title: "添加成功！",
								icon: "none",
								duration: 1500
							});
							setTimeout(() => {
								uni.switchTab({
									url: "../jiancha/index",
								})
							}, 1500)
							uni.setStorageSync("username", "1")
						
						}
					})

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

<style lang="less" scoped>
	/* 弹性盒头部固定,其余自适应 */
	.zhNum {
		width: 75px !important;
	}

	.body {
		width: 100%;
		height: 100%;
		font-size: 14px;
		background-color: #FFFFFF;
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
		height: auto;
		// position: absolute;
		background-color: #FFFFFF;
		width: 100%;
	}

	.mainInfo {
		padding: 0 10px;
	}

	.mainInfo>p:last-child {
		display: flex;
		align-items: center;
		justify-content: space-between;
		float: right;
	}

	.btn-1,
	.btn-2,
	.btn-3 {
		width: 4.5rem;
		color: #FFFFFF;
		padding: 0.1325rem 0;
		text-align: center;
		border-radius: 0.4rem;
		margin: 10px 0;
		font-size: 14px;
		background-color: #0086FE;
	}

	.btn-2 {
		color: #ffffff;
		background-color: #ffaa00;
	}

	.btn-3 {
		color: #000000;
		margin: 10px 0px;
		background-color: #FFFFFF;
		margin-left: 17px;
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
		border-bottom: 0.0625rem solid #F2F3F7;
		padding: 10px 25px;
		box-sizing: border-box;
		color: #000000;
	}

	.desc+view {
		padding: 5px 10px;
		display: flex;
		flex-direction: column;
		text-align: center;
		background-color: #e8e6dd;
	}

	.contentItem {
		width: 4.5rem;
		color: #909499;
		padding: 0.1325rem 0;
		text-align: center;
		border-radius: 0.4rem;
		font-size: 14px;
		background-color: #F2F3F7;
		margin-bottom: 15px;
		margin-top: -5px;
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
		border-bottom: 0.0625rem solid #F2F3F7;
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

	#table {
		margin: 0 auto;

		.td_border {
			height: 59rpx;
			border-bottom: 1px solid #E6E6E6;
		}
	}

	#table table {
		border: 1px solid #ddd;
		width: 100%;
		font-size: 13px;
		text-align: center;
	}

	#table td {
		padding: 5px;
	}

	#table td view {
		display: flex;
		align-items: center;
	}

	#table td input {
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
		margin-bottom: 86px;
		margin-top: 10px;
		left: 50%;
		position: absolute;
		transform: translate(-50%, 0);
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
		width: 4.5rem;
		color: #FFFFFF;
		padding: 0.1325rem 0;
		text-align: center;
		border-radius: 0.4rem;
		font-size: 14px;
		background-color: #0086FE;
		margin-bottom: 15px;
		margin-top: -5px;
	}

	.uni-input-input {
		border: 1px solid #ccc;
	}

	// colorui
	.margin-top {
		margin-top: 0;
	}

	/deep/.picker {
		// text-align: center !important;
	}

	//icon
	.lg {
		position: absolute;
		right: 12px;
		margin-top: -16px;
	}

	.uni-input {
		padding-right: 30rpx;
		color: #BFC1C6
	}

	.gray {
		width: 100%;
		height: 15rpx;
		background-color: #F2F3F7;
		padding-bottom: 5rpx;
		margin-top: 37px;
		margin-bottom: 9px;
	}

	.border {
		border-bottom: 10px solid #F2F3F7;
	}

	/deep/.uni-radio-input {
		width: 12px;
		height: 12px;
	}

	/deep/.t-td {
		text-align: center !important;
	}

	/deep/.uni-input-input {
		color: #BFC1C6;
		font-size: 14px;
	}

	/deep/.uni-label-pointer {
		display: block;
		width: 100%;
		padding-bottom: 20rpx;
	}

	/deep/uni-radio::before,
	uni-checkbox::before {
		font-size: 13px;
		margin-right: -4px;
	}

	/deep/.uni-checkbox-input {
		width: 12px;
		height: 12px;
		border-radius: 50%;
	}

	/deep/uni-checkbox.checked .uni-checkbox-input {
		background-color: #007aff !important;
		border-color: #007aff !important;
	}
</style>
