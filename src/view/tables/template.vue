<template>
<div>

  <Card style="margin-top:20px">

    <tables :height="400" :total="total" :permit="permit" @on-saveRow="saveRow" :buttons="buttons" :current="current" :pageSize="pageSize" @on-page-change="pageChange" @on-pageSize-change="pageSizeChange" :loading="isLoading" ref="tables" @on-add="addItem"
      @on-all-delete="deleteItems" @on-selection-change="handleSelectRow" @on-search="search" @on-search-edit="searchP" @on-save-edit="editCell" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete" />
    <!-- <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button> -->
  </Card>
  <!-- </Card> -->
</div>
</template>

<script>
import axios from 'axios'
import Tables from '_c/tables'
import {
  getTableView,
  getTableColumns,
} from '@/api/view'
import {
  getDataByParams,
  getAllQuery,
  getQuery
} from '@/api/handle.js'
import {
  getParams2,
  toJson
} from "@/libs/util"
import {
  mapActions,
  mapGetters,
  mapState
} from 'vuex'

import handle from '@/api/handle'
export default {
  name: 'tables_page',
  components: {
    Tables
  },
  computed: {
    ...mapGetters([
      'getTableInfoById'
    ])
  },
  data() {
    return {
      tableData: [],
      selectData: [], //列表中选择的行
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
        deletePermit: false,
        editPermit: false
      },
      itemDefault: {},
      buttons: [],
      searchParams: {},
      addUrl: 'add_table_view', //新增url
      deleteUrl: 'delete_table_view', //删除的url
      editUrl: 'edit_table_view', //修改的url
      ruleValidate: {} //新增修改时验证
    }
  },
  created() {
    this.getTableInfo()
  },
  methods: {
    // ...mapState (['menus']),
    ...mapActions([
      'handleTablesInfo',
      'getTableData',
      'addTableData',
      'deleteTableData',
      'editTableData',
      'getCheckOnly'
    ]),
    handleSelectRow(selection) {
      this.selectData = selection;
    },
    valueValidate(params, fun) {
      let that=this;
      var funArray = [];
      var messages = [];
      let isTure = true;
      for (var param in params) {
        let key = param;
        let value = params[key]
        let rule = this.ruleValidate[key];
        for (var j in rule) {
          if ("required" in rule[j]) {
            if (!value) {
              this.$Notice.warning({
                title: '数据不规范提醒',
                desc: rule[j].message ? rule[j].message : '必填项'
              });
              isTure = false;
              break;
            }
          }
          if ("remote" in rule[j]) {
            let initData = () => {
              //  return axios.get('get_item_info')
              return this.getCheckOnly({
                url: rule[j]["remote"],
                method: 'get',
                params: {
                  key: value
                }
              })
            }

            // let initData = () => {
            //   return getQuery({
            //     url: 'get_item_info',//rule[j]["remote"],
            //     method: 'get',
            //     params: {
            //       key: value
            //     }
            //   })
            // }
            // initData().then(res=>{
            //   console.log(res)
            // })
            funArray.push(initData());
            messages.push(rule[j].message)
          }
        }
      }
      if (isTure) {
        if (funArray.length > 0) {
          getAllQuery(funArray).then((resArr) => {
            let leng = resArr.length;
            let len = 0;
            resArr.forEach(function(res) {
              if (res.status === 200) { //修改对应的返回值
                that.$Notice.warning({
                  title: '数据不规范提醒',
                  desc: messages[len]
                });
                len++;
              }
            })
            if (len === leng) {
              fun();
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
      return true;
    },
    saveRow(params) { //新增一行保存
      let that = this;
      let row = this.tableData[params.index];
      //  console.log(this.ruleValidate)
      this.valueValidate({
        "name": '11'
      }, function() {
        let option = {
          url: that.addUrl,
          data: that.tableData[params.index],
          method: 'post'
        };
        that.addTableData(option).then(res => {
          row["isNew"] = false;
          that.$Notice.success({
            title: '新增提示',
            desc: '新增一条信息成功'
          });
        })
      })
    },
    pageChange(pageIndex) {
      this.isLoading = true;
      this.current = pageIndex;
      this.getTableInfo();
    },
    pageSizeChange(pageSize) {
      this.isLoading = true;
      this.pageSize = pageSize;
      this.getTableInfo();
    },
    setColumnInfo(json) {
      let options = {
        url: json.url
      }
      this.getTableDatas(options);
      this.addUrl = json.addUrl;
      this.deleteUrl = json.deleteUrl;
      this.permit.addPermit = json.addPermit;
      this.permit.deletePermit = json.deletePermit;
      this.permit.editPermit = json.editPermit;
      let handle=json.columns.find((item)=>{
        return item.key=="handle"
      });
      if(handle){
        if (this.permit.deletePermit) { //有删除权限
          handle["isHide"] = false; //该多选项不隐藏
        } else {
          handle["isHide"] = true; //该多选项隐藏
        }
      }

      let select = json.columns.find((item) => {
        return item.type == 'selection'
      });
      if (select) { //如果多选项存在
        if (this.permit.deletePermit) { //有删除权限
          select["isHide"] = false; //该多选项不隐藏
        } else {
          select["isHide"] = true; //该多选项隐藏
        }
      }
      this.columns = json.columns;
      this.buttons = json.buttons;
      this.ruleValidate = json.ruleValidate;
      if (this.permit.addPermit && json.itemDefault.length > 0) {
        this.itemDefault = toJson(json.itemDefault)
      }
    },
    createColumns() {
      var urlInfo = window.location.href;
      var id = getParams2(urlInfo);
      let columnInfo = this.getTableInfoById(id)
      if (columnInfo) {
        this.setColumnInfo(columnInfo)
      } else {
        this.handleTablesInfo(id).then(res => {
          this.setColumnInfo(res)
        });
      }
    },
    getTableDatas(options) {
      var option = {
        url: options.url,
        method: 'get',
        params: {
          current: this.current,
          pageSize: this.pageSize
        }
      }
      option.params = Object.assign({}, option.params, this.searchParams)
      this.getTableData(option).then(res => {
        this.tableData = res
        this.total = 100;
        this.isLoading = false;
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
    getTableInfo() {
      this.isLoading = true;
      this.createColumns(); //表头部分
      //this.getTableDatas(); //数据部分
    },
    deleteItems() { //批量删除

      this.deleteTableData({
        url: this.deleteUrl,
        method: 'delete',
        params: this.selectData
      }).then(res => {
        this.$Notice.success({
          title: '删除提示提示',
          desc: '删除信息成功'
        });
      })
    },
    addItem() {
      this.tableData.unshift(Object.assign({}, this.itemDefault));
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
    search(searchParams) { //搜索按钮
      this.searchParams = searchParams;
      this.getTableInfo()
    },
    editCell(params) {
      this.editTableData({
        url: this.editUrl,
        method: 'put',
        params: params
      }).then(res => {
        this.$Notice.success({
          title: '修改提示提示',
          desc: '修改信息成功'
        });

      })


    },
    handleDelete(params) { //删除数据

      this.deleteTableData({
        url: this.deleteUrl,
        method: 'delete',
        params: params
      }).then(res => {
        this.$Notice.success({
          title: '删除提示提示',
          desc: '删除一条信息成功'
        });
      })

    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    },
    initParams() {
      this.tableData = [];
      this.selectData = []; //列表中选择的行
      this.columns = [{
        key: 'ee'
      }];
      this.isLoading = true;
      this.pageSize = 10;
      this.total = 0;
      this.current = 1;
      this.permit = {
        addPermit: false,
        deletePermit: false
      };
      this.itemDefault = {};
      this.buttons = [];
      this.searchParams = {};
    }
  },
  mounted() {

  },

  watch: {
    '$route' (to, from) {
      this.initParams();

      this.getTableInfo()
    }
  }
}
</script>

<style>

</style>
