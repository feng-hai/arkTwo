<template>
<div v-on:click="cardClick">
  <Card shadow style=" backgroundColor:rgba(0, 0, 0, 0.1); ">
    <Chart-object v-bind:style="{height:chartsHeight + 'px'}" :options="options" text="巡检管理"></Chart-object>
  </Card>
</div>
</template>
<script>
// import '../parent-view.less'
import {
  ChartObject,
} from '_c/charts'
export default {
  name: 'vedioStatus',
  props: {
    chartsHeight: {
      type: Number,
      default () {
        return 300;
      }
    },
  },
  components: {
    ChartObject,
  },
  data() {
    return {
      options: {
        title: {
          x: 'center'
        },
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
           splitLine:{show: false},//去除网格线
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
           splitLine:{show: false},//去除网格线
          type: 'value'
        }],
        series: [{
          name: '报警数量',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }]
      }
    }

  },
  methods: {
    cardClick() {
      this.$emit("on-click", 'setIconInlayerforBig')
    }
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

<style lang="less">
.count-style {
    font-size: 50px;
}
</style>
