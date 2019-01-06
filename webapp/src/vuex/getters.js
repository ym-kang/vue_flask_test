// src/vuex/getters.js
export default {
    getUid: state => state.uid,
    getErrorState: state => state.errorState,
    getIsAuth: state => state.auth.isAuth,
    getToken: state => state.auth.accessToken,
  }