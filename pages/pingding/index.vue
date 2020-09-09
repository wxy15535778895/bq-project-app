<template>
	<view class="body" style="height: 105%;">
		<view class="typebox">
			<p class="choice" @tap="change(0)" :class="{btna:btnnum == 0}">沿线设施</p>
			<p class="choice" @tap="change(1)" :class="{btna:btnnum == 1}">路面检测</p>
			<p class="choice" @tap="change(2)" :class="{btna:btnnum == 2}">路基检查</p>
			<p class="choice" @tap="change(3)" :class="{btna:btnnum == 3}">构造物单</p>
		</view>
		<view class="list-1 surveyBox" :class="{dis:btnnum == 0}">
			<Yanxian ref="mainindex"></Yanxian>
		</view>
		<view class="list-1 surveyBox" :class="{dis:btnnum == 2}">
			<Luji ref="mainindex2"></Luji>
		</view>
		<view class="list-1 surveyBox" :class="{dis:btnnum == 1}">
			<Lumian ref="mainindex1"></Lumian>
		</view>
		<view class="list-1 surveyBox" :class="{dis:btnnum == 3}">
			<Gouzaowu ref="mainindex3"></Gouzaowu>
		</view>
	</view>
</template>

<script>
	import Luji from '../luji/index'
	import Lumian from '../lumian/index'
	import Yanxian from '../yanxian/index'
	import Gouzaowu from '../gouzaowu/index'
	import uniLoadMore from '../../pages/uni-load/uni-load-more.vue';
	var _self,
		currentPage = 1,
		timer = null;
	// 定义全局参数,控制数据加载
	export default {
		data() {
			return {
				btnnum: 0
			};
		},
		onShow() {
			//拿到showPoster缓存
			let showPoster = uni.getStorageSync("username")
			console.log(showPoster)
			if (showPoster) {
				console.log(showPoster)
				this.btnnum = showPoster
				if (showPoster == 0) {
					this.$refs.mainindex.childMethod1();
				}
				if (showPoster == 1) {
					this.$refs.mainindex1.childMethod1();
				}
				if (showPoster == 2) {
					this.$refs.mainindex2.childMethod1();
				}
				if (showPoster == 3) {
					this.$refs.mainindex3.childMethod1();
				}
			}
		},
		onReachBottom: function(str) {
			if (this.btnnum == 0) {
				this.$refs.mainindex.childMethod();
			}
			if (this.btnnum == 1) {
				this.$refs.mainindex1.childMethod();
			}
			if (this.btnnum == 2) {
				this.$refs.mainindex2.childMethod();
			}
			if (this.btnnum == 3) {
				this.$refs.mainindex3.childMethod();
			}
		},
		components: {
			Luji: Luji,
			Lumian: Lumian,
			Yanxian: Yanxian,
			Gouzaowu: Gouzaowu,
			uniLoadMore: uniLoadMore
		},
		methods: {
			change(e) {
				uni.setStorageSync("username", e)
				this.btnnum = e
				console.log(this.btnnum)
			}
		}
	}
</script>

<style>
	.body {
		width: 100%;
	}

	.typebox {
		display: flex;
		align-items: center;
		font-size: 14px;
	}

	.location {
		padding: 5px 10px;
		background: #41c7db;
		color: #fff;
		text-align: center;
		border-radius: 5px;
	}

	.typebox .type {
		padding: 8px 0;
		width: 50%;
		color: #ffffff;
		text-align: center;
	}

	table {
		border-right: none;
	}

	.choice {
		width: 100%;
		padding: 8px 0;
		text-align: center;
		/* background-color: #41c7db; */
		/* color: #ffffff; */
	}

	.surveyBox {
		display: none;
	}

	.btna {
		color: #ffffff;
		/* background: #00a0ff; */
		color: #0086FE;
	}

	.dis {
		display: block;
		display: flex;
	}
</style>
