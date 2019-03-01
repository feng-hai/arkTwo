
<template>
<div>
  <tablesPage :viewId="viewId"></tablesPage>
</div>
</template>
<script>
import tablesPage from '@/view/tables/template'
export default {
  name: 'videoManagement',
  components: {
    tablesPage
  },
  data () {
    return {
      viewId: '436462DB4EDD486290F612F17B2778F6'
    }
  }
}
</script>
