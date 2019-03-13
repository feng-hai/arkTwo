import {
  getOrganizationInfo,
  getMenuInfo,
  getRolesInfo,
  getModelInfo
} from '@/api/publicResource'
import {
  translateDataToTree,
  getCookiesValueByKey

} from '@/libs/util.js'

export default {
  state: {
    organizationList: [],
    orgTree: [],
    menusList: [],
    roles: [],
    models: []
  },
  mutations: {
    setOrganization(state, orgInfo) {
      var rootId = getCookiesValueByKey('domainId')

      state.orgTree = translateDataToTree(orgInfo, rootId)
      state.organizationList = orgInfo
    },
    setMenusList(state, menuInfo) {
      state.menusList = menuInfo.map(item => {

        return {
          label: item.name,
          value: item.unid
        }

      })
    },
    setRolesList(state, rolesInfo) {
      state.roles = rolesInfo
    },
    setModelList(state, modelInfo) {

      state.models = modelInfo.map(item => {
        return {
          label: item.name,
          value: item.unid
        }
      });

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
        console.log("menu", state.menusList)
        return state.menusList
      } else if (type == 'role') {
        return state.roles
      } else if (type == 'model') {

        return state.models
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
          commit('setMenusList', res.data.collection)
          console.log(res.data.collection)
          resolve(res.data.collection)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getVehicleModelAction({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getModelInfo({
          page_id: 0,
          page_size: 1000
        }).then((res) => {
          commit('setModelList', res.data.collection)
          resolve(res.data.collection)
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
