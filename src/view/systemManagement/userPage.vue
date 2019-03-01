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
  data () {
    return {
      viewId: '342FA2327026480A903B019902CBC24D'
    }
  }
}
</script>
