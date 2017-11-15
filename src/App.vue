<template>
  <div id="app" class="app-main">
        <router-view></router-view>
  </div>
</template>

<script>
import './assets/scss/index.scss'
export default {
  name: 'app'
}
</script>

<style>
html,body{
  width:100%;
  height:100%;
  
}
#app{
  width:100%;
  height:100%;
}
</style>
