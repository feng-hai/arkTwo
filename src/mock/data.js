import Mock from 'mockjs'
import {
  doCustomTimes,
  getParams2,
  toStr
} from '@/libs/util'
import orgData from './data/org-data'
import view_collumn from '@/assets/js/view_collumn'
const Random = Mock.Random

export const getTableData = req => {
  let tableData = []
  doCustomTimes(5, () => {
    tableData.push(Mock.mock({
      name: '@name',
      email: '@email',
      createTime: '@date'
    }))
  })
  return tableData
}
export const addTableView = req => {
  return true;
}
export const getItemInfo = req => {
  return true;
}
export const editTableView = req => {
  return true;
}
export const deleteTableView = req => {
  return true;
}
export const getTableView = req => {
  let tableData = []
  //console.log(req)
  doCustomTimes(10, () => {
    tableData.push(Mock.mock({
      field: '@field',
      code: '@code',
      index: 1,
      title: '字段名称',
      name: '@name',
      email: '@email',
      align: 'left',
      visible: "true",
      editable: "true",
      sortable: "false",
      minWidth: 120,
      _checked: true,
      fixed: "left",
      tooltip: 'false',
      createTime: '@date'
    }))
  })
  var str = toStr(tableData)
  return str
}
export const getTableColumns = req => {

  var test = []
  let key = getParams2(req.url)
  if (key == 123) {
    test = view_collumn.VIEWCOLLUMN
  } else {
    test = view_collumn.FIELDS
  }
  let item = {
    id: key,
    name: '测试',
    url: 'get_table_view',
    addUrl: 'add_table_view',
    deleteUrl: 'delete_table_view',
    des: '',
    addPermit: true, //新增按钮是否有权限
    deletePermit: true,//删除按钮
    editPermit: true,//修改按钮
    itemDefault: JSON.stringify(view_collumn.DATAITEM), //现在一行默认值，json字符串
    columns: test,
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
            style: "margin-left:2px"
          },
          props: {
            confirm: true,
            title: '你确定要新增吗?',
          },
          on: {
            'click': () => {
              vm.$emit('on-add')
            }
          }
        }, '新增')
      }

    }, (h, params, vm) => {
      let permit = params.permit
      if (permit.deletePermit) {
        return h('Button', {
          attrs: {
            style: "margin-left:2px"
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
  // json对象转换成字符串
  var str = toStr(item)
  return str
}
export const getDragList = req => {
  let dragList = []
  doCustomTimes(5, () => {
    dragList.push(Mock.mock({
      name: Random.csentence(10, 13),
      id: Random.increment(10)
    }))
  })
  return dragList
}

export const uploadImage = req => {
  return Promise.resolve()
}

export const getOrgData = req => {
  return orgData
}
