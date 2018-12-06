import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import 'framework7/css/framework7.ios.min.css'
import 'common/stylus/index.styl'
import { Scroll } from 'cube-ui'
import Framework7 from 'framework7/framework7.esm.bundle'
import Framework7Vue from 'framework7-vue'
/* eslint-disable no-unused-vars */
// import VConsole from 'vconsole'
/* eslint-disable no-new */
// new VConsole()
Framework7.use(Framework7Vue)
Vue.use(Scroll)

Vue.config.productionTip = false

fastclick.attach(document.body)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
