<template>
<div>
  <Row>
    <Col span="6">  <tree style="margin-right:10px"></tree></Col>
  <Col span="18">  <tablesPage :viewId="viewId"></tablesPage></Col>

</Row>



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
      viewId: 'EC93684BFCBA4513A6C20DFB65A42C19'
    }
  }
}
</script>
