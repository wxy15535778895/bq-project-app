<template>
	<view class="body" style="height: 105%;">
		<view class="typebox">
			<p class="choice" @tap="change(0)" :class="{btna:btnnum == 0}">桥梁检查</p>
			<p class="choice" @tap="change(1)" :class="{btna:btnnum == 1}">涵洞检查</p>
			<p class="choice" @tap="change(2)" :class="{btna:btnnum == 2}">隧道检查</p>
		</view>
		<view class="list-1 surveyBox" :class="{dis:btnnum == 2}">
			<Yanxian ref="mainindex2"></Yanxian>
		</view>
		<view class="list-1 surveyBox" :class="{dis:btnnum == 0}">
			<Luji ref="mainindex"></Luji>
		</view>
		<view class="list-1 surveyBox" :class="{dis:btnnum == 1}">
			<Lumian ref="mainindex1"></Lumian>
		</view>
	</view>
</template>

<script>
	import Luji from '../qiaoliang/index'
	import Lumian from '../handong/index'
	import Yanxian from '../suidao/index'
	export default {
		data() {
			return {
				btnnum: 1
			};
		},
		onShow() {
		        //拿到showPoster缓存
		    let	showPoster=uni.getStorageSync("username")
			console.log(showPoster)
		    if (showPoster) {
				console.log(showPoster)
			this.btnnum=showPoster
			if(showPoster==0){
						this.$refs.mainindex.childMethod();
			}
			if(showPoster==1){
				this.$refs.mainindex1.childMethod();	
			}
			if(showPoster==2){
								this.$refs.mainindex2.childMethod();	
			}
			if(showPoster==3){
						this.btnnum=2
			}
		  }
		},
		components: {
			Luji: Luji,
			Lumian: Lumian,
			Yanxian: Yanxian
		},
		methods: {
			change(e) {
				this.btnnum = e
				console.log(this.btnnum)
				uni.setStorageSync("username",this.btnnum)
			},
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
