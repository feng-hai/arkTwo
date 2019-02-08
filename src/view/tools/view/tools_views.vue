<template>
<div>
  <Card>
    <p slot="title">
      <Icon type="ios-film-outline"></Icon>
      视图信息
    </p>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <FormItem label="Name" prop="name">
        <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
      </FormItem>
      <FormItem label="视图URL" prop="url">
        <Input v-model="formValidate.url" placeholder="Enter your url"></Input>
      </FormItem>
      <FormItem label="新增按钮权限" prop="addPermit">
        <Select v-model="formValidate.addPermit" style="width:200px">
        <Option v-for="item in addPermits" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
      </FormItem>
      <FormItem label="新增默认值" v-if="formValidate.addPermit=='true'" prop="itemDefault">
        <Input v-model="formValidate.itemDefault" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入新增一行的默认值，json字符串"></Input>
      </FormItem>
      <FormItem label="Desc" prop="desc">
        <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
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
      <Button type="primary" @click="exportExcel">保存列表明细</Button>
      <Button style="margin-left: 10px;" @click="close">关闭视图明细</Button>
      <Button style="margin-left: 10px;" @click="exportExcel">重新加载</Button>
    </div>
    <Divider />
    <tables border ref="tables" @on-saveRow="saveRow" @on-Add="addItem" @on-search="search" @on-search-edit="searchP" @on-save-edit="editCell" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete" />
    <!-- <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button> -->
    <Divider />
    <Button style="margin-left: 0px;" type="primary" @click="exportExcel">保存列表明细</Button>
    <Button style="margin-left: 10px;" @click="close">关闭视图明细</Button>
    <Button style="margin-left: 10px;" @click="exportExcel">重新加载</Button>
  </Card>
  <!-- </Card> -->
</div>
</template>

<script>
import Tables from '_c/tables'
import {
  getTableView
} from '@/api/view'
import {
  mapMutations
} from 'vuex'
import view_collumn from "@/assets/js/view_collumn"
export default {
  name: 'tables_page',
  components: {
    Tables
  },
  data() {
    return {
      addPermits: [{
        value: "false",
        label: '不显示'
      }, {
        value: "true",
        label: '显示'
      }],
      formValidate: {
        name: '',
        url: '',
        des: '',
        addPermit:"false",
        itemDefault:""
      },
      ruleValidate: {
        name: [{
          required: true,
          message: 'The name cannot be empty',
          trigger: 'blur'
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
        //  city: [
        //      { required: true, message: 'Please select the city', trigger: 'change' }
        //  ],
        //  gender: [
        //      { required: true, message: 'Please select gender', trigger: 'change' }
        //  ],
        //  interest: [
        //      { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
        //      { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
        //  ],
        //  date: [
        //      { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
        //  ],
        //  time: [
        //      { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
        //  ],
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
      tableData: [],
      originals: [],
      columns: view_collumn.FIELDS,
      viewList: []
    }
  },
  methods: {
    ...mapMutations([
      'closeTag'
    ]),
    close() {
      /**
       * 如果是调用closeTag方法，普通的页面传入的对象参数只需要写name字段即可
       * 如果是动态路由和带参路由，需要传入query或params字段，用来区别关闭的是参数为多少的页面
       */
      this.closeTag({
        name: 'view',
        params: this.$route.params
      })
    },
    addItem() {
      this.tableData.push(Object.assign({}, view_collumn.DATAITEM))
    },
    searchP(params) {
      // let temp=view_collumn.FIELDS.map(item => {
      //   if (item.key == "align") {
      //     item.isLoading = true
      //   }
      //   return item;
      // })
      // console.log("temp",temp)
      // setTimeout(() => {
      //   //
      //   view_collumn.FIELDS.map(item => {
      //     if (item.key == "align") {
      //       item.selectList = [{
      //         value: 'left1',
      //         label: 'left1'
      //       }, {
      //         value: 'right2',
      //         label: "right2"
      //       }, {
      //         value: 'right32',
      //         label: "right32"
      //       }]
      //     }
      //     return item;
      //   })
      // }, 2200);
      // console.log(params);
    },
    search(key, value) {

      // let temp = view_collumn.FIELDS.map(item => {
      //   if (item.key == "align") {
      //     item.selectList.push({
      //       value: 'left1',
      //       label: 'left1'
      //     }, )
      //   }
      //   return item;
      //
      // })
      //
      // console.log(temp);
      // this.columns = temp;

      // getTableData().then(res => {
      //   this.tableData = res.data
      // })
    },
    saveRow(params) {
      this.tableData[params.index]["isNew"] = false;
      console.log("saveRow", params)

    },
    editCell(params) {
      console.log(params)
    },
    handleDelete(params) {
      console.log(params)
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  },
  mounted() {
    getTableView().then(res => {
      this.tableData = res.data
    })
  }
}
</script>

<style>

</style>
