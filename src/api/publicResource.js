import axios from '@/libs/api.request'

export const getOrganizationInfo = (option) => {
  return axios.request({
    url: '/bigger/domain',
    params: option,
    method: 'get'
  })
}
export const getMenuInfo = (option) => {
  return axios.request({
    url: '/bigger/security/menu',
    params: option,
    method: 'get'
  })
}

export const getMenuInfoData = (option) => {
  return axios.request({
    url: '/bigger/security/menu',
    // params: option,
    method: 'get'
  })
}

export const getRolesInfo = (option) => {
  return axios.request({
    url: '/bigger/security/privilege',
    params: option,
    method: 'get'
  })
}

export const pustRolesInfo = (option) => {
  var qs = require('qs')
  console.log('option', option);
  return axios.request({
    url: '/bigger/security/privilege/bind',
    data:qs.stringify(option),
    method: 'post',
  })
}
// 获取右边的数据
export const getRoleInfoData = (option) => {
  return axios.request({
    url: '/bigger/security/privilege/' + option.unid + '/menu',
    method: 'get'
  })
}
export const getModelInfo = (option) => {//智航
  return axios.request({
    url: '/bigger/model',
    params: option,
    method: 'get'
  })
}
