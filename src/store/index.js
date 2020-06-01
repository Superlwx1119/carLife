import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const state = {
  user:{
    uName:'admin'
  }
}


export default new Vuex.Store({
  state,
  mutations: {
    getUser(state,user){
      state.user=user;
      window.sessionStorage.setItem('user',JSON.stringify(user))
    }
  },
  actions: {
    getUser(val,user){
      val.commit('getUser',user)
    }
  },
  getters: {
  }
})
