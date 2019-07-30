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
    },
  
    options: {
      type: Object,
      default() {
        return {
          title: {
            text: "title"
          },
          // tooltip: {},
          // legend: {
          //   data: ["预算分配（Allocated Budget）", "实际开销（Actual Spending）"]
          // },
          radar: {
            // shape: 'circle',
            name: {
              textStyle: {
                color: "#fff",
                // backgroundColor: "#999",
                borderRadius: 3,
                padding: [3, 5]
              }
            },
            indicator: [
              { name: "火灾自动报警系统", max: 8 },
              { name: "消防栓系统", max: 10 },
              { name: "消防水炮系统", max: 3 },
              { name: "自动喷水灭火系统", max: 8 },
              { name: "气体灭火系统", max: 2 },
              { name: "防排烟系统", max: 3 }
            ]
          },
          series: [
            {
              name: "预算 vs 开销（Budget vs spending）",
              type: "radar",
              // areaStyle: {normal: {}},
              data: [
                {
                  value: [8, 10, 3, 8, 2, 3],
                  name: "预算分配（Allocated Budget）"
                }
              ]
            }
          ]
        };
      }
    }
  },
  components: {
    ChartObject
  },
  data() {
    return {
      options: this.options
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
