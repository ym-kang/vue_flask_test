<template>
    <div>
        <p>main Page</p>
        <p>binding test : {{abc}}</p>
        
        <div>
            token: <br>
            <p>{{this.$store.state.auth.accessToken}}</p>
            refresh: <br>
            <p>{{this.$store.state.auth.refreshToken}}</p>
        </div>
        
        <button v-on:click="onclick">increase</button>
        <div>
            <b-button varient="primary" @click="testTokenUI">test token</b-button>
            <p>{{response}}</p>
        </div>
        <div>
            <b-button @click="refreshTok">refresh-tok</b-button>
            <p>{{refreshBody}}</p>
        </div>
        <div>
            <p>token info</p>
            <p>{{getTokenDecoded}}</p>
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
            response:"none",
            refreshBody:"none"
        }
    },
    methods:{ 
        ...mapActions(['testToken','getRefreshToken']),
        onclick(event){
            this.abc++;
        },
        testTokenUI(event){
            console.log(1)
            this.testToken().then((data)=>this.response = data);
        },
        refreshTok(event){ 
            this.getRefreshToken().then((data)=>this.refreshBody=data);
        }

    },
    computed:{
        ...mapGetters(['getTokenDecoded']),

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
