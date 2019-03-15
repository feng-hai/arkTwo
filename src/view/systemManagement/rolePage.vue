<template>
<div>
  <tablesPage :viewId="viewId" @on-saveRow="saveRow"></tablesPage>
</div>
</template>
<script>
import tablesPage from '@/view/tables/template'
import {
  mapActions,
  mapGetters,
  mapState
} from 'vuex'
export default {
  name: 'rolePage',
  components: {
    tablesPage
  },
  data() {
    return {
      viewId: '4DF2FE77F81E46C0A5BF04D745E2519C'
    }
  },
  methods: {
    // 在首页初始化公共数据
    ...mapActions([
      'getRolesInfoAction',
    ]),
    saveRow() {
      this.getRolesInfoAction();
      console.log("更新角色")
    }
  }
}
</script>
