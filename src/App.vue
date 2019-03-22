<template>
<div id="app">
  <router-view/>
</div>
</template>

<script>
import {
  mapActions,
  mapGetters,
  mapState
} from 'vuex'
import {
  getToken
} from '@/libs/util'
export default {
  name: 'App',
  methods: {
    // 在首页初始化公共数据
    ...mapActions([
      "getOrgInfoAction",
      'getMenuInfoAction',
      'getRolesInfoAction',
      'getVehicleModelAction'
    ]),
  },
  mounted() {
    if (getToken()) {
      this.getOrgInfoAction();
      this.getMenuInfoAction();
      this.getRolesInfoAction();
      this.getVehicleModelAction();
    }
  }
}
</script>

<style lang="less">
.size {
    width: 100%;
    height: 100%;
}
body,
html {
    .size;
    overflow: hidden;
    margin: 0;
    padding: 0;
}
#app {
    .size;
}
</style>
