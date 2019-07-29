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
//用户登录
export const login = (option) => {
  return axios.request({
    url: 'oauth/token',
    data: option,
    method: 'post'
  });
}
//TODO 根据用户id获取用户信息
export const getUserInfo = (id) => {
  return axios.request({
    url: 'get_info',
    method: 'get'
  })
}
//用户登出
export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}



// export const getUnreadCount = () => {
//   return axios.request({
//     url: 'message/count',
//     method: 'get'
//   })
// }

// export const getMessage = () => {
//   return axios.request({
//     url: 'message/init',
//     method: 'get'
//   })
// }

// export const getContentByMsgId = msg_id => {
//   return axios.request({
//     url: 'message/content',
//     method: 'get',
//     params: {
//       msg_id
//     }
//   })
// }
//根据角色获取菜单信息
export const getMenusRoleId = id => {
  return axios.request({
    url: '/legacy/security/privilege/' + roleid + '/menu',
    method: 'get'
  })
}
//获取当前用户绑定的角色
export const getCurrentRoles = () => {
  return axios.request({
    url: '/legacy/security/privilege/current',
    method: 'get'
  })
}
//根据用户id获取用户绑定的角色
export const getRolesByUserid = userid => {
  return axios.request({
    url: '/legacy/security/openid_privilege_map/' + userid + '/privilege',
    method: 'get'
  })
}


/**
* 传入多个promise的值，当请求成功之后统一反馈，做逻辑处理
* */
const allPromise=(userPromise) =>{
  // 将数组对象转为了数组
    //var userPromise = Array.prototype.slice.apply(arguments);
   // console.dir(userPromise);
  // 添加断点调试
    //debugger
    var promiseObj = new Promise(function(resolve, reject){
      axios.all(userPromise).then(axios.spread(function () {
        resolve(arguments);
      }),function(){
        reject(arguments);
      });
    });
    return promiseObj;
  }


export const getCurrentUserInfo = () => {
  return new Promise((resolve, reject) => {
    getCurrentRoles().then(res => {
      console.log(res,"當前用戶的基礎信息")
      //获取角色id
      var  userPromise=[];
      var roles = res.data;
      roles.forEach(element => {
        userPromise.push(getMenusByRoleId(element.unid)); 
      });
      return allPromise(userPromise)

    }).then(res => {
      resolve(res)
      console.log(res,"正确信息")

    }).catch(err=>{
      reject(err)
      console.log(err,"错误信息")

    })
  });
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
//根据角色id获取菜单信息
export const getMenusByRoleId = roleid => {

  return axios.request({
    url: '/legacy/security/privilege/' + roleid + '/menu',
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
