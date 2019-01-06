// src/sercice/loginAPI.js
import axios from 'axios'
let backEnd = 'http://127.0.0.1:5000/api'
var config = { headers: {  
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
}}
export function updateToken(token){
  config['Authorization'] ='Bearer '+ token;
}
const getUserInfo = (uid, password) => {
  return axios.post(backEnd+'/login', {
      'username': uid,
      'password': password
  },config)
}
const testToken = ()=>{
  return axios.get(backEnd+'/hello',{

  })
}
const isFinished = uid => {
  return axios.get(backEnd+'/test',{ 
    params:{
      'uid': uid
  }},config)
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
  }
}