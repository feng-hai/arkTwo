<template>
<div>
  <tablesPage :viewId="viewId" @on-edit="editPage"></tablesPage>
</div>
</template>
<script>
import tablesPage from '@/view/tables/template'
export default {
  name: 'alarmSet',
  components: {
    tablesPage
  },
  data () {
    return {
      viewId: '95A8A9FEDCA3484A98B127CCE55A872E'
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
