<template>
	<view class="body">
		<view class="content">
			<view class="mainInfo">
				<p class="btn-1">基础信息</p>
				<p>G7001十天高速白泉段</p>
			</view>
			<view class="gray">

			</view>
			<view class="list-1">
				<view>单位名称</view>
				<picker :value="index" @change.prevent.stop="getrankData" :range="rankData">
					<view ref="addRequestState" class="uni-input">{{form.companyName?form.companyName:rankData[index2]}}
						<view class="cu-item" v-for="(item,index) in cuIcon" :key="index" v-if="item.isShow">
							<text class="lg text-gray" :class="'cuIcon-' + item.name"></text>
						</view>
					</view>
				</picker>
			</view>
			<view class="list-1">
				<view>线路编号</view>
				<picker :value="index" @change.prevent.stop="getCouponSelected0" :range="roadDataList">
					<view ref="addRequestState" class="uni-input">{{form.roadName?form.roadName:roadDataList[index0]}}
						<view class="cu-item" v-for="(item,index) in cuIcon" :key="index" v-if="item.isShow">
							<text class="lg text-gray" :class="'cuIcon-' + item.name"></text>
						</view>
					</view>
				</picker>
			</view>
			<view class="list-1">
				<view>风险点名称</view>
				<input type="text" value="" v-model="form.name" class="dcinput" />
			</view>
			<!-- 			<view class="list-1">
				<view>巡查类型</view>
				<picker :value="index" @change.prevent.stop="getCouponSelected" :range="roadDataList0">
					<view ref="addRequestState" class="uni-input">{{form.type?form.type:roadDataList0[index]}}
						<view class="cu-item" v-for="(item,index) in cuIcon" :key="index" v-if="item.isShow">
							<text class="lg text-gray" :class="'cuIcon-' + item.name"></text>
						</view>
					</view>
				</picker>
			</view> -->
			<!-- 			<view class="list-1" v-if="isabnormal">
				<view>风险点</view>
				<picker :value="index" @change.prevent.stop="getCouponSelected3" :range="risk">
					<view ref="addRequestState" class="uni-input">{{form.riskName?form.riskName:risk[index3]}}
						<view class="cu-item" v-for="(item,index) in cuIcon" :key="index" v-if="item.isShow">
							<text class="lg text-gray" :class="'cuIcon-' + item.name"></text>
						</view>
					</view>
				</picker>
			</view> -->
			<view class="list-1">
				<view>风险等级</view>
				<picker :value="index" @change.prevent.stop="getDegree" :range="degreeArray">
					<view ref="addRequestState" class="uni-input">{{form.grade?form.grade=="0"?"轻微风险":form.grade=="1"?"中度风险":"重度风险":degreeArray[index5]}}
						<view class="cu-item" v-for="(item,index) in cuIcon" :key="index" v-if="item.isShow">
							<text class="lg text-gray" :class="'cuIcon-' + item.name"></text>
						</view>
					</view>
				</picker>
			</view>
			<view class="list-1">
				<view>管控周期(开始)： </view>
				<view class="uni-list-cell-db">
					<picker mode="date" :value="form.startTime" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{form.startTime}}</view>
					</picker>
				</view>
			</view>
			<view class="list-1">
				<view>管控周期(结束)： </view>
				<view class="uni-list-cell-db">
					<picker mode="date" :value="form.endTime" :start="startDate" :end="endDate" @change="bindDateChange1">
						<view class="uni-input">{{form.endTime}}</view>
					</picker>
				</view>
			</view>
			<view class="list-1">
				<view>巡查频率(天/次数)</view>
				<input type="text" value="" v-model="form.rate" class="dcinput" />
			</view>
			<view class="list-1">
				<view>负责人： </view>
				<input type="text" value="" v-model="form.principal" class="dcinput" />
			</view>
			<view class="list-1">
				<view>风险描述</view>
				<input type="text" value="" v-model="form.content" class="dcinput" />
			</view>
			<view class="list-1">
				<view>备注</view>
				<input type="text" value="" v-model="form.remark" class="dcinput" />
			</view>
			<!-- <view class="list-1">
				<view @click="img">现场照片上传 </view>
			</view> -->
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					图片上传
				</view>
				<view class="action">
					{{imgList.length}}/4
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="item">
						<image v-if="item" :src="item" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
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
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				uploadId: null,
				imgList: [],
				saveType: 'add',
				form: {
					id: "",
					road: "",
					name: '', //风险点名称
					type: '', //巡查类型
					riskId: '', //风险点
					startTime: new Date().toISOString().slice(0, 10),
					endTime: new Date().toISOString().slice(0, 10),
					principal: '', //巡查人员
					company: '', //单位名称
					rate: '', //巡查区域
					content: '', //巡查内容
					remark: '', //备注
					img: '', //图片
					exceptionType: '', //异常类型
					sourceType: '1', //数据来源
					grade: '', //风险管控
				},
				degreeArray: ['请选择', '轻微', '中度', '严重'],
				rankData: ['请选择'], //单位名称
				roadId: [], //单位名称id
				roadDataList: ['请选择'], //路线编号
				roadcodeId: [], //路线编号id
				roadDataList0: ['请选择', '日常', '专项'], //巡查类型
				roadType: ['0', '1'], //巡查结果
				risk: ['请选择'], //风险点
				riskIdarray: [], //风险点id
				abnormal: ['请选择', '危桥', '危险路段'], //异常类型
				index: 0, //选择巡查类型
				index0: 0, //选择线路编号
				index1: 0, //选择线路编号
				index2: 0,
				index3: 0,
				index4: 0,
				index5: 0,
				cuIcon: [{
					name: 'unfold',
					isShow: true
				}],
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		watch: {
			"form.type"(newValue) {
				console.log(newValue)
				if (newValue == -1) {
					this.form.type = '请选择'
				}
				if (newValue == 0) {
					this.form.type = '日常'
				}
				if (newValue == 1) {
					this.form.type = '专项'
				}
			},
		},
		created() {
			this.surveyList()
		},
		onLoad(params) {
			console.log(params)
			if (JSON.stringify(params) !== '{}') {
				this.id = params.id
				console.log('编辑')
				this.saveType = 'edit'
				let data = {
					id: params.id
				};
				let opts = {
					url: '/securityRiskControlContor/findById',
					method: 'post'
				};
				this.$http.httpRequest(opts, data).then(res => {
					console.log(res)
					this.form = res.data.data
					this.form.startTime=this.form.startTime.slice(0, 10)
					this.form.endTime=this.form.endTime.slice(0, 10)
					this.form.riskPictures.forEach(item => {
						console.log(item.filePath)
						this.imgList = [...this.imgList, 'http://119.27.171.77:8099/' + item.filePath]
						console.log(this.imgList)
					})
					// _this.imgList = [..._this.imgList, 'http://119.27.171.77:8099/'+JSON.parse(uploadFileRes.data).filePath]
					// this.form.time = res.data.data.time.slice(0, 10)
					this.roadDataList = ['请选择']
					this.roadcodeId = []
					let opts = {
						url: '/road/listAll',
						method: 'post'
					};
					this.$http.httpRequest(opts, {
						rankDataId: this.form.company
					}).then(res => {
						console.log(res.data.data)
						res.data.data.forEach(item => {
							this.roadDataList.push(item.code + '' + item.type)
							this.roadcodeId.push(item)
						})
					})
					if (this.form.type == "1") {
						this.isabnormal = true
					}
					if (this.form.exceptionType == 1) {
						this.isbridge = true
					}
				})
			} else {
				let opts = {
					url: '/attachmentFile/getRelatedId',
					method: 'post'
				};
				this.$http.httpRequest(opts, {}).then(res => {
					this.form.id = res.data.data
					console.log(this.form.id)
				})
				this.saveType = 'add'
			}
		},
		methods: {
			toJSON() {
				return this
			},
			bindDateChange: function(e) {
				console.log(e)
				this.form.startTime = e.target.value
			},
			bindDateChange1: function(e) {
				console.log(e)
				this.form.endTime = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			getrankData(e) {
				this.index2 = e.target.value;
				this.form.company = this.roadId[e.target.value - 1].id
				console.log(this.form.company)
				this.roadDataList = ['请选择']
				this.roadcodeId = []
				let opts = {
					url: '/road/listAll',
					method: 'post'
				};
				this.$http.httpRequest(opts, {
					rankDataId: this.form.company
				}).then(res => {
					console.log(res.data.data)
					res.data.data.forEach(item => {
						this.roadDataList.push(item.code + '' + item.type)
						this.roadcodeId.push(item)
					})
					console.log(this.roadDataList)
				})
			},
			//获取危害程度	
			getDegree(e) {
				console.log(e)
				this.index5 = e.target.value;
				this.form.grade = this.index5 - 1
				console.log(this.form.grade)
			},
			//获取异常类型
			getAbnormalType(e) {
				this.index4 = e.target.value;
				console.log(this.index4)
				this.form.exceptionType = e.target.value
				if (e.target.value == "1") {
					this.isbridge = true
				} else {
					this.isbridge = false
					this.form.lat = ''
					this.form.lng = ''
				}
			},
			getCouponSelected0(e) {
				console.log(e)
				this.form.roadName = ""
				this.index0 = e.target.value;
				this.form.road = this.roadcodeId[e.target.value - 1].id
				console.log(this.form.road)
			},
			getCouponSelected3(e) {
				console.log(e)
				this.index3 = e.target.value;
				this.form.riskId = this.riskIdarray[0].id
			},
			getCouponSelected(e) {
				console.log(e)
				this.form.type = ""
				this.index = e.target.value;
				this.form.type = e.target.value - 1;
				console.log(this.form.type)
				if (e.target.value == "2") {
					this.isabnormal = true
					let opts = {
						url: '/securityRiskControlContor/listAll',
						method: 'post'
					};
					this.$http.httpRequest(opts, {
						state: "1"
					}).then(res => {
						console.log(res)
						res.data.data.forEach(item => {
							this.risk.push(item.name)
							this.riskIdarray.push(item)
						})
					})
				} else {
					this.isabnormal = false
				}
			},
			getCouponSelected1(e) {
				this.form.result = ""
				this.index1 = e.target.value;
				this.form.result = e.target.value - 1;
				console.log(this.form.result)
				if (e.target.value == "1") {
					this.isresult = true
				} else {
					this.isresult = false
				}
			},
			//tab切换
			change(e) {
				this.btnnum = e
				console.log(this.btnnum)
			},
			surveyList() {
				let that = this
				let opts1 = {
					url: '/rankData/listAll',
					method: 'post'
				};
				that.$http.httpRequest(opts1, {}).then(res => {
					console.log(res)
					res.data.data.forEach(item => {
						that.rankData.push(item.name)
						that.roadId.push(item)
					})
					console.log(that.rankData)
				})
			},
			ChooseImage() {
				const _this = this
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						const tempFilePaths = res.tempFilePaths;
						console.log(_this.form.id)
						const uploadTask = uni.uploadFile({
							url: 'http://119.27.171.77:8099/attachmentFile/uploadAttachment',
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								relatedId: _this.form.id,
								type: "",
								model: "riskPicture"
							},
							success: function(uploadFileRes) {
								console.log(JSON.parse(uploadFileRes.data))
								_this.imgList = [..._this.imgList, 'http://119.27.171.77:8099/' + JSON.parse(uploadFileRes.data).filePath]
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
			//删除
			DelImg(e) {
				uni.showModal({
					title: '删除',
					content: '确定要删除这张图片？',
					cancelText: '取消',
					confirmText: '删除',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			save() {
				this.form.startTime = this.form.startTime + ' ' + "00:00:00"
				this.form.endTime = this.form.endTime + ' ' + "00:00:00"
				console.log(this.form)
				if (this.saveType == "edit") {
					console.log('111')
					let opts = {
						url: '/securityRiskControlContor/edit',
						method: 'post'
					};
					this.$http.httpRequest(opts, this.form).then(res => {
						console.log(res)
						uni.showToast({
							title: "编辑成功！",
							icon: "none",
							duration: 1500
						});
					})
				} else {
					let opts = {
						url: '/securityRiskControlContor/add',
						method: 'post'
					};

					this.$http.httpRequest(opts, this.form).then(res => {
						console.log(res)
						uni.showToast({
							title: "添加成功！",
							icon: "none",
							duration: 1500
						});
					})
				}
				uni.setStorageSync("username", "1")
				setTimeout(() => {
					uni.navigateBack({})
				}, 1500)

				// console.log(beforePage)
				// beforePage.$vm.surveyList(); //前一个页面方法
				// // setTimeout(() => {
				// 	uni.navigateTo({
				// 		url: "./index",
				// 		success() {
				// 			// let page = getCurrentPages().pop(); //跳转页面成功之后                 
				// 			// console.log(page)
				// 			// if (!page) return;
				// 			// page.onLoad(); //如果页面存在，则重新刷新页面
				// 		}
				// 	})
				// // }, 1500)

			}
		},
		mounted() {}
	}
</script>

<style lang="less" scoped>
	@import "../../../colorui/main.css";
	@import "../../../colorui/icon.css";

	/* 弹性盒头部固定,其余自适应 */
	.body {
		width: 100%;
		height: 100%;
		font-size: 14px;
		background-color: #FFFFFF;
	}

	.mui-title {
		font-size: 16px;
		padding: 0 10px;
	}

	.content-head {
		padding: 0 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.body {
		display: flex;
		flex-direction: column;
	}

	.spanTime,
	.weather,
	.city {
		font-size: 14px;
		color: #666;
	}

	.content {
		flex: 1;
		height: auto;
		// position: absolute;
		background-color: #FFFFFF;
		width: 100%;
	}

	.mainInfo {
		padding: 0 10px;
	}

	.mainInfo>p:last-child {
		display: flex;
		align-items: center;
		justify-content: space-between;
		float: right;
	}

	.btn-1,
	.btn-2,
	.btn-3 {
		width: 4.5rem;
		color: #FFFFFF;
		padding: 0.1325rem 0;
		text-align: center;
		border-radius: 0.4rem;
		margin: 10px 0;
		font-size: 14px;
		background-color: #0086FE;
	}

	.btn-2 {
		color: #ffffff;
		background-color: #ffaa00;
	}

	.btn-3 {
		color: #000000;
		margin: 10px 0px;
		background-color: #FFFFFF;
		margin-left: 17px;
	}

	.mui-btn {
		font-size: 16px;
		padding: 8px;
		margin: 3px;
	}

	.list-1 {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 0.0625rem solid #F2F3F7;
		padding: 10px 25px;
		box-sizing: border-box;
		color: #000000;
	}

	.desc+view {
		padding: 5px 10px;
		display: flex;
		flex-direction: column;
		text-align: center;
		background-color: #e8e6dd;
	}

	.contentItem {
		width: 4.5rem;
		color: #909499;
		padding: 0.1325rem 0;
		text-align: center;
		border-radius: 0.4rem;
		font-size: 14px;
		background-color: #F2F3F7;
		margin-bottom: 15px;
		margin-top: -5px;
	}

	.desc {
		width: 100%;
		padding: 10px 0;
		color: #333;
		text-align: center;
		background-color: rgb(255, 204, 0);
		/* margin-top: 10px; */
	}

	.desc+div {
		background-color: #F7F4ED;
		padding: 10px 0;
		color: #333;
		text-align: center;
		display: flex;
		flex-direction: column;
		border-top: 1px dashed #666;
	}

	.desc+div>span:last-child {
		font-size: 12px;
		color: red;
	}

	.rankbox {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 0.0625rem solid #F2F3F7;
		padding: 0 10px;
		margin-top: 10px;
		background-color: beige;
		height: 34px;
	}

	.rankbox>p:first-child {
		width: 20px;
		height: 20px;
		background-color: orange;
		color: #FFFFFF;
		border-radius: 100px;
		text-align: center;
		line-height: 20px;
		margin-top: 2px;
		margin-right: 5px;
		font-size: 11px;
	}

	.rankbox>p:last-child {
		height: 100%;
		color: red;
		line-height: 35px;
	}

	#table {
		margin: 0 auto;

		.td_border {
			height: 59rpx;
			border-bottom: 1px solid #E6E6E6;
		}
	}

	#table table {
		border: 1px solid #ddd;
		width: 100%;
		font-size: 13px;
		text-align: center;
	}

	#table td {
		padding: 5px;
	}

	#table td view {
		display: flex;
		align-items: center;
	}

	#table td input {
		/* width:30px; */
		margin-left: 10px;
	}

	.dcinput {
		text-align: right;
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

	.zhInput {
		display: flex;
		align-items: center;
	}

	.zhInput input {
		font-size: 14px;
		color: #BFC1C6;
	}

	.zhNum {
		width: 3rem;
		border: 1px solid #CCCCCC;
		margin-left: 5px;
	}

	.widthValue,
	.lengthValue {
		width: 4rem;
	}

	.surveyBox {
		flex-wrap: wrap;
		display: flex;
		direction: row;
	}

	.active {
		width: 4.5rem;
		color: #FFFFFF;
		padding: 0.1325rem 0;
		text-align: center;
		border-radius: 0.4rem;
		font-size: 14px;
		background-color: #0086FE;
		margin-bottom: 15px;
		margin-top: -5px;
	}

	.uni-input-input {
		border: 1px solid #ccc;
	}

	// colorui
	.margin-top {
		margin-top: 0;
	}

	/deep/.picker {
		// text-align: center !important;
	}

	//icon
	.lg {
		position: absolute;
		right: 12px;
		margin-top: -16px;
	}

	.uni-input {
		padding-right: 30rpx;
		color: #BFC1C6
	}

	.gray {
		width: 100%;
		height: 15rpx;
		background-color: #F2F3F7;
		padding-bottom: 5rpx;
		margin-top: 37px;
		margin-bottom: 9px;
	}

	.border {
		border-bottom: 10px solid #F2F3F7;
	}

	/deep/.uni-radio-input {
		width: 12px;
		height: 12px;
	}

	/deep/.t-td {
		text-align: center !important;
	}

	/deep/.uni-label-pointer {
		display: block;
		width: 100%;
		padding-bottom: 20rpx;
	}

	.table {
		width: 100%;
		height: auto;
		border: 1px solid #eee;
		margin-bottom: 10rpx;

		uni-input {
			font-size: 14px;
		}

		/deep/.uni-textarea-textarea {
			font-size: 14px !important;
		}
	}

	/deep/.uni-input-input {
		color: #BFC1C6;
		font-size: 14px;
	}

	/deep/uni-radio::before,
	uni-checkbox::before {
		font-size: 13px;
		margin-right: -4px;
	}
</style>
