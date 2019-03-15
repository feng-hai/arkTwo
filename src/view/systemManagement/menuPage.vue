<template>
<div>
  <tablesPage :viewId="viewId" @on-saveRow="saveRow"></tablesPage>
</div>
</template>
<script>
import {
  mapActions

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
      'getMenuInfoAction',
    ]),
    saveRow() {
      this.getMenuInfoAction();
      console.log("更新菜单信息")
    }
  },
  data() {
    return {
      viewId: '41728E0D3F2F44598D47B964B07B116D'
    }
  }
}
</script>
