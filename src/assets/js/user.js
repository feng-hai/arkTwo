const USER01 = {
  name: 'super_admin',
  user_id: '1',
  access: ['super_admin', 'admin'],
  token: 'super_admin',
  avator: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png',
  menus: [{
      path: '/vehicleMonitoring',
      name: 'vehicleMonitoring',
      component: 'main',
      meta: {
        icon: '_jiankong',
        title: '车辆监控'
      },
      children: [

        {
          path: 'monitoring',
          name: 'monitoring',
          meta: {

            title: '实时监控'
          },
          component: 'vehicleMonitoring/monitoringPage'

        },
        {
          path: 'monitoringVachilePage',
          name: 'monitoringVachilePage',
          meta: {

            title: '关注车辆'
          },
          component: 'baseInfo/vehicleModelPage'

        }
      ]
    },
    {
      path: '/systemManager',
      name: 'systemManager',
      meta: {
        icon: '_guanli',
        title: '系统管理'
      },
      component: 'main',
      children: [
        //   {
        //   path: 'button',
        //   name: 'buttonPage',
        //   meta: {
        //     title: '按钮管理',
        //     notCache: false
        //   },
        //   component: 'systemManagement/buttonPage'
        // },
        {
          path: 'company',
          name: 'companyPage',
          meta: {
            // icon:'ios-football-outline',
            title: '机构管理',
            notCache: false
          },
          component: 'systemManagement/companyPage'
        },
        {
          path: 'menu',
          name: 'menuPage',
          meta: {
            // icon:'md-menu',
            title: '菜单管理',
            notCache: false
          },
          component: 'systemManagement/menuPage'
        },
        {
          path: 'userManagement',
          name: 'userPage',
          meta: {
            // icon:'md-people',
            title: `用户管理`,
            notCache: false
          },
          component: 'systemManagement/userPage'
        },
        {
          path: 'roleManagement',
          name: 'rolePage',
          meta: {
            // icon:'ios-paw',
            title: `角色管理`,
            notCache: false
          },
          component: 'systemManagement/rolePage'
        }
      ]
    }, {
      path: '/baseInfo',
      name: 'baseInfo',
      component: 'main',
      meta: {
        icon: '_jcxx',
        title: '多级菜单'
      },
      children: [
        //   {
        //   path: 'devicePage',
        //   name: 'devicePage',
        //   meta: {
        //
        //     title: '设备管理'
        //   },
        //   component: 'baseInfo/devicePage'
        //
        // },
        {
          path: 'vehiclesPage',
          name: 'vehiclesPage',
          meta: {

            title: '车辆管理'
          },
          component: 'baseInfo/vehiclesPage'

        },
        // {
        //   path: 'vehicleTypePage',
        //   name: 'vehicleTypePage',
        //   meta: {
        //
        //     title: '车辆类型管理'
        //   },
        //   component: 'baseInfo/vehicleTypePage'
        //
        // },
        {
          path: 'vehicleModelPage',
          name: 'vehicleModelPage',
          meta: {

            title: '车辆型号管理'
          },
          component: 'baseInfo/vehicleModelPage'

        }
      ]
    },
    //   {
    //   path: '',
    //   name: 'doc',
    //   meta: {
    //     title: 'æ–‡æ¡£',
    //     href: 'https://lison16.github.io/iview-admin-doc/#/',
    //     icon: 'ios-book'
    //   }
    // },
    // {
    //   path: '/join',
    //   name: 'join',
    //   component: 'main',
    //   meta: {
    //     icon: 'md-menu',
    //     title: '多级菜单'
    //   },
    //   children: [{
    //     path: 'join_page',
    //     name: 'join_page',
    //     meta: {
    //       icon: '_qq',
    //       title: 'QQç¾¤'
    //     },
    //     component: 'join_page'
    //
    //   }]
    // },
    {
      path: '/alarmInfo',
      name: 'alarmInfo',
      component: 'main',
      meta: {
        icon: '_baojing',
        title: '报警信息'
      },
      children: [{
        path: 'alarmSet',
        name: 'alarmSet',
        meta: {
          // icon: 'md-settings',
          title: '报警设置'
        },
        component: 'alarmInfo/alarmSet'

      }, {
        path: 'alarmPage',
        name: 'alarmPage',
        meta: {

          title: '报警'
        },
        component: 'alarmInfo/alarmPage'

      }]
    },
    // {
//   path: '/tools',
//   name: 'tools',
//   meta: {
//     icon: '_gongju',
//     // icon: 'ios-construct-outline',
//     title: '工具箱'
//   },
//   component: 'main',
//   children: [{
//       path: 'echart01',
//       name: 'editEcharts',
//       meta: {
//         title: `可编辑图表`,
//         notCache: false
//       },
//       component: 'tables/template'
//     },
//     {
//       path: 'vehicleHistory',
//       name: 'vehicleHistory',
//       meta: {
//         title: `可编辑图表`,
//         notCache: false
//       },
//       component: 'singleVehicleInfo/vehicleHistoryPage'
//     },
//     {
//       path: 'viewManagement',
//       name: 'viewManagement',
//       meta: {
//         title: `视图管理`,
//         notCache: false
//       },
//       component: 'tools/viewManagement'
//     },
//
//     {
//       path: 'tools_time',
//       name: 'tools_time',
//       meta: {
//         icon: 'md-funnel',
//         title: '二级-1'
//       },
//       component: 'tools/tools_time'
//     },
//     {
//       path: 'tools_json',
//       name: 'tools_json',
//       meta: {
//         icon: '_qq',
//         title: 'Json工具'
//       },
//       component: 'tools/tools_json'
//
//     }, {
//       path: 'drag_drawer_page',
//       name: 'drag_drawer_page',
//       meta: {
//         icon: 'md-list',
//         title: '可拖拽抽屉'
//       },
//       component: () =>
//         import ('@/view/components/drag-drawer')
//     }
//   ]
// },
// {
//   path: '/reportManagement',
//   name: 'reportManagement',
//   meta: {
//     icon: '_zhexiantu',
//     // icon: 'ios-stats-outline',
//     title: '报表管理'
//   },
//   component: 'main',
//   children: [{
//       path: 'echartsTempate',
//       name: 'echartsTempate',
//       meta: {
//         title: '自定义数据模板',
//         notCache: false
//       },
//       component: 'echarts-page/template'
//     },
//     {
//       path: 'dailyReport',
//       name: 'dailyReport',
//       meta: {
//         title: '车辆日报',
//         notCache: false
//       },
//       component: 'report/dailyReport'
//     }
//
//   ]
// }
  ]
}
export default {
  USER01
}
