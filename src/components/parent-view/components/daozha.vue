<template>
<div id="daozha" >
  <Card shadow style=" backgroundColor:rgba(0, 0, 0, 0.1); ">
    <p class="pTitle"><span :class="isdaozha?action:noaction" @click="changeType">道闸监控</span><span @click="changeType" :class="isdaozha?noaction:action">充电桩监控</span></p>
    <Chart-object @on-click="turnToPage1"  v-show="isdaozha" v-bind:style="{height:chartsHeight + 'px'}" text="巡检管理" :options="optiondaozha" ></Chart-object>
    <Chart-object @on-click="turnToPage2"  ref="chongdian" v-show="ischongdian" v-bind:style="{width:'100%',height:chartsHeight + 'px'}" :options="options" text="巡检管理"></Chart-object>
    </TabPane>
    <!-- <Chart-object v-bind:style="{height:chartsHeight + 'px'}" :value="pieData" text="巡检管理1"></Chart-object></TabPane> -->
  </Card>
</div>
</template>
<script>
import {
  mapActions,
  mapGetters,
  mapState
} from 'vuex'
import '../parent-view.less'
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
      isdaozha: true,
      ischongdian: false,
      action: 'active',
      noaction: 'noactive',
      optiondaozha: {
        color: ['#009DFF'],
        tooltip: {

          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },

        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          splitLine: { show: false } // 去除网格线
        },
        yAxis: {
          type: 'category',
          splitLine: { show: false }, // 去除网格线
          data: ['出闸', '进闸']
        },
        series: [{
          name: '',
          type: 'bar',
          data: [1000, 2000]
        }

        ]
      },
      options: {
        color: ['#27DAB3', '#009DFF'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        calculable: true,
        series: [{
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
        }]
      }

    }
  },
  methods: {
    ...mapActions([
      'getBigInfoAction'

    ]),
    turnToPage1 () {
      this.$emit('on-click', 'bigdaozha')
    },
    turnToPage2 () {
      this.$emit('on-click', 'homeForBigger')
    },
    changeType () {
      this.$refs.chongdian.resize()
      if (this.isdaozha) {
        this.isdaozha = false
        this.ischongdian = true
        this.$nextTick(() => {
          this.$refs.chongdian.resize()
        })
      } else {
        this.isdaozha = true
        this.ischongdian = false
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
      channel: 'GATE',
      system_id: '157'
    }).then(res => {
      var temp = res.data.map(item => {
        return {
          value: item.amount,
          name: item.name
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
#daozha .pTitle {
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
