<template>
<div>
  <tablesPage :viewId="viewId" :addBeforeFunc="addBeforeFunc"></tablesPage>
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
  name: 'vehiclesPage',
  components: {
    tablesPage
  },
  data() {
    return {
      viewId: '33B5FE9B59EA47138F76C1829EC0A040'
    }
  },
  methods: {
    addBeforeFunc: function(data, callback) {
      getDataByParams({
        "url": "/bigger/vehicle/info",
        "method": "get",
        "params": {
          "q": data.unid,
          "page_id": 0,
          "page_size": 1
        }
      }).then(res => {
        var options = {};
        if (res.data.length > 0) {
          options.unid = res.data[0].unid;
          options.vin = res.data[0].vin;
          options.licence = res.data[0].licence;
          options.name = res.data[0].name;
        }
        callback(Object.assign(data, options));
      })


    }
  }
}
</script>
