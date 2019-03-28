<template>
<div>
  <tablesPage :viewId="viewId" @on-edit="editPage" @on-saveRow="saveRow"></tablesPage>
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
    },
     editPage(params,vm){
      const name = params.row.name;
      const id = params.row.unid;
      const data = params.row;
      const route = {
        name: 'roleManager',
        params: {
          id: id,
          name:name,
          data: params.row
        },
        meta: {
          title: `动态路由-`+params.row.name,
          notCache: true
        }
      }
      this.$router.push(route)
    }
  }
}
</script>
