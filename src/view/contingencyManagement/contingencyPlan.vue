<template>
<div>
  <!-- <Row>
    <Col span="6">  <tree style="margin-right:10px"></tree></Col>
  <Col span="18">  </Col>

</Row> -->

  <tablesPage :viewId="viewId" @on-edit="editPage"></tablesPage>

</div>
</template>
<script>
import tablesPage from '@/view/tables/template'
import tree from '@/view/tree'
export default {
  name: 'contingencyPlan',
  components: {
    tablesPage,
    tree
  },
  data() {
    return {
      viewId: '78C00458FA724EC0A2E493F63AD0367D'
    }
  },
  methods: {
    editPage(params, vm) {
      const id = params.row.unid // parseInt(Math.random() * 1000000000000000000000)
      const route = {
        name: 'contingencePlanDetail',
        params: {
          id: id,
          name: name
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
