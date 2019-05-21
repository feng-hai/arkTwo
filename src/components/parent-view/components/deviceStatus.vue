<template>
<div v-on:click="cardClick">
  <Card shadow style=" backgroundColor:rgba(0, 0, 0, 0.1); ">
    <p class="pTitle"><span class="active">设备状态</span></p>
    <Chart-object v-bind:style="{height:chartsHeight + 'px'}" :options="options" text="巡检管理"></Chart-object>
    <!-- <chart-pie v-bind:style="{height:chartsHeight + 'px'}" :value="pieData" text="巡检管理"></chart-pie> -->
  </Card>
</div>
</template>
<script>
import '../parent-view.less'
import {
  ChartObject,
} from '_c/charts'
export default {
  name: 'vedioStatus',
  props: {
    chartsHeight: {
      type: Number,
      default () {
        return 200;
      }
    },
  },
  components: {
    ChartObject,
  },
  data() {
    return {
      options: {
        // title: {
        //   text: '某站点用户访问来源',
        //   subtext: '纯属虚构',
        //   x: 'center'
        // },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'right',
          data: ['报警', '离线','正常']
        },
        series: [{
          name: '设备状态',
          type: 'pie',
          radius: ['50%','70%'],
          center: ['50%', '60%'],
          data: [{
              value: 35,
              name: '报警'
            },
            {
              value: 3210,
              name: '正常'
            },
            {
              value: 10,
              name: '离线'
            },
            {
              value: 121,
              name: '屏蔽'
            }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }
    }

  },
  methods: {
    cardClick() {
      this.$emit("on-click", 'homeForBigger')
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
