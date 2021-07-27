<template>
	<view class="body">
		<view class="uni-padding-wrap">
			<view class="page-section swiper">

				<view class="page-section-spacing">
					<swiper class="swiper" indicator-dots="true" autoplay="true" interval="2500" duration="1000">
						<swiper-item v-for="(item , index) in homeSlide" :key="index">
							<image :src="item.img"></image>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<view class="neck">
<!-- 			<view class="cate-section">
				<view class="cate-item" style="width: 87px;" @tap="gotoLaw">
					<image src="../../static/images/technology.png"></image>
					<text>技术评定</text>
				</view>
			</view> -->
<!-- 			<view class="cate-section">
				<view class="cate-item" @tap="gotoLaw">
					<image src="../../static/images/gonglu.png"></image>
					<text>执法协作</text>
				</view>
			</view> -->
			<!-- 分类 -->
			<view class="cate-section">
<!-- 				<navigator open-type="switchTab" url="../pingding/index" v-if="obj.rankData.name!=='西延分公司'">
				<view class="cate-item" style="width: 87px;">
					<image src="../../static/images/technology.png"></image>
					<text>技术评定</text>
				</view>
				</navigator>
				<navigator open-type="switchTab" url="../<jiancha></jiancha>/index" v-if="obj.rankData.name!=='西延分公司'">
				<view class="cate-item" @tap="gotoInspect"  style="width: 87px;">
					<image src="../../static/images/Bridge.png"></image>
					<text>桥隧涵检查</text>
				</view>
				</navigator>
				<view class="cate-item" @tap="gotoPrevention" v-if="obj.rankData.name!=='西延分公司'">
					<image src="../../static/images/Bridge.png"></image>
					<text>安全双预防</text>
				</view>
				<view class="cate-item" @tap="gotoLunBo" v-if="obj.rankData.name!=='西延分公司'">
					<image src="../../static/images/Bridge.png"></image>
					<text>考勤打卡</text>
				</view>
				<view class="cate-item" @tap="gotoJournal" v-if="obj.rankData.name=='西延分公司'">
					<image src="../../static/images/jiguan.png"></image>
					<text>施工日志</text>
				</view>
				<view class="cate-item" @tap="gotoSupervisor" v-if="obj.rankData.name=='西延分公司'&&obj.privilege.name.includes('业主')||obj.privilege.name.includes('监理')">
					<image src="../../static/images/jiguan.png"></image>
					<text>监理日志</text>
				</view>
				<view class="cate-item" @tap="gosecurity" v-if="obj.rankData.name=='西延分公司'">
					<image src="../../static/images/gongzuo.png"></image>
					<text>安全管理</text>
				</view>
				<view class="cate-item" @tap="gotoInspection" v-if="obj.rankData.name=='西延分公司'">
					<image src="../../static/images/daolu.png"></image>
					<text>现场巡查</text>
				</view>
				<view class="cate-item" @tap="goRectification" v-if="obj.rankData.name=='西延分公司'&&obj.privilege.name.includes('业主')">
					<image src="../../static/images/gonglu.png"></image>
					<text>施工整改</text>
				</view> -->
				<view class="cate-item" @tap="gotoLaw">
					<image src="../../static/images/gonglu.png"></image>
					<text>执法协作</text>
				</view>
				<view class="cate-item" @tap="gotovehicle">
					<image src="../../static/images/gongzuo.png"></image>
					<text>车辆信息</text>
				</view>
				<view class="cate-item" @tap="gotovideo">
					<image src="../../static/images/daolu.png"></image>
					<text>视频监控</text>
				</view>
			</view>
