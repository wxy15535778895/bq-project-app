<template>
	<view>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">编号</view>
				<input placeholder="请输入日志编号" v-model="form.bak2" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">监理机构</view>
				<input placeholder="请输入单位名称" v-model="form.supervisorUnit" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">填写日期</view>
				<picker mode="date" :value="form.workTime" start="2015-09-01" end="2022-09-01" @change="DateChange">
					<view class="picker">
						{{form.workTime}}
					</view>
				</picker>
			</view>
			<!-- 			<view class="cu-form-group">
				<view class="title">项目名称</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:form.projectName}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">合同标段</view>
				<picker @change="PickerChange1" :value="index1" :range="multi">
					<view class="picker">
						{{index1>-1?multi[index1]:form.segmentId}}
					</view>
				</picker>
			</view> -->
			<view class="cu-form-group">
				<view class="title">桩号</view>
				<input placeholder="请输入地点桩号" v-model="form.stake" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">审核人</view>
				<input placeholder="请输入审核人" v-model="form.approverPerson" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">天气</view>
				<input placeholder="请输入天气情况" v-model="form.weather" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">记录人</view>
				<input placeholder="请输入记录人" name="input" v-model="form.writePerson"></input>
			</view>
			<view class="cu-form-group align-start">
				<view class="title">主要施工情况</view>
				<textarea maxlength="-1" v-model="form.productionRecord" placeholder="请输入主要施工情况"></textarea>
			</view>
			<view class="cu-form-group align-start">
				<view class="title">监理主要工作</view>
				<textarea maxlength="-1" v-model="form.mainWork" placeholder="请输入监理主要工作"></textarea>
			</view>
			<view class="cu-form-group align-start">
				<view class="title">备注</view>
				<textarea maxlength="-1" v-model="form.safeRecord" placeholder="请输入备注"></textarea>
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
					id: '',
					approverPerson: '',
					mainWork: '',
					problemAndResult: '',
					productionRecord: '',
					projectId: '',
					rankDataId: '',
					remark: '',
					segmentId: '',
					stake: '',
					supervisorUnit: '',
					weather: '',
					workTime:  new Date().toISOString().slice(0, 10), //日期,
					writePerson: '',
					bak2: '', //检查单编号
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
					url: '/roadWorkLog/findById',
					method: 'post'
				};
				this.$http.httpRequest(opts, data).then(res => {
					console.log(res)
					this.form = res.data.data
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
				res.data.data.forEach(item => {
					this.picker.push(item.name)
				})
			})
			//编号
			let opts2 = {
				url: '/roadWorkLog/getCode?code=JLR',
				method: 'post'
			};
			this.$http.httpRequest(opts2, {
			}).then(res => {
				console.log(res)
				this.form.bak2=res.data
			})
		},
		methods: {
			save() {
				if (this.saveType == 'add') {
					let opts = {
						url: '/supervisorLog/add',
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
						url: '/supervisorLog/edit',
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
