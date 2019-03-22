<template>
<div>
  <tablesPage :viewId="viewId"></tablesPage>
</div>
</template>
<script>
import tablesPage from '@/view/tables/template'
export default {
  name: 'monitoringPage',
  components: {
    tablesPage
  },
  data () {
    return {
      viewId: 'C1B66FFF535A4605A6CEBC85E94B9BFC'
    }
  }
}
</script>
