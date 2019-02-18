<template>
<div>
  <tablesPage :viewId="viewId"></tablesPage>
</div>
</template>
<script>
import tablesPage from '@/view/tables/template'
export default {
  name: 'rolePage',
  components: {
    tablesPage
  },
  data() {
    return {
      viewId: '22C1CC6D4E064074858ABAF2AF3D25EC'
    }
  }
}
</script>
