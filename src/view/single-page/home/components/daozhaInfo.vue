<template>
<div class ="contentinfo">
  <p class="pTitle"><span class="active" >道闸监控</span></p>
  <daozhaEcharts :chartsHeight="chartsHeight"></daozhaEcharts>
  <daozhaTable :scollHeight="scollHeight" style="padding-bottom:10px"></daozhaTable>
</div>
</template>
<script>
import daozhaTable from './daozhaTable.vue'
import daozhaEcharts from './daozhaEcharts.vue'
import {
  windowHeight
} from '@/libs/util'
export default {
  name: 'alarmInfo',
  components :{
    daozhaTable,
    daozhaEcharts
  },
  data() {
    return {
  chartsHeight: (windowHeight() - 120) / 2-20-10,
      scollHeight: (windowHeight() - 120) / 2-10-23

    }
  }

}
</script>
<style>
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
