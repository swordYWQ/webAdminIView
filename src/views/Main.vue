<template>
  <div class="main" :class="{'main-hide-text': hideMenu}">
    <admin-header :hideMenu="hideMenu" @toggleHide="toggleHide"></admin-header>
    <admin-sidebar :hideMenu="hideMenu"></admin-sidebar>
    <div class="single-page-con" :style="{left: hideMenu?'60px':'200px'}">
            <div class="single-page">
                <keep-alive :include="cachePage">
                    <router-view></router-view>
                </keep-alive>
            </div>
    </div>
  </div>
</template>
<script>
import adminHeader from './layout/header'
import adminSidebar from './layout/sidebar'
import {menuConfig,moduleConfig} from '@/config/menuConfig'
export default{
  name:'main',
  components:{
    adminHeader,
    adminSidebar
  },
  data(){
    return{
      hideMenu:false,
      cachePage:[],
    }
  },
  computed:{
    // cachePage(){
    //   return this.$store.state.cachePage.map(item=>{return item.name})
    // },
    routeName(){
      return this.$route.name
    }
  },
  mounted(){
    this.$store.dispatch('initModuleList',moduleConfig)
    this.$store.dispatch('initMenuList',menuConfig)
  },
  methods:{
    toggleHide(){
      this.hideMenu=!this.hideMenu
    }
  },
}
</script>