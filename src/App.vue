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
export default {
  name: 'App',
  methods: {
    // 在首页初始化公共数据
    ...mapActions([
      "getOrgInfoAction",
      'getMenuInfoAction',
      'getRolesInfoAction'
    ]),
  },
  mounted() {
    this.getOrgInfoAction();
    this.getMenuInfoAction();
    this.getRolesInfoAction();
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
