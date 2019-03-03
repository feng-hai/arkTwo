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
      viewId: '715B21B7176D4AD2B066863C1D2F2100'
    }
  }
}
</script>
