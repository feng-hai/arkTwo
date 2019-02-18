import {
  getOrganizationInfo,
  getMenuInfo,
  getRolesInfo
} from '@/api/publicResource'
import {
  translateDataToTree
} from "@/libs/util.js"
// import {
//   setToken,
//   getToken
// } from '@/libs/util'
// import user from '@/assets/js/user'

export default {
  state: {
    organizationList: [],
    orgTree: [],
    menusList: [],
    roles: []
  },
  mutations: {
    setOrganization(state, orgInfo) {
      state.orgTree = translateDataToTree(orgInfo)
      state.organizationList = orgInfo
    },
    setMenusList(state, menuInfo) {
      state.menusList = menuInfo;
    },
    setRolesList(state, rolesInfo) {
      state.roles = rolesInfo;
    }
  },
  getters: {
    // getTableInfoById: (state, getters) => (id) => {
    //   return state.tablesInfo[id]
    // }
    getOrganizationInfo: state => state.organizationList,
    getMenusInfo: state => state.menusList,
    getRolesInfo: state => state.roles,
    getOrgTreeInfo: state => state.orgTree
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
    getRolesInfoAction({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getRolesInfo({
          page_id: 0,
          page_size: 1000
        }).then((res) => {

          commit('setRolesList', res.data)
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
