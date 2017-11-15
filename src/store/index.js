import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  isFullScreen: false, // 是否全屏显示
  menuList: [],  // 菜单列表 可以被显示在标签页中
  moduleList: [], //  模块列表 可以被显示在标签页中
  menuTheme: 'dark', // 菜单主题
  cachePage: [], // 打开的菜单标签列表
  nowPage: null, // 当前打开的模块页面
  userInfo: null,  // 用户信息
  lockInfo: {  // 锁屏相关
    isLocking: false, // 是否是锁屏状态
    beforeRouteName: '', // 锁屏前路由名称
  }
}

const getters = {

}

const mutations = {
  // 初始化菜单列表
  initMenuList(state, menulist) {
    state.menuList = menulist
  },
  initModuleList(state, moduleList) {
    state.moduleList = moduleList
  },
  // 全屏操作
  handleFullScreen(state) {
    let main = document.getElementById('app');
    if (state.isFullScreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      if (main.requestFullscreen) {
        main.requestFullscreen();
      } else if (main.mozRequestFullScreen) {
        main.mozRequestFullScreen();
      } else if (main.webkitRequestFullScreen) {
        main.webkitRequestFullScreen();
      } else if (main.msRequestFullscreen) {
        main.msRequestFullscreen();
      }
    }
  },
  // 修改全屏状态
  changeFullScreenState(state) {
    state.isFullScreen = !state.isFullScreen;
  },
  // 设置用户信息 登陆成功
  setUserInfo(state, info) {
    state.userInfo = info
  },
  // 锁屏
  lock(state, info) {
    state.lockInfo.beforeRouteName = info.routeName
    state.lockInfo.isLocking = true
  },
  // 解锁
  unlock(state, info) {
    state.lockInfo.isLocking = false
  },
  // 关闭标签页
  closePage(state, name) {
    state.cachePage.forEach((item, index) => {
      if (item.name === name) {
        state.cachePage.splice(index, 1);
      }
    });
  },
  // 打开新的标签页
  openPage(state, obj) {
    let i = 0, flag = false
    while (i < state.cachePage.length) {
      if (state.cachePage[i].name == obj.name) {
        state.nowPage = obj;
        flag = true
      }
      i++
    }
    if (!flag) {
      state.cachePage.push(obj);
      state.nowPage = obj;
    }
  }
}

const actions = {
  // 初始化菜单列表
  initMenuList({ commit }, menulist) {
    commit('initMenuList', menulist)
  },
  initModuleList ({ commit }, moduleList) {
    commit('initModuleList', moduleList)
    moduleList.forEach(item => {
      if (item.name == 'home') {
        commit('openPage', item)
      }
    })
  },
}

export default new Vuex.Store({
  state, getters, mutations, actions
})