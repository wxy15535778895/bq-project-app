<template>
	<view class="content">
		<view class="">
			<view class="list-1">
				<p><span style="margin: 0;" v-if="list.highData">{{list.highData.number}}</span><span style="margin: 0;" v-if="list.highData">{{list.highData.name}}</span><span style="margin: 0;" v-if="list.highData">{{list.roadData.name}}</span></p>
				<p class="location">白河管理所</p>
			</view>
			<view class="info">
				<p>起点桩号:</p>
				<view class="zhInput">
					<text>{{list.startStake}}</text>
				</view>
				<p style="margin-left: auto;">管理单位:</p>
				<view class="zhInput">
					<text>{{item.creator}}</text>
					<!-- <input class="zhNum" v-model="zh1" type="number" /> -->
				</view>
			</view>
		</view>
		<view class="infobox">
			<view class="list-1">
				<p style="display: flex;">单元长度:{{list.extent}}米</p>
				<p style="display: flex;">路面宽度:{{list.width}}米</p>
			</view>
			<view class="list-1">
				<p>调查人员:{{list.staff}}</p>
				<p style="color: #0062CC;">{{list.createTime}}</p>
			</view>
		</view>
		<view class="main">
			<view class="typebox">
				<p class="choice" >{{list.direction}}</p>
			</view>
			<!-- 显示区域 -->
			<!-- <view class="list" v-for="(item, index) in navList" :key="index" v-if="nowIndex == index">
				{{ item }}
			</view> -->
			
			<view>
				<uni-card title="" thumbnail="" extra="" note="" v-for="(item,index) in list.detailList">
					<view class="one">
						<view class="one1">{{item.damageType}}</view>
						<view class="one2">单位扣分：{{item.mark}} 单位:{{item.unit}}</view>
					</view>
					<view class="two">
						<view class="two1" :style="{'background':item.score<=10? '#5FB456': 10<item.score&&item.score<=40? '#FECC01' : 40<item.score? '#FF0100' : '#5FB456'}">{{item.degree}}</view>
						<view class="two2">累计损坏<span>{{item.total}}</span></view>
						<view class="two3">扣分<span>{{item.score}}</span></view>
					</view>
				</uni-card>
				<table>
					<tr>
						<td>检测得分</td>
						<td style="color: red;font-weight: bold;"><view class="two33" :style="{'background':list.totalScore>=90? '#5FB456':90>list.totalScore&&list.totalScore>=80? '#00CC00' : 80>list.totalScore&&list.totalScore>=70? '#FECC01' : 70>list.totalScore&&list.totalScore>=60? '#FF6600' : '#FF0100'}">{{list.totalScore>=90? '优':90>list.totalScore&&list.totalScore>=80? '良' : 80>list.totalScore&&list.totalScore>=70? '中' : 70>list.totalScore&&list.totalScore>=60? '次' : '差'}}</view>{{list.totalScore}}</td>
					</tr>
				</table>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				zh1: "",
				extent: "",
				width: "",
				typeList: ["上行线", "下行线"],
				navList:["内容1","内容2"],
				nowIndex: 0,
				list:{},
				item:{}
			}
		},
		watch:{
			list(){
				this.getListAll()
			}
		},
		onLoad(params) {
			 console.log(params)
			 const id=params.id
			 uni.request({
			 	header: {
			 		'content-Type': 'application/json'
			 	},
			 	url: "http://119.27.171.77:8077/bridgecSurvey/find", //仅为示例，并非真实接口地址。
			 	method: 'POST',
			 	data: {
			 		id
			 	},
			 	
			 	success: (res) => {
			 		console.log(res)
					this.list=res.data.data 
					console.log(this.list)
					this.list.detailList.forEach(res=>{
						console.log(res)
												res.total=Number(res.one) +
												Number(res.two) +
												Number(res.three) +
												Number(res.four) +
												Number(res.five) +
												Number(res.six) +
												Number(res.seven) +
												Number(res.eight) +
												Number(res.nine) +
												Number(res.ten)
												res.score=(res.total*res.mark).toFixed(2)
					})
			 
			 	}
			 });
		},
		methods: {
			selectType(i, v) {
				this.nowIndex = i;
			},
			getListAll(){
				uni.request({
					header: {
						'Content-Type': 'application/json'
					},
					url: "http://119.27.171.77:8077/roadData/listAll", //仅为示例，并非真实接口地址。
					method: 'POST',
					data: {},
					dataType: 'json',
					success: (res) => {
						// console.log(res)
						res.data.data.forEach(item => {
							console.log(item.id)
							console.log(this.list.roadDataId)
							
							if(item.id==this.list.roadDataId){
								console.log(item)
								this.item=item
							}
						})
					}
				});
			},
		}
	}
</script>

<style scoped>
	.content {
		font-size: 14px;
		background-color: #F5F5F5
	}

	.content>view:first-child {
		padding:10px 15px;
		border-bottom: 1px solid #CCCCCC;
		background-color: #f1f0ea;
	}

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
		box-sizing: border-box;
		margin-bottom: 15px
	}

	.info>view,
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
		color: #FFFFFF;
		text-align: center;
	}

	.choice {
		width: 100%;
		padding: 8px 0;
		text-align: center;
		background-color: #41c7db;
		color: #FFFFFF;
	}


	.zhInput {
		display: flex;
		align-items: center;
	}

	.zhNum {
		width: 3rem;
		border: 1px solid #ccc;
	}

	.widthValue,
	.lengthValue {
		width: 4rem;
		margin-left: 5px;
		border: 1px solid #ccc;
	}
	
	
	table{
		width: 100%;
		background: #becfcc;
		text-align: center;
		font-size: 14px;
		margin-top: 10px;
	}
	td{
		height: 38px;
		line-height: 38px;
		border: 1px solid #e5e5e5;
	}
	.grade{
		width: 25px;
		height: 25px;
		line-height: 25px;
		border-radius: 50%;
		color: #fff;
		background: green;
		float: left;
		margin-top: 6px;
	}
	.four{
		margin-top: 50px;
	}
	.four .two1{
		
		background: red;
	}
	.three{
		font-size: 12px;
		float: right;
		width: 70%;
		color: #999;
		padding-bottom: 2px;
		border-bottom: 1px dashed #999;
		height: 20px;
		line-height: 24px;
	}
	.three1{
		float: left;
	}
	.length{
		margin-right: 7px;
	}
	.two{
		width: 100%;
		height: 30px;
	}
	.two1{
		width: 30px;
		height: 30px;
		border-radius: 50%;
		font-size: 14px;
		color: #fff;
		line-height: 30px;
		text-align: center;
		margin: 0px 42px 0px 18px;
		float: left;
	}
	.two33{
		width: 30px;
		height: 30px;
		border-radius: 50%;
		font-size: 14px;
		color: #fff;
		line-height: 30px;
		text-align: center;
		margin-top: 3px;
		margin-left: 3px;
		float: left;
	}
	.two2{
		font-size: 14px;
		float: left;
		margin-top: 5px;
	}
	span{
		margin: 0px 38px 0px 10px;
	}
	.two3{
		font-size: 14px;
		float: left;
		margin-top: 5px;
	}
	.one{
		width: 100%;
		height: 30px;
	}
	.one1{
		width: 35%;
		font-size: 14px;
		float: left;
		color: #e9ae5a;
	}
	.one2{
		font-size: 12px;
		float: right;
		width: 65%;
		background: #e5e5e5;
		text-align: center;
		margin-top: 3px;
	}
	.uni-card{
		margin: 0px;
	}
</style>
