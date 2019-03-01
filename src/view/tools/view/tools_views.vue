<template>
<div>
  <Card>
    <p slot="title">
      <Icon type="ios-film-outline"></Icon>
      视图信息
    </p>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <FormItem label="Name" prop="name">
        <Input v-model="formValidate.name" placeholder="输入视图名称"></Input>
      </FormItem>
      <FormItem label="视图URL" prop="url">
        <Input v-model="formValidate.url" placeholder="输入列表数据查询路径，用于查询、修改、删除"></Input>
      </FormItem>
      <FormItem label="新增URL" prop="addUrl">
        <Input v-model="formValidate.addUrl" placeholder="输入新增路径，用于新增数据，如果为空默认是视图URL"></Input>
      </FormItem>
      <FormItem label="修改URL" prop="editUrl">
        <Input v-model="formValidate.editUrl" placeholder="输入修改路径，用于修改数据，"></Input>
      </FormItem>
      <FormItem label="删除URL" prop="deleteUrl">
        <Input v-model="formValidate.deleteUrl" placeholder="输入删除路径，用于删除数据，"></Input>
      </FormItem>
      <FormItem label="有count查询" prop="isCount">
        <Select v-model="formValidate.isCount" style="width:200px">
        <Option v-for="item in isCounts" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="新增按钮权限" prop="addPermit">
        <Select v-model="formValidate.addPermit" style="width:200px">
        <Option v-for="item in addPermits" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
      </FormItem>
      <FormItem label="按钮集合" v-if="formValidate.addPermit=='true'" prop="itemDefault">
        <Input v-model="formValidate.buttons" type="textarea" :autosize="{minRows: 2}" placeholder="定义查询后按钮事件，json字符串"></Input>
      </FormItem>
      <FormItem label="新增默认值" v-if="formValidate.addPermit=='true'" prop="itemDefault">
        <Input v-model="formValidate.itemDefault" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入新增一行的默认值，json字符串"></Input>
      </FormItem>
      <FormItem label="新增判断规则" v-if="formValidate.addPermit=='true'" prop="itemDefault">
        <Input v-model="formValidate.rule" type="textarea" :autosize="{minRows: 2,maxRows: 15}" placeholder="输入数据验证规则，1、空检查 2、唯一性检查"></Input>
      </FormItem>
      <FormItem label="Desc" prop="desc">
        <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 15}" placeholder="Enter something..."></Input>
      </FormItem>

      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">新增</Button>
        <Button style="margin-left: 8px" @click="handleUpdateSubmit('formValidate')">修改</Button>
        <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        <Button style="margin-left: 10px;" @click="close">关闭视图明细</Button>

      </FormItem>
    </Form>

  </Card>
  <Card style="margin-top:20px">
    <div slot="title">
      <Icon type="ios-film-outline"></Icon>
      <span>视图列表明细（操作步骤：1=》选择原始数据列表 2=》操作列表属性 3=》选择需要显示的列  4=》保存视图列表明细）</span>
    </div>

    <!-- <Card> -->
    <span>原始数据列表：</span>
    <Select v-model="originals" multiple style="width:260px">
          <Option v-for="item in viewList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    <span style="margin-left:10px">需要后台提供数据，或在目录下添加列表信息</span>
    <div style="margin-top:  20px;">
      <Button type="primary" @click="saveTableDetail">保存列表明细</Button>
      <Button style="margin-left: 10px;" @click="close">关闭视图明细</Button>
      <Button style="margin-left: 10px;" @click="reload">重新加载</Button>
    </div>
    <Divider />
    <tablesPage ref="table" @selected="selectedData" :viewId="'124'" :isRemote="false" :isPage="isPage" :handleFunction="handleFunction"></tablesPage>
    <!-- <tables border ref="tables" @on-saveRow="saveRow" @on-Add="addItem" @on-search="search" @on-search-edit="searchP" @on-save-edit="editCell" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete" /> -->
    <!-- <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button> -->
    <Divider />
    <Button style="margin-left: 0px;" type="primary" @click="saveTableDetail">保存列表明细</Button>
    <Button style="margin-left: 10px;" @click="close">关闭视图明细</Button>
    <Button style="margin-left: 10px;" @click="reload">重新加载</Button>
  </Card>
  <!-- </Card> -->
</div>
</template>

<script>
import tablesPage from '@/view/tables/template'

import {
  mapActions,
  mapGetters,
  mapMutations,
  mapState
} from 'vuex'

