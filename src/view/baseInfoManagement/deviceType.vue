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
      viewId: '6B637FDE9A4E49E0923827136CD3391E'
    }
  }
}
</script>
