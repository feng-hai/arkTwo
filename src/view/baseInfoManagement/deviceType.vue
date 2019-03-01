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
      viewId: 'C7C8992FC115454AB093B7502917EFF1'
    }
  }
}
</script>
