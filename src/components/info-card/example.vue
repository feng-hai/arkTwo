<template>
    <div ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { on, off } from '@/libs/tools'
export default {
  name: 'serviceRequests',
  data () {
    return {
      dom: null,
      xdata: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      ydata: [820, 645, 546, 745, 872, 624, 258],
      colorTypes: ['#00c6de', '#b6bde8', '#fcb822'],
    }
  },
  props: {
    colorType: {
      type: Number
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    }
  },
  mounted () {
    const option = {
      grid: {
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          splitLine:{show: false},//去除网格线
          data: this.xdata,
          axisLine:{
            lineStyle:{
                color:'#fff'
            }
        }, 
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisTick: {show:false},
          splitLine:{show: false},//去除网格线
          axisLine:{
              lineStyle:{
                  color:'#fff',
                  // width:8,//这里是为了突出显示加上的
              }
          } 
        }
      ],
      series: [
        {
          name: '快递/电商',
          type: 'line',
          symbol: 'none',
          lineStyle: {
            normal: {
              color: this.colorTypes[this.colorType]
            }
          },
          data: this.ydata
        }
      ]
    }
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.dom)
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
