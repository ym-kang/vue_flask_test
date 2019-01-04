/*eslint-disable*/
import Vue from 'vue'
import Router from 'vue-router'
import mainPage from '@/components/mainPage'
import Vuex from 'vuex'

Vue.use(Router)
Vue.use(Vuex)



export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainPage',
      component: mainPage
    }
  ]
})
