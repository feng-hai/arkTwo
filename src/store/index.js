import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'
import echart from './module/echarts'
import app from './module/app'
import table from './module/table'
import vehicle from './module/vehicle'
import addRoutes from './dynamicRouter/addRoutes'
import publicResource from './module/publicResource'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    app,
    echart,
    addRoutes,
    publicResource,
    table,
    vehicle
  }
})
