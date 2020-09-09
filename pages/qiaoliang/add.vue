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
				<view>桥梁名称</view>
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
				<view>养护单位</view>
				<view class="zhInput">
					<!-- <text>k</text> -->
					<input style="border: none;text-align: right;font-size: 15px;width: auto;" class="zhNum" disabled v-model="jg"
					 type="text" />
				</view>
			</view>
			<view class="list-1">
				<view>桥梁编号</view>
				<view class="zhInput">
					<!-- <text>k</text> -->
					<input style="border: none;text-align: right;font-size: 15px;width: auto;" class="zhNum" disabled v-model="bridgeBh"
					 type="text" />
				</view>
			</view>
			<view class="list-1">
				<view>养护负责人</view>
				<view class="zhInput">
					<!-- <text>k</text> -->
					<input style="border: none;text-align: right;font-size: 15px;width: auto;" class="zhNum" disabled v-model="principal"
					 type="text" />
				</view>
			</view>
			<view class="list-1 border">
				<view>桥位桩号</view>
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
			<view class="list-1 surveyBox">
				<view class="contentItem" v-if="arr.includes('其他')" @click="selectType(0)" :class="{active:nowIndex==0}">
					其他
				</view>
				<view class="contentItem" v-if="arr.includes('上部结构')" @click="selectType(1)" :class="{active:nowIndex==1}">
					上部结构
				</view>
				<view class="contentItem" v-if="arr.includes('桥面系')" @click="selectType(2)" :class="{active:nowIndex==2}">
					桥面系
				</view>
				<view class="contentItem" v-if="arr.includes('下部结构')" @click="selectType(3)" :class="{active:nowIndex==3}">
					下部结构
				</view>
			</view>
			<view class="box" v-show="nowIndex==0">
				<t-table border="1" border-color="#F3F4F6" v-model="table">
					<t-tr font-size="14" color="color: #000000;" align="left">
						<t-th align="center">部件名称</t-th>
						<t-th align="center">缺损类型</t-th>
						<t-th align="center">缺损范围</t-th>
						<t-th align="center">保养措施</t-th>
					</t-tr>
					<t-tr font-size="12" color="color: #000000;" align="center" v-for="(item,index) in pickers0" :key="index">
						<t-td align="center" v-model="table.name">{{ item.name }}</t-td>
						<t-td align="center">
							<checkbox-group class="block" @change="changeCheckbox($event,index)">
								<radio-group name="radio" @change="change11($event,index)">
									<label style="padding-bottom: 0px;">
										<view v-if="String(item.typeList).includes('完好')" style="width: 100%;padding-bottom: 10px;">
											<radio value="完好" :checked="item.damageTypeList.includes('完好')" /><text>完好</text>
										</view>
										<view v-if="String(item.typeList).includes('其他')" style="width: 100%;padding-bottom: 10px;">
											<radio value="其他" :checked="item.damageTypeList.includes('其他')" /><text>其他</text>
										</view>
										<view v-if="String(item.typeList).includes('无')" style="width: 100%;padding-bottom: 10px;">
											<radio value="无" :checked="item.damageTypeList.includes('无')" /><text>无</text>
										</view>
									</label>
								</radio-group>
								<view v-if="value=='完好'||value=='其他'||value=='无'?false:true" v-for="(value,key) in item.typeList" :key="key" style="padding-bottom: 10px;">
									<checkbox  :value="String(value)" :checked="pickers0[index].damageTypeList.includes(String(value))"
									 :class="{'checked':pickers0[index].damageTypeList.includes(String(value))}"></checkbox>
									<text>{{value}}</text>
								</view>
							</checkbox-group>
						</t-td>
						<t-td align="left"><input v-if="item" v-model="item.damageScope" name="" id="" style="vertical-align:top;outline:none;width: 100%;height: 10%;-webkit-user-select:text !important;"></input></t-td>
						<t-td align="left"><input v-if="item" v-model="item.opinion" name="" id="" style="vertical-align:top;outline:none;width: 100%;height: 10%;-webkit-user-select:text !important;"></textarea></t-td>
					</t-tr>
				</t-table>
			</view>
			<view class="box" v-show="nowIndex==1">
				<t-table border="1" border-color="#F3F4F6" v-model="table">
					<t-tr font-size="14" color="color: #000000;" align="left">
						<t-th align="center">部件名称</t-th>
						<t-th align="center">缺损类型</t-th>
						<t-th align="center">缺损范围</t-th>
						<t-th align="center">保养措施</t-th>
					</t-tr>
					<t-tr font-size="12" color="color: #000000;" align="center" v-for="(item,index) in pickers1" :key="index">
						<t-td align="center" v-model="table.name">{{ item.name }}</t-td>
						<t-td align="center">
							<checkbox-group class="block" @change="changeCheckbox($event,index)">
								<radio-group name="radio" @change="change11($event,index)">
									<label style="padding-bottom: 0px;">
										<view v-if="String(item.typeList).includes('完好')" style="width: 100%;padding-bottom: 0px;">
											<radio value="完好" :checked="item.damageTypeList.includes('完好')" /><text>完好</text>
										</view>
										<view v-if="String(item.typeList).includes('其他')" style="width: 100%;padding-bottom: 0px;">
											<radio value="其他" :checked="item.damageTypeList.includes('其他')" /><text>其他</text>
										</view>
										<view v-if="String(item.typeList).includes('无')" style="width: 100%;padding-bottom: 0px;">
											<radio value="无" :checked="item.damageTypeList.includes('无')" /><text>无</text>
										</view>
									</label>
								</radio-group>
								<view v-for="(value,key) in item.typeList" :key="key" style="padding-bottom: 10px;">
									<checkbox v-if="value=='完好'||value=='其他'||value=='无'?false:true" :value="String(value)" :checked="pickers1[index].damageTypeList.includes(String(value))"
									 :class="{'checked':pickers1[index].damageTypeList.includes(String(value))}"></checkbox>
									<text v-if="value=='完好'||value=='其他'||value=='无'?false:true">{{value}}</text>
								</view>
							</checkbox-group>
						</t-td>
						<t-td align="left"><input v-if="item" v-model="item.damageScope" name="" id="" style="vertical-align:top;outline:none;width: 100%;height: 10%;-webkit-user-select:text !important;"></input></t-td>
						<t-td align="left"><input v-if="item" v-model="item.opinion" name="" id="" style="vertical-align:top;outline:none;width: 100%;height: 10%;-webkit-user-select:text !important;"></textarea></t-td>
					</t-tr>
				</t-table>
			</view>
			<view class="box" v-show="nowIndex==2">
				<t-table border="1" border-color="#F3F4F6" v-model="table">
					<t-tr font-size="14" color="color: #000000;" align="left">
						<t-th align="center">部件名称</t-th>
						<t-th align="center">缺损类型</t-th>
						<t-th align="center">缺损范围</t-th>
						<t-th align="center">保养措施</t-th>
					</t-tr>
					<t-tr font-size="12" color="color: #000000;" align="center" v-for="(item,index) in pickers2" :key="index">
						<t-td align="center" v-model="table.name">{{ item.name }}</t-td>
						<t-td align="center">
							<checkbox-group class="block" @change="changeCheckbox($event,index)">
								<radio-group name="radio" @change="change11($event,index)">
									<label style="padding-bottom: 0px;">
										<view v-if="String(item.typeList).includes('完好')" style="width: 100%;padding-bottom: 0px;">
											<radio value="完好" :checked="item.damageTypeList.includes('完好')" /><text>完好</text>
										</view>
										<view v-if="String(item.typeList).includes('其他')" style="width: 100%;padding-bottom: 0px;">
											<radio value="其他" :checked="item.damageTypeList.includes('其他')" /><text>其他</text>
										</view>
										<view v-if="String(item.typeList).includes('无')" style="width: 100%;padding-bottom: 0px;">
											<radio value="无" :checked="item.damageTypeList.includes('无')" /><text>无</text>
										</view>
									</label>
								</radio-group>
								<view v-for="(value,key) in item.typeList" :key="key" style="padding-bottom: 10px;">
									<checkbox v-if="value=='完好'||value=='其他'||value=='无'?false:true" :value="String(value)" :checked="pickers2[index].damageTypeList.includes(String(value))"
									 :class="{'checked':pickers2[index].damageTypeList.includes(String(value))}"></checkbox>
									<text v-if="value=='完好'||value=='其他'||value=='无'?false:true">{{value}}</text>
								</view>
							</checkbox-group>
						</t-td>
						<t-td align="left"><input v-if="item" v-model="item.damageScope" name="" id="" style="vertical-align:top;outline:none;width: 100%;height: 10%;-webkit-user-select:text !important;"></input></t-td>
						<t-td align="left"><input v-if="item" v-model="item.opinion" name="" id="" style="vertical-align:top;outline:none;width: 100%;height: 10%;-webkit-user-select:text !important;"></textarea></t-td>
					</t-tr>
				</t-table>
			</view>
			<view class="box" v-show="nowIndex==3">
				<t-table border="1" border-color="#F3F4F6" v-model="table">
					<t-tr font-size="14" color="color: #000000;" align="left">
						<t-th align="center">部件名称</t-th>
						<t-th align="center">缺损类型</t-th>
						<t-th align="center">缺损范围</t-th>
						<t-th align="center">保养措施</t-th>
					</t-tr>
					<t-tr font-size="12" color="color: #000000;" align="center" v-for="(item,index) in pickers3" :key="index">
						<t-td align="center" v-model="table.name">{{ item.name }}</t-td>
						<t-td align="center">
							<checkbox-group class="block" @change="changeCheckbox($event,index)">
								<radio-group name="radio" @change="change11($event,index)">
									<label style="padding-bottom: 0px;">
										<view v-if="String(item.typeList).includes('完好')" style="width: 100%;padding-bottom: 0px;">
											<radio value="完好" :checked="item.damageTypeList.includes('完好')" /><text>完好</text>
										</view>
										<view v-if="String(item.typeList).includes('其他')" style="width: 100%;padding-bottom: 0px;">
											<radio value="其他" :checked="item.damageTypeList.includes('其他')" /><text>其他</text>
										</view>
										<view v-if="String(item.typeList).includes('无')" style="width: 100%;padding-bottom: 0px;">
											<radio value="无" :checked="item.damageTypeList.includes('无')" /><text>无</text>
										</view>
									</label>
								</radio-group>
								<view v-for="(value,key) in item.typeList" :key="key" style="padding-bottom: 10px;">
									<checkbox v-if="value=='完好'||value=='其他'||value=='无'?false:true" :value="String(value)" :checked="pickers3[index].damageTypeList.includes(String(value))"
									 :class="{'checked':pickers3[index].damageTypeList.includes(String(value))}"></checkbox>
									<text v-if="value=='完好'||value=='其他'||value=='无'?false:true">{{value}}</text>
								</view>
							</checkbox-group>
						</t-td>
						<t-td align="left"><input v-if="item" v-model="item.damageScope" name="" id="" style="vertical-align:top;outline:none;width: 100%;height: 10%;-webkit-user-select:text !important;"></input></t-td>
						<t-td align="left"><input v-if="item" v-model="item.opinion" name="" id="" style="vertical-align:top;outline:none;width: 100%;height: 10%;-webkit-user-select:text !important;"></textarea></t-td>
					</t-tr>
				</t-table>
			</view>
			<view class="list-1">
				<view>记录人</view>
				<view class="zhInput">
					<!-- <text>k</text> -->
					<input style="border: none;text-align: right;font-size: 15px;width: auto;" class="zhNum" disabled v-model="updater"
					 type="text" />
				</view>
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
				pickers0: [],
				pickers1: [],
				pickers2: [],
				pickers3: [],
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
				nowIndex: 0,
				extent: "",
				bridge: [], //所有桥梁列表
				circuitBh: "", //路线编号
				bridgeBh: "", //桥梁编号
				principal: "", //选中养护人
				updater: "", //选中记录管理所
				zh1: "", //选中桩号
				jg: "", //选中养护单位
				zh2: "", //选中线路名称
				bridgeId: "", //选中桥梁id
				centreZh1: "", //桩号起点
				centreZh2: "", //桩号终点
				timeArr: [],
				index: 0,
				index0: 0,
				nowItem: "路肩损坏",
				roadDataList: ['- 请选择 -'],
				roadData: [],
				couponList: ['请选择', '上行线', '下行线'],
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
				rankDataId: '',
				id: '',
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
				this.selectType(0)
			}
		},
		created() {
			this.surveyList()
		},
		methods: {
			change11(e, index) {
				console.log(e, index)
				if (this.nowIndex == 0) {
					this.pickers0[index].damageTypeList = []
					this.pickers0[index].damageTypeList.push(e.detail.value)
					console.log(this.pickers0[index].damageTypeList)
				}
				if (this.nowIndex == 1) {
					this.pickers1[index].damageTypeList = []
					this.pickers1[index].damageTypeList.push(e.detail.value)
					console.log(this.pickers1[index].damageTypeList)
				}
				if (this.nowIndex == 2) {
					this.pickers2[index].damageTypeList = []
					this.pickers2[index].damageTypeList.push(e.detail.value)
					console.log(this.pickers2[index].damageTypeList)
				}
				if (this.nowIndex == 3) {
					this.pickers3[index].damageTypeList = []
					this.pickers3[index].damageTypeList.push(e.detail.value)
					console.log(this.pickers3[index].damageTypeList)
				}
			},
			// 多选复选框改变事件
			changeCheckbox(e, index) {
				if (this.nowIndex == 0) {
					console.log(e.detail.value)
					this.pickers0[index].damageTypeList = []
					this.pickers0[index].damageTypeList = e.detail.value
				}
				if (this.nowIndex == 1) {
					this.pickers1[index].damageTypeList = []
					this.pickers1[index].damageTypeList = e.detail.value
					console.log(this.pickers1[index].damageTypeList)
				}
				if (this.nowIndex == 2) {
					this.pickers2[index].damageTypeList = []
					this.pickers2[index].damageTypeList = e.detail.value
					console.log(this.pickers2[index].damageTypeList)
				}
				if (this.nowIndex == 3) {
					this.pickers3[index].damageTypeList = []
					this.pickers3[index].damageTypeList = e.detail.value
					console.log(this.pickers3[index].damageTypeList)
				}
			},
			show() {
				console.log(this.tabs);
			},
			selectType(i, v) {
				console.log(this.Array.length)
				if (this.Array.length == 0) {
					this.pickers0 = []
				}
				if (this.Array.length == 0) {
					this.pickers1 = []
				}
				if (this.Array.length == 0) {
					this.pickers2 = []
				}
				if (this.Array.length == 0) {
					this.pickers3 = []
				}
				this.nowIndex = i;
				this.nowItem = v;
				this.surveyArr1.forEach(res => {
					if (res.type == '其他') {
						if (this.Array.length == 0) {
							this.pickers0.push(res)
							console.log(this.pickers0)
						}
					}
					if (res.type == '上部结构') {
						if (this.Array.length == 0) {
							this.pickers1.push(res)
						}
					}
					if (res.type == '桥面系') {
						if (this.Array.length == 0) {
							this.pickers2.push(res)
							console.log(this.pickers2)
						}
					}
					if (res.type == '下部结构') {
						if (this.Array.length == 0) {
							this.pickers3.push(res)
						}
					}
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
				this.Array = []
				this.timeArr = []
				console.log(e)
				this.e0 = e
				this.index0 = e.target.value;
				console.log(this.roadData[e.target.value - 1])
				this.bridgeId = this.roadData[e.target.value - 1].id
				this.zh1 = this.roadData[e.target.value - 1].centreZh
				this.zh2 = this.roadData[e.target.value - 1].roadData.name
				this.jg = this.roadData[e.target.value - 1].jg
				this.bridgeBh = this.roadData[e.target.value - 1].bridgeBh
				this.principal = this.roadData[e.target.value - 1].principal
				this.updater = this.roadData[e.target.value - 1].yg
				this.centreZh1 = this.roadData[e.target.value - 1].centreZh.substring(this.roadData[e.target.value - 1].centreZh.indexOf(
					'K') + 1, this.roadData[e.target.value - 1].centreZh.lastIndexOf('+'))
				this.centreZh2 = (this.roadData[e.target.value - 1].centreZh.split('+')[1])
				this.bridge.list.forEach(res => {
					console.log(res.bridgeId)
					if (res.bridgeId == this.roadData[e.target.value - 1].id) {
						console.log(res)
						this.timeArr.push(res.time.substring(0, 7))
						this.Array.push(res)
					} else {
						this.pickers0.forEach(ite => [
							ite.damageScope = "",
							ite.damageType = "",
							ite.opinion = ""
						])
						this.pickers1.forEach(ite => [
							ite.damageScope = "",
							ite.damageType = "",
							ite.opinion = ""
						])
						this.pickers2.forEach(ite => [
							ite.damageScope = "",
							ite.damageType = "",
							ite.opinion = ""
						])
						this.pickers3.forEach(ite => [
							ite.damageScope = "",
							ite.damageType = "",
							ite.opinion = ""
						])
					}
				})
				if (this.Array.length) {
					console.log('111')
					this.id = this.Array[0].id
					uni.request({
						header: {
							'content-Type': 'application/json'
						},
						url: "http://119.27.171.77:8077/bridgeExamine/find", //仅为示例，并非真实接口地址。
						method: 'POST',
						data: {
							id: this.id
						},
						success: (res) => {
							console.log(res.data.data.detailList)
							this.form.detailList = res.data.data.detailList
							this.form.detailList.forEach(re => {
								this.surveyArr1.forEach(it => {
									if (it.name == re.name) {
										console.log(it)
										console.log(re)
										re.typeList = it.typeList
									}

								})
							})
							this.pickers0 = []
							this.pickers1 = []
							this.pickers2 = []
							this.pickers3 = []
							this.form.detailList.forEach(ite => {
								this.$delete(ite,'damageTypeList')
								this.$set(ite,'damageTypeList',ite.damageType.split(","))
								if (ite.type == "其他") {
									this.pickers0.push(ite)
									console.log(this.pickers0)
								}
								if (ite.type == "上部结构") {
									this.pickers1.push(ite)
								}
								if (ite.type == "桥面系") {
									this.pickers2.push(ite)
								}
								if (ite.type == "下部结构") {
									this.pickers3.push(ite)
								}
							})
						}
					});
				}
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
			surveyList() {
				uni.request({
					header: {
						'Content-Type': 'application/json'
					},
					url: "http://119.27.171.77:8077/bridge/listAll",
					method: 'POST',
					data: {},
					dataType: 'json',
					success: (res) => {
						console.log(res)
						res.data.data.forEach(item => {
							this.roadDataList.push(item.bridgeName)
							this.roadData.push(item)
							// console.log(this.roadData)
						})
					}
				});
				uni.request({
					header: {
						'content-Type': 'application/json'
					},
					url: "http://119.27.171.77:8077/bridgeExamine/page/list",
					method: 'POST',
					data: {
						currentPage: 1,
						stake: ""
					},

					success: (res) => {
						this.bridge = res.data.data
					}
				});
				uni.request({
					header: {
						'Content-Type': 'application/json'
					},
					url: "http://119.27.171.77:8077/bridgeComponent/listAll",
					method: 'POST',
					data: {},
					dataType: 'json',
					success: (res) => {
						res.data.data.forEach(item => {
							this.$delete(item, 'id')
							this.$set(item, 'id', '')
							this.$set(item, 'damageTypeList', [])
							this.$set(item, 'damageScope', '')
							this.$set(item, 'opinion', '')
							this.surveyArr1.push(item)
							this.surveyArr.push(item.type)
							var arr2 = this.surveyArr.filter(function(value, index, self) {
								return self.indexOf(value) === index;
							});
							this.arr = arr2
						})
					}
				});
			},
			save() {
				if (this.e0 === null) {
					uni.showModal({
						title: '提示',
						content: '请先选择桥梁名称！',
					});
				} else {
					this.rankDataId = JSON.parse(
						uni.getStorageSync("currentUser")
					).rankDataId
					console.log(this.pickers0, this.pickers1)
					this.form.detailList = [...this.pickers0, ...this.pickers1, ...this.pickers2, ...this.pickers3]
					console.log(this.form.detailList)
					this.form.detailList.forEach(res => {
						// console.log(res)
						this.$delete(res, 'bridgeExamineId')
						res.id = ""
					})
					const data = {
						direction: this.direction,
						roadDataId: this.roadDataId,
						stake: "k" + this.centreZh1 + "+" + this.centreZh2,
						principal: this.principal,
						yg: this.jg,
						extent: this.extent,
						time: this.time,
						creator: this.updater,
						detailList: this.form.detailList,
						bridgeId: this.bridgeId,
						countScore: this.form.countScore,
						totalScore: this.form.totalScore
					}
					console.log(data)
					uni.request({
						header: {
							'Content-Type': 'application/json'
						},
						url: "http://119.27.171.77:8077/bridgeExamine/add", //仅为示例，并非真实接口地址。
						method: 'POST',
						data: data,
						dataType: 'json',
						success: (res) => {
							console.log(res)
							if (res.data.data == -1) {
								uni.showModal({
									title: '提示',
									content: '该桥梁本月已检查！',
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
										success() {
											let page = getCurrentPages().pop(); //跳转页面成功之后                 
											console.log(page)
											if (!page) return;
											page.onLoad(); //如果页面存在，则重新刷新页面
										}
									})
								}, 1500)
								uni.setStorageSync("username", "0")

							}
						}
					});

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

	/deep/uni-radio-group {
		// margin-top: -10rpx;
	}

	/deep/.uni-label-pointer {
		display: block;
		width: 100%;
		padding-bottom: 20rpx;
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
