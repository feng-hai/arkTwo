<template>
<div>
  <tablesPage :viewId="viewId"  @on-saveRow="saveRow"  @on-save-edit="onSaveEdit"></tablesPage>
</div>
</template>
<script>
import tablesPage from '@/view/tables/template'
export default {
  name: 'userPage',
  components: {
    tablesPage
  },
  data () {
    return {
      viewId: '342FA2327026480A903B019902CBC24D'
    }
  },
  methods: {
    onSaveEdit: function (params) {
      if (params.column.field == 'privilege_unid') {
        this.saveRow(params.row)
      }
    },
    saveRow: function (row) {
      getDataByParams({
        url: '/legacy/security/openid_privilege_map/bind',
        method: 'put',
        data: {
          openid: row.unid,
          privilege_unid: row.privilege_unid
        }
      }).then(item => {
        console.log(item)
      })
    }
  }
}
</script>
