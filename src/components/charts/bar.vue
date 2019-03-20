<template>
  <div ref="dom" class="charts chart-bar"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'
import { on, off } from '@/libs/tools'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'ChartBar',
  props: {
    value: Object,
    legendData: Array,
    yData: Array,
    xData: Array,
    colorType: String
  },
  data () {
    return {
      dom: null,
      legend: []
    }
  },
  watch: {
    yData(){
      this.setEcharts();
      this.setEcharts();
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    },
    setEcharts(){
      // console.log(this.colorType, 'colorType');
      this.legend = this.legendData;
      this.$nextTick(() => {
        let option = {
          legend: {
            data:this.legend
          },
          tooltip : {
            trigger: 'axis'
          },
          xAxis : [
          {
            type : 'category',
            data : this.xData
          }
          ],
          yAxis: {
            type: 'value'
          },
          series : [
          {
            name: this.legendData[0],
            type:'bar',
            data: this.yData,
            markPoint : {
              data : [
                {type : 'max', name: '最大值'},
                {type : 'min', name: '最小值'}
              ]
            },
            itemStyle : {  
              normal : {  
                  lineStyle:{  
                      color: this.colorType
                  }  
              }  
          },  
            markLine : {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            }
          },
      ],
      color: this.colorType
      }
      this.dom = echarts.init(this.$refs.dom, 'tdTheme')
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    })
    }
  },
  mounted () {
    // console.log(this.xData, 'xData');
    // console.log(this.yData, 'yData');
    this.setEcharts();
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
