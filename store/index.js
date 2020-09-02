import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {  
       loginData:"",
	   indexObj1:{}
    },  
    mutations: {  
		loginData(state,id){
			console.log(id)
			state.loginData=id
		},
		indexObj1(state,indexObj1){
			state.indexObj1=indexObj1
		}
         
    }  
})  