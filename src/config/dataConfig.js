// 高德地图 key
export const MapKey = 'cfd8da5cf010c5f7441834ff5e764f5b'
// 地图限定城市
export const MapCityName = '江苏'

export const Urlmaps = {
  build: 'https://api.renxingzuche.com/bigger/build_struct', // 建筑物
  Facility: 'https://api.renxingzuche.com/bigger/facility', // 传感器
  camera: 'https://api.renxingzuche.com/bigger/camera', // 视频
  layered: 'https://api.renxingzuche.com/bigger/layered_graph', // 楼层
  alarm: 'https://api.renxingzuche.com/sensor/alarm', // 报警信息
  history: 'https://api.renxingzuche.com/sensor/facility', // 报警历史
  login: 'https://api.renxingzuche.com/oauth/token', // 登录
  domain: 'https://api.renxingzuche.com/bigger/domain', // 组织机构
  user: 'https://api.renxingzuche.com/bigger/openid', // 用户管理
  privilege: 'https://api.renxingzuche.com/bigger/security/privilege', // 角色管理
  unit: 'https://api.renxingzuche.com/bigger/unit_info', // 联网单位
  user_privilege: 'https://api.renxingzuche.com/bigger/security/openid_privilege_map', // 用户和角色关联
  menu: 'https://api.renxingzuche.com/bigger/security/menu', // 菜单
  threat: 'https://api.renxingzuche.com/bigger/security_threat', // 隐患
  threat_recify: 'https://api.renxingzuche.com/bigger/security_threat/recify', // 隐患整改
  maintain: 'https://api.renxingzuche.com/bigger/maintain', // 保养
  maintain_daily: 'https://api.renxingzuche.com/bigger/maintain/daily', // 保养详细
  emergency: 'https://api.renxingzuche.com/bigger/emergency', // 预案
  ert: 'https://api.renxingzuche.com/bigger/ert', // 应急人员
  type: 'https://api.renxingzuche.com/bigger/type', // 类型
  patrol: 'https://api.renxingzuche.com/bigger/patrol', // 巡检计划
  patrol_area: 'https://api.renxingzuche.com/bigger/patrol/area', // 巡检区域
  patrol_point: 'https://api.renxingzuche.com/bigger/patrol/point', // 巡检点位
  patrol_manager: 'https://api.renxingzuche.com/bigger/patrol/manager', // 巡检管理
  alarmDetail: 'https://api.renxingzuche.com/sensor/alarm/layered_graph', // 报警明细
  searchNearP: 'https://api.renxingzuche.com/bigger/layered_graph/cluster',
  videoList: 'https://open.ys7.com/api/lapp/live/video/list',
  img_upload: 'https://api.renxingzuche.com/bigger/image' // 图片上传
}
export const IconsAll = [{
  name: '全部',
  type: 0
},
{
  name: '报警',
  type: -1
},
{
  url: require('../assets/img/c-1.png'),
  name: '自动报警',
  type: 1
}, {
  url: require('../assets/img/p-1.png'),
  name: '电气监控',
  type: 2
}, {
  url: require('../assets/img/j-1.png'),
  name: '自动喷水',
  type: 3
},
{
  url: require('../assets/img/r-1.png'),
  name: '防排烟',
  type: 4
},
{
  url: require('../assets/img/e-1.png'),
  name: '消火栓',
  type: 5
},
{
  url: require('../assets/img/l-1.png'),
  name: '消防水炮',
  type: 6
},

{
  url: require('../assets/img/n-1.png'),
  name: '疏散指示',
  type: 7
},
{
  url: require('../assets/img/s-1.png'),
  name: '应急照明',
  type: 8
},
{
  url: require('../assets/img/d-1.png'),
  name: '气体灭火',
  type: 9
},
{
  url: require('../assets/img/o-1.png'),
  name: '灭火器',
  type: 10
},
{
  url: require('../assets/img/q-1.png'),
  name: '防火卷帘',
  type: 11
}, {
  url: require('../assets/img/a-1.png'),
  name: '视频监控',
  type: 12

}

]
// 设备类型及其图标位置
export const Icons = [{
  url: require('../assets/img/c-1.png'),
  name: '自动报警',
  type: 1
}, {
  url: require('../assets/img/p-1.png'),
  name: '电气监控',
  type: 2
}, {
  url: require('../assets/img/j-1.png'),
  name: '自动喷水',
  type: 3
},
{
  url: require('../assets/img/r-1.png'),
  name: '防排烟',
  type: 4
},
{
  url: require('../assets/img/e-1.png'),
  name: '消火栓',
  type: 5
},
{
  url: require('../assets/img/l-1.png'),
  name: '消防水炮',
  type: 6
},

{
  url: require('../assets/img/n-1.png'),
  name: '疏散指示',
  type: 7
},
{
  url: require('../assets/img/s-1.png'),
  name: '应急照明',
  type: 8
},
{
  url: require('../assets/img/d-1.png'),
  name: '气体灭火',
  type: 9
},
{
  url: require('../assets/img/o-1.png'),
  name: '灭火器',
  type: 10
},
{
  url: require('../assets/img/q-1.png'),
  name: '防火卷帘',
  type: 11
}, {
  url: require('../assets/img/a-1.png'),
  name: '视频监控',
  type: 12

}
]
// 设备类型及其图标位置
export const IconsAlarm = [{
  url: require('../assets/img/c-3.png'),
  name: '自动报警',
  type: 1
}, {
  url: require('../assets/img/p-3.png'),
  name: '电气监控',
  type: 2
}, {
  url: require('../assets/img/j-3.png'),
  name: '自动喷水',
  type: 3
},
{
  url: require('../assets/img/r-3.png'),
  name: '防排烟',
  type: 4
},
{
  url: require('../assets/img/e-3.png'),
  name: '消火栓',
  type: 5
},
{
  url: require('../assets/img/l-3.png'),
  name: '消防水炮',
  type: 6
},

{
  url: require('../assets/img/n-3.png'),
  name: '疏散指示',
  type: 7
},
{
  url: require('../assets/img/s-3.png'),
  name: '应急照明',
  type: 8
},
{
  url: require('../assets/img/d-3.png'),
  name: '气体灭火',
  type: 9
},
{
  url: require('../assets/img/o-3.png'),
  name: '灭火器',
  type: 10
},
{
  url: require('../assets/img/q-3.png'),
  name: '防火卷帘',
  type: 11
}, {
  url: require('../assets/img/a-3.png'),
  name: '视频监控',
  type: 12

}
]
