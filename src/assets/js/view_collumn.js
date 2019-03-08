const VIEWFIELD = [{
  type: 'selection',
  width: 60,
  visible: true,
  align: 'center'
  // fixed: 'left',

},
{
  title: '序号',
  type: 'index',
  align: 'center',
  width: 100,
  sortable: false,
  editable: false,
  visible: true,
  editType: 'text'

},
{
  title: '视图名称',
  key: 'name',
  align: 'center',
  visible: true,
  isSearch: true, // 该字段是否可以查询 true为可以查询，false不作为查询条件
  isSearchFront: true, // 放在搜索按钮前面，false放在更多里面
  sortable: false,
  editable: true,
  editType: 'text'

  // fixed: 'left'
}, {
  title: 'UNID',
  key: 'unid',
  align: 'center',
  visible: true,
  isSearch: false, // 该字段是否可以查询 true为可以查询，false不作为查询条件
  isSearchFront: true, // 放在搜索按钮前面，false放在更多里面
  sortable: false,
  editable: true,
  editType: 'text'

  // fixed: 'left'
}, {
  title: '视图描述',
  key: 'des',
  align: 'center',
  sortable: false,
  visible: true,
  editable: true,
  editType: 'text'

  // fixed: 'left'
},
{
  title: '操作',
  key: 'handle',
  visible: true,
  isHide: false, // 默认为false 设为true时隐藏此列
  align: 'center',
  options: ['edit', 'delete'],
  // fixed: 'right',
  button: [
    (h, params, vm) => {
      // 新增还显示内容
      if (params.row['isNew']) {
        return h('Poptip', {
          props: {
            confirm: true,
            title: '你确定要保存吗?',
            placement: 'top',
            transfer: true
          },
          on: {
            'on-ok': () => {
              vm.$emit('on-saveRow', params)
              // vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
            }
          }
        }, [
          h('Button', '保存')
        ])
      }
    }
  ]
}
]
const FIELDS = [{
  type: 'selection',
  width: 60,
  align: 'center',
  visible: true,
  fixed: 'left',
  key: 'index1'


},
{
  title: '类型',
  key: 'type',
  width: 120,
  align: 'center',
  visible: true,
  editable: true,
  editType: 'text'

},
{
  title: '顺序',
  key: 'index',
  width: 100,
  align: 'center',
  visible: true,
  sortable: true,
  editable: true,
  editType: 'text'

  // fixed: 'left'
},
{
  title: '字段代码',
  key: 'field',
  align: 'center',
  width: 250,
  sortable: false,
  visible: true,
  editable: true,
  editType: 'text'

  // fixed: 'left'
}, {
  title: '字段名称',
  key: 'title',
  align: 'center',
  width: 250,
  sortable: false,
  isSearch: true,
  visible: true,
  isSearchFront: true,
  editable: true,
  editType: 'text',
  fixed: 'left'
}, {
  title: '查询条件',
  key: 'isSearch',
  align: 'center',
  width: 250,
  sortable: false,
  isSearch: true,
  visible: true,
  isSearchFront: false,
  editable: true,
  editType: 'select',
  selectList: [{
    value: true,
    label: '是'
  },
  {
    value: false,
    label: '否'
  }
  ]

}, {
  title: '条件前置',
  key: 'isSearchFront',

  align: 'center',
  width: 250,
  sortable: false,
  visible: true,

  isSearch: true,
  isSearchFront: false,
  editable: true,
  editType: 'select',
  selectList: [{
    value: true,
    label: '是'
  },
  {
    value: false,
    label: '否'
  }
  ]

}, {
  title: '自定义code',
  // fixed: 'left',
  key: 'code',
  align: 'center',
  visible: true,
  width: 250,
  isSearch: true,
  isSearchFront: true,
  sortable: false,
  editable: true,
  editType: 'text'
},
{
  title: '左右对其方式',
  key: 'align',
  align: 'center',
  width: 250,
  sortable: false,
  editable: true,
  editType: 'select',
  isServer: false,
  visible: true,
  isSearch: true,
  serverUrl: 'login',
  selectList: [{
    value: 'left',
    label: 'left'
  },
  {
    value: 'right',
    label: 'right'
  },
  {
    value: 'center',
    label: 'center'
  }
  ]
}, {
  title: '列宽',
  key: 'width',
  align: 'center',
  width: 250,
  sortable: false,
  editable: true,
  visible: true,
  editType: 'text'

},
{
  title: '是否可见',
  key: 'visible',
  visible: true,
  sortable: false,
  align: 'center',
  editable: true,
  isSearch: true,
  minWidth: 250,
  editType: 'select',
  selectList: [{
    value: true,
    label: '显示'
  },
  {
    value: false,
    label: '隐藏'
  }
  ]
}, {
  title: '数据类型',
  key: 'editType',
  sortable: false,
  visible: true,
  align: 'center',
  editable: true,
  isSearch: true,
  minWidth: 250,
  editType: 'select',
  selectList: [{
    value: 'text',
    label: '文本类型'
  },
  {
    value: 'select',
    label: '下拉选择'
  },
  {
    value: 'selectTree',
    label: '树形结构'
  }, {
    value: 'fun',
    label: '函数驱动'
  }
  ]
},
{
  title: '数据函数(静态数据)',
  key: 'selectList',
  sortable: false,
  align: 'center',
  editable: true,
  visible: true,
  isSearch: true,
  minWidth: 250,

  editType: 'text'

},
{

  title: '数据函数（固定函数）',
  key: 'dataType',
  sortable: false,
  align: 'center',
  visible: true,

  editable: true,
  isSearch: true,
  minWidth: 250,
  editType: 'select',
  selectList: [{
    value: 'org',
    label: '分组列表'
  },
  {
    value: 'orgTree',
    label: '分组树'
  },
  {
    value: 'menu',
    label: '菜单列表'
  }, {
    value: 'role',
    label: '角色列表'
  }
  ]
},
{
  title: '数据函数（根据id获取对应的text）',
  key: 'selectListFunText',
  sortable: false,
  align: 'center',
  visible: true,
  editable: true,
  isSearch: true,
  minWidth: 250,
  editType: 'text'
},
{
  title: '数据函数（后台数据）',
  key: 'selectListFun',
  sortable: false,
  align: 'center',
  visible: true,
  editable: true,
  isSearch: true,
  minWidth: 250,
  editType: 'text'
},
{
  title: '按钮操作（静态）',
  key: 'options',
  sortable: false,
  align: 'center',
  editable: true,
  visible: true,
  isSearch: false,
  minWidth: 250,
  editType: 'text'
},
{
  title: '按钮操作（函数添加）',
  key: 'button',
  sortable: false,
  align: 'center',
  editable: true,
  visible: true,
  isSearch: false,
  minWidth: 250,
  editType: 'text'
},
{
  title: '是否允许修改',
  key: 'editable',
  sortable: false,
  align: 'center',
  editable: true,
  visible: true,
  minWidth: 250,
  editType: 'select',
  selectList: [{
    value: true,
    label: '允许'
  },
  {
    value: false,
    label: '不允许'

  }
  ]
},
{
  title: '是否排序',
  key: 'sortable',
  editable: true,
  visible: true,
  editType: 'select',
  align: 'center',
  minWidth: 250,
  selectList: [{
    value: 'custom',
    label: '远程排序'
  },
  {
    value: true,
    label: '页面排序'
  },
  {
    value: false,
    label: '不排序'
  }
  ]
}, {
  title: '是否换行',
  key: 'tooltip',
  align: 'center',
  editable: true,
  visible: true,
  editType: 'select',
  minWidth: 250,
  selectList: [{
    value: true,
    label: '不换行'
  },
  {
    value: false,
    label: '换行'
  }
  ]
},
{
  title: '是否是固定列',
  key: 'fixed',
  editable: true,
  visible: true,
  align: 'center',
  minWidth: 250,
  editType: 'select',
  selectList: [{
    value: '',
    label: '不固定'
  },
  {

    value: 'left',
    label: '靠左固定'
  },
  {
    value: 'right',
    label: '靠右固定'
  }
  ]
},
{
  title: '操作',
  key: 'handle',
  isHide: false, // 默认为false 设为true时隐藏此列
  visible: true,
  align: 'center',
  width: 150,
  minWidth: 150,
  options: ['delete'],
  fixed: 'right',
  button: [
    (h, params, vm) => {
      // 新增还显示内容
      if (params.row['isNew']) {
        return h('Poptip', {
          props: {
            confirm: true,
            title: '你确定要保存吗?',
            placement: 'top',
            transfer: true
          },
          on: {
            'on-ok': () => {
              vm.$emit('on-saveRow', params)
              // vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
            }
          }
        }, [
          h('Button', '保存')
        ])
      }
    }
  ]
}
]
const DATAITEM = {
  field: '@field',
  code: '@code',
  index: 2,
  title: '字段名称',
  name: '@name',
  email: '@email',
  align: 'center',
  visible: true,
  editable: true,
  sortable: false,
  minWidth: 120,
  // _checked: true,
  fixed: 'left',
  tooltip: false
  //,
  //  createTime: '@date',
  //  isNew: true
}
const VIEWCOLLUMN = [{
  type: 'index',
  width: 60,
  align: 'center'
},
{
  title: '视图名称',
  visible: true,
  key: 'field',
  align: 'center',
  width: 250,
  sortable: false,
  editable: false,
  editType: 'text'

}, {
  title: '视图描述',
  key: 'title',
  align: 'center',
  sortable: false,
  visible: true,
  editable: false,
  editType: 'text'
},
{
  title: '操作',
  key: 'handle',
  align: 'center',
  visible: true,
  width: 250,
  minWidth: 100,
  options: ['delete', 'eidt'],
  button: [
    (h, params, vm) => {
      return h('Poptip', {
        props: {
          confirm: true,
          title: '你确定要删除吗?'
        },
        on: {
          'on-ok': () => {
            vm.$emit('on-delete', params)
            vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
          }
        }
      }, [
        h('Button', '自定义删除')
      ])
    }
  ]
}
]
export default {
  FIELDS,
  DATAITEM,
  VIEWCOLLUMN,
  VIEWFIELD
}

// [function(h, params, vm) {
//   return h('Button', {
//     attrs: {
//       style: 'margin-left:2px'
//     },
//     props: {
//       confirm: true,
//       title: '你确定要新增吗?'
//     },
//     on: {
//       'click': function click() {
//         vm.$emit('on-add');
//       }
//     }
//   }, '新增');
// }, function(h, params, vm) {
//   return h('Button', {
//     attrs: {
//       style: 'margin-left:2px'
//     },
//     props: {
//       confirm: true,
//       title: '你确定要删除吗?'
//     },
//     on: {
//       'click': function click() {
//         vm.$emit('on-all-delete');
//       }
//     }
//   }, '批量删除');
// }]
