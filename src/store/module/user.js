import {
  login,
  // logout,
  //  getUserInfo,
  getMessage,
  getContentByMsgId,
  hasRead,
  removeReaded,
  restoreTrash,
  getUnreadCount,
  getUserOpenid
} from '@/api/user'
import {
  setToken,
  getToken
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
    messageContentStore: {},
    domainId: getToken(),
  },
  mutations: {
    userIdNew(state, data){
      state.domainId = data;
      setToken(data)
    },
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
    getMenus: state => state.menus,
    getdomainId: state => state.domainId
  },
  actions: {
    // 获取用户信息
    getUserId({state, commit}){
      getUserOpenid(state.domainId).then(res=>{
        let domain = res.data.collection[0].domain_unid;
        commit('userIdNew', domain);
      })
    },
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
        scope: '/openid /bigger/security /bigger/grid /openid /bigger/device  /sensor/vehicle /bigger/model /bigger/domain /sensor/vehicle  /bigger/vehicle /bigger/vehicle/info /bigger/event /bigger/national_standard /sensor/hydra /bigger/openid /sensor/vehicle_history /bigger/realtime_data /bigger/alarm_setup /bigger/model /bigger/vehicle /sensor/vehicle/cluster /bigger/security /bigger/grid /openid /bigger/device  /sensor/vehicle /bigger/model /bigger/domain /sensor/vehicle  /bigger/vehicle /bigger/vehicle/info /bigger/event /bigger/national_standard /sensor/hydra',
        client_secret: 'daf2333dd314xfd',
        client_id: client_id, // "597494481295-dd79sund7ef8kr338t87eqajl27spg7a.apps.csrzic.com",//"597494481295-dd79sund7ef8kr338t87eqajl27spg7a.apps.cube.com",
        grant_type: 'password',
        username: userName,
        password: password
      })

      return new Promise((resolve, reject) => {
        login(option).then(res => {
          console.log(res, '点击登录信息')
          const data = res.data
          // console.log(data, 'data')
          let unid = data.split('=')[2].split('&')[0];
          commit('userIdNew', unid);
          commit('setToken', data.split('=')[1].split('&')[0])
          // commit('setToken', data.token)
          resolve()
        }).catch(err => {
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
        try {
          const data = user.USER01
          commit('setAvator', data.avator)
          commit('setUserName', data.name)
          commit('setUserId', data.user_id)
          commit('setAccess', data.access)
          commit('setMenus', data.menus)
          commit('setHasGetInfo', true)
          resolve(data)
          // }).catch(err => {
          //   reject(err)
          // })
        } catch (error) {
          reject(error)
        }
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
