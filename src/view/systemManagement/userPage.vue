<template>
<div>
  <tablesPage :viewId="viewId" @on-saveRow="saveRow" :addBeforeFunc="addBeforeFunc" @on-save-edit="onSaveEdit"></tablesPage>
</div>
</template>
<script>
import tablesPage from '@/view/tables/template'
import {
  getDataByParams,
  getAllQuery,
  getQuery
} from '@/api/handle.js'
export default {
  name: 'userPage',
  components: {
    tablesPage
  },
  data() {
    return {
      viewId: '289F8880010B42ACB8B2D062BDCE0656'
    }
  },
  methods: {
    addBeforeFunc: function(item, callback) {
      item.credential = "123456";
      callback(item);
    },
    onSaveEdit: function(params) {
      if (params.column.field == "privilege_unid") {
        this.saveRow(params.row);
      }
    },
    saveRow: function(row) {
      getDataByParams({
        url: '/bigger/security/openid_privilege_map/bind',
        method: 'put',
        data: {
          open_id: row.unid,
          privilege_unid: row.privilege_unid
        }
      }).then(item => {
        console.log(item);
      })
    }
  }
}
</script>
