<template>
<div>
  <tablesPage :viewId="viewId"></tablesPage>
</div>
</template>
<script>
import tablesPage from '@/view/tables/template'
export default {
  name: 'vehicleTypePage',
  components: {
    tablesPage
  },
  data() {
    return {
      viewId: '4DF2FE77F81E46C0A5BF04D745E2519C'
    }
  }
}
</script>
