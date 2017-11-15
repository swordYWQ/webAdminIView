# webAdminIView

> 参照模仿iview官方出的admin系统，因本地调试webpack-dev-server启动的项目热启动经常会失灵（可能是配置问题吧），使用vue-cli webpack脚手架实现后台框架，未加入其他内容模块，方便做新项目时提高效率。

## 特色

- 标签多页
- 全屏
- 锁屏
- 界面比较好看

## 插件

- vue
- vue-router
- vuex
- iview
- js-md5

## 目前还存在的问题

- 多标签页无法销毁，只能刷新页面解决。标签页缓存通过keep-alive实现，按暂无从内容中销毁组件方法，尝试在deactivated钩子或者beforeRouterLevel钩子中手动$destroy(),但销毁组件后，该组件再次打开会一直无法缓存，网上查资料作者说子组件的生命周期在父组件控制，暂时没有其他方法销毁子组件
