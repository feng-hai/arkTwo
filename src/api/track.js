import axios from '@/libs/api.request'


export const getTrackData = (option) => {
  return axios.request({
    url: '/bigger/national_standard',
    params: option,
    method: 'get'
  })
}

// 车辆的基本信息数据
export const getVehicleData = (params) => {
	// console.log(params, 'params');
  return axios.request({
    url: '/sensor/vehicle_history/' + params.unid,
    params: params,
    method: 'get'
  })
}

