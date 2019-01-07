import {UID, IS_AUTH, ERROR_STATE} from './mutation_types'
import api from '../service'
import mainPage from "../components/mainPage"
import loginAPI from '../service/loginAPI';
let setUID = ({commit}, data) => {
  commit(UID, data)
}
let setToken=({commit},data)=>{
  commit("accessToken",data)
}
let setRefreshToken=({commit},data)=>{
  commit("refreshToken",data)
}
let setErrorState = ({commit}, data) => {
  commit(ERROR_STATE, data)
}

let setIsAuth = ({commit}, data) => {
  commit(IS_AUTH, data)
}

// 백엔드에서 반환한 결과값을 가지고 로그인 성공 실패 여부를 vuex에 넣어준다.
let processResponse = (store, loginResponse) => {
  switch (loginResponse) {
    case 'noAuth':
      setErrorState(store, 'Wrong ID or Password')
      setIsAuth(store, false)
      break
    case 'done':
      setErrorState(store, 'No period')
      setIsAuth(store, false)
      break
    default:
      api.loginAPI.updateToken(loginResponse.access_token)
      setToken(store, loginResponse.access_token)
      setRefreshToken(store,loginResponse.refresh_token)
      setErrorState(store, '')
      setIsAuth(store, true) 
  }
}

export default {
  async login (store, {uid, password}) {
    
    try {
      let loginResponse = await api.login(uid, password)
      if(loginResponse!=undefined)processResponse(store, loginResponse)
      return store.getters.getIsAuth  // 로그인 결과를 리턴한다  
    } catch (error) {
      console.log(error);
      return false;
    }
    
  },
  gotoMain(store){
    
    store.commit("setCurComponent",mainPage)
  }, 
  testToken(store){ 
    
    return loginAPI.testToken();
  },  
  async getRefreshToken(store){
    let response = await loginAPI.getRefreshedToken(store.state.auth.refreshToken);
    console.log(response)
    store.state.auth.access_token = response.data.access_token;
    setToken(store,response.data.access_token);
    return response.data.access_token;
  },
  setRefreshToken
} 