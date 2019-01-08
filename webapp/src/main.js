// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import 'bootstrap' 
import 'bootstrap/dist/css/bootstrap.css'
import BootstrapVue from 'bootstrap-vue'
//import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import PulseLoader from '@/components/PulseLoader.vue'

Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.component('pulse-loader',PulseLoader)

/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
 // router,
  components: { 
    App
  },
  template: '<App/>',
  store
})

