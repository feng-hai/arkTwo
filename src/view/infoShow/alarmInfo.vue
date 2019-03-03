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
  name: 'alarmInfo',
  components: {
    tablesPage,
    tree
  },
  data () {
    return {
      viewId: 'F42D513B093E4C8CBC0A9785A8F2F3A7'
    }
  }
}
</script>
