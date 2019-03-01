<template>
<div>
  <tablesPage :viewId="viewId"></tablesPage>
</div>
</template>
<script>
import tablesPage from '@/view/tables/template'
export default {
  name: 'companyPage',
  components: {
    tablesPage
  },
  data () {
    return {
      viewId: 'E38AC55397614AE98CC210F5369468B1'
    }
  }
}
</script>
