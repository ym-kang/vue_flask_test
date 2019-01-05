<template>
  <div class="hello">
    <h2>Log In1</h2>
    <form >
      <input placeholder="Enter your ID" v-model="uid">
      <input placeholder="Enter your password" v-model="password">
      <button v-on:click="onSubmit">Login</button>
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
        ret.then((val)=>{
            loginResult = val;
            console.log("rval:"+loginResult) // 로그인 성공하면 true, 아니면 false
            if(!loginResult){//login failure
              alert("login fail") 
            }else{
            this.gotoMain();
          }
          });
        
        
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
</style>
