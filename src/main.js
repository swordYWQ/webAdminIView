// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iView from 'iview'
import store from './store'
import App from './App'
import router from './router'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false

Vue.use(iView)

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  if (store.state.lockInfo.isLocking && to.name !== 'locking') {  // 判断当前是否是锁定状态
      next(false);
      router.replace({
          name: 'locking'
      });
  } else if (!store.state.lockInfo.isLocking && to.name === 'locking') {
      next(false);
  } else {
      if (!store.state.userInfo && to.name !== 'login') {  // 判断是否已经登录且前往的页面不是登录页
          next({
              name: 'login'
          });
      } 
      // else if (store.state.userInfo && to.name === 'login') {  // 判断是否已经登录且前往的是登录页
      //     next({
      //         name: 'home'
      //     });
      // }
       else {
        next();
      }
  }
  iView.LoadingBar.finish();
});

router.afterEach(() => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  mounted() {
    // 全屏相关
    document.addEventListener('fullscreenchange', () => {
      this.$store.commit('changeFullScreenState');
    });
    document.addEventListener('mozfullscreenchange', () => {
      this.$store.commit('changeFullScreenState');
    });
    document.addEventListener('webkitfullscreenchange', () => {
      this.$store.commit('changeFullScreenState');
    });
    document.addEventListener('msfullscreenchange', () => {
      this.$store.commit('changeFullScreenState');
    });
  }
})
