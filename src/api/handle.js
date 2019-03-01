import axios from '@/libs/api.request'

// 去除字符串头尾空格或指定字符
String.prototype.Trim = function (c) {
  if (c == null || c == '') {
    var str = this.replace(/^s*/, '')
    var rg = /s/
    var i = str.length
    while (rg.test(str.charAt(--i)));
    return str.slice(0, i + 1)
  } else {
    var rg = new RegExp('^' + c + '*')
    var str = this.replace(rg, '')
    rg = new RegExp(c)
    var i = str.length
    while (rg.test(str.charAt(--i)));
    return str.slice(0, i + 1)
  }
}
// 去除字符串头部空格或指定字符
String.prototype.TrimStart = function (c) {
  if (c == null || c == '') {
    var str = this.replace(/^s*/, '')
    return str
  } else {
    var rg = new RegExp('^' + c + '*')
    var str = this.replace(rg, '')
    return str
  }
}

// 去除字符串尾部空格或指定字符
String.prototype.trimEnd = function (c) {
  if (c == null || c == '') {
    var str = this
    var rg = /s/
    var i = str.length
    while (rg.test(str.charAt(--i)));
    return str.slice(0, i + 1)
  } else {
    var str = this
    var rg = new RegExp(c)
    var i = str.length
    while (rg.test(str.charAt(--i)));
    return str.slice(0, i + 1)
  }
}
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
    url: option.url.trimEnd('/') + '/count',
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
    // getDataByParams(option).then(item => {
    //   var res = {
    //     data: item.data.collection,
    //     count: item.data.count
    //   }
    //   console.log(res)
    //   resolve(res)
    // }).catch(err => {
    //
    //   reject(err)
    // })
  })
}
export const getQuery = (option) => {
  return axios.get(option)
}
