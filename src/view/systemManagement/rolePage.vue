<template>
<div>
  <tablesPage :viewId="viewId"></tablesPage>
</div>
</template>
<script>
import tablesPage from '@/view/tables/template'
export default {
  name: 'rolePage',
  components: {
    tablesPage
  },
  data () {
    return {
      viewId: '93B1B06A08C448E0B423427C618E4BD0'
    }
  }
}
</script>
