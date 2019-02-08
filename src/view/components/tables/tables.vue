<template>
<div>
  <Card>
    <tables ref="tables"  @on-save-edit="editCell" editable searchable search-place="top" v-model="tableData" :columns="columns" @on-delete="handleDelete" />
    <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
  </Card>
</div>
</template>

<script>
import Tables from '_c/tables'
import {
  getTableData
} from '@/api/data'
export default {
  name: 'tables_page',
  components: {
    Tables
  },
  data() {
    return {
      columns: [{
          title: 'Name',
          key: 'name',
          sortable: true,
          editable: true,
          editType:"text"
        },
        {
          title: 'Email',
          key: 'email',
          editable: true,
          editType:"select",
          selectList:[
                    {
                        value: '1',
                        label: 'New York'
                    },
                    {
                        value: '2',
                        label: 'London'
                    },
                    {
                        value: '3',
                        label: 'Sydney'
                    },
                    {
                        value: '4',
                        label: 'Ottawa'
                    },
                    {
                        value: '5',
                        label: 'Paris'
                    },
                    {
                        value: '6',
                        label: 'Canberra'
                    }
                ]
        },
        {
          title: 'Create-Time',
          key: 'createTime'
        },
        {
          title: 'Handle',
          key: 'handle',
          options: ['delete'],
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
      ],
      tableData: []
    }
  },
  methods: {
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
    getTableData().then(res => {
      this.tableData = res.data
    })
  }
}
</script>

<style>

</style>
