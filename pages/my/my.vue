<template>
	<view class="body">
		<image class="image-bg" src="~@/static/images/background.png">
			<view class="head">
				<h4 v-if="obj.rankData">{{obj.rankData.name}}</h4>
				<p>上次登录时间 {{time}} 8：30</p>
			</view>
			<view class="neck">
				<view class="neck_s">
					<view class="border">
						<h3>关于我们</h3>
					</view>
					<p>Saas智慧养护云平台，由西安巨龙软件信息技术有限公司研发制作，多方结合各养护站点数据录入及道路巡查通采集的现场巡查问题上传反馈至系统，将公路养护的各类实时状态、道路病害等情况展现出来，通过平台就能进行各类查询和检索并以图、文、表的形式清晰直观展示，为决策者提供强有力的数据分析及决策依据。</p>
				</view>
				<view class="neck_f">
					<view class="image">
						<image src="~@/static/images/kefu.png" style="width:120%;height: 100%;"></image>
					</view>
					<view class="kefu">
						<p class="zhongxin">客服中心</p>
						<p class="phone" @click="callPhone('400-029-8505')">400-029-8505</p>
					</view>

				</view>
				<view class="neck_e" @click="toLogout">
					<text class="cell-tit">退出登录</text>
				</view>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				time: new Date().toISOString().slice(0, 10), //日期
				obj:null
			};
		},
		mounted() {
			this.obj = uni.getStorageSync("currentUser")
		},
		computed: {},
		methods: {
			// 拨打电话
			callPhone(tel) {
				console.log(tel)
				uni.makePhoneCall({
					phoneNumber: tel
				})
			},
			toLogout() {
				uni.showModal({
					content: '是否要退出登录',
					success: (res) => {
						if (res.confirm) {
							uni.request({
								header: {
									'content-Type': 'application/json'
								},
								url: "http://119.27.171.77:8099/user/logout", //仅为示例，并非真实接口地址。
								method: 'POST',
								data: {
								},
								success: (res) => {
									console.log(res)
									if (res.data.code == 1) {
										uni.showToast({
											title: "退出登录成功",
											icon: 'none',
											duration: 1500
										})
										setTimeout(() => {
											uni.reLaunch({
											        url: '/pages/login',
											     })
										}, 1500)
										uni.clearStorageSync();
									}
								}
							})
						}
					}
				})
			}

		}
	};
</script>

<style lang="less">
	body {
		/* 		position: relative;
		z-index: 0; */
	}

	.image-bg {
		position: absolute;
		z-index: -1;
		left: 0;
		right: 0;
		bottom: 0;
		right: 0;
		width: 100%;
		height: 100%;
	}

	.head {
		margin-left: 7%;
		padding-top: 90rpx;
		color: #FFFFFF;
	}

	.head p {
		font-size: 13px;
		padding-top: 27rpx;
	}

	.neck {
		.neck_o {
			width: 92%;
			height: 91rpx;
			margin: 0 auto;
			background: #FFFFFF;
			border-radius: 20upx;
			margin-top: 15%;
			line-height: 80rpx;
			font-size: 16px;

			p {
				text-align: center;
				color: #787C7F;

				span {
					color: #3D7DFC;
					font-size: 24px;
					font-weight: bold;
					padding: 0 14px;
				}
			}
		}

		.neck_t {
			width: 50%;
			height: 91rpx;
			background: #FFFFFF;
			border-radius: 20upx;
			margin-top: 30rpx;
			line-height: 80rpx;
			margin-left: 30rpx;
			font-size: 16px;

			p {
				text-align: center;
				color: #787C7F;

				span {
					color: #3D7DFC;
					font-size: 24px;
					font-weight: bold;
					padding: 0 9px;
				}
			}
		}

		.neck_s {
			width: 92%;
			height: auto;
			background: #FFFFFF;
			border-radius: 20upx;
			margin-top: 18%;
			line-height: 45rpx;
			margin-left: 30rpx;
			font-size: 12px;

			.border {
				margin-left: 13px;
				border-left: 3px solid #0086FE;
				height: 15px;
				position: relative;
				top: 12px;

				h3 {
					margin-left: 10px;
					line-height: 15px;
				}
			}

			p {
				text-align: center;
				color: #787C7F;
				margin-left: 10px;
				margin-right: 10px;
				line-height: 18px;
				margin-top: 20px;

				span {
					color: #3D7DFC;
					font-size: 24px;
					font-weight: bold;
					padding: 0 9px;
				}
			}
		}

		.neck_f {
			width: 92%;
			height: 170rpx;
			background: #FFFFFF;
			border-radius: 20upx;
			margin-top: 30rpx;
			line-height: 45rpx;
			margin-left: 30rpx;
			font-size: 12px;
			display: flex;

			.image {
				margin-left: 13px;
				height: 15px;
				position: relative;
				top: 12px;
				width: 120rpx;
				height: 120rpx;
			}

			.kefu {
				width: 200rpx;
				height: 80px;
				margin-left: 80rpx;

				.zhongxin {
					font-size: 16px;
					margin-top: 17px;
				}

				.phone {
					color: #66BDFF
				}
			}
		}

		.neck_e {
			width: 92%;
			height: 50px;
			border-radius: 20upx;
			margin: 0 auto;
			text-align: center;
			background: #FFFFFF;
			margin-top: 10px;
			line-height: 49px;
			color: #fa436a;
		}
	}
</style>
