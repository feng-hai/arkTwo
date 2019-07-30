<template>
  <div v-on:click="cardClick">
    <Card shadow style=" backgroundColor:rgba(0, 0, 0, 0.1); ">
      <Row>
        <Col span="12" class="big_table_cell">
          <Chart-object v-bind:style="{height:chartsHeight + 'px'}" :options="options" text="安全指数"></Chart-object>
        </Col>
        <Col span="12" class="big_table_cell">
          <Chart-object v-bind:style="{height:chartsHeight + 'px'}" :options="options2" text="安全指数"></Chart-object>
        </Col>
      </Row>
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
        title: {
          text: "隐患类型分布",
         // subtext: "纯属虚构",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // legend: {
        //   orient: "vertical",
        //   left: "left",
        //   data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        // },
        series: [
          {
            name: "隐患类型分布",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
               { value: 335, name: "消防组织" },
              { value: 310, name: "人员素质" },
              { value: 234, name: "生产设备" },
              { value: 135, name: "消防设施" },
              { value: 1548, name: "建筑防火" }
           
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      options2: {
        title: {
          text: "隐患等级分布",
         // subtext: "纯属虚构",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // legend: {
        //   orient: "vertical",
        //   left: "left",
        //   data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        // },
        series: [
          {
            name: "隐患等级分布",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
            

               { value: 335, name: "特别重大隐患" },
              { value: 310, name: "重大隐患" },
              { value: 234, name: "较大隐患" },
              { value: 135, name: "一般隐患" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
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
