import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import { store } from './store'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies);

axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.headers.get['Accepts'] = 'application/json'

// const reqInterCeptor =  axios.interceptors.request.use( config => {
//   console.log('Req:',config)
//   return config
// })

// const resInterCeptor = axios.interceptors.response.use( res => {
//   console.log('Res:',res)
//   return res
// })

// axios.interceptors.request.eject(reqInterCeptor);
// axios.interceptors.response.eject(resInterCeptor);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
