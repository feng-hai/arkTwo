<template>
  <div class="echarts">
    <div :style="{height:'100%',width:'100%'}" ref="myEchart"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/map/js/china.js' // 引入中国地图数据
import {
  mapActions,
  mapGetters
  // mapState
} from 'vuex'
export default {
  name: 'tools_methods_page',
  props: {
    dataArray: {
      type: Array
    }
  },
  data () {
    return {
      chart: null,
      selectedProvince: '',
      dataArr: []
    }
  },
  // computed: {
  //   ...mapGetters([
  //     'getProvince',
  //   ])
  // },
  mounted () {
    this.chinaConfigure()
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    ...mapActions([
      'getEchartData'
    ]),
    chinaConfigure () {
      this.dataArr = this.dataArray
      var that = this
      let myChart = echarts.init(this.$refs.myEchart)
      // 这里是为了获得容器所在位置
      window.onresize = myChart.resize
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}'
        },
        dataRange: {
          min: 0,
          max: 500,
          x: 'left',
          y: 'bottom',
          // text: ['高', '低'], // 文本，默认为数值文本
          calculable: false,
          itemWidth: 10,
          itemHeight: 10,
          // splitNumber: 5,
          splitList: [
            { start: 500 },
            { start: 200, end: 500 },
            { start: 100, end: 200 },
            { start: 1, end: 100 }
            // {end: 0}
          ],
          color: ['#12508e', '#1e7bd1', '#95c7f0']
        },
        series: [{
          name: '中国',
          type: 'map',
          tooltip: {
            trigger: 'item',
            formatter: '{a}<br/>{b}:{c}'
          },
          mapType: 'china',
          selectedMode: 'single',
          itemStyle: {
            normal: {
              label: {
                show: false
              }
            },
            emphasis: {
              label: {
                show: false
              }
            }
          },
          data: this.dataArray
        }]
      }
      myChart.setOption(option)// 进行相关配置
      myChart.on('click', function (param) {
        let _this = this
        for (var i = 0, l = option.series[0].data.length; i < l; i++) {
          var name = option.series[0].data[i].name
          option.series[0].data[i].selected = false
          if (param.name == name) {
            that.selectedProvince = name
            // 设置海南，有两个海南
            if (that.selectedProvince == '海南') {
              that.selectedProvince = '海南省'
            }
            option.series[0].data[i].selected = true
            that.$emit('getProvince', that.selectedProvince)
          }
        }
        // if(this.selectedProvince != 'undefined'){
        //   for(var i=0; i< _this.dataArr.length; i++){
        //     if(_this.dataArr[i] == _this.selectedProvince){
        //       _this.dataArr[i].selected = true;
        //     }
        //   }
        // }
        if (typeof this.selectedProvince === 'undefined') {
          option.series.splice(1)
          option.legend = null
          // option.dataRange = null;
          myChart.setOption(option, true)// 默认是合并，设置true后完全替换
        }
      })
    }
  } }
</script>

<style>
.echarts{
  width: 100%;
  height: calc(100vh - 356px);
}
</style>
