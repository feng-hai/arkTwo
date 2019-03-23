import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import iView from 'iview'
import {
  setToken,
  getToken,
  canTurnTo,
  setTitle
} from '@/libs/util'
import config from '@/config'
const {
  homeName
} = config

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'hash'
})
const LOGIN_PAGE_NAME = 'login'
// 静态菜单和动态菜单结合
const getMenus = () => {
  var hash = {}

  routes.forEach(item => {
    hash[item.name] = true
  })
  store.state.addRoutes.routeData.forEach(item => {
    if (!hash[item.name]) {
      routes.push(item)
    }
  })
  // let menu = routes.push.apply(routes, store.state.addRoutes.routeData)
  // return menu
}

const turnTo = (to, access, next) => {
  let menu = getMenus()
  next()
  // if (canTurnTo(to.name, access, menu)) next() // 有权限，可访问
  // else next({
  //   replace: true,
  //   name: 'error_401'
  // }) // 无权限，重定向到401页面
}

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const token = getToken()
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: homeName // 跳转到homeName页
    })
  } else {
    if (store.state.user.hasGetInfo) {
      turnTo(to, store.state.user.access, next)
    } else {
      store.dispatch('getUserInfo').then(user => {
        sessionStorage.setItem('menuData', JSON.stringify(store.state.user.menus))
        // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
        turnTo(to, user.access, next)
      }).catch(() => {
        setToken('')
        next({
          name: 'login'
        })
      })
    }
  }
})

router.afterEach(to => {
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
