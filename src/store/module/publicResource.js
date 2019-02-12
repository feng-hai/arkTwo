import {
  getOrganizationInfo,
  getMenuInfo
} from '@/api/publicResource'
// import {
//   setToken,
//   getToken
// } from '@/libs/util'
// import user from '@/assets/js/user'

export default {
  state: {
    organizationList: [],
    menusList: []
  },
  mutations: {
    setOrganization(state, orgInfo) {
      state.organizationList = orgInfo
    },
    setMenusList(state, menuInfo) {
      state.menusList = menuInfo;
    }
  },
  getters: {
    // getTableInfoById: (state, getters) => (id) => {
    //   return state.tablesInfo[id]
    // }
    getOrganizationInfo: state => state.organizationList,
    getMenusInfo: state => state.menusList
  },
  actions: {
    getMenuInfoAction({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getMenuInfo({
          page_id: 0,
          page_size: 1000
        }).then((res) => {
        
          commit('setMenusList', res.data)
          resolve(res.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 分组信息
    getOrgInfoAction({
      state,
      commit
    }, option) {
      return new Promise((resolve, reject) => {
        getOrganizationInfo({
          page_id: 0,
          page_size: 1000
        }).then((res) => {
          commit('setOrganization', res.data)
          resolve(res.data)
        }).catch(error => {
          reject(error)
        })
      })

    }
  }
}
