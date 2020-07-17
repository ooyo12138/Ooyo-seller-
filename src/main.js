import Vue from 'vue'
import App from './App.vue'
import router from "router/router.js"
import store from "store/store.js"
import axios from "http/http.js"
import "@/mock"

Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
