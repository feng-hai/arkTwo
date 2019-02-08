const USER01={
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
     component: "main",
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
       component: "join_page"

     }]
   }, {
     path: '/tools',
     name: 'tools',
     meta: {
       icon: 'md-menu',
       title: '工具箱'
     },
     component: "main",
     children: [{
         path: 'params/123',
         name: 'params',
         params: {
           id: 11
         },
         meta: {
           title: `动态路由`,
           notCache: false
         },
         component: "tables\/template"

       },

       {
         path: 'level_2_3',
         name: 'level_2_3',
         meta: {
           icon: 'md-funnel',
           title: '二级-3'
         },
         component: "multilevel_level-2-3"
       },
       {
         path: 'viewList',
         name: 'viewList',
         meta: {
           icon: 'md-funnel',
           title: 'viewList'
         },
         component: "tools\/view\/tools_viewList"
       }, {
         path: 'tools_time',
         name: 'tools_time',
         meta: {
           icon: 'md-funnel',
           title: '二级-1'
         },
         component: "tools\/tools_time"
       }, {
         path: 'tools_json',
         name: 'tools_json',
         meta: {
           icon: '_qq',
           title: 'Json工具'
         },
         component: "tools\/tools_json"

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
     component: "main",
     children: [{
         path: 'userManagement/123',
         name: 'userManagement',
         meta: {
           title: `用户管理`,
           notCache: false
         },
         component: "tables\/template"
       },
       {
         path: 'roleManagement/124',
         name: 'roleManagement',

         meta: {
           title: `用户管理`,
           notCache: false
         },
         component: "tables\/template"
       }
     ]
   }
 ]
}
export default {
  USER01
}
