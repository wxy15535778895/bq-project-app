import Vue from 'vue'
import App from './App'
import http from '@/js/http.js';
import store from './store'  
Vue.prototype.$store = store  
Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.url = 'http://119.27.171.77:8077/';
Vue.prototype.urlImg = 'http://119.27.171.77:8077/';
import cuCustom from 'colorui/components/cu-custom.vue'
Vue.config.productionTip = false
//登录地址
Vue.prototype.$http =http;
const app = new Vue({
	...App
})
app.$mount()
