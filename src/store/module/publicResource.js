import {
  getOrganizationInfo,
  getMenuInfo,
  getRolesInfo,
  // getModelInfo,
  // getMenuInfoData,
  // getRoleInfoData,
  // pustRolesInfo
  // getAllRolesInfoData
} from '@/api/publicResource'
import {
  translateDataToTree
  // getCookiesValueByKey

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
    setOrganization (state, orgInfo) {
      // TODO 当前用户的机构id
      var rootId = 'C98D97238CA34F96A969BDA01DAB31FA'; // getCookiesValueByKey('domainId')
      state.orgTree = translateDataToTree(orgInfo, rootId)
      console.log(state.orgTree, "orgTree")
      state.organizationList = orgInfo
    },
    setMenusList (state, menuInfo) {
      console.log(menuInfo, "menuInfo")
      state.menusList = menuInfo.map(item => {
        return {
          label: item.name,
          value: item.unid
        }
      })
      console.log(state.menusList, "menusList")
    },
    setRolesList (state, rolesInfo) {
      state.roles = rolesInfo.map(item => {
        return {
          label: item.name,
          value: item.unid
        }
      })
    },
    setModelList (state, modelInfo) {
      state.models = modelInfo.map(item => {
        return {
          label: item.name,
          value: item.unid
        }
      })
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
        // console.log("menu", state.menusList)
        return state.menusList
      } else if (type == 'role') {
        return state.roles
      } else if (type == 'model') {
        return state.models
      }
    }
  },
  actions: {
    updateData ({
      commit
    }) {
      //  console.log('updateData')
      commit('setOrganization', [])
    },
    // 获取所有的role数据
    getMenuInfoDataAction ({
      commit
    }, option) {
      return new Promise((resolve, reject) => {
        getAllRolesInfoData(option).then((res) => {
          let data = res.data
          resolve(data);
        }).catch(error => {
          reject(error);
        })
      })
    },
    getMenuInfoAction ({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getMenuInfo({
          offset: 0,
          page_size: 1000
        }).then((res) => {
          commit('setMenusList', res.data)
          //  console.log(res.data.collection)
          resolve(res.data.collection)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getVehicleModelAction ({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getModelInfo({
          offset: 0,
          page_size: 1000
        }).then((res) => {
          commit('setModelList', res.data.collection)
          resolve(res.data.collection)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 左边所有的菜单
    getRolesInfoData ({
      commit
    }, option) {
      return new Promise((resolve, reject) => {
        getMenuInfoData(option).then(res => {
          let data = res.data;
          // console.log(data, 'data');
          resolve(data);
        }).catch(error => {
          reject(error);
        })
      })
    },

    // 左边所有的菜单
    postRolesInfoData ({
      commit
    }, option) {
      return new Promise((resolve, reject) => {
        pustRolesInfo(option).then(res => {
          let data = res.data;
          console.log(data, 'data');
          resolve(res);
        }).catch(error => {
          reject(error);
        })
      })
    },
    getcurrentRolesInfoData ({
      commit
    }, option) {
      return new Promise((resolve, reject) => {
        getRoleInfoData(option).then(res => {
          let data = res.data
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getRolesInfoAction ({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getRolesInfo({
          offset: 0,
          page_size: 1000
        }).then((res) => {
          // console.log("角色信息", res);
          commit('setRolesList', res.data.collection)

          resolve(res.data.collection)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 分组信息
    getOrgInfoAction ({
      state,
      commit
    }) {
      return new Promise((resolve, reject) => {
        getOrganizationInfo({
          offset: 0,
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
