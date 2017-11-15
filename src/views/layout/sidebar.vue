<template>
  <div class="sidebar-menu-con" :style="{width: hideMenu?'60px':'200px', overflow: hideMenu ? 'visible' : 'auto', background: $store.state.menuTheme === 'dark'?'#495060':'white'}">
    <div class="logo-con">
        <img src="~@/assets/logo.png" key="max-logo" />
        <!-- v-show="!hideMenu"<img v-show="hideMenu" src="~@/assets/images/logo_min.png" key="min-logo" /> -->
    </div>
    <!-- <sidebar-menu v-if="!hideMenuText" :menuList="menuList" :iconSize="14"/> -->
    <!-- <sidebar-menu-shrink :icon-color="menuIconColor" v-else :menuList="menuList"/> -->
    <Menu  v-if="!hideMenu" ref="sideMenu" :theme="$store.state.menuTheme" :active-name="currentPageName" :open-names="openedSubmenuArr" width="auto" @on-select="changeMenu">
        <template v-for="item in menuList">
            <MenuItem v-if="item.children.length<1" :name="item.children[0].name" :key="item.name">
                <Icon :type="item.icon" :size="14" :key="item.name"></Icon>
                <span class="layout-text" :key="item.name">{{item.title}}</span>
            </MenuItem>

            <Submenu v-if="item.children.length>=1" :name="item.name" :key="item.name">
                <template slot="title">
                    <Icon :type="item.icon" :size="14"></Icon>
                    <span class="layout-text">{{ item.title }}</span>
                </template>
                <template v-for="child in item.children">
                    <MenuItem :name="child.name" :key="child.name">
                        <Icon :type="child.icon" :size="14" :key="child.name"></Icon>
                        <span class="layout-text" :key="child.name">{{ child.title }}</span>
                    </MenuItem>
                </template>
            </Submenu>
        </template>
    </Menu>



     <div v-else>
        <template v-for="(item, index) in menuList">
            <div style="text-align: center;" :key="index">
                <Dropdown transfer v-if="item.children.length !== 1" placement="right-start" :key="index" @on-click="changeMenu">
                    <Button style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
                        <Icon :size="20" :color="'white'" :type="item.icon"></Icon>
                    </Button>
                    <DropdownMenu style="width: 200px;" slot="list">
                        <template v-for="(child, i) in item.children">
                            <DropdownItem :name="child.name" :key="i">
                              <Icon :type="child.icon"></Icon>
                              <span style="padding-left:10px;">{{ item.title }}</span>
                            </DropdownItem>
                        </template>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown transfer v-else placement="right-start" :key="index" @on-click="changeMenu">
                    <Button @click="changeMenu(item.children[0].name)" style="width: 70px;margin-left: -5px;padding:10px 0;" type="text">
                        <Icon :size="20" :color="'white'" :type="item.icon"></Icon>
                    </Button>
                    <DropdownMenu style="width: 200px;" slot="list">
                        <DropdownItem :name="item.children[0].name" :key="'d' + index">
                          <Icon :type="item.icon"></Icon>
                          <span style="padding-left:10px;">{{ item.title }}</span>
                          </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </template>
    </div>
  </div>
</template>
<script>
export default{
  name:'sidebar',
  props:{
    hideMenu:{
      type:Boolean
    }
  },
  data(){
    return{
      currentPageName: '',
      openedSubmenuArr: this.$store.state.openedSubmenuArr,
    }
  },
  computed:{
    menuList(){
      return this.$store.state.menuList
    },
    // 当前视图对象
    nowViewObject(){
        let obj = null
        this.menuList.forEach(item=>{
            item.children.forEach(child=>{
                if(child.name === this.currentPageName){
                    obj = child
                }
            })
        })
      return obj
    },
  },
  methods:{
    changeMenu(menu){
        this.currentPageName=menu
        this.$store.commit('openPage',this.nowViewObject)
        this.$router.push({
            name:menu
        })
    }
  }
}
</script>