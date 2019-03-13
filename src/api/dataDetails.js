import axios from '@/libs/api.request'


// 点击table表格，进入数据明细
// export const getInfoDetailsData = (params) => {
//   // console.log(params, 'paramssssssssssss');
//   return axios.request({
//     url: '/bigger/vehicle/' + params.unid,
//     params: params,
//     method: 'get'
//   })
// }

// 获取明细页面的title和名称
export const getDataDetails = () => {
  return axios.request({
    url: '/bigger/national_standard',
    method: 'get'
  })
}

// export const vehicleDetails = (params) => {
//   console.log(params, 'params');
//   return axios.request({
//     url: '/sensor/vehicle_history/' + params.unid,
//     params: params,
//     method: 'get'
//   })
// }


// export const getAlarmSetup = (option) => {
//   return axios.request({
//     url: '/bigger/alarm_setup',
//     params: option,
//     method: 'get'
//   })
// }

