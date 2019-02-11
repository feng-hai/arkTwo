import view_collumn from '@/assets/js/view_collumn'
const viewManagement = {
  id: '125',
  name: '测试',
  url: '/bigger/grid/',
  addUrl: '/bigger/grid',
  deleteUrl: '/bigger/grid/{id}',
  des: '',
  addPermit: true, // 新增按钮是否有权限
  isRouter: { // 新增按钮显示时， 设置为true，跳转到url对应的页面，否则在当前页面新增
    isTrue: true,
    url: '',
    title: '测试用'
  },
  deletePermit: true, // 删除按钮
  editPermit: true, // 修改按钮
  itemDefault: JSON.stringify(view_collumn.DATAITEM), // 现在一行默认值，json字符串
  columns: view_collumn.VIEWFIELD,
  ruleValidate: {
    name: [{
      required: true,
      message: 'The name cannot be empty',
      trigger: 'blur'
    }, {
      remote: 'get_item_info',
      message: '更新有问题01'
    }, {
      remote: 'get_item_info',
      message: '更新有问题02'
    }],
    url: [{
      required: true,
      message: 'Mailbox cannot be empty',
      trigger: 'blur'
    },
    {
      type: 'email',
      message: 'Incorrect email format',
      trigger: 'blur'
    }
    ],
    desc: [{
      required: true,
      message: 'Please enter a personal introduction',
      trigger: 'blur'
    },
    {
      type: 'string',
      min: 20,
      message: 'Introduce no less than 20 words',
      trigger: 'blur'
    }
    ]
  },
  buttons: [(h, params, vm) => {
    let permit = params.permit
    if (permit.addPermit) {
      return h('Button', {
        attrs: {
          style: 'margin-left:2px'
        },
        props: {
          confirm: true,
          title: '你确定要新增吗?'
        },
        on: {
          'click': () => {
            console.log(permit)
            if (permit.isRouter && permit.isRouter.isTrue) {
              const id = parseInt(Math.random() * 1000000000000000000000)
              const route = {
                name: 'view',
                params: {
                  id: id
                },
                meta: {
                  title: `动态路由-${id}`,
                  notCache: false
                }
              }
              vm.$router.push(route)
            } else {
              vm.$emit('on-add')
            }
          }
        }
      }, '新增01')
    }
  }, (h, params, vm) => {
    let permit = params.permit
    if (permit.deletePermit) {
      return h('Button', {
        attrs: {
          style: 'margin-left:2px'
        },
        props: {
          confirm: true,
          title: '你确定要删除吗?'
        },
        on: {
          'click': () => {
            //  this.tableData.unshift(Object.assign({}, this.itemDefault))
            vm.$emit('on-all-delete')
          }
        }
      }, '批量删除')
    }
  }]
}
const viewDetailManagement = {
  id: '124',
  name: '测试',
  url: '/bigger/grid/{id}',
  addUrl: 'add_table_view',
  deleteUrl: 'delete_table_view',
  des: '',
  addPermit: true, // 新增按钮是否有权限
  deletePermit: true, // 删除按钮
  editPermit: true, // 修改按钮
  itemDefault: JSON.stringify(view_collumn.DATAITEM), // 现在一行默认值，json字符串
  columns: view_collumn.FIELDS,
  ruleValidate: {
    name: [{
      required: true,
      message: 'The name cannot be empty',
      trigger: 'blur'
    }, {
      remote: 'get_item_info',
      message: '更新有问题01'
    }, {
      remote: 'get_item_info',
      message: '更新有问题02'
    }],
    url: [{
      required: true,
      message: 'Mailbox cannot be empty',
      trigger: 'blur'
    },
    {
      type: 'email',
      message: 'Incorrect email format',
      trigger: 'blur'
    }
    ],
    desc: [{
      required: true,
      message: 'Please enter a personal introduction',
      trigger: 'blur'
    },
    {
      type: 'string',
      min: 20,
      message: 'Introduce no less than 20 words',
      trigger: 'blur'
    }
    ]
  },
  buttons: [(h, params, vm) => {
    let permit = params.permit
    if (permit.addPermit) {
      return h('Button', {
        attrs: {
          style: 'margin-left:2px'
        },
        props: {
          confirm: true,
          title: '你确定要新增吗?'
        },
        on: {
          'click': () => {
            console.log(permit)
            if (permit.isRouter && permit.isRouter.isTrue) {
              const id = parseInt(Math.random() * 1000000000000000000000)
              const route = {
                name: 'view',
                params: {
                  id: id
                },
                meta: {
                  title: `动态路由-${id}`,
                  notCache: false
                }
              }
              vm.$router.push(route)
            } else {
              vm.$emit('on-add')
            }
          }
        }
      }, '新增01')
    }
  }, (h, params, vm) => {
    let permit = params.permit
    if (permit.deletePermit) {
      return h('Button', {
        attrs: {
          style: 'margin-left:2px'
        },
        props: {
          confirm: true,
          title: '你确定要删除吗?'
        },
        on: {
          'click': () => {
            //  this.tableData.unshift(Object.assign({}, this.itemDefault))
            vm.$emit('on-all-delete')
          }
        }
      }, '批量删除')
    }
  }]
}
const COLUMNS = {
  C125: viewManagement,
  C124: viewDetailManagement
}
export default COLUMNS
