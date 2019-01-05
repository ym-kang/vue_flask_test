<template>
  <div id="app">
    <div>KYM Toy proj</div>
    <!-- <router-view/> -->

    
    <component :is=" this.$store.state.currentComponent"></component>
  </div>
</template>

<script>
export default {
  name: 'App',

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
