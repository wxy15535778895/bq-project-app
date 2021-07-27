<template>
	<view class="content sign2">
		<view class="page-body">
			<view class="page-section page-section-gap">
				<!-- 				<map class="map" @callouttap @controltap="controltap" :scale="scale" :controls="controls"
					:latitude="latitude" :longitude="longitude" :circles="circles" :markers="covers" /> -->
				<map class="map" @callouttap :scale="scale" :latitude="latitude" :longitude="longitude"
					:markers="covers" />
			</view>
			<h1>车辆信息</h1>
			<ul class='list'>
				<li>驾驶员：{{details.drvName}}</li>
				<li>性别:男</li>
				<li>驾驶员电话：{{details.drvPhone}}</li>
				<li>车辆类型：{{details.carType}}</li>
				<li>车牌号：{{details.carName}}</li>
				<li>车辆状态：{{details.stateCn}}</li>
				<li>所属车队：{{details.teamName}}</li>
				<li>车身颜色：{{details.plateColor}}</li>
				<li style='width: 100%;'>车籍地：{{details.addr}}</li>
			</ul>
		</view>
	</view>
</template>

<script>
	import {
		handleSignClick,
		setSignInfo,
		addSignInfo,
		getSignInfo,
		delSignInfo,
		getInfo,
		key
	} from "../../index/index.js"
	import {
		formateDate,
		pointInsideCircle
	} from "@/common/util.js" //时间按格式化
	export default {
		data() {
			return {
				details:{},
				sessionId: '',
				obj: {},
				switchClock: false,
				Time: new Date().toISOString().slice(0, 10), //日期
				isTrue: null, //是否在考勤范围内
				signText: "", //打卡文字
				signstate: "", //打卡状态
				r: 80, //半径
				scale: "17", //缩放
				clickNum: 0, //点击重新获取位置信息次数
				latitude: "", //当前经度
				longitude: "", //当前维度
				accuracy: "",
				address: "我的位置", //公司位置-名称	
				time: formateDate(new Date(), 'h:min:s'), //当前时分秒
				signInfo: {
					mode: "",
					latitude: "",
					longitude: "",
					address: "",
					time: "",
					remarks: ""
				}, //打卡信息 （模式，经纬度，地址，时间 备注）
				covers: [
					// 公司点信息
					// {
					// 	id: 0,
					// 	callout: {
					// 		content: "西安巨龙软件信息技术有限公司",
					// 		display: "ALWAYS",
					// 	},
					// 	latitude: 34.208122,
					// 	longitude: 108.908189,
					// 	iconPath: '../../static/images/location.png'
					// },
				],
				circles: [
					// 公司圆信息
					{
						latitude: 34.208122,
						longitude: 108.908189,
						radius: 80,
						strokeWidth: 1,
						fillColor: "#7fff0099"
					},
				],
				controls: [
					// 控件
					// {
					// 	id: 0,
					// 	position: {
					// 		left: 300,
					// 		top: 300,
					// 		width: 32,
					// 		height: 32
					// 	},
					// 	iconPath: "../../static/images/resetlo.png",
					// 	clickable: true
					// },
				],
			}
		},
		onLoad(params) {
			let that = this
			console.log(JSON.parse(decodeURIComponent(params.id)))
			that.obj = JSON.parse(decodeURIComponent(params.id))
			console.log(that.obj)
			if (that.obj.bak1) {
				that.obj.teamId = that.obj.bak1
				that.obj.carId = ""
			} else {
				that.obj.teamId = ""
			}
			if (!that.obj.bak2) {
				uni.request({
					url: 'http://1.194.233.153:9999/gps-web/api/login.jsp?password=0192023a7bbd73250516f069df18b500&userId=mzdsj&loginType=user&loginWay=interface&loginLang=zh_CN', //仅为示例，并非真实接口地址。
					success: (res) => {
						console.log(res);
						that.sessionId = res.data.sessionId
						console.log(that.sessionId)
						console.log(that.obj.teamId,that.obj.carId,that.sessionId)
						uni.request({
							url: 'http://1.194.233.153:9999/gps-web/api/get_gps_r.jsp?teamId=' + that.obj.teamId + '&carIds=' + that.obj.carId + '&simple=false&userId=mzdsj&loginType=user&loginWay=interface&loginLang=zh_CN&appDevId=&appId=android&sessionId=' + that.sessionId + '', //仅为示例，并非真实接口地址。
							success: (res) => {
								console.log(res.data);
								that.details=res.data.list[0]
								that.covers[0] = {
										id: 0,
										// callout: {
										// 	content: "西安巨龙软件信息技术有限公司",
										// 	display: "ALWAYS",
										// },
										latitude: res.data.list[0].blat,
										longitude: res.data.list[0].blng,
										iconPath: '../../static/images/weizhi.png'
								}
								that.latitude = res.data.list[0].blat;
								that.longitude =res.data.list[0].blng;
								console.log(that.covers)
							},
							fail: (res) => {
								console.log(res);
							}
						});
					},
					fail: (res) => {
						console.log(res);
					}
				});
			}else{
				uni.request({
					url: 'http://116.255.146.19:9999/gps-web/api/login.jsp?password=48c71c07b6e85b9f2646ffe57f1e0729&userId=0391mzdj&loginType=user&loginWay=interface&loginLang=zh_CN',//仅为示例，并非真实接口地址。
					success: (res) => {
						that.sessionId = res.data.sessionId
						uni.request({
							url:  'http://116.255.146.19:9999/gps-web/api/get_gps_r.jsp?teamId=' + that.obj.teamId + '&carIds=' + that.obj.carId + '&simple=false&userId=0391mzdj&loginType=user&loginWay=interface&loginLang=zh_CN&appDevId=&appId=android&sessionId=' + that.sessionId + '', //仅为示例，并非真实接口地址。
							success: (res) => {
								console.log(res.data.list[0]);
								that.details=res.data.list[0]
								that.covers[0] = {
										id: 0,
										// callout: {
										// 	content: "西安巨龙软件信息技术有限公司",
										// 	display: "ALWAYS",
										// },
										latitude: res.data.list[0].blat,
										longitude: res.data.list[0].blng,
										iconPath: '../../static/images/weizhi.png'
								}
								that.latitude = res.data.list[0].blat;
								that.longitude =res.data.list[0].blng;
								console.log(that.covers)
							},
							fail: (res) => {
								console.log(res);
							}
						});
					},
					fail: (res) => {
						console.log(res);
					}
				});
			}
			// this.currentUser = uni.getStorageSync("currentUser")
			// this.circles[0].latitude = "108.9530"
			// this.circles[0].longitude ="34.2777"
			// this.covers[0].latitude = "108.9530"
			// this.covers[0].longitude = "34.2777"
			// console.log(this.circles[0].latitude,this.circles[0].longitude)
			this.getLocation()
		},

		methods: {
			// 获取当前位置
			getLocation() {
				var that = this;
				uni.getLocation({
					type: 'gcj02', //返回可以用于uni.openLocation的经纬度
					success(res) {
						console.log(res)
						uni.hideLoading();
						that.accuracy = res.accuracy;
						// that.latitude = res.latitude;
						// that.longitude = res.longitude;
						that.scale = 13;
						// console.log(res.latitude,"---",res.longitude)f
						// that.covers[1] = {
						// 	id: 1,
						// 	latitude: res.latitude,
						// 	longitude: res.longitude,
						// 	iconPath: '../../static/images/weizhi.png'
						// }
					},
					fail(err) {
						alert(err)
						uni.hideLoading()
						that.signText = "请检查位置信息";
						uni.showToast({
							title: "请检查位置信息状态！",
							icon: "none",
							mask: true,
							duration: 3000
						})
					}
				});
			},
		}
	}
</script>

<style>
	.list{
	   list-style: none; 
	       width: 100%;
		   padding: 0;
		   font-size: 14px;
	}
	.list li{
		float: left;
		width: 50%;
	}
	uni-page-body {
		height: 100%;
		overflow: hidden;
		width: 100%
	}

	.sign2 {
		width: 100%;
		height: 100%;
	}

	/* #ifdef APP-PLUS */
	.sign2 {
		height: 100vh;
		overflow: hidden;
	}

	/* #endif */
	/* #ifdef MP-WEIXIN */
	.sign2 {
		height: 100vh;
		overflow: hidden;
	}

	/* #endif */
	.map {
		width: 100%;
		height: 350px;
	}

	.colorGreen {
		color: #32CD32;
	}

	.colorBlue {
		color: #007aff
	}

	.colorRed {
		color: red
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

	.inputV {
		padding: 20upx
	}

	.inputV .t {
		font-size: 36upx
	}

	.inputV .text {
		border-bottom: 1px solid #000;
		width: 100%;
		color: #666;
	}
</style>
