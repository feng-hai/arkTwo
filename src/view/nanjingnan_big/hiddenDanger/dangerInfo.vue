<template>
<div class="contentinfo">
  <!-- <span class="pTitle"><span class="active">安全指数</span></p> -->

  <dangerEcharts :chartsHeight="chartsHeight"></dangerEcharts>
  <dangerTable :scollHeight="scollHeight" style="padding-bottom:10px"></dangerTable>

</div>
</template>
<script>
import dangerTable from './dangerTable.vue'
import dangerEcharts from './dangerEcharts.vue'
import {
  windowHeight
} from '@/libs/util'
export default {
  name: 'alarmInfo',
  components: {
    dangerTable,
    dangerEcharts
  },
  data () {
    return {
      chartsHeight: (windowHeight() - 120) / 2 - 20 - 10,
      scollHeight: (windowHeight() - 120) / 2 - 10 - 23
    }
  }

}
</script>
<style lang="less">
.contentinfo {
  position: relative;
//  height: calc(100vh - 104px);
  overflow: hidden;
}

.pTitle {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 100;
  span {
    cursor: pointer;
    cursor: hand;
    padding: 10px; // Border: 1px solid #000;
  }
  .active {
    color: #fff;
  }
  .noactive {
    color: #bbb;
  }
}
</style>
