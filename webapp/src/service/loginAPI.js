// src/sercice/loginAPI.js
import axios from 'axios'
let backEnd = 'http://127.0.0.1:5000/'

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


function updateToken(token){
  axios.defaults.headers.common['Authorization'] = 'Bearer '+ token;
  //config['Authorization'] ='Bearer '+ token;
}

const getUserInfo = (uid, password) => {
  return axios.post(backEnd+'JWT/api/login', {
      'username': uid,
      'password': password
  })
}
const testToken = ()=>{
  return axios.get(backEnd+'Secure/api/hello');
} 
const isFinished = uid => {
  return axios.get(backEnd+'api/test',{
    params:{
      'uid': uid
  }})
}
const getRefreshedToken =(refreshToken)=>{
  let header = {
    'headers':{
      'Authorization': 'Bearer ' + refreshToken
    }
  }
  return axios.get(backEnd+'JWT/api/refresh',header)
}


export default {
  async login (uid, password) {
    
    try {
      const getUserInfoPromise = await getUserInfo(uid, password)
      const isFinishedPromise = await isFinished(uid) // Promise.all의 예시를 위해 집어넣음
      const [userInfoResponse, isFinishedResponse] = await Promise.all([getUserInfoPromise, isFinishedPromise])
      
      if (userInfoResponse.data.length === 0) return 'noAuth' // 로그인 결과에 따른 분기 처리를 해준다
      if (isFinishedResponse.data[0].CNT > 0) return 'done'
      return userInfoResponse.data
    } catch (err) {
      console.error(err)
      return 'noAuth';
    }
  },
  updateToken,
  testToken,
  getRefreshedToken
}