<template>
	<view>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">编号</view>
				<input placeholder="请输入日志编号" :disabled="saveType=='edit'" v-model="form.bak4" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">施工单位</view>
				<input placeholder="请输入施工单位" v-model="form.unit" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">检查类型</view>
				<picker @change="PickerChange" :value="index" :range="typeList">
					<view class="picker">
						{{index>-1?typeList[index]:form.type}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">检查地点</view>
				<input placeholder="请输入检查地点" v-model="form.site" name="input"></input>
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
				<view class="title">检查人</view>
				<input placeholder="请输入检查人" v-model="form.person" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">天气</view>
				<input placeholder="请输入天气" v-model="form.weather" name="input"></input>
			</view>
			<view class="cu-form-group" v-if="index==2">
				<view class="title">事由</view>
				<input placeholder="请输入事由" v-model="form.bak2" name="input"></input>
			</view>
			<view class="cu-form-group"  v-if="index==2">
				<view class="title">整改措施	</view>
				<input placeholder="请输入整改措施" name="input" v-model="form.bak3"></input>
			</view>
			<view class="cu-form-group"  v-if="index!==2">
				<view class="title">检查问题</view>
				<input placeholder="请输入检查问题" v-model="form.issue" name="input"></input>
			</view>
			<view class="cu-form-group"  v-if="index!==2">
				<view class="title">处理办法</view>
				<input placeholder="请输入记录人" name="input" v-model="form.way"></input>
			</view>
			<view class="cu-form-group align-start">
				<view class="title">备注</view>
				<textarea maxlength="-1" v-model="form.bak" placeholder="请输入生成情况记录"></textarea>
			</view>
			<radio-group class="block" @change="CheckboxChange">
				<view class="cu-form-group margin-top" v-for="(item,index) in checkbox" :key="index">
					<view class="title">{{item.name}}</view>
					<radio :class="form.signerPerson==item.value?'checked':''" :checked="form.signerPerson==item.value?true:false" :value="item.value"></radio>
				</view>
			</radio-group>
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
					unit: '',
					privilegeId: '',
					type: '请选择检查类型',
					time: new Date().toISOString().slice(0, 10),
					site: '',
					person: '',
					weather: '',
					issue: '',
					signerPerson:'',
					way: '',
					bak: '',
					unit:'',//施工单位
					bak1: '', //附件
					bak2: '', //事由
					bak3: '', //整改措施
					bak4: '', //编号
					role: [],
				},
				typeList: ['抽查', '日常巡查'],
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
			//编号
			let opts2 = {
				url: '/roadWorkLog/getCode?code=SGC',
				method: 'post'
			};
			this.$http.httpRequest(opts2, {
			}).then(res => {
				console.log(res)
				this.form.bak4=res.data
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
				this.form.time = e.detail.value
			},
			CheckboxChange(e) {
				this.form.signerPerson=e.detail.value
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
