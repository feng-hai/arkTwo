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
  return axios.request({
    url: '/sensor/vehicle_history/' + params.unid,
    params: params,
    method: 'get'
  })
}

