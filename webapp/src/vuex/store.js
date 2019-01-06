// src/vuex/store.js
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import mainPage from "../components/mainPage"
import loginPage from "../components/loginPage"

Vue.use(Vuex)

const state = {
  uid: '',
  errorState: '',  
  currentComponent:loginPage,
  auth: {
    accessToken:undefined,
    time:undefined,
    isAuth:false
  }
  
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})