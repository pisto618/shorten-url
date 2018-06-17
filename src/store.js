import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store =  new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {

  },
  actions: {

  },
  getters: {
    getToken: state => {
      return state.token;
    }
  }
})