<template>
  <div class="hello">
    <h2>Log In1</h2>
    <form class="form-horizontal" @submit.prevent="onSubmit">
     
      <div class="form-group">
        <input class="form-control" placeholder="Enter your ID" v-model="uid">  
      </div>
      <div class="form-group">
        <input class="form-control" type="password" placeholder="Enter your password" v-model="password">
      </div>
      
      <b-button class="btn" variant="primary" type="submit">Login</b-button>
      
      
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex' // mapGetters를 추가한다

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      uid: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['login','gotoMain']),
      onSubmit () {
      try { 
        let loginResult;
        let ret = this.login({uid: this.uid, password: this.password})
        setTimeout(() => {
          
        }, 1000);
        ret.then((val)=>{
            loginResult = val;
            console.log("rval:"+loginResult) // 로그인 성공하면 true, 아니면 false
            if(!loginResult){//login failure
              alert("login fail") 
            }else{
           // alert("login success") 
            this.gotoMain();
          }
          });
        this.password = "";
        
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.form-group{
  margin: 10px;
}
</style>
