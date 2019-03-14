import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [{
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () =>
      import ('@/view/login/login.vue')
  },
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [{
      path: 'message_page',
      name: 'message_page',
      meta: {
        icon: 'md-notifications',
        title: '消息中心'
      },
      component: () =>
        import ('@/view/single-page/message/index.vue')
    }]
  },

  {
    path: '/update',
    name: 'update',
    meta: {
      icon: 'md-cloud-upload',
      title: '数据上传'
    },
    component: Main,
    children: [{
        path: 'update_table_page',
        name: 'update_table_page',
        meta: {
          icon: 'ios-document',
          title: '上传Csv'
        },
        component: () =>
          import ('@/view/update/update-table.vue')
      },
      {
        path: 'update_paste_page',
        name: 'update_paste_page',
        meta: {
          icon: 'md-clipboard',
          title: '粘贴表格数据'
        },
        component: () =>
          import ('@/view/update/update-paste.vue')
      }
    ]
  },

  {
    path: '/components',
    name: 'components',
    meta: {
      icon: 'logo-buffer',
      title: '组件'
    },
    component: Main,
    children: [{
        path: 'count_to_page',
        name: 'count_to_page',
        meta: {
          icon: 'md-trending-up',
          title: '数字渐变'
        },
        component: () =>
          import ('@/view/components/count-to/count-to.vue')
      },
      {
        path: 'drag_list_page',
        name: 'drag_list_page',
        meta: {
          icon: 'ios-infinite',
          title: '拖拽列表'
        },
        component: () =>
          import ('@/view/components/drag-list/drag-list.vue')
      },
      {
        path: 'drag_drawer_page',
        name: 'drag_drawer_page',
        meta: {
          icon: 'md-list',
          title: '可拖拽抽屉'
        },
        component: () =>
          import ('@/view/components/drag-drawer')
      },
      {
        path: 'org_tree_page',
        name: 'org_tree_page',
        meta: {
          icon: 'ios-people',
          title: '组织结构树'
        },
        component: () =>
          import ('@/view/components/org-tree')
      },
      {
        path: 'tree_table_page',
        name: 'tree_table_page',
        meta: {
          icon: 'md-git-branch',
          title: '树状表格'
        },
        component: () =>
          import ('@/view/components/tree-table/index.vue')
      },
      {
        path: 'cropper_page',
        name: 'cropper_page',
        meta: {
          icon: 'md-crop',
          title: '图片裁剪'
        },
        component: () =>
          import ('@/view/components/cropper/cropper.vue')
      },
      {
        path: 'tables_page',
        name: 'tables_page',
        meta: {
          icon: 'md-grid',
          title: '多功能表格'
        },
        component: () =>
          import ('@/view/components/tables/tables.vue')
      },
      {
        path: 'split_pane_page',
        name: 'split_pane_page',
        meta: {
          icon: 'md-pause',
          title: '分割窗口'
        },
        component: () =>
          import ('@/view/components/split-pane/split-pane.vue')
      },
      {
        path: 'markdown_page',
        name: 'markdown_page',
        meta: {
          icon: 'logo-markdown',
          title: 'Markdown编辑器'
        },
        component: () =>
          import ('@/view/components/markdown/markdown.vue')
      },
      {
        path: 'editor_page',
        name: 'editor_page',
        meta: {
          icon: 'ios-create',
          title: '富文本编辑器'
        },
        component: () =>
          import ('@/view/components/editor/editor.vue')
      },
      {
        path: 'icons_page',
        name: 'icons_page',
        meta: {
          icon: '_bear',
          title: '自定义图标'
        },
        component: () =>
          import ('@/view/components/icons/icons.vue')
      }
    ]
  },
  {
    path: '/excel',
    name: 'excel',
    meta: {
      icon: 'ios-stats',
      title: 'EXCEL导入导出'
    },
    component: Main,
    children: [{
        path: 'upload-excel',
        name: 'upload-excel',
        meta: {
          icon: 'md-add',
          title: '导入EXCEL'
        },
        component: () =>
          import ('@/view/excel/upload-excel.vue')
      },
      {
        path: 'export-excel',
        name: 'export-excel',
        meta: {
          icon: 'md-download',
          title: '导出EXCEL'
        },
        component: () =>
          import ('@/view/excel/export-excel.vue')
      }
    ]
  },
  // {
  //   path: '/map_echarts',
  //   name: 'map_echarts',
  //   meta: {
  //     hideInBread: true
  //   },
  //   component: Main,
  //   children: [{
  //     path: 'map_echarts_page',
  //     name: 'map_echarts_page',
  //     meta: {
  //       icon: 'ios-hammer',
  //       title: '地图',
  //       beforeCloseName: 'before_close_normal'
  //     },
  //     component: () =>
  //       import ('@/view/map_echarts/map_echarts.vue')
  //   }]
  // },

  {
    path: '/tools_methods',
    name: 'tools_methods',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [{
      path: 'tools_methods_page',
      name: 'tools_methods_page',
      meta: {
        icon: 'ios-hammer',
        title: '工具方法',
        beforeCloseName: 'before_close_normal'
      },
      component: () =>
        import ('@/view/tools-methods/tools-methods.vue')
    }]
  },
  {
    path: '/i18n',
    name: 'i18n',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [{
      path: 'i18n_page',
      name: 'i18n_page',
      meta: {
        icon: 'md-planet',
        title: 'i18n - {{ i18n_page }}'
      },
      component: () =>
        import ('@/view/i18n/i18n-page.vue')
    }]
  },
    // 单车数据的总和
    {
    path: '/veichle_table',
    name: 'veichle_table',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [{
      path: 'veichle_table',
      name: 'veichle_table',
      meta: {
        icon: 'md-planet',
        title: '{{ veichle_table }}'
      },
      component: () =>
        import ('@/view/veichleTable/index.vue')
    }]
  },
  {
    path: '/error_store',
    name: 'error_store',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [{
      path: 'error_store_page',
      name: 'error_store_page',
      meta: {
        icon: 'ios-bug',
        title: '错误收集'
      },
      component: () =>
        import ('@/view/error-store/error-store.vue')
    }]
  },
  {
    path: '/error_logger',
    name: 'error_logger',
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    component: Main,
    children: [{
      path: 'error_logger_page',
      name: 'error_logger_page',
      meta: {
        icon: 'ios-bug',
        title: '错误收集'
      },
      component: () =>
        import ('@/view/single-page/error-logger.vue')
    }]
  },
  {
    path: '/directive',
    name: 'directive',
    meta: {
      hideInBread: true
    },
    component: Main,
    children: [{
      path: 'directive_page',
      name: 'directive_page',
      meta: {
        icon: 'ios-navigate',
        title: '指令'
      },
      component: () =>
        import ('@/view/directive/directive.vue')
    }]
  },

  {
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [

      {
        path: 'params/:id',
        name: 'params',
        meta: {
          icon: 'md-flower',
          title: route => `{{ params }}-${route.params.id}`,
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () =>
          import ('@/view/argu-page/params.vue')
      },
      // 设置型号的子路由跳转
       {
        path: 'params/:id',
        name: 'params',
        meta: {
          icon: 'md-flower',
          title: route => `{{ params }}-${route.params.id}`,
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () =>
          import ('@/view/argu-page/params.vue')
      },
      {
        path: 'view/:id',
        name: 'view',
        meta: {
          icon: 'md-flower',
          title: route => `{{ view }}-${route.params.id}`,
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () =>
          import ('@/view/tools/view/tools_views.vue')
      },
      // 单车页面的实时监控、数据明细、轨迹回放、电池分布的总和
      {
        path: 'veichle_details/:id',
        name: 'veichle_details',
        meta: {
          icon: 'md-flower',
          // -${route.params.id}
          title: route => `{{ veichle_details }}-${route.params.VIN}`,
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () =>
          import ('@/view/components/veichleDetails/index.vue')
      },
      {
        path: 'modelUpdate/:id',
        name: 'modelUpdate',
        meta: {
          icon: 'md-flower',
          // -${route.params.id}
          title: route => `{{ modelUpdate }}-${route.params.id}`,
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () =>
          import ('@/view/components/modelUpdate/index.vue')
      },
      // {
      //   path: 'map',
      //   name: 'map',
      //   meta: {
      //     icon: 'md-flower',
      //     title: route => `{{ map }}-${route.query.id}`,
      //     notCache: true
      //   },
      //   component: () =>
      //     import ('@/view/argu-page/map.vue')
      // },
      {
        path: 'map_component/:id',
        name: 'map_component',
        meta: {
          icon: 'md-flower',
          // -${route.params.id}
          title: route => `{{ map_info }}`,
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () =>
          import ('@/view/argu-page/map.vue')
      },
      {
        path: 'data_anlaysis/:id',
        name: 'data_anlaysis',
        meta: {
          icon: 'md-flower',
          // -${route.params.id}
          title: route => `{{ data_anlaysis }}`,
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () =>
          import ('@/view/argu-page/data_anlaysis.vue')
      },
    ]
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: false,
      notCache: false
    },
    children: [{
      path: '/home',
      name: 'home',
      meta: {
        hideInMenu: false,
        title: '首页',
        notCache: false,
        icon: 'md-home'
      },
      component: () =>
        import ('@/view/single-page/home')
    }]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () =>
      import ('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () =>
      import ('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () =>
      import ('@/view/error-page/404.vue')
  }
]
