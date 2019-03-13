<template>
<div>
  <tablesPage :viewId="viewId"></tablesPage>
</div>
</template>
<script>
import {
  mapActions,
  mapGetters,
  mapState
} from 'vuex'
import tablesPage from '@/view/tables/template'
export default {
  name: 'menuPage',
  components: {
    tablesPage
  },
  methods: {

    // 在首页初始化公共数据
    ...mapActions([
      "getOrgInfoAction",
      'getMenuInfoAction',
      'getRolesInfoAction',
      'getVehicleModelAction'
    ]),
  },
  data () {
    return {
      viewId: '41728E0D3F2F44598D47B964B07B116D'
    }
  }
}
</script>
