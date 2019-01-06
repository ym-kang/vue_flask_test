<template>
    <div>
        <p>main Page</p>
        <p>binding test : {{abc}}</p>
        
        <div>
            token: <br>
            <p>{{this.$store.state.auth.accessToken}}</p>
        </div>
        
        <button v-on:click="onclick">increase</button>
        <div>
            <b-button varient="primary" @click="testTokenUI">test token</b-button>
            <p>{{response}}</p>
        </div>
    </div>
    
</template>

<script>
import { mapActions, mapGetters } from 'vuex' // mapGetters를 추가한다

export default {
    name:"mainPage",
    data(){
        return {
            abc:1,
            response:"none"
        }
    },
    methods:{
        ...mapActions(['testToken']),
        onclick(event){ 
            this.abc++;
        },
        testTokenUI(event){
            console.log(1)
            this.testToken().then((data)=>this.response = data);
        },

    }

}



</script>
<style>

    button {
        width:80px;
        height: 30px;
    }
    p {
        word-break: break-all;
        word-wrap: break-word;
    }
</style>
