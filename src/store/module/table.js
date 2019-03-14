import {
  getTableView,
  getTableColumns

} from '@/api/view'
import COLUMNS from '@/assets/data/columns' // 引入列表信息
import {
  getDataByParams,
  getDataByParamsForSearch
} from '@/api/handle'

import {
  //  getParams2,
  toStr,
  toJson
} from '@/libs/util'
export default {
  state: {
    tablesInfo: {},
    tableData: {}
  },
  mutations: {
    setTableInfo(state, tableInfo) {
      state.tablesInfo[tableInfo.id] = tableInfo
    },
    setTableData(state, tableData) {
      state.tableData = tableData
    }
  },
  getters: {
    getTableInfoById: (state, getters) => (id) => {
      return state.tablesInfo[id]
    }
  },
  actions: {
    getAlltableInfo({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getTableView().then(res => {
          // const data = JSON.parse(res.data)
          // commit('setTableData', data)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },

    getCheckOnly({
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
    editTableData({
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
    deleteTableData({
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
    addTableData({
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
    getHistoryTable({ //查询车辆历史数据
      commit
    }, options) {
      var option = options.options
      return new Promise((resolve, reject) => {
        getDataByParams(option).then(res => {
          console.log(res)
          var data = {
            data: res.data.datas,
            count:0
          }
          commit('setTableData', data)
          resolve(data)
        }).catch(err => {
          // console.log(err.response);
          // reject(err)
          resolve({
            data: [],
            count: 0
          })
        })
      })
    },
    getTableData({
      commit
    }, options) {
      var option = options.options
      return new Promise((resolve, reject) => {
        if (options.isCount) {
          if ('page_id' in option.params) {
            getDataByParamsForSearch(option).then(res => {
              var data = res // {data:array,count:number}
              commit('setTableData', data)
              resolve(data)
            }).catch(err => {
              //console.log(err.response);
              //reject(err)
              resolve({
                data: [],
                count: 0
              })
            })
          } else {
            getDataByParams(option).then(res => {
              var data = {
                data: res.data,
                count: 0
              }
              commit('setTableData', data)
              resolve(data)
            }).catch(err => {
              // console.log(err.response);
              // reject(err)
              resolve({
                data: [],
                count: 0
              })
            })
          }
        } else {
          getDataByParams(option).then(res => {
            var data = {
              data: res.data.collection,
              count: res.data.count
            }
            commit('setTableData', data)
            resolve(data)
          }).catch(err => {
            // console.log(err.response);
            // reject(err)
            resolve({
              data: [],
              count: 0
            })
          })
        }
      })
    },

    handleTablesInfo({
        commit
      },
      tableId
    ) {
      var that = this
      return new Promise((resolve, reject) => {
        if (tableId == 124 || tableId == 125) {
          const data = COLUMNS['C' + tableId]
          // console.log("buttons", toStr(data.buttons));
          commit('setTableInfo', data)
          resolve(data)
        } else {
          getTableColumns(tableId).then(res => {
            var data = res.data

            var columnObject = toJson(data.grid_column)
            var columns = columnObject.columnField

            var fields = columnObject.fields
            // fields.buttons.map(item => {
            //   console.log(item,typeof eval(item));
            // })

            columns.map(item => {
              item = Object.assign({
                title: '视图名称',
                key: item.field,
                align: 'center',
                isSearch: true, // 该字段是否可以查询 true为可以查询，false不作为查询条件
                isSearchFront: true, // 放在搜索按钮前面，false放在更多里面
                sortable: false,
                editable: true,
                editType: 'text'
              }, item)
              return item
            })

            const viewManagement = {
              id: data.unid,
              name: data.name,
              url: fields.url,
              addUrl: fields.addUrl,
              deleteUrl: fields.deleteUrl,
              editUrl: fields.editUrl,
              des: fields.des,
              isCount: fields.isCount,
              addPermit: true, // 新增按钮是否有权限
              isRouter: { // 新增按钮显示时， 设置为true，跳转到url对应的页面，否则在当前页面新增
                isTrue: true,
                url: '',
                title: '测试用'
              },
              deletePermit: true, // 删除按钮
              editPermit: true, // 修改按钮
              itemDefault: fields.itemDefault, // 现在一行默认值，json字符串
              columns: columns, // 列表表头明细
              ruleValidate: fields.rule, // 新增数据项规则
              buttons: fields.buttons // 新增、批量删除按钮
            }
            commit('setTableInfo', viewManagement)
            resolve(viewManagement)
          }).catch(err => {
            reject(err)
          })
        }
      })
    }
  }
}
