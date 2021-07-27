<template>
	<view class="body">
		<view class="table" style="margin-top: 18px;padding-bottom: 20%;">
			<table style="width: 100%;" border="1" cellspacing="0" cellpadding="0">
				<tr style="width: 100%;">
					<th>巡查人</th>
					<th>巡查时间</th>
					<th>巡查记录</th>
					<th>备注</th>
				</tr>
				<tr style="width: 100%;" v-for="(item,index) in list" @click="getId(index)" :key="index">
					<td>{{item.examiner}}</td>
					<td>{{item.time.slice(0, 10)}}</td>
					<td :style="{'background':item.redState=='超时'?'#FF0100':'#5FB456'}" @click.stop="getRedState(index)">{{item.state}}</td>
					<td>{{item.remark}}</td>
				</tr>

			</table>
		</view>
<!-- 		<view class="bottom" style="text-align: center;margin-top: -19%;">
			<p v-show="flag">{{text.load}}</p>
			<p v-show="flag1">{{text.normal}}</p>
			<p v-show="flag2">{{text.none}}</p>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				params: {
					currentPage: 1,
				},
				id:'',
				list: [],
				flag: false,
				flag1: false,
				flag2: true,
				total: '',
				text: {
					none: '上拉加载',
					normal: '没有更多的数据了...',
					load: '正在加载中...'
				}
			}
		},
		mounted() {
			this.surveyList()
		},
		onLoad(params) {
			console.log(params)
			this.id=params.id
		},
		onReachBottom: function(str) {
			this.childMethod()
		},
		methods: {
			childMethod() {
				console.log(this.list.length)
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
			surveyList(page) {
				if (page == 1) {
					this.list = []
					this.params.currentPage = 1
				}
				let data = {
					id: this.id
				};
				let opts = {
					url: '/securityRiskControlContor/listAllRecord',
					method: 'post'
				};
				console.log(data)
				this.$http.httpRequest(opts, data).then(res => {
					console.log(res)
					this.total = res.data.data.total
					uni.hideNavigationBarLoading(); //关闭加载动画
					this.list = this.list.concat(res.data.data.list); //合并数组
				})
			},
		}
	}
</script>

<style>
	.table {
		border: none;

		table {
			border-bottom: 1px solid #E9E9E9;
		}
	}
    .body{
		margin-top: -20px;
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
</style>
