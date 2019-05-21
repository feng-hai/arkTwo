<template>
<div>
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
  components :{
    barrierTable,
    barrierEcharts
  },
  data() {
    return {
      chartsHeight:(windowHeight()-180)/2,
      scollHeight:(windowHeight()-180)/2-12

    }
  }

}
</script>
<style>

</style>
