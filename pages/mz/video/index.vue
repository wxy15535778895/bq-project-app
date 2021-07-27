<template>
	<view class="content">
		<aloys-tab :tabs="tabs" @change="onTabChange">
			<view slot="content0" class="xxx">
				<ul class='videoList' v-if="index==0">
					<li v-for="(item, index) in currentVideoList" :key="index">
						<iframe :src="item.url + accessToken" allowfullscreen="true" webkitallowfullscreen="true"
							mozallowfullscreen="true" frameborder="0" width="100%" height="300px" scrolling="no">
							<p>你的浏览器不支持iframe标签</p>
						</iframe>
					</li>
				</ul>
			</view>
			<view slot="content1" class="xxx">
				<ul class='videoList' v-if="index==1">
					<li v-for="(item, index) in currentVideoList1" :key="index">
						<iframe :src="item.url + accessToken1" allowfullscreen="true" webkitallowfullscreen="true"
							mozallowfullscreen="true" frameborder="0" width="100%" height="300px" scrolling="no">
							<p>你的浏览器不支持iframe标签</p>
						</iframe>
					</li>
				</ul>
			</view>
			<view slot="content2" class="xxx">
				安航公交
			</view>
			<view slot="content3" class="xxx">
				<ul class='videoList' v-if="index==3">
					<li v-for="(item, index) in currentVideoList2" :key="index">
						<iframe :src="item.url + accessToken2" allowfullscreen="true" webkitallowfullscreen="true"
							mozallowfullscreen="true" frameborder="0" width="100%" height="300px" scrolling="no">
							<p>你的浏览器不支持iframe标签</p>
						</iframe>
					</li>
				</ul>
			</view>
		</aloys-tab>
	</view>
</template>

<script>
	import aloysTab from "@/components/aloys-tab/aloys-tab.vue"
	export default {
		data() {
			return {
				index:0,
				urlZhu: 'https://open.ys7.com/view/h5/cce91fecaa9e4df992a048d85ff83b2b',
				tabs: [{
					title: '指挥室'
				}, {
					title: '超限站'
				}, {
					title: '安航公交'
				}, {
					title: '汽运公司'
				}],
				accessToken: '',
				accessToken1: '',
				accessToken2: '',
				currentVideoList: [{
						url: 'https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/F44995314/1.hd.live&autoplay=1&accessToken=',
						name: '指挥室',
					},
					{
						url: 'https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/F44995314/2.hd.live&autoplay=1&accessToken=',
						name: '指挥室',
					}
				],
				currentVideoList1: [{
					url: 'https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/F63397288/1.hd.live&autoplay=1&accessToken=',
					name: '超限站',
				}, {
					url: 'https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/F63397288/2.hd.live&autoplay=1&accessToken=',
					name: '超限站',
				}, {
					url: 'https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/F63397288/3.hd.live&autoplay=1&accessToken=',
					name: '超限站',
				}, {
					url: 'https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/F63397288/4.hd.live&autoplay=1&accessToken=',
					name: '超限站',
				}, {
					url: 'https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/F63397288/5.hd.live&autoplay=1&accessToken=',
					name: '超限站',
				}, {
					url: 'https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/F63397288/6.hd.live&autoplay=1&accessToken=',
					name: '超限站',
				}, {
					url: 'https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/F63397288/7.hd.live&autoplay=1&accessToken=',
					name: '超限站',
				}, {
					url: 'https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/F63397288/8.hd.live&autoplay=1&accessToken=',
					name: '超限站',
				}, ],
				currentVideoList2: [{
					url: 'https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/620960502/1.hd.live&autoplay=1&accessToken=',
					name: '汽运公司',
				}, {
					url: 'https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/620960502/2.hd.live&autoplay=1&accessToken=',
					name: '汽运公司',
				}, {
					url: 'https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/620960502/3.hd.live&autoplay=1&accessToken=',
					name: '汽运公司',
				}, {
					url: 'https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/620960502/4.hd.live&autoplay=1&accessToken=',
					name: '汽运公司',
				}, {
					url: 'https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/620960502/5.hd.live&autoplay=1&accessToken=',
					name: '汽运公司',
				}, {
					url: 'https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/620960502/6.hd.live&autoplay=1&accessToken=',
					name: '汽运公司',
				}, {
					url: 'https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/620960502/7.hd.live&autoplay=1&accessToken=',
					name: '汽运公司',
				}, {
					url: 'https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/620960502/8.hd.live&autoplay=1&accessToken=',
					name: '汽运公司',
				},{
					url: 'https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/620960502/9.hd.live&autoplay=1&accessToken=',
					name: '汽运公司',
				}, {
					url: 'https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/620960502/10.hd.live&autoplay=1&accessToken=',
					name: '汽运公司',
				}, {
					url: 'https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/620960502/11.hd.live&autoplay=1&accessToken=',
					name: '汽运公司',
				}, {
					url: 'https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/620960502/12.hd.live&autoplay=1&accessToken=',
					name: '汽运公司',
				}, {
					url: 'https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/620960502/13.hd.live&autoplay=1&accessToken=',
					name: '汽运公司',
				}, {
					url: 'https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/620960502/14.hd.live&autoplay=1&accessToken=',
					name: '汽运公司',
				}, {
					url: 'https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/620960502/15.hd.live&autoplay=1&accessToken=',
					name: '汽运公司',
				}, {
					url: 'https://open.ys7.com/ezopen/h5/iframe?url=ezopen://open.ys7.com/620960502/16.hd.live&autoplay=1&accessToken=',
					name: '汽运公司',
				}, ],
				accessToken: ''
			};
		},
		components: {
			aloysTab
		},
		mounted() {
			this.getToken()
		},
		methods: {
			getToken() {
				uni.request({
					url: 'https://open.ys7.com/api/lapp/token/get?appKey=e660059bbf4a409e94eb912a5318b109&appSecret=a11e151c0aa8843dfc3f78d3dbf65f25', //仅为示例，并非真实接口地址。
					method: 'POST',
					success: (res) => {
						console.log(res)
						this.accessToken = res.data.data.accessToken
						console.log(this.accessToken, res.data.accessToken)

					},
					fail: (res) => {
						console.log(res);
					}
				});
				uni.request({
					url: 'https://open.ys7.com/api/lapp/token/get?appKey=20a65c0fc26a445bb79b1fb5072f0ef0&appSecret=449eabc04cc8568be29e44b512695bfd', //仅为示例，并非真实接口地址。
					method: 'POST',
					success: (res) => {
						console.log(res)
						this.accessToken1 = res.data.data.accessToken
						console.log(this.accessToken, res.data.accessToken)

					},
					fail: (res) => {
						console.log(res);
					}
				});
				uni.request({
					url: 'https://open.ys7.com/api/lapp/token/get?appKey=6de2630c26fc483a833114207a592baa&appSecret=fc7d47b92aff3e00897a821decb05a77', //仅为示例，并非真实接口地址。
					method: 'POST',
					success: (res) => {
						console.log(res)
						this.accessToken2 = res.data.data.accessToken
						console.log(this.accessToken, res.data.accessToken)

					},
					fail: (res) => {
						console.log(res);
					}
				});
			},
			onTabChange(index) {
				console.log(index)
				this.index=index
			}
		}
	}
</script>

<style>
	.content {
		position: absolute;
		height: 100%;
	}

	.xxx {
		font-size: 42rpx;
		font-weight: bold;
		padding: 50rpx 0;
		text-align: center;
	}

	.videoList {
		list-style: none;
		padding: 0;
	}
</style>
