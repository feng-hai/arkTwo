<template>
<div v-on:click="cardClick">
  <Card shadow style=" backgroundColor:rgba(0, 0, 0, 0.1); ">
    <Chart-object v-bind:style="{height:chartsHeight + 'px'}" :options="options" text="巡检管理"></Chart-object>
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
        title: {
          text: '视频监控',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        calculable: true,
        series: [

          {
            name: '面积模式',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            roseType: 'redius',
            data: [{
                value: 10,
                name: '在线'
              },
              {
                value: 5,
                name: '离线'
              }


            ]
          }
        ]
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
