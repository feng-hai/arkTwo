<template>
  <div class ="contentinfo">
    <p class="pTitle"><span class="active" >æŠ¥è­¦ä¿¡æ¯</span></p>
  <barrierEcharts :chartsHeight="chartsHeight"></barrierEcharts>
  <barrierTable :scollHeight="scollHeight" style="padding-bottom:10px"></barrierTable>
</div>
</template>
<script>
import barrierTable from './barrierTable.vue'
import barrierEcharts from './barrierEcharts.vue'
import {
  windowHeight
} from '@/libs/util'
export default {
  name: 'alarmInfo',
  components: {
    barrierTable,
    barrierEcharts
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
.contentinfo{
  position: relative;
  height: calc(100vh - 104px);
  overflow:hidden;
}

.pTitle {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 100;
    span {
        cursor: pointer;
        cursor: hand;
        padding: 10px;
        // Border: 1px solid #000;
    }
    .active {
        color: #fff;
    }
    .noactive {
        color: #bbb;
    }
}
</style>
