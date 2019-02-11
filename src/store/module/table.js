import {
  // getTableView,
  getTableColumns
} from '@/api/view'
import COLUMNS from '@/assets/data/columns' // 引入列表信息
import {
  getDataByParams
} from '@/api/handle'

import {
//  getParams2,
  toJson
} from '@/libs/util'
export default {
  state: {
    tablesInfo: {},
    tableData: {}
  },
  mutations: {
    setTableInfo (state, tableInfo) {
      state.tablesInfo[tableInfo.id] = tableInfo
    },
    setTableData (state, tableData) {
      state.tableData = tableData
    }
  },
  getters: {
    getTableInfoById: (state, getters) => (id) => {
      return state.tablesInfo[id]
    }
  },
  actions: {
    getTableColumns ({
      commit
    }, option) {
      return new Promise((resolve, reject) => {
        // getDataByParams(option).then(res => {
        //   // const data = JSON.parse(res.data)
        //   // commit('setTableData', data)
        //   resolve(res)
        // }).catch(err => {
        //   reject(err)
        // })
      })
    },
    getCheckOnly ({
      commit
    }, option) {
      return new Promise((resolve, reject) => {
        getDataByParams(option).then(res => {
          // const data = JSON.parse(res.data)
          // commit('setTableData', data)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    editTableData ({
      commit
    }, option) {
      return new Promise((resolve, reject) => {
        getDataByParams(option).then(res => {
          // const data = JSON.parse(res.data)
          // commit('setTableData', data)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    deleteTableData ({
      commit
    }, option) {
      return new Promise((resolve, reject) => {
        getDataByParams(option).then(res => {
          // const data = JSON.parse(res.data)
          // commit('setTableData', data)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    addTableData ({
      commit
    }, option) {
      return new Promise((resolve, reject) => {
        getDataByParams(option).then(res => {
          // const data = JSON.parse(res.data)
          // commit('setTableData', data)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getTableData ({
      commit
    }, option) {
      return new Promise((resolve, reject) => {
        getDataByParams(option).then(res => {
          var data = res.data
          console.log()
          // const data = JSON.parse(res.data)
          commit('setTableData', data)
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleTablesInfo ({
      commit
    },
    tableId
    ) {
      return new Promise((resolve, reject) => {
        if (tableId === 124 || tableId === 125) {
          const data = COLUMNS['C' + tableId]
          commit('setTableInfo', data)
          resolve(data)
        } else {
          getTableColumns(tableId).then(res => {
            const data = toJson(res.data)
            commit('setTableInfo', data)
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        }
      })
    }
  }
}
