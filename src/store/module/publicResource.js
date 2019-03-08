import {
  getOrganizationInfo,
  getMenuInfo,
  getRolesInfo
} from '@/api/publicResource'
import {
  translateDataToTree,
  getCookiesValueByKey

} from "@/libs/util.js"


export default {
  state: {
    organizationList: [],
    orgTree: [],
    menusList: [],
    roles: []
  },
  mutations: {
    setOrganization(state, orgInfo) {
      var rootId = getCookiesValueByKey("domainId")
      console.log(orgInfo)
      state.orgTree = translateDataToTree(orgInfo, rootId)
      state.organizationList = orgInfo
    },
    setMenusList(state, menuInfo) {
      state.menusList = menuInfo
    },
    setRolesList(state, rolesInfo) {
      state.roles = rolesInfo
    }
  },
  getters: {
    // getTableInfoById: (state, getters) => (id) => {
    //   return state.tablesInfo[id]
    // }
    getOrganizationInfo: state => state.organizationList,
    getMenusInfo: state => state.menusList,
    getRolesInfo: state => state.roles,
    getOrgTreeInfo: state => state.orgTree,
    getInfo: state => (type) => {
      if (type == 'orgTree') {
        return state.orgTree
      } else if (type == 'org') {
        return state.organizationList
      } else if (type == 'menu') {
        return state.menusList
      } else if (type == 'role') {
        return state.roles
      }
    }
  },
  actions: {
    updateData({
      commit
    }) {
      console.log('updateData')
      commit('setOrganization', [])
    },
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

          commit('setRolesList', res.data.collection)


            resolve(res.data.collection)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 分组信息
    getOrgInfoAction({
      state,
      commit
    }) {

      return new Promise((resolve, reject) => {
        getOrganizationInfo({
          page_id: 0,
          page_size: 1000
        }).then((res) => {
          commit('setOrganization', res.data.collection)
          resolve(res.data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
