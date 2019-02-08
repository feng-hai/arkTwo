import {
  ADD_ROUTES
} from './mutations_type'
import Menufilter from './menufilter'
import router from '@/router'
const addRoutes = {
  state: {
    routeData: [],
    hasGetInfo: false
  },
  mutations: {
    [ADD_ROUTES](state, addrouter) {
      state.routeData = addrouter;
      state.hasGetInfo = true;
      let routes = []
      Menufilter(routes, addrouter) // 将后台的路由数据components转化成组件
      router.addRoutes(routes) // 添加路由
    }
  },
  actions: {
    add_Routes({
      commit
    }, addrouter) {
      commit(ADD_ROUTES, addrouter)
    },
    clear_Routes({commit}){
      //commit(ADD_ROUTES, [])
    }
  }
}
export default addRoutes
