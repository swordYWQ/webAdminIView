export const menuConfig = [{
  id: 1,
  name: 'article',
  icon: 'ios-list',
  title: '文章管理',
  path: null,
  children: [{
    id: 11,
    name: 'articleList',
    icon: null,
    title: '文章列表',
    path: 'articleList',
    component: resolve => require(['@/views/modules/articleList/index.vue'], resolve)
  }, {
    id: 12,
    name: 'newsList',
    icon: null,
    title: '新闻列表',
    path: 'newsList',
    component: resolve => require(['@/views/modules/newsList/index.vue'], resolve)
  }]
}]
export const moduleConfig = [{ // 主页
  path: 'home',
  name: 'home',
  title: '主页',
  component: resolve => require(['@/views/home/index.vue'], resolve)
},{// 个人中心
  path: 'owncenter',
  name: 'owncenter',
  title: '个人中心',
  component: resolve => require(['@/views/owncenter/index.vue'], resolve)
}, { // 消息列表
  path: 'message',
  name: 'message',
  title: '消息列表',
  component: resolve => require(['@/views/message/index.vue'], resolve)
}]