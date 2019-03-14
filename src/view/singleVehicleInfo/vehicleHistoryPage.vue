<template>
<div>
  <tablesHistoryPage :viewId="viewId" :objectId="objectId" :handleFunction="handleFunction" @on-edit="editPage"></tablesHistoryPage>
</div>
</template>
<script>
import tablesHistoryPage from '@/view/tables/templateForHistory'
export default {
  name: 'vehicleHistoryPage',
  components: {
    tablesHistoryPage
  },
  data() {
    return {
      viewId: '8540D8F90F314D658913EFF948448142',
      objectId: 'C3331D8F51EE4BE99C63287ACA668BC0'
    }
  },
  methods: {
    handleFunction(data) {

      var temps = []
      data.map(items => {

        var temp = {};
        items.pairs.forEach(item => {

          temp[item.key] = item.value;
        })

        temps.push(temp);
      })
      console.log(temps);
      return temps;

    },
    editPage(params, vm) {
      const id = params.row.unid // parseInt(Math.random() * 1000000000000000000000)
      const rowNum = params.row.rowNum;
      const columnNum = params.row.columnNum;
      console.log(rowNum, columnNum)
      const route = {
        name: 'params',
        params: {
          id: id,
          name: name,
          rowNum: rowNum,
          columnNum: columnNum
        },
        meta: {
          title: `动态路由-` + params.row.name,
          notCache: false
        }
      }
      this.$router.push(route)
    }
  }
}
</script>
