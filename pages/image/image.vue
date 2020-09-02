<template>
	<view class="body">
	  <view class='imagesize'>
	    <image src="~@/static/images/erweima.png" mode="widthFix">
	    </image>
		</view>
	</view>
</template>

<script>
</script>

<style lang="less">
	.body{
		width: 100%;
		height: 100%;
		overflow: scroll;
	}
.imagesize{
	width: 100%;
	height: 100%;
	uni-image{
		width: 100%;
		height: 100%;
		    top: 0;
		    left: 0;
		    right: 0;
		    bottom: 0;
		    background: #F3F3F3;
		    z-index: -1;
	}
}
</style>
