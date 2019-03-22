<template>
<div class="main-home">
  <map-echarts></map-echarts>
</div>
</template>

<script>
import MapEcharts from '../../map_echarts/map_echarts'
import {
  // mapActions,
  // mapGetters,
  // mapState
} from 'vuex'
export default {
  name: 'home',
  components: {
    // CountTo,
    MapEcharts
  },
  data() {
    return {
    }
  },
  methods: {
    // 在首页初始化公共数据
    // ...mapActions([
    //   "getOrgInfoAction",
    //   'getMenuInfoAction'
    // ]),

  },
  mounted() {
    // this.getOrgInfoAction();
    // this.getMenuInfoAction();
  }
}
</script>

<style lang="less" scoped>
.main-home{
  width: 100%;
}
</style>
