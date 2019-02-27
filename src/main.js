// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import {
  directive as clickOutside
} from 'v-click-outside-x'
import installPlugin from '@/plugin'
import './index.less'
import '@/assets/icons/iconfont.css'
import 'vue-tree-halower/dist/halower-tree.min.css' // you can customize the style of the tree

import VCharts from 'v-charts'

import 'v-charts/lib/style.css'
import { VTree, VSelectTree } from 'vue-tree-halower'/* 全部引入，后续需要优化 */

Vue.use(VCharts)

Vue.use(VTree)
Vue.use(VSelectTree)
// import TreeTable from 'tree-table-vue'
// import VOrgTree from 'v-org-tree'
// import 'v-org-tree/dist/v-org-tree.css'
// import ("babel-polyfill")
// 实际打包时应该不引入mock
/* eslint-disable */
//if (process.env.NODE_ENV !== 'production') require('@/mock')

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})
// Vue.use(TreeTable)
// Vue.use(VOrgTree)
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */
importDirective(Vue)
Vue.directive('clickOutside', clickOutside)

//用户手动刷新页面，这是路由会被重设，要重新新增
if (sessionStorage.getItem('menuData') && sessionStorage.getItem('menuData').length > 0) {
  let routes = JSON.parse(sessionStorage.getItem('menuData'))

  if (routes) {
    store.dispatch("add_Routes", routes)
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
