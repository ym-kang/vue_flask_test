<template>
    <div>
        <p>main Page</p>
        <p>binding test : {{abc}}</p>
        <button v-on:click="onclick">increase</button>
    </div>
    
</template>

<script>
import { mapActions, mapGetters } from 'vuex' // mapGetters를 추가한다

export default {
    name:"mainPage",
    data(){
        return {
            abc:1
        }
    },
    methods:{
        onclick(event){ 
            this.abc++;
        }
    }

}



</script>
<style>
    button {
        width:80px;
        height: 30px;
    }
</style>
