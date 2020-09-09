<template>
  <view class="body">
	  <view class='imagesize'>
	    <image src="~@/static/images/login.jpg" mode="widthFix">
	    </image>
	  </view>
    <view class="loginform">
      <view class="head">
        <view class="content-head1">高速养护SAAS云平台</view>
        <!-- <view class="content-head2">SaaS云平台</view> -->
      </view>
      <view class="mui-input-row">
        <input v-model.trim="acct" type="text" class="uni-input" placeholder="请输入账号" />
      </view>
      <view class="mui-input-row">
        <input v-model.trim="password" type="password" class="uni-input" placeholder="请输入密码" />
      </view>
      <view class="mui-content-padded">
        <button type="default" class="submit" @click="login">登录</button>
      </view>
    </view>
  </view>
</template>

<script>
    import {  
        mapMutations  
    } from 'vuex';  
export default {
  data() {
    return {
      acct: "",
      password: ""
    };
  },
  methods: {
	...mapMutations(['loginData']),  
    login() {
      if (this.acct == "" || this.password == "") {
        uni.showToast({
          title: "用户名或密码不能为空",
          icon: "none",
          duration: 2000
        });
      } else {
		  uni.request({
		  	header: {
		  		'content-Type': 'application/json'
		  	},
		  	url: "http://119.27.171.77:8077/user/login", //仅为示例，并非真实接口地址。
		  	method: 'POST',
		  	data: {
				acct:this.acct,
				password:this.password
		  	},
          success: (res) => {
			  console.log(res)
			  if(res.data.code==1){
				  uni.showToast({
				      title: "登录成功",
				      icon: "none",
				      duration: 1500
				    });
				    setTimeout(()=>{
				  	   uni.switchTab({
				  	  url: "/pages/homePage/homePage"
				  	   });
				    },1500)
				    this.loginData(res.data.data.rankDataId)
				  uni.setStorageSync("currentUser", JSON.stringify(res.data.data))
			  }else{
				  uni.showToast({
				    title: "用户名或密码错误",
				    icon: "none",
				    duration: 2000
				  });
			  }
            }
          })
      }
    }
  }
};
</script>

<style lang="less" scoped>
.submit {
  background-color: #2695cb;
  text-align: center;
  margin: 0 auto;
  color: #ffffff;
  width: 200px;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
  margin-top: 30px;
}
.body {
  height: 100%;
  min-height: 100%;
  color: #ffffff;
  position: relative;
  /* background: url('~@/static/images/login.png') center no-repeat; */
  background-size: cover;
}

.area {
  margin: 20px auto 0px auto;
}

.mui-checkbox input[type="checkbox"],
.mui-radio input[type="radio"] {
  top: 6px;
}
.imagesize{
	uni-image{
		width: 100%;
		height: 100% !important;
		    position: fixed;
		    top: 0;
		    left: 0;
		    right: 0;
		    bottom: 0;
		    background: #F3F3F3;
		    z-index: -1;
	}
}

.loginform {
  width: 100%;
  margin-top: 20%;
  padding: 0 20%;
  opacity: 0.9;
  box-sizing: border-box;
}

.head {
  width: 100%;
  text-align: center;
}

.content-head1 {
  font-size: 26px;
  margin-bottom: 70px;
}

.content-head2 {
  font-size: 30px;
  padding: 0 0 20%;
}

.mui-input-row {
  position: relative;
  border-radius: 5px;
  font-size: 14px;
  justify-items: center;
  margin-bottom: 20px;
  height: 40px;
  background: #fff;
}

.mui-input-row .uni-input {
  border: 0;
  font-size: 16px;
  color: #000000;
  height: 100%;
  padding: 0 5px;
  box-sizing: border-box;
}

.area {
  margin: 20px auto 0px auto;
}

.mui-input-group {
  margin-top: 10px;
}

.mui-input-group:first-child {
  margin-top: 20px;
}

.mui-input-group label {
  width: 22%;
}

.mui-input-row label ~ input,
.mui-input-row label ~ select,
.mui-input-row label ~ textarea {
  width: 78%;
}

.mui-checkbox input[type="checkbox"],
.mui-radio input[type="radio"] {
  top: 6px;
}

.mui-content-padded {
  width: 100%;
  margin: 0;
}
</style>
