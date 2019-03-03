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
  name: 'troubleManagement',
  components: {
    tablesPage,
    tree
  },
  data () {
    return {
      viewId: '2EE9E94F532B4641AABE9CCBE4E6D757'
    }
  }
}
</script>
