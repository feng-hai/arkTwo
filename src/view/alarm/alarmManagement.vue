<template>
<div>
  <tablesPage :viewId="viewId"></tablesPage>
</div>
</template>
<script>
import tablesPage from '@/view/tables/template'
export default {
  name: 'deviceManagement',
  components: {
    tablesPage
  },
  data () {
    return {
      viewId: '2D405CEFF9384405A9A2A5395423ABBE'
    }
  }
}
</script>
