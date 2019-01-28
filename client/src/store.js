import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dataLogin: null
  },
  mutations: {
    login(state, data) {
      console.log('tesss')
      state.dataLogin = data
      
    },
    logout() {
      localStorage.clear()
    }
  },
  actions: {
    login(context, data) {
      context.commit('login', data)

    },
    logout(context) {
      context.commit('logout')
      
    }
  }
})
