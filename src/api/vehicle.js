import axios from '@/libs/api.request'

export const getVechileInfo= (params) => {
//  console.log(params)
  return axios.request({
    url: 'bigger/vehicle/info',
    method: 'get',
    params: params
  })
}
export const getVehicleHistory=(option)=>{
  return axios.request({
    url: option.url,
    method: 'get',
    params: option.params
  })
}
