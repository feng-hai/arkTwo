import {
  getDataByParams,
  getDataByParamsForSearch
} from '@/api/handle'
import {
  translateDataToTree,
  getCookiesValueByKey

} from '@/libs/util.js'

export default {
  state: {
    // bigInfo:{}
  },
  mutations: {

    // setBigInfo(state, bigInfo) {
    //   state.bigInfo[bigInfo.type] = bigInfo.map(item => {
    //     return {
    //       label: item.name,
    //       value: item.unid
    //     }
    //   })
    // }

  },
  getters: {
    // getBigInfo: state => (type) => {
    //     return state.bigInfo[type]
    // }
  },
  actions: {
    getDevices({
      commit
    }, options) {
      var option = {};
      option.url = "/firemen/map/" + options.unid + "/candidate",
        option.method = "get";
      option.dt = new Date().getTime();
      return new Promise((resolve, reject) => {
        getDataByParams(option).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })

      })
    },
    AddMapAction({
      commit
    }, options) {
      var option = {};
      option.url = "/firemen/map",
        option.method = "post";
      option.data = options
      console.log("新增图层", option)
      return new Promise((resolve, reject) => {
        getDataByParams(option).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })

      })
    },
    updateMapAction({
      commit
    }, options) {
      var option = {};
      option.url = "/firemen/map/" + options.unid,
        option.method = "put";
      option.data = options
      return new Promise((resolve, reject) => {
        getDataByParams(option).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    deleteMapAction({
      commit
    }, options) {
      var option = {};
      option.url = "/firemen/map/" + options.unid,
        option.method = "delete";
      return new Promise((resolve, reject) => {
        getDataByParams(option).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getMapAction({
      commit
    }, options) {
      var option = {};
      option.url = "/firemen/map",
        option.method = "get";
      options.dt = new Date().getTime();
      option.params = options

      return new Promise((resolve, reject) => {
        getDataByParams(option).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })

      })
    },
    setMarkerAction({
      commit
    }, options) {
      var option = {};
      option.url = "/firemen/map/marker",
        option.method = "post";
      option.data = options
      return new Promise((resolve, reject) => {
        getDataByParams(option).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })

      })
    },
    updateMarkerAction({
      commit
    }, options) {
      var option = {};
      option.url = "/firemen/map/marker/" + options.unid,
        option.method = "put";
      option.data = options
      return new Promise((resolve, reject) => {
        getDataByParams(option).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })

      })
    },
    deleteMarkerAction({
      commit
    }, options) {
      var option = {};
      option.url = "/firemen/map/marker/" + options.unid,
        option.method = "delete";
      return new Promise((resolve, reject) => {
        getDataByParams(option).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })

      })
    },
    getMarkersAction({
      commit
    }, options) {
      var option = {};
      option.url = "firemen/map/" + options.unid + "/marker",
        option.method = "get";
        option.dt = new Date().getTime();
      return new Promise((resolve, reject) => {
        getDataByParams(option).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })

      })
    }
  }
}
