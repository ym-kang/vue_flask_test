import jwt_decode from 'jwt-decode'
// src/vuex/getters.js
export default {
    getUid: state => state.uid,
    getErrorState: state => state.errorState,
    getIsAuth: state => state.auth.isAuth,
    getToken: state => state.auth.accessToken,
    getTokenDecoded: state => jwt_decode(state.auth.accessToken) ,

    
  } 