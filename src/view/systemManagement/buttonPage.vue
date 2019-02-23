<template>
<div>
  <!-- <Row>
    <Col span="6">  <tree style="margin-right:10px"></tree></Col>
  <Col span="18">  </Col>

</Row> -->

<tablesPage :viewId="viewId"></tablesPage>

</div>
</template>
<script>
import tablesPage from '@/view/tables/template'
import tree from '@/view/tree'
export default {
  name: 'buttonPage',
  components: {
    tablesPage,
    tree
  },
  data() {
    return {
      viewId: 'D3E75ACC25C645DD9F97F2A2127797F6'
    }
  }
}
</script>
