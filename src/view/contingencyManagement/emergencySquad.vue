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
  name: 'emergencySquad',
  components: {
    tablesPage,
    tree
  },
  data () {
    return {
      viewId: '929F6515AC2D4AF8B4252BC5ED717364'
    }
  }
}
</script>
