<template>
<div>
  <Card style="margin-top:20px">
    <p slot="title">历史数据</p>
    <div class="search-con search-con-top">


      <DatePicker v-model="dateRange" type="datetimerange" placeholder="Select date and time" style="width: 300px;margin-right:10px;" @on-change="handleInput"></DatePicker>
      <Button type="primary" @click="searchResult">查詢</Button>
    </div>

    <tables :total="total" :permit="permit" @on-saveRow="saveRow" :buttons="buttons" :current="current" :pageSize="pageSize" @on-page-change="pageChange" @on-pageSize-change="pageSizeChange" :loading="isLoading" ref="tables" @on-add="addItem" @on-select="onSelect"
      @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel" :isPage="isPage" @on-all-delete="deleteItems" @on-edit="editPage" @on-selection-change="handleSelectRow" @on-search="search" @on-search-edit="searchP"
      @on-save-edit="editCell" editable v-model="tableData" :columns="columns" @on-delete="handleDelete" />
    <div class="search-con search-con-top">
      <bigPage @on-change="ChangePage" @on-pageChange="pageSizeChange" :current="current" :hasNext="hasNext"></bigPage>
    </div>
  </Card>
  <!-- </Card> -->
</div>
</template>

<script>
import bigPage from '_c/bigPage'
import axios from 'axios'
import Tables from '_c/tables'
import {
  getTableView,
  getTableColumns
} from '@/api/view'
import {
  getDataByParams,
  getAllQuery,
  getQuery
} from '@/api/handle.js'
import {
  getParams2,
  toJson,
  toStr,
  formateDate
} from '@/libs/util'
import {
  mapActions,
  mapGetters,
  mapState
} from 'vuex'

