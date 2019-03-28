export default {
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: '智航储能大数据管理系统',

  // 高德地图 key
  MapKey: 'cfd8da5cf010c5f7441834ff5e764f5b',
  // 地图限定城市
  MapCityName: '江苏',
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: true,
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    dev: 'http://58.213.131.5', // 'https://shuchi.wlwltech.com:20443',//'https://newnetcom.com',
    pro: 'http://58.213.131.5'
  },
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'home',
  login: 'login',
  /**
   * @description 需要加载的插件
   */
  plugin: {
    'error-store': {
      showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
      developmentOff: true // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
    }
  }
}
