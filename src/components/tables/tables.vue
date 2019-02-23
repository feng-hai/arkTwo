<template>
<div>
  <div v-if="searchable && searchPlace === 'top'" class="search-con search-con-top">
    <!-- <Select v-model="searchKey" class="search-col">
        <Option v-for="item in columns.filter(function(item,index,array){return item.key;})" v-if="item.key !== 'handle'" :value="item.key" :key="`search-col-${item.key}`">{{ item.title }}</Option>
    </Select>
    <Input @on-change="handleClear" clearable placeholder="输入关键字搜索" class="search-input" v-model="searchValue" />
    <Button @click="handleSearch" class="search-btn" type="primary"><Icon type="search"/>&nbsp;&nbsp;搜索</Button>
    <Button @click="handleAdd" class="search-btn" type="primary"><Icon type="search"/>&nbsp;&nbsp;新增</Button> -->
    <Row>
      <Col v-for="(item,index) in searchColumns.filter((item,index)=>{
        if(item.isSearchFront)return true;
        })" style="padding-right:10px">
      <searchExpand :column="item" :render="item.renderSearch"></searchExpand>
      </Col>
      <Col span="7">
      <Button @click="handleSearch" v-if="searchColumns.length>0" class="search-btn" type="primary"><Icon type="search"/>搜索</Button>
      <!-- <Button @click="handleAdd" class="search-btn" type="primary"><Icon type="search"/>&nbsp;&nbsp;新增</Button> -->
      <Button @click="showAndhideExpand" v-if="searchColumns.length>3" class="search-btn"><Icon type="search"/>更多</Button>

      <searchExpand :column="addTemplete" :permit="permit" :render="createButtons"></searchExpand>

      </Col>

    </Row>
    <Row style="margin-top:10px" v-if="expandValue">
      <Col v-for="(item,index) in searchColumns.filter((item,index)=>{
        if(!item.isSearchFront)return true;
        })" style="padding-right:10px">
      <searchExpand :column="item" :render="item.renderSearch"></searchExpand>
      </Col>
    </Row>

  </div>

  <Table ref="tablesMain" :data="insideTableData" :columns="insideColumns" :stripe="stripe" :border="border" :show-header="showHeader" :width="width" :height="height" :loading="loading" :disabled-hover="disabledHover" :highlight-row="highlightRow" :row-class-name="rowClassName"
    :size="size" :no-data-text="noDataText" :no-filtered-data-text="noFilteredDataText" @on-current-change="onCurrentChange" @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-selection-change="onSelectionChange" @on-sort-change="onSortChange"
    @on-filter-change="onFilterChange" @on-row-click="onRowClick" @on-row-dblclick="onRowDblclick" @on-expand="onExpand">
    <slot name="header" slot="header"></slot>
    <slot name="footer" slot="footer"></slot>
    <slot name="loading" slot="loading"></slot>
  </Table>
  <div class="search-con search-con-top" v-if="isPage">
    <Page :total="total" :current="current" :page-size="pageSize" @on-change="pageChange" @on-page-size-change="pageSizeChange" show-elevator show-sizer></Page>
  </div>
  <!-- <div v-if="searchable && searchPlace === 'bottom'" class="search-con search-con-top">
    <Select v-model="searchKey" class="search-col">
        <Option v-for="item in columns" v-if="item.key !== 'handle'" :value="item.key" :key="`search-col-${item.key}`">{{ item.title }}</Option>
      </Select>
    <Input placeholder="输入关键字搜索" class="search-input" v-model="searchValue" />
    <Button @click="onSearch" class="search-btn" type="primary"><Icon type="search"/>&nbsp;&nbsp;搜索</Button>
  </div> -->
  <a id="hrefToExportTable" style="display: none;width: 0px;height: 0px;"></a>
</div>
</template>

<script>
import TablesEdit from './edit.vue'
import cellShow from './cell-show.vue'
import search from './search.vue'
import searchExpand from './expand.js'
import handleBtns from './handle-btns'

