// src/vuex/mutation.js
import * as types from './mutation_types'

export default {
  [types.UID] (state, uid) {
    state.uid = uid
  },
  [types.ERROR_STATE] (state, errorState) {
    state.errorState = errorState
  },
  [types.IS_AUTH] (state, isAuth) {
    state.auth.isAuth = isAuth
  },
  setCurComponent(state,comp){
    state.currentComponent = comp;
  },
  accessToken(state,token){
    state.auth.accessToken = token;
    
  }
}