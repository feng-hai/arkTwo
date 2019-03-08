<template>
<div>
  <tablesPage :viewId="viewId"></tablesPage>
</div>
</template>
<script>
import tablesPage from '@/view/tables/template'
export default {
  name: 'userPage',
  components: {
    tablesPage
  },
  data() {
    return {
      viewId: '289F8880010B42ACB8B2D062BDCE0656'
    }
  }
}
</script>
