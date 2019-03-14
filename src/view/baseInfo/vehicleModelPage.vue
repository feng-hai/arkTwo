<template>
<div>
  <tablesPage :viewId="viewId" @on-edit="editPage"></tablesPage>
</div>
</template>
<script>
import tablesPage from '@/view/tables/template'
export default {
  name: 'vehicleModelPage',
  components: {
    tablesPage
  },
  data () {
    return {
      viewId: '2D330092AB3B459B9E520DA58BC5C2E4'
    }
  },
  methods:{
    editPage(params,vm)
    {
      const id = params.row.unid // parseInt(Math.random() * 1000000000000000000000)
      const rowNum=params.row.rowNum;
      const columnNum=params.row.columnNum;
      console.log(rowNum,columnNum)
      const route = {
        name: 'params',
        params: {
          id: id,
          name:name,
          rowNum:rowNum,
          columnNum:columnNum
        },
        meta: {
          title: `动态路由-`+params.row.name,
          notCache: false
        }
      }
      this.$router.push(route)
    }
  }
}
</script>
