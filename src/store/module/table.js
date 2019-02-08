import {
  //getTableView,
  getTableColumns,
} from '@/api/view'
import {
  getDataByParams
} from '@/api/handle'

import {
  getParams2,
  toJson
} from "@/libs/util"
export default {
  state: {
    tablesInfo: {},
    tableData:{}
  },
  mutations: {
    setTableInfo(state, tableInfo) {
      state.tablesInfo[tableInfo.id] = tableInfo
    },
    setTableData(state,tableData)
    {
      state.tableData=tableData;
    }
  },
  getters: {
    getTableInfoById:(state, getters) => (id)  => {
      return state.tablesInfo[id];
    }
  },
  actions: {
    getTableColumns({commit},option){
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
    getCheckOnly({commit},option){

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
    editTableData({commit},option){
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
    deleteTableData({commit},option){
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
    addTableData({commit},option){
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
    getTableData({commit},option){
      return new Promise((resolve, reject) => {
        getDataByParams(option).then(res => {
          const data = JSON.parse(res.data)
          commit('setTableData', data)
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleTablesInfo({
      commit
    },
      tableId
    ) {
      return new Promise((resolve, reject) => {
        getTableColumns(tableId).then(res => {
          const data = toJson(res.data)
          commit('setTableInfo', data)
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
