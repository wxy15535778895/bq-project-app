<template>
    <view class="tarbar">
        <view
            class=".tarbar-list"
            :style="{
                background: tabBar.backgroundColor,
                color: tabBar.color,
                'border-top': tabBar.position == 'bottom' ? '1rpx solid ' + tabBar.borderStyle : 0,
                'border-bottom': tabBar.position == 'top' ? '1rpx solid ' + tabBar.borderStyle : 0
            }"
        >
            <view class="tarbar-list-ul">
                <view class="tarbar-list-li" v-for="(item, index) in tabBar.list" :key="index" @click.top="setSelected(index)">
                    <block>
                        <view class="tarbar-list-li-icon"><image :src="selected == index ? item.selectedIconPath : item.iconPath" mode=""></image></view>
                        <view class="tarbar-list-li-name">{{ item.text }}</view>
                    </block>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    props: ['selected'],
    data() {
        return {
            tabBar: {
                color: '#000000',
                selectedColor: '#E84351',
                borderStyle: '#ccc',
                backgroundColor: '#fff',
                position: 'bottom',
                list: [
                    {
                        pagePath: '../index/index',
                        iconPath: '../../static/images/daka.png',
                        selectedIconPath: '../../static/images/daka1.png',
                        text: '打卡'
                    },
                    {
                        pagePath: '../punch/index',
                        iconPath: '../../static/images/tongji.png',
                        selectedIconPath: '../../static/images/tongji1.png',
                        text: '统计'
                    },
                    {
                        pagePath: '../rule/rule',
                        iconPath: '../../static/images/guize.png',
                        selectedIconPath: '../../static/images/guize1.png',
                        text: '规则'
                    }
                ]
            },
            oldSelected: 0, // 记录之前访问的索引; 值为2的时候显示遮罩
            isShowMask: false
        };
    },
    onLoad() {},
    methods: {
        setSelected(index) {
            console.log(index);
                uni.reLaunch({
                    url: this.tabBar.list[index].pagePath
                });
            this.$forceUpdate();
        },
        closeMask() {
            this.isShowMask = false;
        }
    }
};
</script>

<style>
.tarbar {
    width: 100%;
    z-index: 9999;
    position: fixed;
    bottom: 0;
}
.tarbar-list {
    width: 100%;
    height: 120upx;
    background: #4d586f;
    position: fixed;
    left: 0;
    bottom: 0;
}
.tarbar-list-ul {
    width: 100%;
    height: 100%;
    padding: 20upx 50upx;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
}
.tarbar-list-li {
    width: 80upx;
    height: 80upx;
}
.tarbar-list-li-icon {
    width: 50upx;
    height: 50upx;
    margin: 0 auto;
}
.tarbar-list-li-icon image {
    width: 50upx;
    height: 50upx;
}
.tarbar-list-li-name {
    width: 100%;
    text-align: center;
    line-height: 30upx;
    font-size: 20upx;
    height: 30upx;
}
.tarbar-list-li-center {
    width: 100upx;
}
.tarbar-list-li-center .tarbar-list-li-icon,
.tarbar-list-li-center .tarbar-list-li-icon image {
    width: 90upx;
    height: 60upx;
}
</style>