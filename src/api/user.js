import axios from '@/libs/api.request'
//
// export const login = ({ userName, password }) => {
//   const data = {
//     userName,
//     password
//   }
//
//   return axios.request({
//     url: 'login',
//     data,
//     method: 'post'
//   })
// }
export const login = (option) => {
  return axios.request({
    url: 'oauth/token',
    data: option,
    method: 'post'
  })
  // return axios.request({
  //   url: 'login',
  //   data,
  //   method: 'post'
  // })
}
export const getUserInfo = (id) => {
  return axios.request({
    url: 'get_info',
    // params: {
    //   token
    // },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}

export const getUnreadCount = () => {
  return axios.request({
    url: 'message/count',
    method: 'get'
  })
}

export const getMessage = () => {
  return axios.request({
    url: 'message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const getMenusRoleId = id => {
  console.log(id, getMenusRoleId)
  return axios.request({
    url: '/legacy/security/privilege/' + roleid + '/menu',
    method: 'get'
  })
}
export const getCurrentRoles=()=>{
  return axios.request({
    url: '/legacy/security/privilege/current',
    method: 'get'
  })
}
export const getRolesByUserid=userid=>{
  return axios.request({
    url: '/legacy/security/openid_privilege_map/'+userid+'/privilege',
    method: 'get'
  })

}
export const getMenusCurrent = id => {
  console.log(id, 'getMenusCurrent')
  return axios.request({
    url: '/legacy/security/privilege/' + roleid + '/menu',
    method: 'get'
  })
}
export const bindRoleAndMenus = option => {
  var qs = require('qs')
  return axios.request({
    url: 'legacy/security/privilege_menu_map/bind',
    method: 'put',
    data: qs.stringify({
      privilege_unid: option.roleid,
      menu_unid: option.menus
    })
  })
}
export const unbindRoleAndMenus = option => {
  var qs = require('qs')
  return axios.request({
    url: 'legacy/security/privilege_menu_map/unbind',
    method: 'put',
    data: qs.stringify({
      privilege_unid: option.roleid,
      menu_unid: option.menus
    })
  })
}
export const getMenusByRoleId = option => {
  // return new Promise((resolve, reject) => {
  //   axios.all([getMenusCurrent(option.croleid), getMenusRoleId(option.roleid)]).then(
  //     ([cmenus, menus]) => {
  //       var res = {
  //         cmenus: cmenus.data,
  //         menus: menus.data
  //       }
  //       resolve(res)
  //     }).catch(err => {
  //       console.log(err)
  //     reject(err)
  //   })

  // })
  return axios.request({
    url: '/legacy/security/privilege/' + option.roleid + '/menu',
    method: 'get'
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: 'message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: 'message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}
