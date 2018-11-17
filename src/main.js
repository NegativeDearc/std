// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueMoment from 'vue-moment'
import VeeValidate from 'vee-validate'
import store from './store/index'
import router from './router'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(VueMoment)
Vue.use(VeeValidate)

axios.defaults.baseURL = 'http://localhost:7659/api/'

// 添加一个请求拦截器，用于设置请求过渡状态
axios.interceptors.request.use((config) => {
  // 请求开始，蓝色过渡滚动条开始出现
  NProgress.start()
  return config
}, (error) => {
  return Promise.reject(error)
})

// 添加一个返回拦截器
axios.interceptors.response.use((response) => {
  // 请求结束，蓝色过渡滚动条消失
  NProgress.done()
  return response
}, (error) => {
  // 请求结束，蓝色过渡滚动条消失
  // 即使出现异常，也要调用关闭方法，否则一直处于加载状态很奇怪
  NProgress.done()
  return Promise.reject(error)
})

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
