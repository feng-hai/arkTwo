import { getDataDetails, vehicleDetails} from '@/api/dataDetails'

export default {
  state: {
    getWebscoket: [],
    ws: null,
  },
  mutations: {
    GET_WEBSCOKET: (state, data) => {
      state.getWebscoket = data;
      console.log(data, 'mutations');
    },
    GET_WS: (state, data) => {
      state.ws = data;
    }
  },
  getters: {
    getWebscoket: state => state.getWebscoket,
    ws: state => state.ws
  },
  actions: {
    // 点击table row信息到明细页面
    // getInfoDetails({commit}, option){
    //   return new Promise((resolve, reject) => {
    //     getInfoDetailsData(option).then(res => {
    //       var data = res.data
    //       resolve(data)
    //     }).catch(err => {
    //       reject(err)
    //     })
    //   })
    // },
    // 获取明细页面的title和名称
    getDetails({commit}){
      return new Promise((resolve, reject) => {
        getDataDetails().then(res => {
          var data = res.data
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getWebscokets({commit}, value){
      commit('GET_WEBSCOKET', value)
    },
    getws({commit}, ws){
      commit('GET_WS', ws)
    }
    // 获取title对应的值
    // getVehicleDetails({commit}){
    // 	return new Promise((resolve, reject) => {
    // 		vehicleDetails().then(res => {
    // 			var data = res.data;
    // 			resolve(data)
    // 		}).catch(err => {
    // 			reject(err);
    // 		})
    // 	})
    // }
    // //点击搜索数据的接口
    // getVehicle({commit}, option){
    //   return new Promise((resolve, reject) => {
    //     getVehicleData(option).then(res => {
    //       var data = res.data;
    //       resolve(data)
    //     }).catch(err => {
    //       reject(err)
    //     })
    //   })
    // },
   //  //电池块传递信息给曲线分析页面
   //  openAnalysis({commit}, obj){
   //    commit('GET_OPEN_ANALYSIS', obj)
   //  },
   //  // 高德地图的数据
  	// getEchartData ({commit}, option) {
   //    return new Promise((resolve, reject) => {
   //      getEchartsData(option).then(res => {
   //        var data = res.data
   //        commit('setEchartsData', data)
   //        resolve(data)
   //      }).catch(err => {
   //        reject(err)
   //      }) 
   //    })
   //  },
  }
}
