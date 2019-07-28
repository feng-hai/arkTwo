<template>
  <div class="nanjinnan_alarm">
    <p class="pTitle">
      <span class="active">报警信息</span>
    </p>
    <alarmEcharts :chartsHeight="chartsHeight"></alarmEcharts>
    <alarmTable :scollHeight="scollHeight" style="padding-bottom:10px"></alarmTable>
  </div>
</template>
<script>
import alarmTable from "./alarmTable.vue";
import alarmEcharts from "./alarmEcharts.vue";
import { windowHeight } from "@/libs/util";
export default {
  name: "alarmInfo",
  components: {
    alarmTable,
    alarmEcharts
  },
  data() {
   return {
      chartsHeight: (windowHeight() - 120) / 2 - 20 - 10,
      scollHeight: (windowHeight() - 120) / 2 - 10 - 23
    }
  },
  mounted() {
    this.$nextTick(function() {
      // this.chartsHeight = (windowHeight() - 120) / 2 - 20 - 10;
      // this.scollHeight = (windowHeight() - 120) / 2 - 10 - 23;
      // console.log("加载数据", this.chartsHeight, this.scollHeight);
      // console.log("触发报警列表");
    });
  }
};
</script>
<style lang="less">
.nanjinnan_alarm {
  position: relative;
  overflow: hidden;
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
}
</style>