<!-- 			<view class="cate-section">
				<view class="cate-item" @tap="gotoInstructions" v-if="obj&&obj.rankData.name=='西延分公司'&&obj.privilege.name.includes('业主')||obj.privilege.name.includes('监理')">
					<image src="../../static/images/gonglu.png"></image>
					<text>监理指令</text>
				</view>
				<view class="cate-item" @tap="goRectification" v-if="obj&&obj.rankData.name=='西延分公司'&&obj.privilege.name.includes('业主')||obj.privilege.name.includes('监理')">
					<image src="../../static/images/gonglu.png"></image>
					<text>施工整改</text>
				</view>
				<view class="cate-item" @tap="goRectification" v-if="obj&&obj.rankData.name=='西延分公司'">
				</view>
				<view class="cate-item" @tap="goRectification" v-if="obj&&obj.rankData.name=='西延分公司'">
				</view>
				<view class="cate-item" @tap="goRectification" v-if="obj&&obj.rankData.name=='西延分公司'&&obj.privilege.name.includes('施工')">
				</view>
			</view> -->
		</view>
<!-- 		<view class="inspect">
			<view class="head">
				<p class="p1">桥隧涵检查</p>
				<p class="p2">
					<navigator open-type="switchTab" url="../jiancha/index">查看更多&nbsp></navigator>
				</p>
			</view>
			<view class="before-item">
				<view class="item-left">
					<image class="item-left" src="../../static/images/highway.png" />
				</view>
				<view class="item-right">
					<view class="right-title" style="font-weight: bold;">高新区 科技路</view>
					<view class="right-desc" style="margin-top: 10px;">
						K20+K30+K15
					</view>
					<view class="right-eyes">
						<image class="icon-eyes"
							src="https://assets.dxycdn.com/gitrepo/gsk-tooth/images/index/icon-eyes-@2x.png" />
						<view class="eyes-num">1</view>
						<view class="eyes-time">2019-10-25 10:35:23</view>
					</view>
				</view>
			</view>
		</view> -->
<!-- 		<view class="image">
			<image src="../../static/images/curing.png" mode=""></image>
		</view>
		<view class="end">
			<view class="head">
				<p class="p1">公路技术评定</p>
				<p class="p2">
					<navigator open-type="switchTab" url="../pingding/index">查看更多&nbsp></navigator>
				</p>
			</view>
			<view class="end_t">
				<view class="end1">
					<p>高新区&nbsp科技路&nbsp道路与部分桥梁...</p>
				</view>
				<view class="end2">
					<view>
						完好
					</view>
				</view>
			</view>
						<view class="end_s">
				<view class="admin">
					<image src="../../static/images/admin.png" mode=""></image>
					<p>ADMIN</p>
				</view>
				<view class="time">
					<p>06-30 20:00</p>
				</view>
			</view>
			<view class="end_s">
				<view class="admin">
					<image src="../../static/images/admin.png" mode=""></image>
					<p>ADMIN</p> 
				</view>
				<view class="time">
					<p>06-30 20:00</p>
				</view>
			</view>
			<view class="end_s">
				<view class="admin">
					<image src="../../static/images/admin.png" mode=""></image>
					<p>ADMIN</p>
				</view>
				<view class="time">
					<p>06-30 20:00</p>
				</view>
			</view>

		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				obj:null,
				homeSlide: [{
						img: '/static/images/banner1.png'
					},
					{
						img: '/static/images/banner2.png'
					},
					{
						img: '/static/images/banner3.png'
					},
				],
				iDays: 0,
				type: '',
				cylinderEmpty: ''
			}
		},
		mounted() {
			// this.getvehicle()
			this.obj = uni.getStorageSync("currentUser")
			console.log(this.obj)
			uni.request({
				url: 'http://wthrcdn.etouch.cn/weather_mini?city=西安',
				method: 'GET',
				success: res => {
					console.log(res.data.data.forecast[0]);
					this.type = res.data.data.forecast[0].type
					this.temperature = res.data.data.forecast[0].high.slice(3)
					console.log(this.temperature)
					let weather = {
						type: this.type,
						wendu: this.temperature
					}
					uni.setStorageSync('weather', weather);
				},
				fail: () => {
					this.openmsg("警告", "天气接口获取失败")
				},
				complete: () => {}
			});
		},
		methods: {
			gotovideo(){
								console.log('3333')
				uni.navigateTo({
					url: "../mz/video/index"
				})
				},
			//车辆信息
			gotovehicle(){
				uni.navigateTo({
					url: "../mz/jiancha/index"
				})
				},
			gotoLaw(){
				uni.navigateTo({
					url: "../mz/approval/index"
				})
			},
			gotoLunBo() {
				uni.navigateTo({
					url: "../index/index"
                })
			},
			gotoPrevention() {
				uni.navigateTo({
					url: "../prevention/index"
				})
			},
			gotoTechnology() {
				console.log('111')
				uni.navigateTo({
					url: "../pingding/index"
				})
			},
			//安全性检查
			gotoInspect() {
				uni.navigateTo({
					url: "../jiancha/index"
				})
			},
			gotoJournal() {
				uni.navigateTo({
					url: "../Journal/index"
                })
			},
			gotoSupervisor() {
				uni.navigateTo({
					url: "../supervisor/index"
			    })
			},
			gotoInspection() {
				uni.navigateTo({
					url: "../Inspection/index"

				})
			},
			gotoInstructions(){
				uni.navigateTo({
					url: "../Instructions/index"
				
				})
				},
			gosecurity(){
				uni.navigateTo({
					url: "../security/index"
					})
			},
			goRectification(){
				uni.navigateTo({
					url: "../Rectification/index"
					})
			},
			onNavigationBarButtonTap: function(e) {
				var _this = this;
				uni.scanCode({
					onlyFromCamera: true, //为true只允许相机扫码，不加允许相册扫码
					success: function(res) {
						console.log(res.result)
						if (res.result == 'http://119.27.171.77:8080/hh') {
							console.log('111')
							uni.navigateTo({
								url: "../image/image",
							})
						} else if (res.result == 'https://www.cnblogs.com/jiguiyan/p/12446033.html') {
							uni.navigateTo({
								url: "../image1/image",
							})
						} else {
							void plus.runtime.openWeb(res.result, function() {

							});
						}
					},
					fail: function(err) {
						console.log('扫码失败', err)
					}
				})
			},
		}
	}
