<template>
<div>
  <tablesPage :viewId="viewId"></tablesPage>
</div>
</template>
<script>
import tablesPage from '@/view/tables/template'
export default {
  name: 'dailyReport',
  components: {
    tablesPage
  },
  data () {
    return {
      viewId: 'C4E963E33AB74304A425EC29C1D40307'
    }
  }
}
</script>
