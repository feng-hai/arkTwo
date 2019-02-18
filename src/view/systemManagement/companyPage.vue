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
  data() {
    return {
      viewId: 'C28D3EB8D7394DFC99971B00B1A500DC'
    }
  }
}
</script>
