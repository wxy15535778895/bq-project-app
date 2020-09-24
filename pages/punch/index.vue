<template>
	<view style="padding-bottom: 100px;">
		<uni-calendar :insert="true" :lunar="true" :selected="selected" :start-date="'2019-3-2'" :end-date="'2019-5-20'"
		 @change="change"></uni-calendar>
		<view>
			<uni-collapse>
				<uni-collapse-item title="当天打卡信息" open>
					<uni-list>
						<view class="uni-list-cell-left">
							<view v-for="(item,index) in allSign" :key="index" @click="Card(index)" style="border-bottom: 1px dashed #007AFF;">
								<view v-if="item.clockInOut=='in'">{{item.isLate==0?"正常打卡":'迟到'}}<span @click="replacement(item)" v-if="item.isLate==1" style="color:orange">补卡</span></view>
								<view v-else="item.clockInOut=='out'">{{item.isLeaveEarly==0?'正常打卡':'早退'}}<span @click="replacement(item)" v-if="item.isLeaveEarly==1" style="color:orange">补卡</span></view>
								<view>{{item.addr}}</view>
								<view>{{item.createTime}}</view>
							</view>
						</view>
					</uni-list>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		<view>
			<uni-collapse>
				<uni-collapse-item title="我的补卡记录" open>
					<uni-list>
						<view class="uni-list-cell-left">
							<view v-for="(item,index) in repairList" :key="index" @click="Card(index)" style="border-bottom: 1px dashed #007AFF;">
								<view>{{item.note}}</view>
								<view>{{item.addr}}</view>
								<view>{{item.createTime}}</view>
								<view>{{item.state==0?'申请中':item.state==1?'申请通过':item.state==2?'申请驳回':'申请中'}}</view>
							</view>
						</view>
					</uni-list>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		<custom-tarbar :selected="1"></custom-tarbar>
		<!-- 补卡 -->
		<view :hidden="userFeedbackHidden" class="popup_content">
			<view class="popup_title">补卡理由</view>
			<view class="popup_textarea_item">
				<textarea class="popup_textarea" placeholder='有什么想告诉我们的...' v-model="feedbackContent">
						</textarea>
				<view @click="submitFeedback()">
					<button class="popup_button">提交补卡</button>
				</view>
			</view>
		</view>

		<view class="popup_overlay" :hidden="userFeedbackHidden" @click="hideDiv()"></view>
	</view>
</template>

<script>
	import customTarbar from '@/pages/tabbar/tabbar.vue';
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	export default {
		components: {
			uniCalendar,
			'custom-tarbar': customTarbar
		},
		data() {
			return {
				selected: [],
				recordList: [], //统计数据
				allSign: [], //所有打卡信息	
				userFeedbackHidden: true, // 默认隐藏
				feedbackContent: '', // 用户反馈内容
				data: {},
				repairList: [], //补卡列表
				months: {},
				time: new Date().toISOString().slice(0, 10), //日期


			};
		},
		onLoad() {
			this.getList();
		},
		watch: {
			recordList() {
				this.change(this.time)
			}
		},
		mounted() {},
		methods: {
			onNavigationBarButtonTap() {
				uni.switchTab({
					url: "../homePage/homePage"
				})
			},
			Card(index) {
				console.log(index)
			},
			replacement(data) {
				console.log(data)
				this.data = data
				this.userFeedbackHidden = false;
			},
			hideDiv() { // 隐藏输入弹出框
				this.userFeedbackHidden = true;
			},
			submitFeedback() { // 提交反馈

				var _this = this;
				// 提交反馈内容
				const data = _this.data
				_this.$set(data, 'note', _this.feedbackContent)
				_this.$set(data, 'state', '0')
				let opts = {
					url: '/userClockApply/saveClockApply',
					method: 'post'
				};
				_this.$http.httpRequest(opts, data).then(res => {
					console.log(res)
					_this.getList()
					_this.userFeedbackHidden = true;
				})

			},
			change(e) {
				console.log(e.fulldate)
				this.list = []
				this.recordList.forEach(res => {
					console.log(res)
					if (res.months == e.fulldate || res.months == e) {
						console.log(res)
						this.allSign = res.playClockRecords
					}
					// if (res.months == e.fulldate ? e.fulldate : e) {
					// 	this.allSign = res.playClockRecords
					// 	console.log(this.allSign)
					// }

				})
			},
			getList() {
				let that=this
				let months = "2020-09"
				let opts = {
					url: '/userClockOther/statClockRecord?months='+months,
					method: 'post'
				};
				that.$http.httpRequest(opts).then(res => {
					console.log(res)
					that.months = res.data.data
					that.recordList = res.data.data.recordList
					res.data.data.recordList.forEach(ite => {
						let date = {
							date: ite.months
						}
						that.selected.push(date)
					})
				})
				let currentPage = "1"
				let uId = uni.getStorageSync("currentUser").id
				let opts1 = {
					url: '/userClockApply/queryClockApply?currentPage=' + currentPage + '&uId=' + uId,
					method: 'post'
				};
				that.$http.httpRequest(opts1).then(res => {
					console.log(res)
					that.repairList = res.data.data.list
				})

			}
		}
	};
</script>
<style>
	.g-footer-container {
		position: fixed;
		bottom: 0;
		z-index: 999;
		width: 100%;
		box-shadow: 0 0 10px 0 hsla(0, 6%, 58%, 0.6);
	}

	.popup_overlay {

		position: fixed;
		top: 0%;
		left: 0%;
		width: 100%;
		height: 100%;
		background-color: black;
		z-index: 1001;
		-moz-opacity: 0.8;
		opacity: .80;
		filter: alpha(opacity=88);
	}

	.popup_content {
		position: fixed;
		top: 50%;
		left: 50%;
		width: 520upx;
		height: 550upx;
		margin-left: -270upx;
		margin-top: -270upx;
		border: 10px solid white;
		background-color: white;
		z-index: 1002;
		overflow: auto;
		border-radius: 20upx;
	}

	.popup_title {
		padding-top: 20upx;
		width: 480upx;
		text-align: center;
		font-size: 32upx;
	}

	.popup_textarea_item {
		padding-top: 5upx;
		height: 240upx;
		width: 440upx;
		background-color: #F1F1F1;
		margin-top: 30upx;
		margin-left: 20upx;
	}

	.popup_textarea {
		width: 410upx;
		font-size: 26upx;
		margin-left: 20upx;
	}
</style>
