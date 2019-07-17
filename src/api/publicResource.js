import axios from '@/libs/api.request'

export const getOrganizationInfo = (option) => {
  return axios.request({
    url: '/firemen/domain/flat',
    params: option,
    method: 'get'
  })
}
export const getMenuInfo = (option) => {
  return axios.request({
    url: '/legacy/security/menu',
    params: option,
    method: 'get'
  })
}
export const getRolesInfo = (option) => {
  return axios.request({
    url: '/legacy/security/privilege',
    params: option,
    method: 'get'
  })
}
