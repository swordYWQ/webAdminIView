<template>
  <div>文章列表
    <input type="text" v-model="value">
  </div>
</template>
<script>
export default{
  data(){
    return {
      routeName:this.$route.name,
      value:0
    }
  },
  mounted(){
    console.log('进入新组件')
  },
  activated(){
    console.log('进入缓存组件')
  },
  // deactivated () { //清除keep-alive的缓存  bug 同下
  //   let cachePage = this.$store.state.cachePage.map(item=>item.name)
  //   let flag = false
  //   // 循环查找当前页是否需要被缓存
  //   for(let i=0;i<cachePage.length;i++){
  //     if(cachePage[i] === this.routeName){
  //       flag = true
  //       break
  //     }
  //   }
  //   if(!flag){
  //     console.log('销毁组件')
  //     this.$destroy(true)
  //   }
  //   console.log('结束组件')
  // },
  // beforeRouteLeave(to,form,next){ // bug 第一轮切换正常，关闭后销毁组件 再次打开后切换 会重新生成新缓存，之后每次切换都会生成新缓存
  //   let cachePage = this.$store.state.cachePage.map(item=>item.name)
  //   let flag = false
  //   for(let i=0;i<cachePage.length;i++){
  //     if(cachePage[i]==this.routeName){
  //       flag = true
  //       break
  //     }
  //   }
  //   if(!flag){
  //     console.log('销毁组件')
  //     this.$destroy()
  //     next()
  //   } else{
  //     console.log('正常结束组件')
  //     next()
  //   }
  // }
}
</script>