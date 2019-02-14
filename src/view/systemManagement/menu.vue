<template>
<div>
  <tablesPage :viewId="viewId"></tablesPage>
</div>
</template>
<script>
import tablesPage from '@/view/tables/template'
export default {
  name: 'menu',
  components: {
    tablesPage
  },
  data() {
    return {
      viewId: 'EC93684BFCBA4513A6C20DFB65A42C19'
    }
  }
}
</script>