import {
  getParams2,
  toJson
} from '@/libs/util'
export default {
  name: 'tables_page',
  components: {
    tablesPage
  },
  computed: {
    ...mapGetters([
      'getTableInfoById'
    ])
  },
  data () {
    return {
      handleFunction: (res) => {
        console.log('res', res)

        this.formValidate.name = res.name

        var columnObject = JSON.parse(res.grid_column)

        var column = columnObject.columnField
        if (columnObject.fields) {
          this.formValidate = columnObject.fields
        }
        if (column) {
          this.tableData = column
          this.selectData = column.filter((item) => {
            return item._checked
          })
        }
        // column = column.map(item => {
        //   if (!item.index) {
        //     item['index'] = '0'
        //   }
        //   if (!item.code) {
        //     item['code'] = '没有匹配项'
        //   }
        //
        //   return item
        // })
        return column
      },
      addPermits: [{
        value: 'false',
        label: '不显示'
      }, {
        value: 'true',
        label: '显示'
      }],
      formValidate: {
        name: '',
        url: '',
        des: '',
        addPermit: 'false',
        itemDefault: '',
        rule: '', // 新增或修改項目需要验证的规则
        addUrl: '',
        deleteUrl: '',
        editUrl: '',
        buttons: '',
        isCount: 'true'

      },
      isCounts: [{
        value: 'true',
        label: '有'
      }, {
        value: 'false',
        label: '无'
      }],
      ruleValidate: {
        name: [{
          required: true,
          message: '视图名称不能为空',
          trigger: 'blur'
        }],
        url: [{
          required: true,
          message: '列表远程访问路径不能为空，否则查不到任何数据',
          trigger: 'blur'
        }],
        desc: [{
          required: true,
          message: '请输入列表描述信息，尽量详细',
          trigger: 'blur'
        }

        ]
      },
      tableData: [],
      isPage: false,
      originals: [],
      viewList: [],
      selectData: []
    }
  },
  methods: {
    ...mapMutations([
      'closeTag'
    ]),
    // ...mapState (['menus']),
    ...mapActions([
      'handleTablesInfo',
      'getTableData',
      'addTableData',
      'deleteTableData',
      'editTableData',
      'getCheckOnly'
    ]),
    close () {
      /**
       * 如果是调用closeTag方法，普通的页面传入的对象参数只需要写name字段即可
       * 如果是动态路由和带参路由，需要传入query或params字段，用来区别关闭的是参数为多少的页面
       */
      this.closeTag({
        name: 'view',
        params: this.$route.params
      })
    },
    selectedData (data) {
      data.map(item => {
        item._checked = true
        return item
      })
      this.selectedData = data
    },
    handleUpdateSubmit (name) {
      var urlInfo = window.location.href
      var id = getParams2(urlInfo)

      var that = this

      this.$refs[name].validate((valid) => {
        if (valid) {
          this.selectedData = this.selectedData.map(item => {
            item.key = item.field
            if (item.width) {
              item.width = item.width * 1
            }
            if (item.editType == 'select') {
              // item.selectList = toJson(item.selectList)
            }
            return item
          })

          // 指定排序的比较函数
          function compare (property) {
            return function (obj1, obj2) {
              var value1 = obj1[property]
              var value2 = obj2[property]
              return value1 - value2 // 升序
            }
          }
          this.selectedData.sort(compare('index'))

          that.addTableData({
            url: '/bigger/grid/' + id,
            method: 'put',
            data: {
              name: that.formValidate.name,
              grid_column: JSON.stringify({
                columnField: this.selectedData,
                fields: that.formValidate
              })
            }
          }).then(res => {
            this.$Message.success('update Success!')
          })
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleSubmit (name) {
      var that = this
      this.$refs[name].validate((valid) => {
        this.selectedData = this.selectedData.map(item => {
          item.key = item.field
          if (item.editType == 'select') {
            // item.selectList = toJson(item.selectList)
          }
          return item
        })

        // 指定排序的比较函数
        function compare (property) {
          return function (obj1, obj2) {
            var value1 = obj1[property]
            var value2 = obj2[property]
            return value1 - value2 // 升序
          }
        }
        this.selectedData.sort(compare('index'))
        if (valid) {
          that.addTableData({
            url: '/bigger/grid',
            method: 'post',
            data: {
              name: that.formValidate.name,
              grid_column: JSON.stringify({
                columnField: this.selectedData,
                fields: that.formValidate
              })
            }
          }).then(res => {
            this.$Message.success('Success!')
          })
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    saveTableDetail () {

    },
    reload () {

    }
  },
  mounted () {

  },
  watch: {
    '$route' (to, from) {
      this.$refs.table.initParams()
      this.$refs.table.getTableInfo()
    }
  }
}
</script>

<style>

</style>
