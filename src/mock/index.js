import Mock from 'mockjs'
import { login, logout, getUserInfo } from './login'
import { getTableData,getTableView,addTableView,getItemInfo,editTableView,deleteTableView,getTableColumns, getDragList, uploadImage, getOrgData } from './data'
import { getMessageInit, getContentByMsgId, hasRead, removeReaded, restoreTrash, messageCount } from './user'

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 1000
})

// 登录相关和获取用户信息
Mock.mock(/\/login/, login)
Mock.mock(/\/get_info/, getUserInfo)
Mock.mock(/\/logout/, logout)
Mock.mock(/\/get_table_data/, getTableData)
Mock.mock(/\/get_table_view/, getTableView)
Mock.mock(/\/add_table_view/, addTableView)
Mock.mock(/\/delete_table_view/, deleteTableView)
Mock.mock(/\/edit_table_view/, editTableView)
Mock.mock(/\/get_item_info/, getItemInfo)
Mock.mock(/\/get_table_columns/, getTableColumns)
Mock.mock(/\/get_drag_list/, getDragList)
Mock.mock(/\/save_error_logger/, 'success')
Mock.mock(/\/image\/upload/, uploadImage)
Mock.mock(/\/message\/init/, getMessageInit)
Mock.mock(/\/message\/content/, getContentByMsgId)
Mock.mock(/\/message\/has_read/, hasRead)
Mock.mock(/\/message\/remove_readed/, removeReaded)
Mock.mock(/\/message\/restore/, restoreTrash)
Mock.mock(/\/message\/count/, messageCount)
Mock.mock(/\/get_org_data/, getOrgData)

export default Mock
