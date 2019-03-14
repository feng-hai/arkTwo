import axios from '@/libs/api.request'

export const getVechileInfo = (params) => {
//  console.log(params)
  return axios.request({
    url: 'bigger/vehicle/info',
    method: 'get',
    params: params
  })
}
export const getVehicleHistory = (option) => {
  return axios.request({
    url: option.url,
    method: 'get',
    params: option.params
  })
}

// 数据获取
export const getModel = (params) => {
  return axios.request({
    url: '/bigger/model/' + params.unid,
    // params: params,
    method: 'get'
  })
}
// 修改
export const getModelpPut = (params) => {
  console.log(params, '1111111111111111');

  var qs = require('qs')
  return axios.request({
    url: '/bigger/model/' + params.unid,
    data: qs.stringify(params),
    method: 'put'
  })
}

// 提交
export const getModelPost = (params) => {
  console.log(params, '22222222222222222222');
  var qs = require('qs')
  return axios.request({
    url: '/bigger/model',
    data: qs.stringify(params),
    method: 'post'
  })
}