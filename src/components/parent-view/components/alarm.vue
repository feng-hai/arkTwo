<template>
  <div v-on:click="cardClick">
    <Card shadow style=" backgroundColor:rgba(0, 0, 0, 0.1); ">
      <p class="pTitle">
        <span class="active">报警信息</span>
      </p>
      <Chart-object
        class="alarmType"
        v-bind:style="{height:chartsHeight + 'px'}"
        :options="options"
        text="巡检管理"
      ></Chart-object>
    </Card>
  </div>
</template>
<script>
import '../parent-view.less'
import { ChartObject } from '_c/charts'
export default {
  name: 'vedioStatus',
  props: {
    chartsHeight: {
      type: Number,
      default () {
        return 200
      }
    }
  },
  components: {
    ChartObject
  },
  data () {
    return {
      options: {
        // title: {
        //   text: '报警信息',
        //   x: 'center'
        // },
        color: ['#009DFF'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            splitLine: { show: false }, // 去除网格线
            type: 'category',
            data: ['7/1', '7/2', '7/3', '7/4', '7/5', '7/6', '7/7'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            splitLine: { show: false }, // 去除网格线
            type: 'value'
          }
        ],
        series: [
          {
            name: '报警数量',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      }
    }
  },
  methods: {
    cardClick () {
      this.$emit('on-click', 'bigalarmInfo')
    }
    // 在首页初始化公共数据
    // ...mapActions([
    //   "getOrgInfoAction",
    //   'getMenuInfoAction'
    // ]),
  },
  mounted () {
    // this.getOrgInfoAction();
    // this.getMenuInfoAction();
  }
}
</script>

<style lang="less">
.count-style {
  font-size: 50px;
}
.alarmType {
  cursor: pointer;
  cursor: hand;
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
        color: #00CEFF;
    }
    .noactive {
        color: #CAF3F8;
    }
}
</style>