import './index.less'
export default {
  name: 'Tables',
  components: {
    search,
    searchExpand
  },
  props: {
    isPage: {
      type: Boolean,
      default () {
        return true
      }
    },
    permit: {
      type: Object,
      default () {
        return {}
      }
    },
    buttons: {
      type: Array,
      default () {
        return []
      }
    },
    addTemplete: {},
    pageSize: {
      type: Number,
      default () {
        return 10
      }
    },
    total: {
      type: Number,
      default () {
        return 100
      }
    },
    current: {
      type: Number,
      default () {
        return 1
      }
    },
    value: {
      type: Array,
      default () {
        return []
      }
    },
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    size: String,
    width: {
      type: [Number, String]

    },
    height: {
      type: [Number, String]

    },
    stripe: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    highlightRow: {
      type: Boolean,
      default: false
    },
    rowClassName: {
      type: Function,
      default () {
        return ''
      }
    },
    context: {
      type: Object
    },
    noDataText: {
      type: String
    },
    noFilteredDataText: {
      type: String
    },
    disabledHover: {
      type: Boolean
    },
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * @description 全局设置是否可编辑
     */
    editable: {
      type: Boolean,
      default: false
    },
    /**
     * @description 是否可搜索
     */
    searchable: {
      type: Boolean,
      default: false
    },
    /**
     * @description 搜索控件所在位置，'top' / 'bottom'
     */
    searchPlace: {
      type: String,
      default: 'top'
    }
  },
  /**
   * Events
   * @on-start-edit 返回值 {Object} ：同iview中render函数中的params对象 { row, index, column }
   * @on-cancel-edit 返回值 {Object} 同上
   * @on-save-edit 返回值 {Object} ：除上面三个参数外，还有一个value: 修改后的数据
   */
  data () {
    return {
      insideColumns: [],
      searchColumns: [],
      searchValues: {},
      insideTableData: [],
      edittingCellId: '',
      edittingText: '',
      searchKey: '',
      expandValue: false
    }
  },

  methods: {
    showAndhideExpand () {
      this.expandValue = !this.expandValue
    },
    suportSearch (item, index) {
      item.renderSearch = (h, params) => {
        return h(search, {
          props: {
            params: params,
            // value: this.insideTableData[params.index][params.column.key] ? this.insideTableData[params.index][params.column.key] : '',
            // allEdit: this.insideTableData[params.index]["isNew"] ? this.insideTableData[params.index]["isNew"] : false,
            // edittingCellId: this.edittingCellId,
            // editable: this.editable,
            // editType: this.editable ? params.column.editType ? params.column.editType : 'text' : 'text',
            selectList: params.column.selectList ? params.column.selectList : []
          },
          on: {
            'on-search-edit': (params) => {
              this.$emit('on-search-edit', params)
            },
            'input': (val, params) => {
              this.edittingText = val
              this.searchValues[params.column.key] = val
              console.log('search', this.searchValues)
              // this.searchColumns[]["searchValue"]=
            },
            'on-start-edit': (params) => {
              this.$emit('on-start-edit', params)
            },
            'on-cancel-edit': (params) => {
              this.edittingCellId = ''
              this.$emit('on-cancel-edit', params)
            },
            'on-save-edit': (params) => {
              // this.value[params.row.initRowIndex][params.column.key] = this.edittingText
              // this.$emit('input', this.value)
              // this.$emit('on-save-edit', Object.assign(params, {
              //   value: this.edittingText
              // }))
              // this.edittingCellId = ''
            }
          }
        })
      }
    },
    suportShow (item, index) {
      item.render = (h, params) => {
        return h(cellShow, {
          props: {
            params: params,
            value: this.insideTableData[params.index][params.column.key] ? this.insideTableData[params.index][params.column.key] : '',
            allEdit: this.insideTableData[params.index]['isNew'] ? this.insideTableData[params.index]['isNew'] : false,
            edittingCellId: this.edittingCellId,
            editable: this.editable,
            editType: params.column.editType ? params.column.editType : 'text', // 默认是text类型
            selectList: params.column.selectList ? params.column.selectList : []
          }
        })
        // }
      }
      return item
    },
    suportEdit (item, index) {
      //  if (this.permit.editPermit) {
      item.render = (h, params) => {
        return h(TablesEdit, {
          props: {
            params: params,
            value: this.insideTableData[params.index][params.column.key] ? this.insideTableData[params.index][params.column.key] : '',
            allEdit: this.insideTableData[params.index]['isNew'] ? this.insideTableData[params.index]['isNew'] : false,
            edittingCellId: this.edittingCellId,
            editable: this.editable,
            editType: params.column.editType ? params.column.editType : 'text', // 默认是text类型
            selectList: params.column.selectList ? params.column.selectList : []
          },
          on: {
            'on-search-edit': (params) => {
              this.$emit('on-search-edit', params)
            },
            'input': (val, params) => {
              this.edittingText = val
              if (params.row.isNew) {
                this.value[params.row.initRowIndex][params.column.key] = this.edittingText
                this.$emit('input', this.value)
              }
            },
            'on-start-edit': (params) => {
              this.edittingCellId = `editting-${params.index}-${params.column.key}`
              this.$emit('on-start-edit', params)
            },
            'on-cancel-edit': (params) => {
              this.edittingCellId = ''
              this.$emit('on-cancel-edit', params)
            },
            'on-save-edit': (params) => {
              this.value[params.row.initRowIndex][params.column.key] = this.edittingText

              this.$emit('input', this.value)

              this.$emit('on-save-edit', Object.assign(params, {
                value: this.edittingText
              }))

              this.edittingCellId = ''
            }
          }
        })
        // }
      }
      return item
    },
    surportHandle (item) {
      let options = item.options || []
      let insideBtns = []
      options.forEach(item => {
        if (handleBtns[item]) insideBtns.push(handleBtns[item])
      })
      let btns = item.button ? [].concat(insideBtns, item.button) : insideBtns
      item.render = (h, params) => {
        params.tableData = this.value
        return h('div', btns.map(item => item(h, params, this)))
      }
      return item
    },
    handleColumns (columns) {
      this.searchColumns = columns.filter((item, index) => {
        // let res = item
        let render = function () {
          return ''
        }
        if (item.isSearch) { // 是否作为查询条件显示
          this.suportSearch(item, index)
          if (!item.renderSearch) {
            item.renderSearch = render
          }
          return true
        }
      })

      this.insideColumns = columns.filter((item, index) => {
        if (item.visible) {
          return true
        }
        return false
      })

      this.insideColumns = this.insideColumns.map((item, index) => {
        let res = item
        if (res.editable) {
          res = this.suportEdit(res, index)
        } else {
          res = this.suportShow(res, index)
        }

        if (res.key === 'handle') res = this.surportHandle(res)
        return res
      })
    },
    createButtons (h, params) {
      params.permit = this.permit
      params.tableData = this.value
      if (this.buttons.length > 0 && this.buttons != '[]') {
        return this.buttons.map(item => item(h, params, this))
      }
    },
    setDefaultSearchKey () {
      // this.searchKey = this.columns[0].key !== 'handle' ? this.columns[0].key : (this.columns.length > 1 ? this.columns[1].key : '')
    },
    handleClear (e) {
      if (e.target.value === '') this.insideTableData = this.value
    },
    handleSearch () {
      // if (this.value) {}
      //  this.insideTableData = this.value.filter(item => item[this.searchKey].indexOf(this.searchValue) > -1)
      this.$emit('on-search', this.searchValues)
    },
    // handleAdd() { //新增一行
    //   this.$emit('on-Add')
    // },
    handleTableData () {
      if (this.value) {
        this.insideTableData = this.value.map((item, index) => {
          let res = item
          res.initRowIndex = index
          return res
        })
      }
    },
    exportCsv (params) {
      this.$refs.tablesMain.exportCsv(params)
    },
    clearCurrentRow () {
      this.$refs.talbesMain.clearCurrentRow()
    },
    // 页码改变时调用
    pageChange (pageIndex, page) {
      this.$emit('on-page-change', pageIndex)
    },
    pageSizeChange (pageSize) { // 页面大小改变触发事件
      this.$emit('on-pageSize-change', pageSize)
    },
    onCurrentChange (currentRow, oldCurrentRow) {
      this.$emit('on-current-change', currentRow, oldCurrentRow)
    },
    onSelect (selection, row) {
      this.$emit('on-select', selection, row)
    },
    onSelectCancel (selection, row) {
      this.$emit('on-select-cancel', selection, row)
    },
    onSelectAll (selection) {
      this.$emit('on-select-all', selection)
    },
    onSelectionChange (selection) {
      this.$emit('on-selection-change', selection)
    },
    onSortChange (column, key, order) {
      this.$emit('on-sort-change', column, key, order)
    },
    onFilterChange (row) {
      this.$emit('on-filter-change', row)
    },
    onRowClick (row, index) {
      this.$emit('on-row-click', row, index)
    },
    onRowDblclick (row, index) {
      this.$emit('on-row-dblclick', row, index)
    },
    onExpand (row, status) {
      this.$emit('on-expand', row, status)
    }

  },
  watch: {
    columns (columns) {
      this.handleColumns(columns)
      this.setDefaultSearchKey()
    },
    value (val) {
      this.handleTableData()
      // if (this.searchable) this.handleSearch()
    }
  },
  mounted () {
    this.handleColumns(this.columns)
    this.setDefaultSearchKey()
    this.handleTableData()
  }
}
</script>
