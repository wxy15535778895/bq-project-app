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
				<view>隧道名称</view>
				<picker :value="index" @change.prevent.stop="getCouponSelected0" :range="roadDataList">
					<view ref="addRequestState" class="uni-input">{{roadDataList[index0]}}
						<view class="cu-item" v-for="(item,index) in cuIcon" :key="index" v-if="item.isShow">
							<text class="lg text-gray" :class="'cuIcon-' + item.name"></text>
						</view>
					</view>
				</picker>
			</view>
			<view class="list-1">
				<view>检测方向</view>
				<picker :value="index" @change.prevent.stop="getCouponSelected" :range="couponList">
					<view ref="addRequestState" class="uni-input">{{couponList[index]}}
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
					<input style="border: none;text-align: right;font-size: 15px;width: auto;" class="zhNum" disabled v-model="zh1"
					 type="text" />
				</view>
			</view>
			<view class="list-1">
				<view>隧道编号</view>
				<view class="zhInput">
					<!-- <text>k</text> -->
					<input style="border: none;text-align: right;font-size: 15px;width: auto;" class="zhNum" disabled v-model="code"
					 type="text" />
				</view>
			</view>
			<view class="list-1 border">
				<view>养护机构</view>
				<view class="zhInput">
					<!-- <text>k</text> -->
					<input style="border: none;text-align: right;font-size: 15px;width: auto;" class="zhNum" disabled v-model="managementUnit"
					 type="text" />
				</view>
			</view>
			<view class="btn-3" style="margin-left: 10px;">
				调查内容
			</view>
			<view class="list-1 surveyBox">
				<view class="contentItem" v-for="(item,index) in arr" :key="index" @click="selectType(index,item)" :class="{active:nowIndex==index}">
					{{item}}
				</view>
			</view>
			<view class="box" v-show="nowIndex==0">
				<view class="table" v-for="(item,index) in form.detailList" :key="index">
					<view class="cu-form-group margin-top">
						<view class="title">结构名称：</view>
						<input disabled v-model="picker[index].name" name="input"></input>
					</view>
					<view class="cu-form-group margin-top">
						<view class="title">检查内容：</view>
						<textarea disabled v-model="picker[index].content" style="height: 68px;font-size: 15px;" name="input"></textarea>
					</view>
					<view class="cu-form-group">
						<view class="title">异常描述：</view>
						<input placeholder="请输入异常描述" v-model="form.detailList[index].damage" name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">起点桩号：</view>
						<input v-model="form.detailList[index].startStake" name="input"></input>

					</view>
					<view class="cu-form-group">
						<view class="title">终点桩号：</view>
						<input placeholder="请输入终点桩号" v-model="form.detailList[index].endStake" name="input"></input>

					</view>
					<view class="cu-form-group">
						<view class="title">检查判定：</view>
						<radio-group name="radio" style="margin-right: auto;" @change="change11($event,index)">
							<label>
								<radio value="一般严重" :checked="form.detailList[index].commonSeverity=='一般严重'? true:false" /><text>一般严重</text>
							</label>
							<label>
								<radio value="严重异常" :checked="form.detailList[index].commonSeverity=='严重异常'? true:false" /><text>严重异常</text>
							</label>
						</radio-group>
					</view>
					<view class="cu-form-group">
						<view class="title">养护措施：</view>
						<radio-group name="radio " style="margin-right: auto;" @change="change22($event,index)">
							<label>
								<radio value="跟踪检测" :checked="form.detailList[index].trailCheckout=='跟踪检查'? true:false" /><text>跟踪检测</text>
							</label>
							<label>
								<radio value="维修处置" :checked="form.detailList[index].trailCheckout=='维修处置'? true:false" /><text>维修处置</text>
							</label>
							<label>
								<radio value="定期或专项检查"  :checked="form.detailList[index].trailCheckout=='定期或专项检查'? true:false" /><text>定期或专项检查</text>
							</label>
						</radio-group>
					</view>
				</view>
			</view>
			<view class="box" v-show="nowIndex==1">
				<view class="table" v-for="(item,index) in picker1" :key="index">
					<view class="cu-form-group margin-top">
						<view class="title">结构名称：</view>
						<input v-model="picker1[index].name" name="input"></input>
					</view>
					<view class="cu-form-group margin-top">
						<view class="title">检查内容：</view>
						<textarea v-model="picker1[index].opinion" style="height: 68px;font-size: 15px;" name="input"></textarea>
					</view>
					<view class="cu-form-group">
						<view class="title">异常描述：</view>
						<input placeholder="请输入异常描述" v-model="form.detailList1[index].damage" name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">起点桩号：</view>
						<input v-model="form.detailList1[index].startStake" name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">终点桩号：</view>
						<input placeholder="请输入终点桩号" v-model="form.detailList1[index].endStake" name="input"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">检查判定：</view>
						<radio-group name="radio" style="margin-right: auto;" @change="change33($event,index)">
							<label>
								<radio value="一般严重" checked /><text>一般严重</text>
							</label>
							<label>
								<radio value="严重异常" /><text>严重异常</text>
							</label>
						</radio-group>
					</view>
					<view class="cu-form-group">
						<view class="title">养护措施：</view>
						<radio-group name="radio" style="margin-right: auto;" @change="change44($event,index)">
							<label>
								<radio value="跟踪检测" checked /><text>跟踪检测</text>
							</label>
							<label>
								<radio value="维修处置" /><text>维修处置</text>
							</label>
							<label>
								<radio value="定期或专项检查" /><text>定期或专项检查</text>
							</label>
						</radio-group>
					</view>
				</view>
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
				picker: [],
				picker1: [],
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
					endStake: '',
					extent: '',
					width: '',
					time: '',
					countScore: '',
					totalScore: '',
					detailList: [],
					detailList1: []
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
				tunnel: "", //选中隧道id
				code: "", //选中编号
				managementUnit: "", //选中养护机构
				index: 0,
				index0: 0,
				nowItem: "路肩损坏",
				roadDataList: ['- 请选择 -'],
				roadData: [],
				couponList: ['上行洞', '下行洞'],
				tunnelType: "", //检测方向
				direction0: {}, //当前选择的桥梁
				rummager: "", //检测人
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
				xiangqing: [],
				miaoshu: [],
				Array: []
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
			},
			arr() {
				console.log('监听')
				this.selectType(0)
			}
		},
		created() {
			this.surveyList()
		},
		methods: {
			change11(e, index) {
				console.log(e, index)
				this.form.detailList[index].commonSeverity = e.detail.value
				console.log(this.form.detailList[index].damageType)
			},
			change22(e, index) {
				console.log(e, index)
				this.form.detailList[index].trailCheckout = e.detail.value
				console.log(this.form.detailList)
			},
			change33(e, index) {
				console.log(e, index)
				this.form.detailList1[index].commonSeverity = e.detail.value
			},
			change44(e, index) {
				console.log(e, index)
				this.form.detailList1[index].trailCheckout = e.detail.value
			},
			show() {
				console.log(this.tabs);
			},
			selectType(i, v) {
				console.log(i)
				this.picker = []
				this.picker1 = []
				this.nowIndex = i;
				this.nowItem = v;
				this.surveyArr1.forEach(res => {
					if (res.type == '土建结构') {
						this.form.detailList = []
						this.picker.push(res)
						console.log(this.picker)
					}
					if (res.type == '其他工程设施') {
						this.form.detailList1 = []
						this.picker1.push(res)
					}
				})
				this.picker.forEach((item, index) => {
					this.$delete(item, 'id')
					this.$set(item, 'id', '')
					this.form.detailList.push(item)
					console.log(this.form.detailList)

				})
				this.picker1.forEach((item, index) => {
					this.$set(item, 'id', '')
					// this.damage
					item.damage = '完好'
					this.form.detailList1.push(item)
					console.log(this.form.detailList1)
				})
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
				console.log(e)
				this.e0 = e
				this.index0 = e.target.value;
				console.log(this.roadData[e.target.value - 1])
				this.tunnel = this.roadData[e.target.value - 1].id
				this.zh1 = this.roadData[e.target.value - 1].highData.number
				this.zh2 = this.roadData[e.target.value - 1].roadData.name
				this.code = this.roadData[e.target.value - 1].code
				this.managementUnit = this.roadData[e.target.value - 1].managementUnit

				uni.request({
					header: {
						'content-Type': 'application/json'
					},
					url: "http://119.27.171.77:8077/tunnelExamine/page/list", //仅为示例，并非真实接口地址。
					method: 'POST',
					data: {
						currentPage: 1,
						endTime: "",
						keyword: "",
						rummager: "",
						startTime: "",
						year: ""
					},

					success: (res) => {
						console.log(res)
						res.data.data.list.forEach(ite => {
							console.log(ite)
							if (ite.tunnelId == this.roadData[e.target.value - 1].id) {
								this.rummager = ite.rummager
								console.log(ite)
								uni.request({
									header: {
										'content-Type': 'application/json'
									},
									url: "http://119.27.171.77:8077/tunnelExamine/findByIdList", //仅为示例，并非真实接口地址。
									method: 'POST',
									data: {
										tunnelId: ite.tunnelId,
										time: ite.time.substring(0, 7)
									},
									success: (res) => {
										this.Array=[]
										console.log(res)
										this.Array.push(res)
										console.log(this.Array[0].data.data[0].detailList)
										if(this.Array[0].data.data[0].detailList.length){
											this.form.detailList = this.Array[0].data.data[0].detailList
											this.form.detailList.forEach(ite => {
												this.$delete(ite, 'tunnelExamineId')
												this.$delete(ite, 'id')
												if (ite.startStake == 'K+undefined') {
													this.$delete(ite, 'startStake')
													this.$set(ite,'startStake','K')
												}
												if (ite.endStake == 'K+undefined') {
													this.$delete(ite, 'endStake')
													this.$set(ite,'endStake','K')
												}
											})
										}
									}
								});
							}
						})


					}
				});

			},
			getCouponSelected(e) {
				console.log(e)
				this.e = e
				this.index = e.target.value;
				this.tunnelType = this.couponList[e.target.value]
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
			//tab切换
			change(e) {
				this.btnnum = e
				console.log(this.btnnum)
			},
			surveyList() {
				uni.request({
					header: {
						'Content-Type': 'application/json'
					},
					url: "http://119.27.171.77:8077/tunnel/listAll", //仅为示例，并非真实接口地址。
					method: 'POST',
					data: {},
					dataType: 'json',
					success: (res) => {
						// console.log(res)
						res.data.data.forEach(item => {
							console.log(item)
							this.roadDataList.push(item.name)
							this.roadData.push(item)
							// console.log(this.roadData)
						})
					}
				});
				uni.request({
					header: {
						'Content-Type': 'application/json'
					},
					url: "http://119.27.171.77:8077/tunnelParts/listAll", //仅为示例，并非真实接口地址。
					method: 'POST',
					data: {},
					dataType: 'json',
					success: (res) => {
						// console.log(res)
						res.data.data.forEach(item => {
							console.log(item)
							this.$set(item, 'startStake', 'K')
							this.$set(item, 'endStake', 'K')
							this.surveyArr1.push(item)
							this.surveyArr.push(item.type)
							var arr2 = this.surveyArr.filter(function(value, index, self) {
								return self.indexOf(value) === index;
							});
							console.log(arr2)
							this.arr = arr2
						})
					}
				});
			},
			save() {
				this.form.detailList = [...this.form.detailList, ...this.form.detailList1]
				this.picker=[...this.picker,...this.picker1]
				this.form.detailList.forEach((res,index) => {
					this.$set(res, 'opinion', this.picker[index].content)
					res.startStake = res.startStake
					res.endStake = res.endStake
				})
				console.log(this.form.detailList)
				console.log(this.e, this.e0)
				if (this.e0 === null) {
					uni.showModal({
						title: '提示',
						content: '请先选择桥梁名称！',
					});
				} else {
					console.log(this.form.detailList)
					uni.request({
						header: {
							'Content-Type': 'application/json'
						},
						url: "http://119.27.171.77:8077/tunnelExamine/add", //仅为示例，并非真实接口地址。
						method: 'POST',
						data: {
							tunnelType: this.tunnelType,
							roadDataId: this.roadDataId,
							stake: this.zh1,
							extent: this.extent,
							rummager: this.rummager,
							time: this.time,
							detailList: this.form.detailList,
							tunnelId: this.tunnel,
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
							url: "../jiancha/index",
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

<style lang="less" scoped>
	/* 弹性盒头部固定,其余自适应 */
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

	.zhInput input {
		font-size: 14px;
		color: #BFC1C6;
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

	/deep/.uni-label-pointer {
		display: block;
		width: 100%;
		padding-bottom: 20rpx;
	}

	.table {
		width: 100%;
		height: auto;
		border: 1px solid #eee;
		margin-bottom: 10rpx;

		uni-input {
			font-size: 14px;
		}

		/deep/.uni-textarea-textarea {
			font-size: 14px !important;
		}
	}

	/deep/.uni-input-input {
		color: #BFC1C6;
		font-size: 14px;
	}

	/deep/uni-radio::before,
	uni-checkbox::before {
		font-size: 13px;
		margin-right: -4px;
	}
</style>
