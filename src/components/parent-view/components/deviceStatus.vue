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
  mapActions,
  mapGetters,
  mapState
} from 'vuex'
import {
  ChartObject
} from '_c/charts'
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
        //   text: '某站点用户访问来源',
        //   subtext: '纯属虚构',
        //   x: 'center'
        // },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        }, // 报警、正常、离线、屏蔽
        color: ['#EA6A76', '#27DAB3', '#009DFF', '#FEF85D'],
        legend: {
          orient: 'vertical',
          left: 'right',
          data: ['报警', '离线', '正常', '屏蔽']
        },
        series: [{
          name: '设备状态',
          type: 'pie',
          radius: ['50%', '70%'],
          center: ['50%', '60%'],
          label: {
            normal: {
              formatter: ' {c}',
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
                  color: '#999',
                  lineHeight: 22,
                  align: 'center'
                },
                // abg: {
                //     backgroundColor: '#333',
                //     width: '100%',
                //     align: 'right',
                //     height: 22,
                //     borderRadius: [4, 4, 0, 0]
                // },
                hr: {
                  borderColor: '#aaa',
                  width: '100%',
                  borderWidth: 0.5,
                  height: 0
                },
                b: {
                  fontSize: 12,
                  lineHeight: 40
                },
                per: {
                  color: '#eee',
                  backgroundColor: '#334455',
                  padding: [2, 4],
                  borderRadius: 2
                }
              }
            }
          },
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
    ...mapActions([
      'getBigInfoAction'

    ]),
    cardClick () {
      this.$emit('on-click', 'homeForBigger')
    },
    getName (name) {
      if (name == 'NORMAL') {
        return '正常'
      } else if (name == 'ALARM') {
        return '报警'
      } else if (name == 'FAULT') {
        return '屏蔽'
      } else {
        return '离线'
      }
    }
    // 在首页初始化公共数据
    // ...mapActions([
    //   "getOrgInfoAction",
    //   'getMenuInfoAction'
    // ]),
  },
  mounted () {
    var that = this
    // this.getOrgInfoAction();
    // this.getMenuInfoAction();
    // 访问车辆状态数据
    this.getBigInfoAction({
      channel: 'FIRE_FACILITY',
      system_id: '157'
    }).then(res => {
      var temp = res.data.map(item => {
        return {
          value: item.amount,
          name: this.getName(item.name)
        }
      })
      that.options.series[0].data = temp
      console.log(that.options)
    })
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
        color: #00CEFF;
    }
    .noactive {
        color: #CAF3F8;
    }
}
</style>
