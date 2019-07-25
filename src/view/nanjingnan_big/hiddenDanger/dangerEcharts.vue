<template>
  <div v-on:click="cardClick">
    <Card shadow style=" backgroundColor:rgba(0, 0, 0, 0.1); ">
      <Chart-object v-bind:style="{height:chartsHeight + 'px'}" :options="options" text="安全指数"></Chart-object>
    </Card>
  </div>
</template>
<script>
// import '../parent-view.less'
import { ChartObject } from "_c/charts";
export default {
  name: "vedioStatus",
  props: {
    chartsHeight: {
      type: Number,
      default() {
        return 300;
      }
    }
  },
  components: {
    ChartObject
  },
  data() {
    return {
      options: {
        // title: {
        //   text: "南丁格尔玫瑰图",
        //   subtext: "纯属虚构",
        //   x: "center"
        // },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // legend: {
        //   x: "center",
        //   y: "bottom",
        //   data: [
        //     "rose1",
        //     "rose2",
        //     "rose3",
        //     "rose4",
        //     "rose5",
        //     "rose6",
        //     "rose7",
        //     "rose8"
        //   ]
        // },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["pie", "funnel"]
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        series: [
          {
            name: "半径模式",
            type: "pie",
            radius: [20, 110],
            center: ["25%", "50%"],
            roseType: "radius",
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            lableLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            data: [
              { value: 10, name: "rose1" },
              { value: 5, name: "rose2" },
              { value: 15, name: "rose3" },
              { value: 25, name: "rose4" },
              { value: 20, name: "rose5" },
              { value: 35, name: "rose6" },
              { value: 30, name: "rose7" },
              { value: 40, name: "rose8" }
            ]
          },
          {
            name: "面积模式",
            type: "pie",
            radius: [30, 110],
            center: ["75%", "50%"],
            roseType: "area",
            data: [
              { value: 10, name: "rose1" },
              { value: 5, name: "rose2" },
              { value: 15, name: "rose3" },
              { value: 25, name: "rose4" },
              { value: 20, name: "rose5" },
              { value: 35, name: "rose6" },
              { value: 30, name: "rose7" },
              { value: 40, name: "rose8" }
            ]
          }
        ]
      }
    };
  },
  methods: {
    cardClick() {
      this.$emit("on-click", "setIconInlayerforBig");
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
};
</script>

<style lang="less">
.count-style {
  font-size: 50px;
}
</style>
