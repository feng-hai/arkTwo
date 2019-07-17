<template>
<div>
  <tablesPage :viewId="viewId" @on-saveRow="save" @on-save-edit="save" @on-delete="save"></tablesPage>
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
  name: 'menuPage',
  components: {
    tablesPage
  },

  data () {
    return {
      viewId: '567E63B17B764297A9F02D5B203A3AAF'
    }
  },
  methods: {
    // 在首页初始化公共数据
    ...mapActions([
      'getMenuInfoAction'
    ]),
    save: function () {
      console.log('菜单编辑了')
      this.getMenuInfoAction()
    }
  }

}
</script>
