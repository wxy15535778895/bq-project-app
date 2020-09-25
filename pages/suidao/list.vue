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
				<p style="display: flex;">隧道名称:{{indexObj.tunnel.name}}</p>
			</view>
			<view class="list-1">
				<p style="display: flex;">隧道编号:{{indexObj.tunnel.code}}</p>
			</view>
			
			<view class="list-1">
				<p style="display: flex;">路线名称:{{indexObj1?indexObj1.roadData.name:'白泉段'}}</p>
				<p style="display: flex;">线路编号:{{indexObj1?indexObj1.highData.number:'G7011'}}</p>
			</view>
			<view class="list-1">
				<p style="display: flex;">养护单位:{{indexObj1.jg?indexObj1.jg:'白泉分公司'}}</p>
			</view>
			<view class="list-1">
				<p style="display: flex;">记录人:{{indexObj1.creator?indexObj1.creator:'白泉分公司'}}</p>
				<p style="display: flex;">检查人:{{indexObj.rummager?indexObj.rummager:'XXX'}}</p>
			</view>
		</view>
		<view class="list-1 surveyBox">
			<view class="contentItem" v-for="(item,index) in arr" :key="index" @click="selectType(index,item)" :class="{active:nowIndex==index}">
				{{item}}
			</view>
		</view>
		<view class="box">
			<t-table>
				<t-tr>
					<t-th>结构名称</t-th>
					<t-th>检查内容</t-th>
					<t-th>异常描述</t-th>
					<t-th>判定</t-th>
					<t-th>措施</t-th>
				</t-tr>
				<t-tr v-for="item in picker" :key="item.id">
					<t-td>{{ item.name }}</t-td>
					<t-td>{{ item.opinion?item.opinion:'/' }}</t-td>
					<t-td>{{ item.damage?item.damage:'/' }}</t-td>
					<t-td>{{ item.commonSeverity?item.commonSeverity:'/' }}</t-td>
					<t-td>{{ item.trailCheckout?item.trailCheckout:'/' }}</t-td>
				</t-tr>
			</t-table>
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
				indexObj:{},
				indexObj1:{}
			}
		},
		created() {
			this.surveyList()
		},
		onShow (){
			this.indexObj=uni.getStorageSync("indexObj")
						console.log(this.indexObj)
						this.indexObj1=uni.getStorageSync("indexObj1")
									console.log(this.indexObj1)
			},
		watch: {
			list() {
				console.log('监听')
				this.selectType(0)
			}
		},
		onLoad(params) {
			console.log(params)
			let opts = {
				url: '/tunnelExamine/find',
				method: 'post'
			};
			let id = {
							 id:params.id
			};
			this.$http.httpRequest(opts, id).then(res => {
				console.log(res)
				this.list = res.data.data
				console.log(this.list)
			})
		},
		methods: {
			selectType(i, v) {
				this.picker = []
				this.nowIndex = i;
				this.nowItem = v;
				this.list.detailList.forEach(res => {
					console.log(res)
					if (res.type == '土建结构') {
						if (i == 0) {
							this.picker.push(res)
						}
					}
					if (res.type == '其他工程设施') {
						if (this.nowIndex == 1) {
							this.picker.push(res)
						}
					}
					console.log(this.picker)
				})
			},
			surveyList() {
				let opts = {
					url: '/tunnelParts/listAll',
					method: 'post'
				};
				this.$http.httpRequest(opts,{}).then(res => {
					res.data.data.forEach(item => {
						console.log(item)
						this.surveyArr1.push(item)
						this.surveyArr.push(item.type)
						console.log(this.surveyArr)
						this.arr = this.surveyArr.filter(function(value, index, self) {
							return self.indexOf(value) === index;
						});
						console.log(this.arr)
					})
				})
			},
		}
	}
</script>

<style scoped>
	.infobox {
		padding: 10px;
	}

	.info {
		display: flex;
		align-items: center;
		width: 100%;
		box-sizing: border-box;
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
		margin: 0 auto;
	}
</style>