import handle from '@/api/handle'
export default {
  name: 'tablesHistoryPage',
  components: {
    Tables,
    bigPage
  },
  computed: {
    ...mapGetters([
      'getTableInfoById',
      'getOrganizationInfo',
      'getMenusInfo',
      'getRolesInfo',
      'getOrgTreeInfo'
    ])
  },
  props: {
    viewId: { //传递视图id，根据视图id获取对应的视图信息
      type: String,
      default () {
        return ''
      }
    },
    objectId: { //url中需要替换信息时使用
      type: String,
      default: ''
    },
    handleFunction: { //获取到的数据，是否需要额外处理
      type: Function,
      default (res) {
        return res
      }
    },
    isRemote: {
      type: Boolean,
      default () {
        return true
      }
    },
    isPage: { //是否需要分页
      type: Boolean,
      default () {
        return false
      }
    },
    dataT: { //表數據
      type: Array,
      default () {
        []
      }
    }
  },
  data() {
    return {
      dateRange: [], //日期
      tableData: [],
      backTableData: [],
      selectData: [], // 列表中选择的行
      url: '',
      columns: [{
        key: 'ee'
      }],
      isLoading: true,
      pageSize: 10,
      total: 0,
      current: 1,
      height: 400,
      permit: {
        addPermit: false,
        isRouter: { // 新增按钮显示时， 设置为true，跳转到url对应的页面，否则在当前页面新增
          isTrue: true,
          url: '',
          title: '测试用'
        },
        deletePermit: false,
        editPermit: false
      },
      itemDefault: {},
      buttons: [],
      searchParams: {},
      addUrl: 'add_table_view', // 新增url
      deleteUrl: 'delete_table_view', // 删除的url
      editUrl: 'edit_table_view', // 修改的url
      ruleValidate: {}, // 新增修改时验证
      isCount: true, //是否有单独查询count语句
      ArrayDate: [], //数据第一条数据时间
      lastDate: '', //数据最后一条数据时间
      hasNext: false, //是否有下一条数据
      date_from: '', //保存选择的开始时间
      date_to: '' //保存选择的结束时间
    }
  },
  created() {

  },
  methods: {
    ChangePage(page) {
      console.log("ChangePage")
      this.hasNext = false;
      if (page > this.current) {
        this.searchParams.date_from = this.date_from;
        this.searchParams.date_to = this.lastDate;
      } else {
        this.searchParams.date_from = this.date_from;
        this.searchParams.date_to = this.ArrayDate[page - 1];
      }
      this.current = page;

      this.searchResult()
    },
    handleInput(val) {
      console.log("handleInput")
      this.date_from = val[0].replace(" ", "T");
      this.date_to = val[1].replace(" ", "T");
      this.searchParams.date_from = val[0].replace(" ", "T");
      this.searchParams.date_to = val[1].replace(" ", "T");
      this.ArrayDate = [];
      this.current = 1;
    },
    // ...mapState (['menus']),
    ...mapActions([
      'handleTablesInfo',
      'getTableData',
      'addTableData',
      'deleteTableData',
      'editTableData',
      'getCheckOnly',
      'getHistoryTable'
    ]),

    onSelect(selection, row) {

    },
    onSelectCancel(selection, row) {

    },
    onSelectAll(selection) {

    },
    onSelectAllCancel(selection) {

    },
    handleSelectRow(selection) {
      this.selectData = selection
      this.$emit('selected', this.selectData)
    },
    valueValidate(params, fun) {
      let that = this
      var funArray = []
      var messages = []
      let isTure = true
      // console.log("params", typeof this.ruleValidate, this.ruleValidate)

      for (var key in this.ruleValidate) {
        if (params[key] && params[key].length > 0) {
          if ('required' in this.ruleValidate[key]) {
            let initData = () => {
              return this.getCheckOnly({
                url: rule[j]['remote'],
                method: 'get',
                params: {
                  key: params[key]
                }
              })
            }
            funArray.push(initData())
            messages.push(this.ruleValidate[key].message)
          }
        } else {
          //  console.log('required' in this.ruleValidate[key], this.ruleValidate[key])
          for (var index in this.ruleValidate[key]) {
            if ('required' in this.ruleValidate[key][index]) {
              if (this.ruleValidate[key][index]['required']) {
                this.$Notice.warning({
                  title: '数据不规范提醒',
                  desc: (this.ruleValidate[key][index].message ? this.ruleValidate[key][index].message : '必填项')
                })
                return
                isTure = false
              }
            }
          }
        }
      }

      if (isTure) {
        if (funArray.length > 0) {
          getAllQuery(funArray).then((resArr) => {
            let leng = resArr.length
            let len = 0
            resArr.forEach(function(res) {
              if (res.status === 200) { // 修改对应的返回值
                that.$Notice.warning({
                  title: '数据不规范提醒',
                  desc: messages[len]
                })
                len++
              }
            })
            if (len === leng) {
              fun()
            }
          })
        } else {
          fun()
        }
      }
      // for (var i in rule[j]) {
      //   switch (i) {
      //     case "required":
      //       if (!value) {
      //
      //       }
      //       break;
      //     case 2:
      //       执行代码块 2
      //       break;
      //   }
      //   console.log(i, ":", rule[j][i])
      //  }
      return true
    },
    saveRow(params) { // 新增一行保存
      let that = this
      let row = this.tableData[params.index]
      //  console.log(this.ruleValidate)
      this.valueValidate(params.row, function() {
        var item = Object.assign({}, that.tableData[params.index])
        delete item['isNew']
        delete item['initRowIndex']
        let option = {
          url: that.addUrl,
          data: item,
          method: 'post'
        }
        that.addTableData(option).then(res => {
          row['isNew'] = false
          that.$Notice.success({
            title: '新增提示',
            desc: '新增一条信息成功'
          })
          this.getTableInfo()
          this.$emit('on-saveRow', params.row)
        })
      })
    },
    pageChange(pageIndex) {
      this.isLoading = true
      this.current = pageIndex
      this.getTableInfo()
    },
    pageSizeChange(pageSize) {

      this.isLoading = true
      this.pageSize = pageSize
      this.ArrayDate = [];
      this.current = 1;
      this.searchParams.date_to = this.date_to;
      //this.getTableInfo()
      this.searchResult()
    },
    setColumnInfo(json) {
      var jsonObject = Object.assign({}, json)
      if (jsonObject.url.indexOf('{id}') > 0) {
        var urlInfo = window.location.href
        var id = getParams2(urlInfo)
        jsonObject.url = jsonObject.url.replace('{id}', id)
      }
      let options = {
        url: jsonObject.url
      }
      this.url = jsonObject.url;
      this.addUrl = jsonObject.addUrl
      this.deleteUrl = jsonObject.deleteUrl
      this.editUrl = jsonObject.editUrl
      this.isCount = jsonObject.isCount == undefined ? true : jsonObject.isCount == 'true'
      this.permit.addPermit = jsonObject.addPermit
      this.permit.deletePermit = jsonObject.deletePermit
      this.permit.editPermit = jsonObject.editPermit
      this.permit.isRouter = jsonObject.isRouter
      this.ruleValidate = jsonObject.ruleValidate

      let handle = jsonObject.columns.find((item) => {
        return item.key == 'handle'
      })
      if (handle) {
        if (this.permit.deletePermit) { // 有删除权限
          handle['isHide'] = false // 该多选项不隐藏
        } else {
          handle['isHide'] = true // 该多选项隐藏
        }
        // console.log("handle",handle)
        if (handle['options'] && typeof handle['options'] === 'string') {
          // console.log("options",toJson(handle["options"]))
          handle['options'] = toJson(handle['options'])
          //  console.log("testOption",handle["option"])
        }
      }
      for (var i = 0; i < jsonObject.columns.length; i++) {
        var item = jsonObject.columns[i]

        if (item['selectList'] && typeof item['selectList'] === 'string') { // 获取静态数据
          jsonObject.columns[i].selectList = toJson(item.selectList)
        }
      }
      let select = jsonObject.columns.find((item) => {
        return item.type == 'selection'
      })
      if (select) { // 如果多选项存在
        if (this.permit.deletePermit) { // 有删除权限
          select['isHide'] = false // 该多选项不隐藏
        } else {
          select['isHide'] = true // 该多选项隐藏
        }
      }

      this.columns = jsonObject.columns
      if (jsonObject.buttons && jsonObject.buttons != '[]') {
        this.buttons = jsonObject.buttons
      }
      if (typeof json.ruleValidate === 'string') {
        this.ruleValidate = toJson(json.ruleValidate)
      } else {
        this.ruleValidate = json.ruleValidate
      }

      if (this.permit.addPermit && json.itemDefault.length > 0) {
        this.itemDefault = toJson(json.itemDefault)
      }
      options.columns = this.columns;
      this.searchResult();
    },
    createColumns() {
      var urlInfo = window.location.href
      var id = getParams2(urlInfo)
      if (this.viewId != '') {
        id = this.viewId
      }
      let columnInfo = this.getTableInfoById(id)

      if (columnInfo) {
        this.setColumnInfo(columnInfo)
      } else {
        this.handleTablesInfo(id).then(res => {
          this.setColumnInfo(res)
        })
      }
    },

    getTableDatas(options) {
      var option = {
        url: options.url,
        method: 'get'
      }
      console.log(this.searchParams)
      option['params'] = Object.assign({}, {
        num: this.pageSize
      }, this.searchParams)

      if (this.objectId && options.url.indexOf('{Oid}')) { //如果父页面传递id信息，在url中替换掉
        option.url = options.url.replace('{Oid}', this.objectId)
        option.params.field = options.columns.map(item => {
          return item.field;
        }).join(',');
      }
      option.params = Object.assign({}, option.params, this.searchParams)
      console.log(option.params);
      this.getHistoryTable({
        isCount: this.isCount,
        options: option
      }).then(res => {

        var tempData = this.handleFunction(res.data)

        this.lastDate = tempData[tempData.length - 1]["DATIME_RX"].replace(" ", "T");

        this.total = res.count
        this.hasNext = res.data.hasNext;
        if (this.ArrayDate.length < this.current) {
          this.ArrayDate.push(tempData[0]["DATIME_RX"].replace(" ", "T")); //保存当前页面最大时间
        }
        tempData.splice(tempData.length - 1, 1);
        this.tableData = tempData;
        // if (!this.isRemote) {
        //   this.backTableData = Object.assign([], this.tableData)
        //   //  console.log(this.backTableData)
        // }
        this.isLoading = false
      }).catch(err => {
        this.isLoading = false
      })

      // getTableView({
      //   current: this.current,
      //   pageSize: this.pageSize
      // }).then(res => {
      //   this.tableData = res.data
      //   this.total = 100;
      //   this.isLoading = false;
      // })
    },
    searchResult() {
      this.isLoading = true;
      this.getTableDatas({
        url: this.url,
        columns: this.columns
      })
    },
    getTableInfo() {
      this.isLoading = false
      this.createColumns() // 表头部分
      // this.getTableDatas(); //数据部分
    },
    deleteItems() { // 批量删除
      if (this.isRemote) {
        for (var index in this.selectData) {
          this.deleteTableData({
            url: this.deleteUrl.replace('{id}', this.selectData[index].unid),
            method: 'delete'
            // params: this.selectData
          }).then(res => {
            this.$Notice.success({
              title: '删除提示提示',
              desc: '删除信息成功'
            })

            this.getTableInfo()
            this.$emit('on-delete', this.selectData[index])
          })
        }
      }
    },

    editPage(params, vm) {
      // const id = params.row.unid // parseInt(Math.random() * 1000000000000000000000)
      // const route = {
      //   name: 'view',
      //   params: {
      //     id: id
      //   },
      //   meta: {
      //     title: `动态路由-${id}`,
      //     notCache: false
      //   }
      // }
      // this.$router.push(route)
      this.$emit('on-edit', params, vm)
    },
    addItem() {
      this.tableData.unshift(Object.assign({}, this.itemDefault))
      // const id = parseInt(Math.random() * 1000000000000000000000)
      // const route = {
      //   name: 'view',
      //   params: {
      //     id: id
      //   },
      //   meta: {
      //     title: `动态路由-${id}`,
      //     notCache: false
      //   }
      // }
      // this.$router.push(route)
    },

    searchP(params) {},
    search(searchParams) { // 搜索按钮
      console.log("searchParams")
      this.searchParams = searchParams
      if (this.isRemote) {
        this.getTableInfo()
      } else {
        var search = {}
        for (var key in searchParams) {
          if (searchParams[key].length > 0) {
            search[key] = searchParams[key]
          }
        }
        if (Object.keys(search).length == 0) {
          this.tableData = Object.assign([], this.backTableData)
        } else {
          this.tableData = this.backTableData.filter(item => {
            for (var key in search) {
              return item[key].indexOf(search[key]) > -1
            }
            return false
          })
        }
      }
    },
    editCell(params) {
      if (this.isRemote) {
        params.row[params.column.key] = params.value
        this.editTableData({
          url: this.editUrl.replace('{id}', params.row.unid),
          method: 'put',
          data: params.row
        }).then(res => {
          this.$Notice.success({
            title: '修改提示提示',
            desc: '修改信息成功'
          })
          this.$emit('on-save-edit', params)
        })
      }
    },
    handleDelete(params) { // 删除数据
      if (this.isRemote) {
        this.deleteTableData({
          url: this.deleteUrl.replace('{id}', params.row.unid),
          method: 'delete'
          //  params: params
        }).then(res => {
          this.$Notice.success({
            title: '删除提示提示',
            desc: '删除一条信息成功'
          })

          this.getTableInfo()

          this.$emit('on-delete', params)
        })
      } else {
        this.tableData = this.tableData.filter((item) => {
          return item.unid != params.row.unid
        })
      }
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    },
    initParams() {
      this.tableData = []
      this.selectData = [] // 列表中选择的行
      this.columns = []
      this.isLoading = true
      this.pageSize = 10
      this.total = 0
      this.current = 1
      this.permit = {
        addPermit: false,
        deletePermit: false
      }
      this.itemDefault = {}
      this.buttons = []
      this.searchParams = {}
    }
  },
  mounted() {
    var temp = [];
    var that=this;
    this.$nextTick(() => {
          that.initParams()
      that.date_from = formateDate(new Date(new Date().getTime() - 1000 * 60 * 60 * 24), 'yyyy-MM-ddTHH:mm:ss')
      that.date_to = formateDate(new Date(), 'yyyy-MM-ddTHH:mm:ss');
      that.searchParams.date_from = that.date_from;
      that.searchParams.date_to = that.date_to;
      console.log(this.searchParams, "moubted");

      temp.push(formateDate(new Date(new Date().getTime() - 1000 * 60 * 60 * 24), 'yyyy-MM-dd HH:mm:ss'));
      temp.push(formateDate(new Date(), 'yyyy-MM-dd HH:mm:ss'));
      that.dateRange = temp;

      that.getTableInfo()
    })



    //  console.log($(document).height());
  },
  watch: {
    dataT(nv, ov) {
      this.tableData = nv;
    },
    objectId(nv, ov){
      this.searchResult();
    }
    // '$route' (to, from) {
    //   this.initParams()
    //   this.getTableInfo()
    // }
  }
}
</script>

<style>

</style>
