import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'
import app from './module/app'
import table from './module/table'
import vehicle from './module/vehicle'
import addRoutes from './dynamicRouter/addRoutes'
import publicResource from './module/publicResource'
import biggerScreen from  './module/biggerScreen'
import Icons_Annotation from './module/Icons_Annotation'
Vue.use(Vuex)

let store= new Vuex.Store({
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
    addRoutes,
    publicResource,
    table,
    vehicle,
    biggerScreen,
    Icons_Annotation
  }
})
//加载事件
import vuexEvent from './vuexEvent/vuex-events'
vuexEvent(store)

export default store;
