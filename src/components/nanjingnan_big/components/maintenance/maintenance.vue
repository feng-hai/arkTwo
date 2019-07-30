<template>
  <div >
    <Card shadow style=" backgroundColor:rgba(0, 0, 0, 0.1); ">
      <p class="pTitle">
        <span>维护保养</span>
      </p>
      <Chart-object v-bind:style="{height:h + 'px'}" :options="options" text="巡检管理"></Chart-object>
      <!-- <chart-pie v-bind:style="{height:chartsHeight + 'px'}" :value="pieData" text="巡检管理"></chart-pie> -->
    </Card>
  </div>
</template>
<script>
import { ChartObject } from "_c/charts";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "vedioStatus",
  props: {
    chartsHeight: {
      type: Number,
      default() {
        return 300;
      }
    },
    h:{
      type:String|Number,
      default(){
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
        //   text: '某站点用户访问来源',
        //   subtext: '纯属虚构',
        //   x: 'center'
        // },
        color: ["#27DAB3", "#009DFF"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",

          x: "right", // 水平安放位置，默认为全图居中，可选为：
          // 'center' ¦ 'left' ¦ 'right'
          // ¦ {number}（x坐标，单位px）
          y: "bottom", // 垂直安放位置，默认为全图顶端，可选为：
          // 'top' ¦ 'bottom' ¦ 'center'
          // ¦ {number}（y坐标，单位px）
          data: ["已保养", "逾期", "待保养"]
        },
        series: [
          {
            name: "巡检管理",
            type: "pie",
            radius: ["50%", "70%"],
            center: ["50%", "60%"],
            label: {
              normal: {
                formatter: " {c}",
                // backgroundColor: '#eee',
                // borderColor: '#aaa',
                borderWidth: 1,
                borderRadius: 4,
                // shadowBlur:3,
                // shadowOffsetX: 2,
                // shadowOffsetY: 2,
                // shadowColor: '#999',
                // padding: [0, 7],
                rich: {
                  a: {
                    color: "#999",
                    lineHeight: 22,
                    align: "center"
                  },
                  // abg: {
                  //     backgroundColor: '#333',
                  //     width: '100%',
                  //     align: 'right',
                  //     height: 22,
                  //     borderRadius: [4, 4, 0, 0]
                  // },
                  hr: {
                    borderColor: "#aaa",
                    width: "100%",
                    borderWidth: 0.5,
                    height: 0
                  },
                  b: {
                    fontSize: 12,
                    lineHeight: 40
                  },
                  per: {
                    color: "#eee",
                    backgroundColor: "#334455",
                    padding: [2, 4],
                    borderRadius: 2
                  }
                }
              }
            },
            data: [
              {
                value: 335,
                name: "已保养"
              },
              {
                value: 310,
                name: "逾期"
              },
              {
                value: 310,
                name: "待保养"
              }
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
    ...mapActions(["getBigInfoAction"]),
    cardClick() {
      this.$emit("on-click", "biginspactionInfo");
    }
    // 在首页初始化公共数据
    // ...mapActions([
    //   "getOrgInfoAction",
    //   'getMenuInfoAction'
    // ]),
  },
  mounted() {
    var that = this;
    // this.getOrgInfoAction();
    // this.getMenuInfoAction();
    // 访问车辆状态数据
    // this.getBigInfoAction({
    //   channel: "PATROL_TODO",
    //   system_id: "157"
    // }).then(res => {
    //   var temp = res.data.map(item => {
    //     return {
    //       value: item.amount,
    //       name: item.name
    //     };
    //   });
    //   that.options.series[0].data = temp;
    //   console.log(that.options);
    // });
  }
};
</script>

<style lang="less" scoped>
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
    font-size: 20px;
    color: #fff;
    // Border: 1px solid #000;
  }
  .active {
    color: #00ceff;
  }
  .noactive {
    color: #caf3f8;
  }
}
</style>
