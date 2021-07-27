<template>
	<view class="content">
		<view class="content">
			<aloys-tab :tabs="tabs" @change="onTabChange">
				<view slot="content0" class="xxx">
					<form>
						<view class="cu-form-group">
							<view class="title">编号</view>
							<input placeholder="请输入日志编号" disabled="true" v-model="form.number" name="input"></input>
						</view>
						<view class="cu-form-group">
							<view class="title">抄告单位</view>
							<input placeholder="请输入抄告单位" disabled="true" v-model="form.unit" name="input"></input>
						</view>
						<view class="cu-form-group">
							<view class="title">抄告日期</view>
							<input placeholder="请输入抄告日期" disabled="true"  v-model="form.time" name="input"></input>
						</view>
						<view class="cu-form-group">
							<view class="title">类别</view>
							<picker disabled="true" :value="index" :range="category">
								<view class="picker">
									{{index>-1?category[index]:form.lawType?form.lawType:'请选择类别'}}
								</view>
							</picker>
						</view>
						<view class="cu-form-group">
							<view class="title">重要程度</view>
							<picker disabled="true" :value="index1" :range="Grade">
								<view class="picker">
									{{index1>-1?Grade[index1]:form.level?form.level:'请选择重要程度'}}
								</view>
							</picker>
						</view>
						<view class="cu-form-group">
							<view class="title">违法类型</view>
							<picker  disabled="true" :value="index2" :range="type">
								<view class="picker">
									{{index2>-1?type[index2]:form.type?form.type:'请选择违法类型'}}
								</view>
							</picker>
						</view>
						<view class="cu-form-group align-start">
							<view class="title">基本事实</view>
							<textarea maxlength="-1" disabled="true" v-model="form.fact"
								placeholder="请输入基本事实"></textarea>
						</view>
						<view class="cu-form-group align-start">
							<view class="title">涉嫌违法行为</view>
							<textarea maxlength="-1" disabled="true" v-model="form.lawbehavior"
								placeholder="请输入涉嫌违法行为"></textarea>
						</view>			
						<view class="cu-form-group align-start">
							<view class="title">相关证据收集情况</view>
							<textarea maxlength="-1" disabled="true" v-model="form.evidence"
								placeholder="请输入相关证据收集情况"></textarea>
						</view>
						<view class="cu-form-group align-start">
							<view class="title">需协作事项</view>
							<textarea maxlength="-1" disabled="true" v-model="form.cooperate"
								placeholder="请输入需协作事项"></textarea>
						</view>			
						<view class="cu-form-group align-start">
							<view class="title">备注</view>
							<textarea maxlength="-1" disabled="true" v-model="form.bak"
								placeholder="请输入备注"></textarea>
						</view>
						<view class="cu-form-group">
							<view class="title">联系人电话</view>
							<input placeholder="请输入联系人电话" disabled="true" v-model="form.tell" name="input"></input>
						</view>
					</form>
				</view>
				<view slot="content1" class="xxx" style="background-color: white;">
					<uni-steps :options="list_process" direction="column" :active="2"></uni-steps>
				</view>
			</aloys-tab>
		</view>
	</view>
</template>

<script>
	import aloysTab from "@/components/aloys-tab/aloys-tab.vue"
	export default {
		data() {
			return {
				approvalStatus:"",
				checkbox: ['通过','驳回'],
				category:['公路','道路运输','海事','工程建设','其他'],//选择类别
				Grade:['一般案件','重大案件'],//重要程度
				type:['安全生产','环境保护','工程建设','其他'],//违法类型
				form: {
					id: "",
					number: "",
					unit:"",
					time: new Date().toISOString().slice(0, 10),
					type: "",
					level: "",
					departmentUser: "",
					lawType: "",
					fact: "",
					lawbehavior: "",
					evidence: "",
					cooperate: "",
					bak: "",
					userName: "",
					tell: '',
					status: "",
					opinion:"",
					approvalStatus:""
				},
				form1:{
					
				},
				index: -1,
				index1: -1,
				index2: -1,
				pickerArray: [],
				picker: [],
				multiArray: [],
				multi: [],
				imgList: [],
				saveType: '',
				imgListArray:[],
				list_process: [],
				tabs: [{
					title: '案件详情'
				}, {
					title: '流程日志'
				}]
			};
		},
		components: {
			aloysTab
		},
		onLoad(params) {
			console.log(params)
			console.log(JSON.parse(decodeURIComponent(params.id)))
			this.form=JSON.parse(decodeURIComponent(params.id)).enforce
			let data = {
				enforceId: JSON.parse(decodeURIComponent(params.id)).enforceId
			};
			let opts = {
				url: '/approveEnforce/listLog',
				method: 'post'
			};
			this.$http.httpRequest(opts, data).then(res => {
				console.log(res.data.data)
				res.data.data.forEach(ite => {
					if (ite.status == '1') {
						ite.status = '通过'
					} else {
						ite.status = '驳回'
					}
					let obj = {
						title: ite.sysUser.name,
						desc: ite.status + '-审批意见：' + ite.opinion
					}
					
					this.list_process.push(obj)
				})
			})

		},
		methods: {
			onTabChange(index) {
 
			}
		}
	}
</script>

<style>
	.content {
		position: absolute;
		height: 100%;
	}

/* 	.xxx {
		font-size: 42rpx;
		font-weight: bold;
		padding: 100rpx 0;
		text-align: center;
	} */
</style>
