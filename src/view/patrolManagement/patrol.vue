<template>
<div>
  <tablesPage :viewId="viewId"></tablesPage>
</div>
</template>
<script>
import tablesPage from '@/view/tables/template'
export default {
  name: 'patrol',
  components: {
    tablesPage
  },
  data () {
    return {
      viewId: '3D3DE639DE584A3A8A10072B2A85A75A'
    }
  }
}
</script>
