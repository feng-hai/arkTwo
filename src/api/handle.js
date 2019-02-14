import axios from '@/libs/api.request'
export const getDataByParams = (option) => {
  var qs = require('qs')
  return axios.request({
    url: option.url,
    method: option.method,
    params: option.params,
    data: qs.stringify(option.data)
  })
}
export const getDataByParamsCount = (option) => {
  var qs = require('qs')
  return axios.request({
    url: option.url + "/count",
    method: option.method,
    params: option.params,
    data: qs.stringify(option.data)
  })
}
export const getAllQuery = (functions) => {
  return axios.all(functions)
}
export const getDataByParamsForSearch = (option) => {

  return new Promise((resolve, reject) => {


    axios.all([getDataByParams(option), getDataByParamsCount(option)]).then(
      ([resdata, resCount]) => {
        var res = {
          data: resdata.data,
          count: resCount.data
        }
        resolve(res)
      }).catch(err => {

      reject(err)
    })
  })

}
export const getQuery = (option) => {
  return axios.get(option)
}
