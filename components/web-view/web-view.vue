<template>
	<web-view :src="url" @message="handleMessage"></web-view>
</template>
 
<script>
export default {
	data() {
		return {
			url: 'http://119.27.171.77:8080/hh'  //要打开的外部链接
		};
	},
	methods: {
		//通过 @message 事件接收外部链接传过来的内容
		handleMessage(event) {
			if (event.detail.data[0].isClose) {
				uni.reLaunch({
					url: '/main/main'
				});
			}
		}
	}
};
</script>