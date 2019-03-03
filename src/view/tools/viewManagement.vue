<template>
<tablesPage :viewId="viewId"  @on-edit="editPage"></tablesPage>
</template>
<script>
import tablesPage from '@/view/tables/template'

export default {
  name: 'viewManagement',
  components: {
    tablesPage,
  },
  data () {
    return {
      viewId:'125'
    }
  },
methods:{
  editPage(params,vm)
  {
    const id = params.row.unid // parseInt(Math.random() * 1000000000000000000000)
    const route = {
      name: 'view',
      params: {
        id: id,
        name:name
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
