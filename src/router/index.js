import Vue from 'vue'
import Router from 'vue-router'
import { menuConfig, moduleConfig } from '@/config/menuConfig'
import Main from '@/views/Main.vue'

Vue.use(Router)
// 登陆路由
let loginRoutes = {
  path: '/login',
  name: 'login',
  component: resolve => require(['@/views/login.vue'], resolve)
}

// 锁屏路由
const lockingRoutes = {
  path: '/locking',
  name: 'locking',
  component: resolve => require(['@/views/lock_screen/locking-page.vue'], resolve)
};

// 菜单路由
let menuRoutes = [{
  path: '/',
  name: 'modules',
  redirect: 'login',
  component: Main,
  children: (() => {
    let arr = []
    menuConfig.forEach(item => {
      item.children && item.children.forEach(child => {
        arr.push(child)
      })
    })
    return arr
  })()
}]

// 其他路由
let otherRoutes = {
  path: '/',
  name: 'otherRouter',
  redirect: 'login',
  component: Main,
  children: moduleConfig
}
// 错误页路由
let error401 = { // 错误页面401
  path: 'error_401',
  name: 'error_401',
  component: resolve => require(['@/views/other_page/error_page/401.vue'], resolve)
}
let error404 = {// 错误页面404
  path: 'error_404',
  name: 'error_404',
  component: resolve => require(['@/views/other_page/error_page/404.vue'], resolve)
}
let error500 = {// 错误页面500
  path: 'error_500',
  name: 'error_500',
  component: resolve => require(['@/views/other_page/error_page/500.vue'], resolve)
}

const routes = [loginRoutes, lockingRoutes, otherRoutes, ...menuRoutes, error401, error404, error500]

export default new Router({
  routes
})
