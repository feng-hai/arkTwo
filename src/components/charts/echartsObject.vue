<template>
<div ref="dom" class="charts chart-bar"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'
import {
  on,
  off
} from '@/libs/tools'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'ChartObject',
  props: {
    options: {
      type: Object,
      default () {
        var option = {
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
            boundaryGap: [0, 0.01]
          },
          yAxis: {
            type: 'category',
            data: ['出闸', '进闸']
          },
          series: [{
              name: '',
              type: 'bar',
              data: [1000, 2000]
            }

          ]
        };

        return option
      }
    }
  },
  data() {
    return {
      dom: null
    }
  },
  methods: {
    resize() {
      console.log("refs")
      this.dom.resize()
    },
    setOption() {
      this.$nextTick(() => {
        console.log("setOption")
        this.dom = echarts.init(this.$refs.dom, 'tdTheme');
        this.dom.setOption(this.options);
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.setOption();
      on(window, 'resize', this.resize)
    })
  },
  beforeDestroy() {
    off(window, 'resize', this.resize)
  }
}
</script>
