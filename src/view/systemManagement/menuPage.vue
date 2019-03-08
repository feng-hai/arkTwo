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
  data () {
    return {
      viewId: '41728E0D3F2F44598D47B964B07B116D'
    }
  }
}
</script>
