import axios from '@/libs/api.request'

export const getTableView = (params) => {
//  console.log(params)
  return axios.request({
    url: 'get_table_view',
    method: 'get',
    params: params
  })
}
export const getTableColumns = (id) => {
  //console.log(id);
  return axios.request({
    url: '/bigger/grid/' + id,
    method: 'get'
    // ,
    // params:{
    //   id:id
    // }
  })
}
export const getTableData = (url, params) => {
  return axios.request({
    url: url,
    method: 'get',
    params: params
  })
}
