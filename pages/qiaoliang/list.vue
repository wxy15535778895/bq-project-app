<template>
	<view class="content">
		<view class="infobox">
			<view class="list-1">
				<p style="display: flex;">检查编号:{{indexObj.id}}</p>
			</view>
			<view class="list-1">
				<p style="display: flex;">记录时间:{{indexObj.time.substring(0,10)}}</p>
			</view>
			<view class="list-1">
				<p style="display: flex;">桥梁名称:{{indexObj.bridge.bridgeName}}</p>
			</view>
			<view class="list-1">
				<p style="display: flex;">桥梁编号:{{indexObj.bridge.bridgeBh}}</p>
				<p style="display: flex;">桥位桩号:{{indexObj.stake}}</p>
			</view>

			<view class="list-1">
				<p style="display: flex;">路线名称:{{indexObj1?indexObj1.roadData.name:'白泉段'}}</p>
				<p style="display: flex;">线路编号:{{indexObj1?indexObj1.highData.number:'G7011'}}</p>
			</view>
			<view class="list-1">
				<p style="display: flex;">养护单位:{{indexObj1.bridgeCst?indexObj1.bridgeCst.constructionNuit:'白泉分公司'}}</p>
			</view>
			<view class="list-1">
				<p style="display: flex;">养护负责人:{{indexObj1.principal?indexObj1.principal:'王帅'}}</p>
				<p style="display: flex;">记录人:{{indexObj1.updater?indexObj1.updater:'旬阳管理所'}}</p>
			</view>
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
			<view class="box">
				<t-table>
					<t-tr style="display: flex;">
						<t-th>部件名称</t-th>
						<t-th>缺损类型</t-th>
						<t-th>损坏范围</t-th>
						<t-th>保养措施</t-th>
					</t-tr>
					<t-tr v-for="(item,index) in picker" :key="index">
						<t-td>{{ item.name }}</t-td>
						<t-td>{{ item.damageType? item.damageType:'/' }}</t-td>
						<t-td>{{ item.damageScope?item.damageScope:'/' }}</t-td>
						<t-td>{{ item.opinion?item.opinion:'/' }}</t-td>
					</t-tr>
				</t-table>
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
			return {
				zh1: "",
				extent: "",
				width: "",
				typeList: ["上行线", "下行线"],
				navList: ["内容1", "内容2"],
				nowIndex: 0,
				list: {},
				surveyArr: [], //tab切换按钮
				surveyArr1: [],
				arr: [], //去重后的按钮
				picker: [], //列表
				data: [],
				list1: [],
				indexObj: {},
				indexObj1: {},
			}
		},
		created() {
			this.surveyList()
		},
		computed: {
			changeData() {
				const {
					surveyArr1,
					list
				} = this
				return {
					surveyArr1,
					list,
				}
			}
		},
		watch: {
			changeData(newval, oldval) {
				if (newval) {
					this.selectType(0)
				}
			}
		},
		onShow() {
			this.indexObj = uni.getStorageSync("indexObj")
			console.log(this.indexObj)
			this.indexObj1 = uni.getStorageSync("indexObj1")
			console.log(this.indexObj1)
		},
		onLoad(params) {
			const id = params.id
			uni.request({
				header: {
					'content-Type': 'application/json'
				},
				url: "http://119.27.171.77:8077/bridgeExamine/find", //仅为示例，并非真实接口地址。
				method: 'POST',
				data: {
					id
				},

				success: (res) => {
					console.log(res)
					this.list = res.data.data
					console.log(this.list)

				}
			});
		},
		methods: {
			selectType(i, v) {
				this.picker = []
				this.nowIndex = i;
				this.surveyArr1.forEach(res => {
					console.log(res)
					if (this.nowIndex == 0) {
						if (res.type == '其他') {
							this.picker.push(res)
						}
					}
					if (this.nowIndex == 2) {
						if (res.type == '桥面系') {
							console.log(res)
							this.picker.push(res)
						}
					}
					if (this.nowIndex == 3) {
						if (res.type == '下部结构') {
							this.picker.push(res)
						}
					}
					if (this.nowIndex == 1) {
						if (res.type == '上部结构') {
							this.picker.push(res)
						}
					}
				})
				this.list.detailList.forEach(item => {
					// console.log(item)
					this.picker.forEach(it => {
						if (it.name == item.name) {
							// console.log(it)
							this.$set(it, 'damageScope', item.damageScope)
							this.$set(it, 'opinion', item.opinion)
							this.$set(it, 'damageType', item.damageType)
						}
					})
				})
			},
			surveyList() {
				uni.request({
					header: {
						'Content-Type': 'application/json'
					},
					url: "http://119.27.171.77:8077/bridgeComponent/listAll", //仅为示例，并非真实接口地址。
					method: 'POST',
					data: {},
					dataType: 'json',
					success: (res) => {
						// console.log(res)
						res.data.data.forEach(item => {
							console.log(item.type)
							this.surveyArr1.push(item)
							this.surveyArr.push(item.type)
							console.log(this.surveyArr)
							this.arr = this.surveyArr.filter(function(value, index, self) {
								return self.indexOf(value) === index;
							});
						})
					}
				});
			}
		}
	}
</script>

<style scoped>
	.infobox {
		padding: 10px;
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

	.contentItem {
		width: 4.5rem;
		color: #000000;
		padding: 0.1325rem 0;
		text-align: center;
		border-radius: 0.4rem;
		font-size: 14px;
		background-color: #F2F3F7;
		margin-bottom: 15px;
		margin-top: -5px;
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

	.box {
		position: absolute;
		top: 366px;
		width: 100%;
		margin: 0 auto;
		left: 0;
	}
</style>