</script>

<style lang="less">
	.swiper {
		width: 100%; //必须设置高度
		height: 300upx;

		/deep/.uni-swiper-wrapper {
			height: 115% !important;
		}

		/deep/.uni-swiper-dots-horizontal {
			bottom: 52upx;
		}

		uni-image {
			width: 100%;
			height: 110%;
		}
	}


	.swiper-item img {
		width: 100%;
		height: 70%;
	}

	page {
		background-color: #f7f7f7;
	}


	.neck {
		width: 100%;
		height: 205px;
		top: 150px;
		background-color: #FFFFFF;
		position: absolute;
		border-top-right-radius: 50upx;
		border-top-left-radius: 50upx;
	}

	.search-ico,
	.search-ico-1 {
		width: 40upx;
		height: 40upx;
	}

	.search-text {
		font-size: 14px;
		background-color: #F2F3F7;
		height: 70upx;
		width: 520upx;
	}

	.search-block {
		display: flex;
		flex-direction: row;
		padding-left: 35upx;
		position: relative;
		top: 32upx;
	}

	.search-ico-wapper {
		background-color: #F2F3F7;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0upx 0upx 0upx 40upx;
		border-bottom-left-radius: 18px;
		border-top-left-radius: 18px;
	}

	.search-ico-wapper1 {
		background-color: #F2F3F7;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0upx 40upx 0upx 0upx;
		border-bottom-right-radius: 18px;
		border-top-right-radius: 18px;
	}

	.model {
		display: flex;
		height: 160rpx;
		margin-top: 42px;
		flex-direction: column;

		.model1 {
			height: 160rpx;
			width: 140rpx;

			image {
				width: 72%;
				height: 60%;
				margin-left: 15rpx;
			}

			p {
				color: #787C7F;
				font-size: 14px;
				text-align: center;
				margin-top: 5rpx;
			}
		}

		.model2 {
			height: 160rpx;
			width: 165rpx;
			margin-left: 80rpx;

			image {
				width: 60%;
				height: 60%;
				margin-left: 25rpx;
			}

			p {
				color: #787C7F;
				font-size: 14px;
				text-align: center;
				margin-top: 5rpx;
			}
		}
	}

	.inspect {
		width: 100%;
		height: 350rpx;
		top: 365px;
		background-color: #FFFFFF;
		position: absolute;

		.head {
			width: 90%;
			height: 30rpx;
			border-left: 3px solid #0086FE;
			margin: 0 auto;
			margin-top: 40rpx;
			display: flex;

			.p1 {
				font-size: 16px;
				font-weight: bold;
				line-height: 28rpx;
				padding-left: 20rpx;
			}

			.p2 {
				margin-left: auto;
				font-size: 15px;
				color: #0086FE;
				line-height: 28rpx;
			}
		}
	}

	.before-item {
		display: flex;
		margin-bottom: 32rpx;
		width: 91%;
		margin: 0 auto;
		margin-top: 40rpx;
	}

	.item-left,
	.logo-lession {
		width: 280rpx;
		height: 194rpx;
	}

	.item-right {
		width: 100%;
		height: 194rpx;
		position: relative;
		font-size: 24rpx;
		color: #7d8790;
		margin-left: 20rpx;
	}

	.right-title {
		font-size: 30rpx;
		color: #333333;
		max-height: 100rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.right-eyes {
		display: flex;
	}

	.icon-eyes {
		/* opacity: 0; */
		width: 32rpx;
		height: 26rpx;
		margin-top: 5rpx;
	}

	.right-eyes {
		position: absolute;
		bottom: 0;
	}

	.eyes-num {
		/* opacity: 0; */
		margin-left: 10rpx;
	}

	.eyes-time {
		position: absolute;
		width: 250rpx;
		left: 75px;
	}

	.image {
		width: 100%;
		height: 350rpx;
		position: absolute;
		top: 550px;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.end {
		width: 100%;
		top: 736px;
		background-color: #FFFFFF;
		position: absolute;
		padding-bottom: 110rpx;

		.head {
			width: 90%;
			height: 30rpx;
			border-left: 3px solid #0086FE;
			margin: 0 auto;
			margin-top: 40rpx;
			display: flex;

			.p1 {
				font-size: 16px;
				font-weight: bold;
				line-height: 28rpx;
				padding-left: 20rpx;
			}

			.p2 {
				margin-left: auto;
				font-size: 15px;
				color: #0086FE;
				line-height: 28rpx;
			}
		}

		.end_t {
			width: 90%;
			margin: 0 auto;
			margin-top: 40rpx;
			display: flex;

			.end1 {
				font-size: 17px;
				font-weight: bold;
			}

			.end2 {
				margin-left: auto;

				view {
					width: 100rpx;
					height: 50rpx;
					background-color: #FEF5D8;
					color: #FE9700;
					font-size: 13px;
					text-align: center;
					line-height: 50rpx;
					border-radius: 20upx;
				}
			}
		}

		.end_s {
			display: flex;
			width: 90%;
			margin: 0 auto;
			margin-top: 40rpx;

			.admin {
				font-size: 14px;
				display: flex;

				image {
					width: 40rpx;
					height: 40rpx;
				}

				p {
					line-height: 45rpx;
					padding-left: 15rpx;
				}
			}
		}

		.time {
			margin-left: auto;
			color: #979BA0;
			font-size: 14px;
		}
	}

	/* 分类 */
	.cate-section {
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
		padding: 30upx 22upx;
		// background: #fff;
		width: 100%;

		.cate-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 14upx;
			color: black;
			font-size: 14px;
			width: 25%;
			// width: 10%;
			// padding-right: 2%;
			// padding-left: 2%;
		}

		/* 原图标颜色太深,不想改图了,所以加了透明度 */
		image {
			width: 88upx;
			height: 88upx;
			margin-bottom: 14upx;
			border-radius: 50%;
			opacity: .7;
			box-shadow: 4upx 4upx 20upx rgba(55, 209, 255, 0.3);
		}
	}
</style>
