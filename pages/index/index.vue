<template>
	<view class="content" style="padding-bottom: 100px;">
		<view class="page-body">
			<view class="sign-title">
				<view class="sign-title-l">
					<view class="portrait">
						{{name.substr(-2)}}
					</view>
					<view class="text">
						<view class="name">
							{{name}}
						</view>
						<view class="gz" @click="goRule">
							<text class="t1">考勤组:公司考勤</text>
							<text>查看规则</text>
						</view>
						<text style="position: absolute;right: 12px;">{{weather.type}}{{weather.wendu}}</text>
					</view>
				</view>
				<view class="sign-title-r">
					<view class="date">
						<picker mode="date" :value="date" @change="bindDateChange">
							<view class="uni-input">{{date}}
								<uni-icon type="arrowdown"></uni-icon>
							</view>

						</picker>
					</view>
				</view>
			</view>
			<!-- <text @click="reset" :style="{color:'rgb(0, 122, 255)'}">更新打卡</text> -->
			<view style="text-align: center;padding: 20upx 0;">当前位置: <text @click="openLocation">{{address}}</text></view>
			<view class="uni-timeline">
				<view class="uni-timeline-item uni-timeline-first-item">
					<view class="uni-timeline-item-divider" :style="{ background : (!isAm ? '#1AAD19' : '#bbb')}"></view>
					<view class="uni-timeline-item-content">
						<view>
							<view  class="content-show">
								<view v-if="is === true">
									<view class="module CBlue" @click="clickSign">
									<view class="text" v-if="division==false&&data!=null">上班打卡</view>
									<view class="text" v-if="division==true&&data!=null">下班打卡</view>
									<view class="text" v-if="data==null">打卡</view>
										<view class="time">{{time}}</view>
									</view>
									<view class="colorGreen" style="text-align: center;margin-top: 50upx;" v-if="is">
										已在考勤范围内 <text class="relocation" @click="relocation">重新定位</text>
									</view>
								</view>
								<view v-else-if="is === false">
									<view class="module CGreen" @click="clickSign">
										<view class="text">外勤打卡</view>
										<view class="time">{{time}}</view>
									</view>
									<view class="colorRed" style="text-align: center;margin-top: 50upx;" v-if="!is">
										不再考勤范围内 <text class="relocation" @click="relocation">重新定位</text>
									</view>
								</view>
								<view v-else-if="is === null">
									<view class="module CAsh">
										<view class="text">请检查位置信息</view>
										<view class="time">{{time}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 备注 -->
		<uni-popup :show="type === 'middle-list'" position="middle" mode="fixed" @hidePopup="togglePopup('')">
			<view class="title" style="padding: 20upx 0;font-weight: bold;width: 100%;text-align: center;border-bottom: 1px solid #666;">打卡备注</view>
			<view class="content" style="padding: 20upx 10upx;width: 100%;">
				<text class="text">打卡时间:</text>
				<text>{{bzText.time}}</text>
				<view class="text">打卡地点:</view>
				<view>{{bzText.address}}</view>
			</view>
			<view class="content" style="padding: 20upx 10upx;width: 100%;">
				<view>{{bzText.remarks}}</view>
			</view>
			<view class="bottom" style="padding: 20upx 10upx;color: cadetblue;width: 100%;text-align: center;border-top: 1px solid #666;"
			 @click="togglePopup('')">关闭</view>
		</uni-popup>
		<custom-tarbar :selected="0"></custom-tarbar>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniIcon from "@/components/uni-icon/uni-icon.vue"
	import customTarbar from '@/pages/tabbar/tabbar.vue';
	import {
		formateDate,
		pointInsideCircle,
		isSameDay
	} from "@/common/util.js"
	import {
		handleSignClick,
		setSignInfo,
		addSignInfo,
		getSignInfo,
		delSignInfo,
		getInfo,
		key
	} from "./index.js"
	export default {
		components: {
			uniIcon,
			uniPopup,
			customTarbar
		},
		data() {
			return {
				name: "我的名字",
				bzText: {
					time: "",
					address: "",
					img: "",
					remarks: ""
				},
				inout: {
					in:'in',
					out:'out'
				},
				type: "",

				r: 80, //半径
				Timer: [{
					time: "09:00",
				}, {
					time: "18:00"
				}], //上下班时间
				isAm: false, //上班是否打卡
				isPm: false, //下班是否打卡
				amSign: {
					time: "",
					address: "",
					remarks: "",
					img: ""
				}, //上午打卡信息
				pmSign: {
					time: "",
					address: "",
					remarks: "",
					img: ""
				}, //下午打卡信息
				clickNum: 0, //点击重新获取位置信息次数
				is: null, //是否正常打卡（外勤打卡）
				isSign: false, //是否打卡
				time: formateDate(new Date(), 'h:min:s'), //当前时分秒
				date: formateDate(new Date(), 'Y-M-D'),
				latitude: "", //当前经度
				longitude: "", //当前维度
				address: "我的位置", //
				wqInfo: null,
				allSign: [], //所有打卡信息				
				signInfo: {
					mode: "",
					latitude: "",
					longitude: "",
					address: "",
					time: "",
					remarks: ""
				}, //打卡信息 （模式，经纬度，地址，时间）
				covers: [
					// 公司点信息
					{
						id: 0,
						callout: {
							content: "巨龙软件信息技术有限公司",
							color: "red",
							display: "ALWAYS",
						},
						latitude: 34.208006,
						longitude: 108.90811,
						iconPath: '../../../static/img/location.png'
					},
				],
				circles: [
					// 公司圆信息(latitude:39.9085,longitude:116.39747 );
					{
						latitude: 34.208006,
						longitude: 108.90811,
						radius: 80,
						strokeWidth: 1,
						fillColor: "#7fff0099"
					},
				],
				username: null,
				data:{},
				intime:'0',
				outtime:'0',
				weather:{},
			    division:false
			}
		},
		watch:{
			time(){
			   if(this.data!==null){
				   if(this.time>"12:00"){
					   this.division=true
				   }
				   if(this.time>this.data.inTime){
				   	this.intime='1'
				   }else{
				   	this.intime='0'
				   }
				  if(this.time<this.data.outTime){
				  	this.outtime='1'
				  }else{
				  	this.outtime='0'
				  }
			   }
			}
		},
		// 初始化
		onLoad() {
			this.weather=uni.getStorageSync('weather');
			let res = uni.getStorageSync("currentUser")
			this.username = res
			console.log(res.id)
		    let userId = res.id
			const uId=userId
			var that = this;
			let opts = {
				url: '/clockAreaManager/getClockAreaManager?uId='+userId,
				method: 'post'
			};
			that.$http.httpRequest(opts).then(res => {
				console.log(res)
				this.data=res.data.data
			})
			// uni.request({
			// 	header: {
			// 		'content-Type': 'application/json'
			// 	},
			// 	url: "http://192.168.0.113:8077/clockAreaManager/getClockAreaManager?uId="+userId, //仅为示例，并非真实接口地址。
			// 	method: 'POST',
			// 	data: {},
   //              success: (res) => {
			// 		console.log(res)
			// 		this.data=res.data.data
			// 	}
			// });
			// var sign = getSignInfo();
			// if (sign != undefined) {
			// 	var signA = sign.main.reverse();
			// 	this.allSign = signA
			// 	if (signA.length == 1) {
			// 		if (isSameDay(signA[0].nowT)) {
			// 			this.isSign = true;
			// 			// this.isAm = true;
			// 			this.allSign = signA
			// 			this.amSign = signA[0];
			// 		}
			// 	} else {
			// 		// 理想状态 认为这是 上一天 的 下班信息
			// 		if (signA[0]) {
			// 			if (isSameDay(signA[0].nowT)) {
			// 				this.isSign = true;
			// 				this.isPm = true;
			// 				this.allSign = signA;
			// 				this.pmSign = signA[0];
			// 			}
			// 		}
			// 		// 理想状态 认为这是 上一天 的 上班信息
			// 		if (signA[1]) {
			// 			if (isSameDay(signA[1].nowT)) {
			// 				this.isSign = true;
			// 				// this.isAm = true;
			// 				this.allSign = signA
			// 				this.amSign = signA[1];
			// 			}
			// 		}
			// 	}
			// }
			this.getLocation();
			this.getTime();
		},
		methods: {
			onNavigationBarButtonTap(){
				uni.switchTab({
					url: "../homePage/homePage"
				})
			},
			togglePopup(type) {
				this.type = type;
			},
			// 产看规则
			goRule() {
				uni.navigateTo({
					url: "/pages/rule/rule"
				})
			},
			// 腾讯位置服务
			getAdd() {
				if (this.isAm && this.isPm) {
					return;
				}
				if (this.is === true) {
					let address = this.covers[0].callout.content;
					this.address = address;
					this.signInfo.address = address;
					return;
				}
				var that = this;
				var url = `https://apis.map.qq.com/ws/geocoder/v1/?location=${that.latitude},${that.longitude}&key=${key}`;
				uni.request({
					url,
					success(res) {
						console.log(res)
						var data = res.data;
						if (data.status != 0) {
							uni.showToast({
								title: data.message,
								icon: "none"
							})
							return;
						}
						if (that.is === null) {
							that.address = "请检查位置信息！";
						}
						if (that.is === false) {
							let address = res.data.result.address + res.data.result.formatted_addresses.recommend
							that.address = address;
							that.signInfo.address = address;
						}
					}
				})
			},
			// 初始化数据  （公司的经纬度 公司名称 打卡范围 ）
			getData() {
				var that = this;
				var url = ``;
				uni.request({
					url,
					success(res) {
						let data = res.data;
						that.covers[0].callout.content = data.name;
						that.covers[0].latitude = that.circles[0].latitude = data.latitude;
						that.covers[0].longitude = that.circles[0].longitude = data.longitude;
						that.r = that.circles.radius = data.r;
					}
				})
			},
			// 重新定位
			relocation() {
				uni.navigateTo({
					url: "/pages/sign/sign",
				})
			},
			// 选择打卡日期
			bindDateChange: function(e) {
				this.date = e.target.value
			},
			// 重置打卡
			reset() {
				var that = this;
				uni.showModal({
					title: "重置本地打卡信息",
					content: "您确定要重置打卡信息吗？点击确定本地打卡信息会被清除！",
					success: function(res) {
						if (res.confirm) {
							delSignInfo();
							that.isSign = false;
							that.isAm = false;
							that.isPm = false;
							that.allSign = [];
						} else if (res.cancel) {
							return;
						}
					}
				})

			},
			// 显示备注
			showBz(type) {
				this.type = 'middle-list';
				if (type == 'amSign') {
					this.bzText.time = this.amSign.time;
					this.bzText.address = this.amSign.address;
					this.bzText.remarks = this.amSign.remarks;
				} else if (type == 'pmSign') {
					this.bzText.time = this.pmSign.time;
					this.bzText.address = this.pmSign.address;
					this.bzText.remarks = this.pmSign.remarks;
				}
			},
			// 实时时间
			getTime() {
				var that = this;
				setInterval(function() {
					that.time = formateDate(new Date(), 'h:min:s')
				}, 1000)
			},
			// 获取当前位置
			getLocation() {
				var that = this;
				if (this.clickNum !== 0) {
					uni.showLoading({
						title: "获取中...",
						mask: true
					})
				}
				if (this.clickNum >= 3) {
					uni.showToast({
						title: "请稍后尝试！",
						icon: "none",
						mask: true
					});
					return;
				}
				this.clickNum++;
				uni.getLocation({
					type: 'gcj02', //返回可以用于uni.openLocation的经纬度
					success(res) {
						console.log(res)
						uni.hideLoading();
						that.latitude = res.latitude;
						that.longitude = res.longitude;
						// console.log(res.latitude,"---",res.longitude)
						that.covers[1] = {
							id: 1,
							latitude: res.latitude,
							longitude: res.longitude,
							iconPath: '../../static/location.png'
						}
						var s = pointInsideCircle([that.latitude, that.longitude], [that.circles[0].latitude, that.circles[0].longitude],
							that.r / 100000);
						that.is = s;

						that.signInfo.latitude = res.latitude;
						that.signInfo.longitude = res.longitude;
						that.signInfo.mode = s ? "正常打卡" : "外勤打卡";

						that.getAdd()
					},
					fail(err) {
						uni.hideLoading();
						that.address = "请检查位置信息！"
						uni.showToast({
							title: "请检查位置信息状态！",
							icon: "none",
							mask: true,
							duration: 3000
						})
					}
				});
			},
			// 点击打卡
			clickSign(type) {
				var that = this;
				var isTrue = this.is;
				if (isTrue === null) {
					uni.showToast({
						title: "请检查位置信息状态！",
						icon: "none",
						mask: true,
						duration: 3000
					})
					return;
				}
				
				console.log(data)
				var that = this;
				let opts = {
					url: '/userClockRecord/saveClockRecord',
					method: 'post'
				};
				let data = {
					"addr": "巨龙软件信息技术有限公司",
					"clockInOut": this.data==null?"in":this.division==false?"in":"out",
					"isLate": this.data==null?"0":this.division==false?this.intime:"0",
					"isLeaveEarly":this.data==null?"0":this.division==false?"0":this.outtime,
					"lat": this.latitude,
					"lng": this.longitude
				}
				that.$http.httpRequest(opts, data).then(res => {
					console.log(res)
				})
				uni.showLoading({
					title: "打卡记录中...",
					mask: true
				});
				this.signInfo.time = formateDate(new Date(), 'Y-M-D h:min:s');
				var a = getSignInfo();
				if (a != undefined) {
					addSignInfo(getInfo(this.signInfo), a)
				} else {
					setSignInfo(getInfo(this.signInfo))
				}
				console.log(a)
				setTimeout(function() {
					uni.hideLoading();
					var sign = getSignInfo().main;
					that.allSign = sign.reverse();
					that.isSign = true;
					console.log(that.data)
					if(that.data!==null){
						if (that.isAm === false) {
							that.isAm = true;
						} else {
							that.isPm = true;
						}
					}
					uni.showToast({
						title: "打卡成功！"
					})
				}, 2000)
			},
			// 选择地址
			openLocation() {
				var that = this;
				uni.chooseLocation({
					success: function(res) {
						that.address = res.address;
						that.signInfo.address = res.address;
						// 这里是有问题的 .返回的 res 中有经纬度，地址名  如果使用这个经纬度 就会存在问题，（当前位置和公司位置重合），所以不建议使用这个经纬度。
						var s = pointInsideCircle([that.latitude, that.longitude], [that.circles[0].latitude, that.circles[0].longitude],
							that.r / 10000);
						that.is = s;
					}
				});
			},
		},
	}
</script>

<style>
	.map {
		width: 100%;
		height: 260px;
	}

	.uni-list-cell-left {
		padding: 0 30upx;
	}

	.text-desc {
		display: flex;
		justify-content: space-between;
		padding: 10upx 20upx
	}

	.colorRed {
		color: red;
	}

	.colorGreen {
		color: #32CD32;
	}

	.colorYellow {
		color: yellow;
	}

	.colorBlue {
		color: #007aff;
	}

	.bgBlue {
		background-color: #007aff;
	}

	.bgGreen {
		background-color: #32CD32;
	}

	.bgAsh {
		background-color: #C8C7CC;
	}

	.uni-timeline {
		padding: 30upx 20upx;
	}

	.uni-timeline-item-content-t {
		font-weight: bold;
	}

	.desc-pad {
		padding: 0 0upx
	}

	.desc-pad .bz {
		color: rgb(0, 122, 255);
	}

	.desc-pad .bz .icon {
		color: rgb(0, 122, 255)
	}

	.uni-timeline-last-item .uni-timeline-item-divider {
		background: #bbb;
	}

	.CBlue {
		background-color: #007aff;
		box-shadow: 0 5px 5px #007aff;
	}

	.CGreen {
		background-color: #32CD32;
		box-shadow: 0 5px 5px #32CD32;
	}

	.CAsh {
		background-color: #C8C7CC;
		box-shadow: 0 5px 5px #C8C7CC;
	}

	.module {
		overflow: hidden;
		margin: 20upx auto;
		width: 320upx;
		height: 320upx;
		border-radius: 50%;
		color: #fff;
		text-align: center;
	}

	.module .text {
		font-size: 25px;
		margin: 95upx auto 10upx;
	}

	.uni-timeline-item .uni-timeline-item-content {
		width: 100%;
		padding-right: 20upx;
	}

	.content-show {
		width: 100%
	}

	.sign-title {
		display: flex;
		justify-content: space-between;
		padding: 30upx 24upx;
		border-bottom: 1upx solid #333;
	}

	.sign-title .portrait {
		width: 100upx;
		height: 100upx;
		line-height: 100upx;
		border-radius: 50%;
		background-color: #007AFF;
		color: #fff;
		font-size: 28upx;
		text-align: center;
	}

	.sign-title .sign-title-l {
		display: flex;
	}

	.sign-title .sign-title-l .text {
		margin-left: 20upx;
	}

	.sign-title .sign-title-l .text .name {
		font-size: 32upx;
	}

	.sign-title .sign-title-l .text .gz {
		color: darkblue;
		display: inline-flex;
	}

	.sign-title .sign-title-l .text .gz text {
		display: inline-block;
	}

	.sign-title .sign-title-l .text .gz .t1 {
		overflow: hidden;
		/*超出部分隐藏*/
		text-overflow: ellipsis;
		/* 超出部分显示省略号 */
		white-space: nowrap;
		/*规定段落中的文本不进行换行 */
		width: 166upx;
		/*需要配合宽度来使用*/
	}

	.iswq {
		padding: 0px 12px;
		color: #99CC33;
		border: 1px solid #99CC33;
		width: 26px;
		height: 24px;
		border-radius: 4px;
		margin-left: 20upx;
		display: inline-block;
	}

	.desc-pad .last {
		margin-bottom: 80upx;
	}

	.relocation {
		color: #0000FF;
	}

	.uni-popup .content .text {
		color: #666666;
	}
</style>
