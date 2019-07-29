import {
  login,
  // logout,
  getUserInfo,
  getMessage,
  getContentByMsgId,
  hasRead,
  removeReaded,
  restoreTrash,
  getUnreadCount,
  getCurrentRoles,
  getRolesByUserid,
  getMenusByRoleId,
  bindRoleAndMenus,
  unbindRoleAndMenus,
  getCurrentUserInfo
} from '@/api/user'
import {
  // getOrganizationInfo,
  getMenuInfo
  // getRolesInfo,
  // getModelInfo,
  // getMenuInfoData,
  // getRoleInfoData,
  // pustRolesInfo
  // getAllRolesInfoData
} from '@/api/publicResource'
import {
  setToken,
  getToken,
  translateArraytoMenus,
  setCookies
} from '@/libs/util'
import user from '@/assets/js/user'

export default {
  state: {
    userName: '',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: '',
    hasGetInfo: false,
    unreadCount: 0,
    messageUnreadList: [],
    messageReadedList: [],
    messageTrashList: [],
    menus: [],
    messageContentStore: {}
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setMenus (state, menus) {
      state.menus = menus
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    },
    setMessageCount (state, count) {
      state.unreadCount = count
    },
    setMessageUnreadList (state, list) {
      state.messageUnreadList = list
    },
    setMessageReadedList (state, list) {
      state.messageReadedList = list
    },
    setMessageTrashList (state, list) {
      state.messageTrashList = list
    },
    updateMessageContentStore (state, {
      msg_id,
      content
    }) {
      state.messageContentStore[msg_id] = content
    },
    moveMsg (state, {
      from,
      to,
      msg_id
    }) {
      const index = state[from].findIndex(_ => _.msg_id === msg_id)
      const msgItem = state[from].splice(index, 1)[0]
      msgItem.loading = false
      state[to].unshift(msgItem)
    }
  },
  getters: {
    messageUnreadCount: state => state.messageUnreadList.length,
    messageReadedCount: state => state.messageReadedList.length,
    messageTrashCount: state => state.messageTrashList.length,
    getMenus: state => state.menus
  },
  actions: {
    // 登录
    handleLogin ({
      commit
    }, {
      userName,
      password
    }) {
      var qs = require('qs')
      userName = userName.trim()
      var client_id = '597494481295-dd79sund7ef8kr338t87eqajl27spg7a.apps.cube.com'
      var option = qs.stringify({
        scope: '/legacy /aquaman /bigger /firemen /openid /firemen/security /firemen/grid /openid /firemen/device  /sensor/vehicle /firemen/model /firemen/domain /sensor/vehicle  /firemen/vehicle /firemen/vehicle/info /firemen/event /firemen/national_standard /sensor/hydra',
        client_secret: 'daf2333dd314xfd',
        client_id: client_id, // "597494481295-dd79sund7ef8kr338t87eqajl27spg7a.apps.csrzic.com",//"597494481295-dd79sund7ef8kr338t87eqajl27spg7a.apps.cube.com",
        grant_type: 'password',
        username: userName,
        password: password
      })

      return new Promise((resolve, reject) => {
        login(option).then(res => {
          const data = res.data

          commit('setToken', data.split('=')[1].split('&')[0])
          // 用户id
          sessionStorage.setItem('userid', data.split('=')[2].split('&')[0])
          sessionStorage.setItem('userName', userName)
          // commit('setToken', data.token)
          resolve()
        }).catch(err => {
          // commit('setToken', '222222222222222222')
          // resolve()
          // TODO 发生 错误时，也能正常登录，正式系统需要剔除
          // commit('setToken', "fffffff")
          // // 用户id
          // sessionStorage.setItem('userid',"ffffffffff")
          // sessionStorage.setItem('userName', userName)
          // resolve()

          reject(err)
        })
        // login({
        //   userName,
        //   password
        // }).then(res => {
        //   const data = res.data
        //   commit('setToken', data.token)
        //   resolve()
        // }).catch(err => {
        //   reject(err)
        // })
      })
    },
    getRolesByUserId ({}, userid) {
      return new Promise((resolve, reject) => {
        getRolesByUserid(userid).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },

    getCurrentRoles () {
      return new Promise((resolve, reject) => {
        getCurrentRoles().then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    bindRoleAndMenus ({
      state,
      commit
    }, options) {
      return new Promise((resolve, reject) => {
        console.log('绑定请求', options)
        bindRoleAndMenus(options).then(res => {
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    unbindRoleAndMenus ({
      state,
      commit
    }, options) {
      return new Promise((resolve, reject) => {
        unbindRoleAndMenus(options).then(res => {
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({
      state,
      commit
    }) {
      return new Promise((resolve, reject) => {
        //  logout(state.token).then(() => {
        commit('setToken', '')
        commit('setAccess', [])
        commit('setMenus', [])

        resolve()

        //  }).catch(err => {
        //  reject(err)
        // })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({
      state,
      commit
    }) {
      return new Promise((resolve, reject) => {

        setCookies("domainId",'C98D97238CA34F96A969BDA01DAB31FA');
        try {
          var userId = sessionStorage.getItem('userid')
          var username = sessionStorage.getItem('userName')
          if (username == 'fh') {
            console.log(userId, '用户信息id')
            // TODO //从数据库中获取动态菜单数据
            getMenuInfo({
              offset: 0,
              page_size: 1000
            }).then((res) => {
              var menus = translateArraytoMenus(res.data)
            const data = user.USER01
            // console.log(data.menus, "写死的数据")
             data.menus = menus
            commit('setAvator', data.avator)
            commit('setUserName', username)
            commit('setUserId', userId)
            commit('setAccess', data.access)
            // commit('setMenus', data.menus) //对菜单进行赋值
            commit('setHasGetInfo', true)
            // console.log(res.data, "后台数据传递");
            commit('setMenus', data.menus)

            // console.log(menus, "格式化");

            resolve(data)
            //  console.log(res.data.collection)
            // resolve(res.data.collection)
            }).catch(error => {
              reject(error)
            })
          } else {
            console.log('不知指定用戶')
            getCurrentUserInfo().then(res => {
              console.log('獲取當前用戶信息成功')
            }).catch(err => {
              console.log('獲取當前用戶信息失敗')
            })

            // 通过角色查询菜单
            // //TODO 根据用户id,动态菜单信息
            getRolesByUserid(userId).then(res => {
              var roles = res.data
              roles.forEach(role => {
                var roleid = role.unid
                // 获取用户角色信息
                // 通过角色id，查询对应的菜单
                console.log(res, '用户角色信息', roleid)
                getMenusByRoleId(roleid).then(res => {
                  console.log('获取菜单信息', res)
                  var menus = translateArraytoMenus(res.data)
                  const data = user.USER01
                  // console.log(data.menus, "写死的数据")
                  data.menus = menus
                  commit('setAvator', data.avator)
                  commit('setUserName', username)
                  commit('setUserId', userId)
                  commit('setAccess', data.access)
                  // commit('setMenus', data.menus) //对菜单进行赋值
                  commit('setHasGetInfo', true)
                  // console.log(res.data, "后台数据传递");
                  commit('setMenus', data.menus)
                  console.log(menus, '格式化')
                  resolve(data)
                }).catch(err => {
                  console.log(err, '角色信息获取失败')
                  reject(err)
                })
              })
            }).catch(err => {
              console.log(err, '根據用戶獲取角色失敗')

              reject(err)
            })
          }

          // }).catch(err => {
          //   reject(err)
          // })
          // } else {

          // }
        } catch (error) {
          reject(error)
        }
      })
    },
    getMenuInfoAction ({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getMenuInfo({
          offset: 0,
          page_size: 1000
        }).then((res) => {
          commit('setMenusList', res.data)
          //  console.log(res.data.collection)
          resolve(res.data.collection)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 此方法用来获取未读消息条数，接口只返回数值，不返回消息列表
    getUnreadMessageCount ({
      state,
      commit
    }) {
      // getUnreadCount().then(res => {
      //   const {
      //     data
      //   } = res
      //   commit('setMessageCount', data)
      // })
    },
    // 获取消息列表，其中包含未读、已读、回收站三个列表
    getMessageList ({
      state,
      commit
    }) {
      return new Promise((resolve, reject) => {
        getMessage().then(res => {
          const {
            unread,
            readed,
            trash
          } = res.data
          commit('setMessageUnreadList', unread.sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
          commit('setMessageReadedList', readed.map(_ => {
            _.loading = false
            return _
          }).sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
          commit('setMessageTrashList', trash.map(_ => {
            _.loading = false
            return _
          }).sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getAllMenus ({
      state,
      commit
    }) {
      return new Promise((resolve, reject) => {

      })
    },
    getMenusByRoleId ({
      state,
      commit
    },
    option
    ) {
      console.log(option)
      return new Promise((resolve, reject) => {
        var username = sessionStorage.getItem('userName')
        var menus = sessionStorage.getItem('menuData')
        console.log(menus)

        // 根据角色id，获取绑定的菜单集合
        getMenusByRoleId(option).then(res => {
          var temp = res.data.map(item => {
            return item.unid
          })

          resolve({
            menus: temp,
            cmenus: JSON.parse(menus)
          })
        }).catch(err => {
          console.log('没有绑定任务菜单')
          resolve({
            menus: [],
            cmenus: JSON.parse(menus)
          })
        })

        // if (username == "fh") {

        // } else {
        //   getMenusByRoleId(option).then(res => {
        //     const content = res.data
        //     resolve(content)
        //   }).catch(err => {
        //     reject(err)
        //   })
        // }
      })
    },
    // 根据当前点击的消息的id获取内容
    getContentByMsgId ({
      state,
      commit
    }, {
      msg_id
    }) {
      return new Promise((resolve, reject) => {
        let contentItem = state.messageContentStore[msg_id]
        if (contentItem) {
          resolve(contentItem)
        } else {
          getContentByMsgId(msg_id).then(res => {
            const content = res.data
            commit('updateMessageContentStore', {
              msg_id,
              content
            })
            resolve(content)
          })
        }
      })
    },
    // 把一个未读消息标记为已读
    hasRead ({
      state,
      commit
    }, {
      msg_id
    }) {
      return new Promise((resolve, reject) => {
        hasRead(msg_id).then(() => {
          commit('moveMsg', {
            from: 'messageUnreadList',
            to: 'messageReadedList',
            msg_id
          })
          commit('setMessageCount', state.unreadCount - 1)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除一个已读消息到回收站
    removeReaded ({
      commit
    }, {
      msg_id
    }) {
      return new Promise((resolve, reject) => {
        removeReaded(msg_id).then(() => {
          commit('moveMsg', {
            from: 'messageReadedList',
            to: 'messageTrashList',
            msg_id
          })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 还原一个已删除消息到已读消息
    restoreTrash ({
      commit
    }, {
      msg_id
    }) {
      return new Promise((resolve, reject) => {
        restoreTrash(msg_id).then(() => {
          commit('moveMsg', {
            from: 'messageTrashList',
            to: 'messageReadedList',
            msg_id
          })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
