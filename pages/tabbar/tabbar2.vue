<template>
    <div class="g-tabbar">
        <navigator class="g-tabbar-item" url="../index/index" style="margin-bottom: 10px;">
            <i class="iconfont icon-category"><image src="../../static/images/daka.png" mode=""></image></i>
            <span>打卡</span>
        </navigator>
        <navigator class="g-tabbar-item" url="../punch/index" style="margin-bottom: 10px;">
            <i class="iconfont icon-category"><image src="../../static/images/tongji.png" mode=""></image></i>
            <span>统计</span>
        </navigator>
        <navigator class="g-tabbar-item" url="../rule/rule" style="margin-bottom: 10px;">
            <i class="iconfont icon-cart"><image src="../../static/images/guize1.png" mode=""></image></i>
            <span style="rgb(85, 132, 255)">规则</span>
        </navigator>
    </div>
</template>

<script>
export default {
    name:"Tabbar"
}
</script>

<style lang="scss" scoped>
    .g-tabbar{
        display:flex;
        width:100%;
        height:50px;
        background:#fff;

        &-item{
            flex:1;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            color:#333;
            font-size:12px;

            .iconfont{
                margin-bottom:4px;
                font-size:18px;
            }
        }

    }
    .router-link-active{
        color:red;
    }
	image{
		width: 20px;
		height: 20px;
		margin-top: 5px;
	}
</style>