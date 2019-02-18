<template>
<div>
  <tablesPage :viewId="viewId"></tablesPage>
</div>
</template>
<script>
import tablesPage from '@/view/tables/template'
export default {
  name: 'menuPage',
  components: {
    tablesPage
  },
  data() {
    return {
      viewId: 'D3E75ACC25C645DD9F97F2A2127797F6'
    }
  }
}
</script>
