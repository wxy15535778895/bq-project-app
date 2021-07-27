<template>
	<view>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">编号</view>
				<input placeholder="请输入日志编号" v-model="form.number" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">抄告单位</view>
				<input placeholder="请输入抄告单位" v-model="form.unit" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">抄告日期</view>
				<input placeholder="请输入抄告日期"  v-model="form.time" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">类别</view>
				<picker @change="categoryChange" :value="index" :range="category">
					<view class="picker">
						{{index>-1?category[index]:form.lawType?form.lawType:'请选择类别'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">重要程度</view>
				<picker @change="GradeChange" :value="index1" :range="Grade">
					<view class="picker">
						{{index1>-1?Grade[index1]:form.level?form.level:'请选择重要程度'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">违法类型</view>
				<picker @change="typeChange" :value="index2" :range="type">
					<view class="picker">
						{{index2>-1?type[index2]:form.type?form.type:'请选择违法类型'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group align-start">
				<view class="title">基本事实</view>
				<textarea maxlength="-1" v-model="form.fact"
					placeholder="请输入基本事实"></textarea>
			</view>
			<view class="cu-form-group align-start">
				<view class="title">涉嫌违法行为</view>
				<textarea maxlength="-1" v-model="form.lawbehavior"
					placeholder="请输入涉嫌违法行为"></textarea>
			</view>			
			<view class="cu-form-group align-start">
				<view class="title">相关证据收集情况</view>
				<textarea maxlength="-1" v-model="form.evidence"
					placeholder="请输入相关证据收集情况"></textarea>
			</view>
			<view class="cu-form-group align-start">
				<view class="title">需协作事项</view>
				<textarea maxlength="-1" v-model="form.cooperate"
					placeholder="请输入需协作事项"></textarea>
			</view>			
			<view class="cu-form-group align-start">
				<view class="title">备注</view>
				<textarea maxlength="-1" v-model="form.bak"
					placeholder="请输入备注"></textarea>
			</view>
			<view class="cu-form-group">
				<view class="title">联系人电话</view>
				<input placeholder="请输入联系人电话" v-model="form.tell" name="input"></input>
			</view>
			<radio-group class="block" @change="RadioChange">
				<view class="cu-form-group">
					<view class="title">通过</view>
					<radio :class="approvalStatus=='0'?'checked':''" :checked="approvalStatus=='0'?true:false" value="0"></radio>
				</view>
				<view class="cu-form-group">
					<view class="title">驳回</view>
					<radio :class="approvalStatus=='1'?'checked':''" :checked="approvalStatus=='1'?true:false" value="1"></radio>
				</view>
			</radio-group>
			<view class="cu-form-group align-start">
				<view class="title">审批意见</view>
				<textarea maxlength="-1" v-model="form1.opinion"
					placeholder="请输入审批意见"></textarea>
			</view>
<!-- 			<view class="cu-bar bg-white margin-top">
				<view class="action" style="height: 50px;">
					图片上传
				</view>
				<view class="action" style="height: 50px;">
					{{imgList.length}}/4
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage"
						:data-url="imgList[index]">
						<image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg(index)" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view> -->
			<view class="submit" @click="save">
				提交
			</view>
		</form>
	</view>
</template>

<script>
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
				imgListArray:[]
			};
		},
		onLoad(params) {
			if (JSON.stringify(params) !== '{}') {
				this.form.id = params.id
				console.log('编辑')
				this.saveType = 'edit'
							console.log(JSON.parse(decodeURIComponent(params.id)).enforce)
				this.form=JSON.parse(decodeURIComponent(params.id)).enforce
				this.form1=JSON.parse(decodeURIComponent(params.id))
			} else {
				this.saveType = 'add'
				//form.id
				let opts = {
					url: '/attachmentFile/getRelatedId',
					method: 'post'
				};
				this.$http.httpRequest(opts, {}).then(res => {
					this.form.id = res.data.data
				})
			}
		},
		mounted() {
			//项目名称
			let opts1 = {
				url: '/projectSglj/listAll',
				method: 'post'
			};
			this.$http.httpRequest(opts1, {
				inYear: ""
			}).then(res => {
				this.pickerArray = res.data.data
				res.data.data.forEach(item => {
					this.picker.push(item.name)
				})
			})
			//编号
			let opts2 = {
				url: '/roadWorkLog/getCode?code=SGC',
				method: 'post'
			};
			this.$http.httpRequest(opts2, {
			}).then(res => {
				console.log(res)
				this.form.bak2=res.data
			})
		},
		methods: {
			RadioChange(e){
				this.approvalStatus = e.detail.value	
			},
			save() {
				if(this.saveType=='add'){
				let opts = {
					url: '/enforce/add',
					method: 'post'
				};
				
				this.$http.httpRequest(opts, this.form).then(res => {
					console.log(res)
					uni.showToast({
						title: "添加成功！",
						icon: "none",
						duration: 1500
					});
					uni.navigateBack({})
				})	
				}else{
					let opts = {
						url: '/approveEnforce/edit',
						method: 'post'
					};
					this.form1.approvalStatus=this.approvalStatus
										console.log(this.form1)
					this.$http.httpRequest(opts, this.form1).then(res => {
						console.log(res)
						uni.showToast({
							title: "审批成功！",
							icon: "none",
							duration: 1500
						});
						uni.navigateBack({})
					})	
				}
			},
			categoryChange(e){
                this.index=[e.detail.value]
				this.form.lawType=this.category[e.detail.value]
			},
			GradeChange(e){
				this.index1=[e.detail.value]
				this.form.level=this.Grade[e.detail.value]
			},
			typeChange(e) {
				this.index2=[e.detail.value]
				this.form.type=this.type[e.detail.value]
			},
			//选择项目
			PickerChange(e) {
				this.index = e.detail.value
				this.form.projectId = this.pickerArray[this.index].id
				let opts = {
					url: '/segment/listAll',
					method: 'post'
				}
				this.$http.httpRequest(opts, {
					projectId: this.form.projectId
				}).then(res => {
					console.log(res)
					this.multiArray = res.data.data
					res.data.data.forEach(item => {
						this.multi.push(item.name)
					})
				})
			},
			PickerChange1(e) {
				this.index1 = e.detail.value
				this.form.segmentId = this.multiArray[this.index1].id
				console.log(this.form.segmentId)
			},
			DateChange(e) {
				this.form.workTime = e.detail.value
			},
			CheckboxChange(e) {
				var items = this.checkbox,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].value == values[j]) {
							items[i].checked = true;
							break
						}
					}
				}
			},
			ChooseImage() {
				const _this = this
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						const tempFilePaths = res.tempFilePaths;
						const uploadTask = uni.uploadFile({
							url: 'http://119.27.171.77:8099/attachmentFile/uploadAttachment',
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								relatedId: _this.form.id,
								type: "",
								model: "patrolPicture"
							},
							success: function(uploadFileRes) {
								console.log(uploadFileRes.data);
								console.log(JSON.parse(uploadFileRes.data))
								// _this.imgList = ['http://119.27.171.77:8099/dist/'+JSON.parse(uploadFileRes.data).data.filePath]
								_this.imgList = [..._this.imgList, 'http://119.27.171.77:8099/dist/'+JSON.parse(uploadFileRes.data).data.filePath
								]
								console.log(_this.imgList)
							},
							error: function(err) {
								console.log(err)
							}
						});
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(index) {
				uni.showModal({
					title: '您好',
					content: '确定要删除这张照片吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						let opts = {
							url: '/attachmentFile/delete',
							method: 'post'
						}
						this.$http.httpRequest(opts, {
							id: this.imgListArray[index].id
						}).then(res => {
							this.imgList.splice(index,1)
						})
					}
				})
			},
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}

	.submit {
		padding: 5px 50px;
		color: #FFFFFF;
		display: inline-block;
		border-radius: 30px;
		background-color: #007AFF;
		margin-bottom: 86px;
		margin-top: 10px;
		left: 50%;
		position: absolute;
		transform: translate(-50%, 0);
	}
</style>
