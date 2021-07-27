<template>
	<view>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">类别</view>
				<input placeholder="请输入日志编号" v-model="form.type" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">项目名称</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:form.projectName}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">主题</view>
				<input placeholder="请输入主题" v-model="form.content" name="input"></input>
			</view>
			<view class="cu-form-group align-start">
				<view class="title">备注</view>
				<textarea maxlength="-1" v-model="form.remark" placeholder="请输入备注"></textarea>
			</view>
			<view class="cu-bar bg-white margin-top">
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
			</view>
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
				form: {
					bak2: "已购买",
					content: "",
					id: "",
					manageType: "",
					money: "",
					projectId: "",
					projectName:'请选择项目',
					receiver: "",
					remark: "",
					role: [],
					segmentId: "",
					type: "安全管理"
				},
				index: -1,
				index1: -1,
				pickerArray: [],
				picker: [],
				multiArray: [],
				multi: [],
				imgList: [],
				saveType: '',
				imgListArray: []
			};
		},
		onLoad(params) {
			console.log(params)
			if (JSON.stringify(params) !== '{}') {
				this.form.id = params.id
				console.log('编辑')
				this.saveType = 'edit'
				let data = {
					id: params.id
				};
				let opts = {
					url: '/documentManagement/findById',
					method: 'post'
				};
				this.$http.httpRequest(opts, data).then(res => {
					console.log(res)
					this.form = res.data.data
					this.pickerArray.forEach(ite=>{
						console.log(ite,this.form)
						if(ite.id==this.form.projectId){
							console.log(ite)
							this.form.projectName=ite.name
						}
					})
				})
				let opts1 = {
					url: '/attachmentFile/listAll',
					method: 'post'
				};
				let data1 = {
					relatedId: params.id
				};
				console.log(opts1, data1)
				this.$http.httpRequest(opts1, data1).then(res => {
					this.imgListArray = res.data.data
					res.data.data.forEach(item => {
						console.log(item.filePath)
						this.imgList.push('http://119.27.171.77:8099/dist/' + item.filePath)
						console.log(this.imgList)
					})
				})
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
				this.pickerArray.forEach(ite=>{
					console.log(ite,this.form)
					if(ite.id==this.form.projectId){
						console.log(ite)
						this.form.projectName=ite.name
					}
				})
				res.data.data.forEach(item => {
					this.picker.push(item.name)
				})
			})
		},
		methods: {
			save() {
				if (this.saveType == 'add') {
					let opts = {
						url: '/documentManagement/add',
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
				} else {
					let opts = {
						url: '/documentManagement/edit',
						method: 'post'
					};

					this.$http.httpRequest(opts, this.form).then(res => {
						console.log(res)
						uni.showToast({
							title: "编辑成功！",
							icon: "none",
							duration: 1500
						});
						uni.navigateBack({})
					})
				}
			},
			//选择项目
			PickerChange(e) {
				this.index = e.detail.value
				this.form.projectId = this.pickerArray[this.index].id
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
								model: "securityPicture"
							},
							success: function(uploadFileRes) {
								_this.imgList = [..._this.imgList, 'http://119.27.171.77:8099/dist/'+JSON.parse(uploadFileRes.data).data.filePath
								]
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
							this.imgList.splice(index, 1)
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
