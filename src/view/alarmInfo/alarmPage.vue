<template>
<div>
  <tablesPage :viewId="viewId" ></tablesPage>
</div>
</template>
<script>
import tablesPage from '@/view/tables/template'
export default {
  name: 'alarmPage',
  components: {
    tablesPage
  },
  data () {
    return {
      viewId: '30368931F36D454AB59179A3B82C971B'
    }
  },
  // methods:{
  //   editPage(params,vm)
  //   {
  //     const id = params.row.unid // parseInt(Math.random() * 1000000000000000000000)
  //     const route = {
  //       name: 'view',
  //       params: {
  //         id: id,
  //         name:name
  //       },
  //       meta: {
  //         title: `动态路由-`+params.row.name,
  //         notCache: false
  //       }
  //     }
  //     this.$router.push(route)
  //   }
  // }
}
</script>
