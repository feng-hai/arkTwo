<template>
<div>
  <tablesPage :viewId="viewId"></tablesPage>
</div>
</template>
<script>
import tablesPage from '@/view/tables/template'
export default {
  name: 'vehiclesPage',
  components: {
    tablesPage
  },
  data () {
    return {
      viewId: '33B5FE9B59EA47138F76C1829EC0A040'
    }
  }
}
</script>
