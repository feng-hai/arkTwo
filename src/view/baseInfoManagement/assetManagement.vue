<template>
<div>
  <tablesPage :viewId="viewId"></tablesPage>
</div>
</template>
<script>
import tablesPage from '@/view/tables/template'
export default {
  name: 'assetManagement',
  components: {
    tablesPage
  },
  data () {
    return {
      viewId: '570821854F8245B3BBA4A27ACB72F4DB'
    }
  }
}
</script>
