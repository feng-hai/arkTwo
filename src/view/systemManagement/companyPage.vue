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
  name: 'companyPage',
  components: {
    tablesPage
  },
  data() {
    return {
      viewId: '0DCF232FBE6648A0B2C6A646A88C4421'
    }
  },
  methods: {
    // 在首页初始化公共数据
    ...mapActions([
      "getOrgInfoAction",

    ]),
    save: function() {
      this.getOrgInfoAction();
    }
  }
}
</script>
