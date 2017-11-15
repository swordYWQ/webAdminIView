<template>
  <div class="main-header-con" :style="{paddingLeft: hideMenu?'60px':'200px'}">
            <div class="main-header">
                <div class="navicon-con">
                    <Button :style="{transform: 'rotateZ(' + (this.hideMenu ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
                <div class="header-avator-con">
                    <div @click="handleFullScreen" v-if="showFullScreenBtn" class="full-screen-btn-con">
                        <Tooltip :content="isFullScreen ? '退出全屏' : '全屏'" placement="bottom">
                            <Icon :type="isFullScreen ? 'arrow-shrink' : 'arrow-expand'" :size="23"></Icon>
                        </Tooltip>
                    </div>
                    <div @click="lockScreen" class="lock-screen-btn-con">
                        <Tooltip content="锁屏" placement="bottom">
                            <Icon type="locked" :size="20"></Icon>
                        </Tooltip>
                    </div>
                    <div @click="showMessage" class="message-con">
                        <Tooltip content="消息列表" placement="bottom">
                            <Badge :count="0" dot>
                                <Icon type="ios-bell" :size="22"></Icon>
                            </Badge>
                        </Tooltip>
                    </div>
                    <!-- <div class="switch-theme-con">
                        <Row class="switch-theme" type="flex" justify="center" align="middle">
                            <theme-dropdown-menu></theme-dropdown-menu>
                        </Row>
                    </div> -->
                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown trigger="click" @on-click="handleClickUserDropdown">
                                <a href="javascript:void(0)">
                                    <Avatar :src="avatorPath" style="background: #619fe7;vertical-align: middle;"></Avatar>
                                    <span class="main-user-name"> admin </span>
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="ownSpace">个人中心</DropdownItem>
                                    <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Row>
                    </div>
                </div>
            </div>
            <!-- <div class="tags-con"> -->
                <tab-page-opened></tab-page-opened>
            <!-- </div> -->
        </div>
</template>
<script>
import tabPageOpened from '../main_components/tabPageOpened.vue'
export default {
  components:{
    tabPageOpened
  },
  props:{
    hideMenu:{
      type:Boolean
    }
  },
  data(){
    return {
      showFullScreenBtn: window.navigator.userAgent.indexOf('MSIE') < 0,
      lockScreenSize: 0,
    }
  },
  computed:{
    isFullScreen () {
      return this.$store.state.isFullScreen;
    },
    avatorPath(){
      return require('@/assets/images/user-head.png')
    },
    moduleList(){
        return this.$store.state.moduleList
    },
  },
  mounted(){
      this.initLockState()
  },
  methods:{
    toggleClick () {
      this.$emit('toggleHide')
    },
    initLockState(){
        // 锁屏相关
            let lockScreenBack = document.getElementById('lock_screen_back');
            let x = document.body.clientWidth;
            let y = document.body.clientHeight;
            let r = Math.sqrt(x * x + y * y);
            let size = parseInt(r);
            this.lockScreenSize = size;
            window.addEventListener('resize', () => {
                let x = document.body.clientWidth;
                let y = document.body.clientHeight;
                let r = Math.sqrt(x * x + y * y);
                let size = parseInt(r);
                this.lockScreenSize = size;
                lockScreenBack.style.transition = 'all 0s';
                lockScreenBack.style.width = lockScreenBack.style.height = size + 'px';
            });
            lockScreenBack.style.width = lockScreenBack.style.height = size + 'px';
    },
    lockScreen () {
      let lockScreenBack = document.getElementById('lock_screen_back');
      lockScreenBack.style.transition = 'all 3s';
      lockScreenBack.style.zIndex = 10000;
      lockScreenBack.style.boxShadow = '0 0 0 ' + this.lockScreenSize + 'px #667aa6 inset';
      this.showUnlock = true;
      this.$store.commit('lock',{routeName:this.$route.name});
    //   Cookies.set('last_page_name', this.$route.name); // 本地存储锁屏之前打开的页面以便解锁后打开
      setTimeout(() => {
          lockScreenBack.style.transition = 'all 0s';
          this.$router.push({
              name: 'locking'
          });
      }, 800);
    },
    getModuleItem(name){
        let obj = null
        this.moduleList.forEach(item=>{
            if(item.name === name){
                obj = item
            }
        })
        return obj
    },
    showMessage(){
        let obj = this.getModuleItem('message')
        this.$store.commit('openPage',obj)
        this.$router.push({
            name:obj.name
        })
    },
    // 点击用户下拉选项
    handleClickUserDropdown (name) {
      if (name === 'ownSpace') {
        let obj = this.getModuleItem('owncenter')
        this.$store.commit('openPage',obj)
        this.$router.push({
            name:obj.name
        })
      } else if (name === 'loginout') {
          this.$Modal.confirm({
              type:'warning',
              content:'是否退出系统?',
              onOk:()=>{
                this.$router.push({
                 name: 'login'
                })
              }
          })
      }
    },
    // 点击全屏
    handleFullScreen () {
      this.$store.commit('handleFullScreen');
    },
  }
}
</script>
<style lang="scss" scoped>

</style>