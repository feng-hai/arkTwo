<template>
  <div class ="contentinfo">
    <p class="pTitle"><span class="active" >巡检管理</span></p>

  <inspactionEcharts :chartsHeight="chartsHeight"></inspactionEcharts>
  <inspactionTable :scollHeight="scollHeight" style="padding-bottom:5px"></inspactionTable>

</div>
</template>
<script>
import inspactionTable from './inspactionTable.vue'
import inspactionEcharts from './inspactionEcharts.vue'
import {
  windowHeight
} from '@/libs/util'
export default {
  name: 'alarmInfo',
  components :{
    inspactionTable,
    inspactionEcharts
  },
  data() {
    return {
      chartsHeight:(windowHeight()-180)/2,
      scollHeight:(windowHeight()-180)/2

    }
  }

}
</script>
<style>
.contentinfo{
  position: relative;
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
