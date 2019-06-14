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
  bigInfo:{}
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
    getBigInfo: state => (type) => {
        return state.bigInfo[type]
    }
  },
  actions: {
     getBigInfoAction({
      commit
    }, options) {

      var option = {};
      option.url="/firemen/percent",
      option.method="get";
      option.params=options
    //  https://api.renxingzuche.com/firemen/percent?channel=FIRE_FACILITY&system_id=157
      return new Promise((resolve, reject) => {

          getDataByParams(option).then(res => {
            // var data = {
            //   data: res.data.collection,
            //   count: res.data.count

            // }
            //console.log(res)
            //commit('setBigInfo', res)
            resolve(res)
          }).catch(err => {
            reject(err)
          })

      })
    }

  }
}
