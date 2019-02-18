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
      viewId: '411AAFC098F047A68593FFE3EA3F2DE0'
    }
  }
}
</script>
