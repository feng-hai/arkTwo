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
      path: '/bigerScreen',
      name: 'bigerScreen',
      component: 'parentView',
      meta: {
        icon: 'md-menu',
        title: '多级菜单'
      },
      children: [{
          path: 'homeForBigger',
          name: 'homeForBigger',
          meta: {
            icon: '_qq',
            title: '大屏展示'
          },
          component: 'single-page/home/home'

        },  {
          path: 'tools_json',
          name: 'tools_json',
          meta: {
            icon: '_qq',
            title: 'Json工具'
          },
          component: 'tools/tools_json'

        },
        {
          path: 'setIconInlayerforBig',
          name: 'setIconInlayerforBig',
          meta: {
            title: '打点',
            notCache: false
          },
          component: 'layers/Icons_Annotation'
        },
        {
          path: 'bigalarmInfo',
          name: 'bigalarmInfo',
          meta: {
            title: '报警信息',
            notCache: false
          },
          component: 'single-page/home/components/alarmInfo'
        },
        {
          path: 'biginspactionInfo',
          name: 'biginspactionInfo',
          meta: {
            title: '巡检信息',
            notCache: false
          },
          component: 'single-page/home/components/inspactionInfo'
        },
        {
          path: 'bigelectronicInfo',
          name: 'bigelectronicInfo',
          meta: {
            title: '巡检管理',
            notCache: false
          },
          component: 'single-page/home/components/electronicInfo'
        },
        {
          path: 'bigbarrierInfo',
          name: 'bigbarrierInfo',
          meta: {
            title: '报警信息',
            notCache: false
          },
          component: 'single-page/home/components/barrierInfo'
        },
        {
          path: 'bigvideo',
          name: 'bigvideo',
          meta: {
            title: '视频信息',
            notCache: false
          },
          component: 'single-page/home/components/videoShow'
        },
      ]
    }, {
      path: '/bigerScreenFirst',
      name: 'bigerScreenFirst',
      component: 'parentViewBig',
      meta: {
        icon: 'md-menu',
        title: '多级菜单'
      },
      children: [ {
          path: 'firstBigger',
          name: 'firstBigger',
          meta: {
            icon: '_qq',
            title: '大屏展示'
          },
          component: 'single-page/firstPage/first'
        }
      ]
    },{
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
          path: 'zidiyiEcharts',
          name: 'zidiyiEcharts',
          meta: {
            title: `自定义视图`,
            notCache: false
          },
          component: 'tools/zidiyiEchart'
        },
        {
          path: 'videoPage',
          name: 'videoPage',
          meta: {
            title: `视频demo`,
            notCache: true
          },
          component: 'pages/videos/videoPage'
        },
        {
          path: 'videoPage1',
          name: 'videoPage1',
          meta: {
            title: `视频demo`,
            notCache: true
          },
          component: 'pages/videos/videoPage0'
        },
        {
          path: 'tool_tree',
          name: 'tool_tree',
          meta: {
            title: 'tree',
            notCache: false
          },
          component: 'tree/index'
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
            import ('@/view/components/drag-drawer')
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
    }, {
      path: '/baseInfoManagement',
      name: 'baseInfoManagement',
      meta: {
        icon: 'md-menu',
        title: '基础信息'
      },
      component: 'main',
      children: [{
          path: 'asset',
          name: 'assetManagement',
          meta: {
            title: '资产管理',
            notCache: false
          },
          component: 'baseInfoManagement/assetManagement'
        },
        {
          path: 'setIconInlayer',
          name: 'setIconInlayer',
          meta: {
            title: '资产管理',
            notCache: false
          },
          component: 'layers/Icons_Annotation'
        },
        {
          path: 'device',
          name: 'deviceManagement',
          meta: {
            title: '设备管理',
            notCache: false
          },
          component: 'baseInfoManagement/deviceManagement'
        }, {
          path: 'host',
          name: 'hostManagement',
          meta: {
            title: '主机管理',
            notCache: false
          },
          component: 'baseInfoManagement/hostManagement'
        },
        {
          path: 'video',
          name: 'videoManagement',
          meta: {
            title: '视频管理',
            notCache: false
          },
          component: 'baseInfoManagement/videoManagement'
        },
        {
          path: 'deviceType',
          name: 'deviceType',
          meta: {
            title: `设备类型`,
            notCache: false
          },
          component: 'baseInfoManagement/deviceType'
        },
        {
          path: 'deviceModel',
          name: 'deviceModel',
          meta: {
            title: `设备型号`,
            notCache: false
          },
          component: 'baseInfoManagement/deviceModel'
        }
      ]
    },
    {
      path: '/troubleManagement',
      name: 'trouble',
      meta: {
        icon: 'md-menu',
        title: '隐患管理'
      },
      component: 'main',
      children: [{
          path: 'trouble',
          name: 'troubleManagement',
          meta: {
            title: '隐患整改',
            notCache: false
          },
          component: 'troubleManagement/troubleManagement'
        }

      ]
    },
    {
      path: '/contingencyManagement',
      name: 'contingencyManagement',
      meta: {
        icon: 'md-menu',
        title: '应急管理'
      },
      component: 'main',
      children: [{
          path: 'emergencySquad',
          name: 'emergencySquad',
          meta: {
            title: '应急小组',
            notCache: false
          },
          component: 'contingencyManagement/emergencySquad'
        },
        {
          path: 'contingencyPlan',
          name: 'contingencyPlan',
          meta: {
            title: '应急预案',
            notCache: false
          },
          component: 'contingencyManagement/contingencyPlan'
        }
      ]
    },
    {
      path: '/infoShow',
      name: 'infoShow',
      meta: {
        icon: 'md-menu',
        title: '信息展示'
      },
      component: 'main',
      children: [{
          path: 'pandect',
          name: 'pandect',
          meta: {
            title: '应急小组',
            notCache: false
          },
          component: 'infoShow/pandect'
        },
        {
          path: 'alarmInfo',
          name: 'alarmInfo',
          meta: {
            title: '应急预案',
            notCache: false
          },
          component: 'infoShow/alarmInfo'
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
