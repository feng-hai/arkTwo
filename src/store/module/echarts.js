import { 
  getEchartsData, getInfoCarData, 
  getAlarmSetup, getModel, getRealTimeData, 
  vehicleDataAnlaysis, getCarNumber, getMileageNumber, 
  getCarEvent, getWorkTime} from '@/api/echartsMap'

export default {
  state: {
    Province: '',
    getEcharts: [],
    getArr: [],
    dataAnalysisArr: [],
    dtdywdArr: {},
    getoptions: [],
  },
  mutations: {
    GET_PROVINCE: (state, data) =>{
      state.Province = data;
    },
    GET_ARR: (state, data) => {
      let dataaaaaaa = [...data]
      state.getArr = Object.assign(dataaaaaaa)
    },
    setEchartsData(state, data){
      state.getEcharts = data
    },
    GET_OPEN_ANALYSIS: (state, data) => {
      state.dataAnalysisArr = data
    },
    GET_DTDYWD: (state, data)=>{
      state.dtdywdArr = data;
    },
    GET_OPTIONS: (state, data)=>{
      state.getoptions = data;
    }

  },
  getters: {
    getProvince: state => state.Province,
    getEcharts: state => state.getEcharts,
    getArr: state => state.getArr,
    dataAnalysisArr: state => state.dataAnalysisArr,
    dtdywdArr: state => state.dtdywdArr,
    getoptions: state => state.getoptions,
  },
  actions: {
    //电池块传递信息给曲线分析页面
    openAnalysis({commit}, obj){
      commit('GET_OPEN_ANALYSIS', obj)
    },

    // 获取入网数量
    getCarDataNumber({commit}, option){
      return new Promise((resolve, reject) => {
        getCarNumber(option).then(res => {
          var data = res.data;
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
     // 累计工作时间
    getWorkTimeNumber({commit}, option){
      return new Promise((resolve, reject) => {
        getWorkTime(option).then(res => {
          var data = res.data;
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取总里程数
    getMileageDataNumber({commit}, option){
      return new Promise((resolve, reject) => {
        getMileageNumber(option).then(res => {
          var data = res.data;
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },

    // 获取故障车辆的数量
    getCarEventNumber({commit}, option){
      return new Promise((resolve, reject) => {
        getCarEvent(option).then(res => {
          var data = res.data;
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },

    // 高德地图的数据
  	getEchartData ({commit}, option) {
      return new Promise((resolve, reject) => {
        getEchartsData(option).then(res => {
          var data = res.data
          commit('setEchartsData', data)
          resolve(data)
        }).catch(err => {
          reject(err)
        }) 
      })
    },
    // 报警信息的数据
    getAlarmSet ({commit}, option) {
      return new Promise((resolve, reject) => {
        getAlarmSetup(option).then(res => {
          var data = res.data
          resolve(data)
        }).catch(err => {
          reject(err)
        }) 
      })
    },
    //地图省会联动
    getProvince({commit}, getProvince){
      commit('GET_PROVINCE', getProvince)
    },
    getArr({commit}, getArr){
      commit('GET_ARR', getArr)
    },
    //获取高德地图具体的车辆信息的接口
    getInfoCarDate({commit}, carId){
      return new Promise((resolve, reject) =>{
        getInfoCarData(carId).then(res=>{
          var data = res.data;
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },

     getModelData({commit}, modelId){
      return new Promise((resolve, reject) =>{
        getModel(modelId).then(res=>{
          var data = res.data;
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
     getRealData({commit}, modelId){
      return new Promise((resolve, reject) =>{
        getRealTimeData(modelId).then(res=>{
          var data = res.data;
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getvehicleDataAnlaysis({commit}, vehicleId){
      return new Promise((resolve, reject) =>{
        vehicleDataAnlaysis(vehicleId).then(res=>{
          var data = res.data;
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getDtdyWdArr({commit}, data){
      commit('GET_DTDYWD', data);
    },
    getOption({commit}, data){
      commit('GET_OPTIONS', data);
    }


  }
}
