const USER01 = {
  name: 'super_admin',
  user_id: '1',
  access: ['super_admin', 'admin'],
  token: 'super_admin',
  avator: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png',
  menus: [{
    path: '',
    name: 'doc',
    meta: {
      title: 'æ–‡æ¡£',
      href: 'https://lison16.github.io/iview-admin-doc/#/',
      icon: 'ios-book'
    }
  },
  {
    path: '/join',
    name: 'join',
    component: 'main',
    meta: {
      icon: 'md-menu',
      title: '多级菜单'
    },
    children: [{
      path: 'join_page',
      name: 'join_page',
      meta: {
        icon: '_qq',
        title: 'QQç¾¤'
      },
      component: 'join_page'

    }]
  },{
    path: '/alarmInfo',
    name: 'alarmInfo',
    component: 'main',
    meta: {
      icon: 'md-menu',
      title: '报警信息'
    },
    children: [{
      path: 'alarmSet',
      name: 'alarmSet',
      meta: {
        icon: '_qq',
        title: '报警设置'
      },
      component: 'alarmInfo/alarmSet'

    }]
  }, {
    path: '/baseInfo',
    name: 'baseInfo',
    component: 'main',
    meta: {
      icon: 'md-menu',
      title: '多级菜单'
    },
    children: [{
      path: 'devicePage',
      name: 'devicePage',
      meta: {
        icon: '_qq',
        title: '设备管理'
      },
      component: 'baseInfo/devicePage'

    },
    {
      path: 'vehiclesPage',
      name: 'vehiclesPage',
      meta: {
        icon: '_qq',
        title: '车辆管理'
      },
      component: 'baseInfo/vehiclesPage'

    },
    {
      path: 'vehicleTypePage',
      name: 'vehicleTypePage',
      meta: {
        icon: '_qq',
        title: '车辆类型管理'
      },
      component: 'baseInfo/vehicleTypePage'

    },
    {
      path: 'vehicleModelPage',
      name: 'vehicleModelPage',
      meta: {
        icon: '_qq',
        title: '车辆型号管理'
      },
      component: 'baseInfo/vehicleModelPage'

    }]
  },

  {
    path: '/tools',
    name: 'tools',
    meta: {
      icon: 'md-menu',
      title: '工具箱'
    },
    component: 'main',
    children: [{
      path: 'echart01',
      name: 'editEcharts',
      meta: {
        title: `可编辑图表`,
        notCache: false
      },
      component: 'tables/template'
    },
    {
      path: 'viewManagement',
      name: 'viewManagement',
      meta: {
        title: `视图管理`,
        notCache: false
      },
      component: 'tools/viewManagement'
    },
    {
      path: 'params/123',
      name: 'params',
      params: {
        id: 11
      },
      meta: {
        title: `动态路由`,
        notCache: false
      },
      component: 'tables/template'

    },

    {
      path: 'level_2_3',
      name: 'level_2_3',
      meta: {
        icon: 'md-funnel',
        title: '二级-3'
      },
      component: 'components/tree-select/index'
    },
    {
      path: 'viewList',
      name: 'viewList',
      meta: {
        icon: 'md-funnel',
        title: 'viewList'
      },
      component: 'tools/view/tools_viewList'
    },
    {
      path: 'tools_time',
      name: 'tools_time',
      meta: {
        icon: 'md-funnel',
        title: '二级-1'
      },
      component: 'tools/tools_time'
    },
    {
      path: 'tools_json',
      name: 'tools_json',
      meta: {
        icon: '_qq',
        title: 'Json工具'
      },
      component: 'tools/tools_json'

    }, {
      path: 'drag_drawer_page',
      name: 'drag_drawer_page',
      meta: {
        icon: 'md-list',
        title: '可拖拽抽屉'
      },
      component: () =>
            import('@/view/components/drag-drawer')
    }
    ]
  },
  {
    path: '/systemManager',
    name: 'systemManager',
    meta: {
      icon: 'md-menu',
      title: '系统管理'
    },
    component: 'main',
    children: [{
      path: 'button',
      name: 'buttonPage',
      meta: {
        title: '按钮管理',
        notCache: false
      },
      component: 'systemManagement/buttonPage'
    },
    {
      path: 'company',
      name: 'companyPage',
      meta: {
        title: '机构管理',
        notCache: false
      },
      component: 'systemManagement/companyPage'
    },
    {
      path: 'menu',
      name: 'menuPage',
      meta: {
        title: '菜单管理',
        notCache: false
      },
      component: 'systemManagement/menuPage'
    },
    {
      path: 'userManagement',
      name: 'userPage',
      meta: {
        title: `用户管理`,
        notCache: false
      },
      component: 'systemManagement/userPage'
    },
    {
      path: 'roleManagement',
      name: 'rolePage',
      meta: {
        title: `角色管理`,
        notCache: false
      },
      component: 'systemManagement/rolePage'
    }
    ]
  },
  {
    path: '/reportManagement',
    name: 'reportManagement',
    meta: {
      icon: 'md-menu',
      title: '报表管理'
    },
    component: 'main',
    children: [{
      path: 'echartsTempate',
      name: 'echartsTempate',
      meta: {
        title: '自定义数据模板',
        notCache: false
      },
      component: 'echarts-page/template'
    },
    {
      path: 'echartsTempateV',
      name: 'echartsTempateV',
      meta: {
        title: '车辆图标模板',
        notCache: false
      },
      component: 'echarts-page/templateVehicle'
    }
      // ,
      // {
      //   path: 'company',
      //   name: 'companyPage',
      //   meta: {
      //     title: '机构管理',
      //     notCache: false
      //   },
      //   component: 'systemManagement/companyPage'
      // },
      // {
      //   path: 'menu',
      //   name: 'menuPage',
      //   meta: {
      //     title: '菜单管理',
      //     notCache: false
      //   },
      //   component: 'systemManagement/menuPage'
      // },
      // {
      //   path: 'userManagement',
      //   name: 'userPage',
      //   meta: {
      //     title: `用户管理`,
      //     notCache: false
      //   },
      //   component: 'systemManagement/userPage'
      // },
      // {
      //   path: 'roleManagement',
      //   name: 'rolePage',
      //   meta: {
      //     title: `角色管理`,
      //     notCache: false
      //   },
      //   component: 'systemManagement/rolePage'
      // }
    ]
  }
  ]
}
export default {
  USER01
}
