import {
  getVechileInfo,
  getVehicleHistory,
  getModel,
  getModelpPut,
  getModelPost
} from '@/api/vehicle.js'

export default {
  state: {
    // organizationList: [],
    // orgTree: [],
    // menusList: [],
    // roles: []
  },
  mutations: {
    // setOrganization(state, orgInfo) {
    //   state.orgTree = translateDataToTree(orgInfo)
    //   state.organizationList = orgInfo
    // },
    // setMenusList(state, menuInfo) {
    //   state.menusList = menuInfo;
    // },
    // setRolesList(state, rolesInfo) {
    //   state.roles = rolesInfo;
    // }
  },
  getters: {
    // // getTableInfoById: (state, getters) => (id) => {
    // //   return state.tablesInfo[id]
    // // }
    // getOrganizationInfo: state => state.organizationList,
    // getMenusInfo: state => state.menusList,
    // getRolesInfo: state => state.roles,
    // getOrgTreeInfo: state => state.orgTree
  },
  actions: {
    getVehicleInfoAction ({
      commit
    }, option) {
      return new Promise((resolve, reject) => {
        getVechileInfo(option).then(res => {
          resolve(res.data)
        })
      }).catch(error => {
        reject(error)
      })
    },
    getVehicleHistoryAction ({
      commit
    }, option) {
      return new Promise((resolve, reject) => {
        getVehicleHistory(option).then(res => {
          resolve(res.data)
        })
      }).catch(error => {
        reject(error)
      })
    },
    // 获取数据
    getModelInfo({commit}, option){
        return new Promise((resolve, reject) => {
            getModel(option).then(res => {
                resolve(res.data)
            })
        }).catch(error => {
            reject(error);
        })
    },
    // 修改数据
    putModelInfo({commit}, option){
        return new Promise((resolve, reject) => {
            getModelpPut(option).then(res => {
                resolve(res.data)
            })
        }).catch(error => {
            reject(error);
        })
    },
    // 提交数据
   postModelInfo({commit}){
        return new Promise((resolve, reject) => {
            getModelPost().then(res => {
                resolve(res.data)
            })
        }).catch(error => {
            reject(error);
        })
    }

    // getMenuInfoAction({
    //   commit
    // }) {
    //   return new Promise((resolve, reject) => {
    //     getMenuInfo({
    //       page_id: 0,
    //       page_size: 1000
    //     }).then((res) => {
    //
    //       commit('setMenusList', res.data)
    //       resolve(res.data)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    // getRolesInfoAction({
    //   commit
    // }) {
    //   return new Promise((resolve, reject) => {
    //     getRolesInfo({
    //       page_id: 0,
    //       page_size: 1000
    //     }).then((res) => {
    //
    //       commit('setRolesList', res.data)
    //       resolve(res.data)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    // // 分组信息
    // getOrgInfoAction({
    //   state,
    //   commit
    // }, option) {
    //   return new Promise((resolve, reject) => {
    //     getOrganizationInfo({
    //       page_id: 0,
    //       page_size: 1000
    //     }).then((res) => {
    //       commit('setOrganization', res.data)
    //       resolve(res.data)
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    //
    // }
  }
}
