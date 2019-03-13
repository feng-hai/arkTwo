import { getTrackData, getVehicleData} from '@/api/track'

export default {
  state: {
    
  },
  mutations: {
    
    // GET_OPTIONS: (state, data)=>{
    //   state.getoptions = data;
    // }

  },
  getters: {
    // getProvince: state => state.Province,
    // getEcharts: state => state.getEcharts,
    // getArr: state => state.getArr,
    // dataAnalysisArr: state => state.dataAnalysisArr,
    // dtdywdArr: state => state.dtdywdArr,
    // getoptions: state => state.getoptions,
  },
  actions: {
    getTrack({commit}, option){
      return new Promise((resolve, reject) => {
        getTrackData(option).then(res => {
          var data = res.data
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
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
