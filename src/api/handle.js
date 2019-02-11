import axios from '@/libs/api.request'
export const getDataByParams = (option) => {
  return axios.request({
    url: option.url,
    method: option.method,
    params: option.params,
    data: option.data
  })
}

export const getAllQuery = (functions) => {
  return axios.all(functions)
}
export const getQuery = (option) => {
  return axios.get(option)
}
