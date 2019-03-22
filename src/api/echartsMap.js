import axios from '@/libs/api.request'

// 高德地图的数据
export const getEchartsData = (option) => {
  return axios.request({
    url: '/sensor/vehicle/cluster',
    params: option,
    method: 'get'
  })
}

// 车辆的基本信息数据
export const getInfoCarData = (params) => {
  return axios.request({
    url: '/bigger/vehicle/' + params.unid,
    params: params,
    method: 'get'
  })
}

// 总里程数
export const getMileageNumber = (params) => {
  let data = new Date().getTime();
  return axios.request({
    url: "/bigger/counter/mileage",
    data: params,
    method: 'get'
  })
}

// 累计工作时间
export const getWorkTime = (params) => {
  let data = new Date().getTime();
  return axios.request({
    url: "/bigger/counter/worktime",
    data: params,
    method: 'get'
  })
}

// 入网数量的数据
export const getCarNumber = (params) => {
  return axios.request({
    url: '/bigger/vehicle',
    params: params,
    data: params,
    method: 'get'
  })
}

// 故障车辆的数量
export const getCarEvent = (params) => {
  return axios.request({
    url: '/bigger/vehicle',
    params: params,
    data: params,
    method: 'get'
  })
}


export const getAlarmSetup = (option) => {
  return axios.request({
    url: '/bigger/alarm_setup',
    params: option,
    method: 'get'
  })
}

export const getModel = (params) => {
  return axios.request({
    url: '/bigger/model/' + params.unid,
    params: params,
    method: 'get'
  })
}

export const getRealTimeData = (params) => {
  return axios.request({
    url: '/bigger/realtime_data/' + params.unid,
    params: params,
    method: 'get'
  })
}

export const vehicleDataAnlaysis = (params) => {
  // console.log(params, 'params');
  return axios.request({
    url: '/sensor/vehicle_history/' + params.unid,
    params: params,
    method: 'get'
  })
}

