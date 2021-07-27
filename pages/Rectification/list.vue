<template>
	<view>
		<form>
			<view class="cu-form-group">
				<view class="title">施工单位</view>
				<input placeholder="请输入施工单位" v-model="form.unit" name="input"></input>
			</view>
			<view class="cu-form-group ">
				<view class="title">监理单位</view>
				<input placeholder="请输入监理单位" v-model="form.bak5" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">日期选择</view>
				<picker mode="date" :value="form.time" start="2015-09-01" end="2022-09-01" @change="DateChange">
					<view class="picker">
						{{form.time}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">填写人</view>
				<input placeholder="请输入检查人" v-model="form.writtenPerson" name="input"></input>
			</view>
			<view class="cu-form-group align-start">
				<view class="title">整改回执内容</view>
				<textarea maxlength="-1" v-model="form.replyContent" placeholder="请输入整改回执内容"></textarea>
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
			<view class="cu-form-group align-start">
				<view class="title">监理回执意见</view>
				<textarea maxlength="-1" v-model="form.opinionContent" disabled="true" placeholder="请输入生成情况记录"></textarea>
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
					unit: '',
					privilegeId: '',
					type: '请选择检查类型',
					time: new Date().toISOString().slice(0, 10),
					site: '',
					writtenPerson: '',
					weather: '',
					issue: '',
					way: '',
					replyContent: '', //整改回执内容
					bak1: '', //附件
					bak2: '', //事由
					bak3: '', //整改措施
					bak4: '', //编号
					bak5: '', //监理单位
					role: [],
				},
				typeList: ['抽查', '日常巡查', '监理指令'],
				index: -1,
				index1: -1,
				pickerArray: [],
				picker: [],
				multiArray: [],
				multi: [],
				imgList: [],
				saveType: '',
				imgListArray: [],
				checkbox: [],
			};
		},
		onLoad(params) {
			//项目名称
			let opts = {
				url: '/privilege/listAll',
				method: 'post'
			};
			this.$http.httpRequest(opts, {
				inYear: ""
			}).then(res => {
				console.log(res)
				res.data.data.forEach(item => {
					console.log(item)
					this.checkbox.push({
						'name': item.name,
						'value': item.id,
						'checked': false
					})
				})
			})
			console.log(params)
			if (JSON.stringify(params) !== '{}') {
				this.form.id = params.id
				console.log('编辑')
				this.saveType = 'edit'
				let data = {
					id: params.id
				};
				let opts = {
					url: '/inspection/find',
					method: 'post'
				};
				this.$http.httpRequest(opts, data).then(res => {
					console.log(res)
					this.form = res.data.data
					if(this.form.type=='监理指令'){
						this.index=2
						}
					if(this.form.role[0]==""){
						this.form.role=[]
					}
					this.checkbox.forEach(item => {
						this.form.role.forEach(ite => {
							if (item.value == ite) {
								item.checked = true
							}
						})
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
				res.data.data.forEach(item => {
					this.picker.push(item.name)
				})
			})
		},
		methods: {
			save() {
				if (this.saveType == 'add') {
					let opts = {
						url: '/inspection/add',
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
						url: '/inspection/edit',
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
				this.form.type = this.typeList[this.index]
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
				console.log(this.form.role)
				if(this.form.role==[""]){
					this.form.role=[]
				}
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
				this.checkbox.forEach(item => {
					if (item.checked == true) {
						this.form.role.push(item.value)
					} else {
						console.log('去除')
						console.log(item)
                        var index=this.form.role.indexOf(item.value)
						this.form.role.splice(index, 1);
					}
				})
				console.log(this.form.role)
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
								model: "Inspection"
							},
							success: function(uploadFileRes) {
								console.log(uploadFileRes.data);
								console.log(JSON.parse(uploadFileRes.data))
								_this.imgList = [..._this.imgList, 'http://119.27.171.77:8099/' +
									JSON.parse(uploadFileRes.data).filePath
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
