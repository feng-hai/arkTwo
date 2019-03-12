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
export const getRolesInfo = (option) => {
  return axios.request({
    url: 'bigger/security/privilege',
    params: option,
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
