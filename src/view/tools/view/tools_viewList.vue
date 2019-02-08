<template>
<div>

  <Card style="margin-top:20px">
    <div slot="title" >
      <Icon type="ios-film-outline"></Icon>
      <span style="margin-left:30px">数据视图列表</span>
    </div>
    <tables border ref="tables" @on-Add="addItem" @on-search="search" @on-search-edit="searchP" @on-save-edit="editCell" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete" />
    <!-- <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button> -->
  </Card>
  <!-- </Card> -->
</div>
</template>

<script>
import Tables from '_c/tables'
import {
  getTableView
} from '@/api/view'
import view_collumn from "@/assets/js/view_collumn"
export default {
  name: 'tables_page',
  components: {
    Tables
  },
  data() {
    return {
      tableData: [],
      columns: view_collumn.VIEWCOLLUMN,
      viewList: []
    }
  },
  methods: {
    addItem() {
      const id = parseInt(Math.random() * 1000000000000000000000)
      const route = {
        name: 'view',
        params: {
          id:id


        },
        meta: {
          title: `动态路由-${id}`,
          notCache: false
        }
      }
      this.$router.push(route)
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
