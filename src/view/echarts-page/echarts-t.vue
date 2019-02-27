<template>
<div>
  <!-- <ve-line :data="getData"></ve-line> -->

  <ve-chart :extend="chartExtend" :digit=10 :data-empty="isChartEmpty" :judge-width="editWidth" :data="chartData" :settings="chartSettings" :data-zoom="dataZoom"></ve-chart>
</div>
</template>

<script>
import VeLine from 'v-charts/lib/line.common'
export default {
  name: 'echartsT',
  components: {
    VeLine
  },
  props: {
    setItem: {
      type: Object,
      default () {
        return {}
      }
    },
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    rows: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    this.typeArr = ['line', 'histogram', 'pie', 'bar', 'ring', 'waterfall', 'funnel', 'radar']
    return {
      editWidth: true,
      dataZoom: [],
      isChartEmpty: true,
      chartSettings: {
        scale: [true, true],
        digit: 10
      },
      chartExtend: { // 线平滑化
        series: {
          smooth: false
        }
      },
      chartData: {
        columns: [],
        rows: []
      },
      labels: {}

    }
  },
  methods: {
    // 设置chart的属性 index代表图表类型 isRoom表示是否需要DataZoom
    setChart (index, isZoom) {
      this.dataZoom = []
      isZoom = false
      this.chartData.columns = this.columns

      if (index == 0 || index == 1 || index == 3) {
        isZoom = true
        this.dataZoom = [{
          type: 'slider',
          filterMode: 'weakFilter'
        }, {
          type: 'inside',
          filterMode: 'weakFilter'
        }]
      }
      var labels = {}
      if (this.setItem.yArrayObject) {
        this.setItem.yArrayObject.forEach(item => {
          labels[item.id] = item.name
          this.labels[item.name] = item.id
        })
      }
      if (this.setItem.xArrayObject) {
        this.chartSettings = {
          type: this.typeArr[index],
          scale: [true, true],
          digit: 10,
          showDataZoom: isZoom,
          labelMap: labels,
          dimension: this.setItem.xArrayObject.map(item => {
            return item.id
          }),
          metrics: this.setItem.yArrayObject.map(item => {
            return item.id
          }),
          xAxisType: this.setItem.xAxisType
        }
      }
    },
    handleResize (event) {
      const {
        atMin
      } = event
      /* eslint-disable */
      console.log(atMin);
    },
  },
  mounted() {

  },
  watch: {
    deep: true,
    setItem: function(nv, ov) {
      var item = this.setItem;
      this.setChart(item.chartType, true);
    },
    columns: function(nv, ov) {
      this.chartData.columns = nv;
    },
    rows: function(nv, ov) {
      var that = this;
      that.chartExtend = { //线平滑化
        series: {
          smooth: false,
          symbol: 'none'
        },
        tooltip: {
          formatter: function(params, ticket, callback) {
            let res = params[0].axisValueLabel;
            var item = that.chartData.rows[params[0].dataIndex];
            for (let i = 0, l = params.length; i < l; i++) {
              var seriesCode = that.labels[params[i].seriesName];
              var item = that.chartData.rows[params[i].dataIndex];
              if (item[seriesCode + "_base"]) {
                res += '<br/>' + params[i].marker + params[i].seriesName + ' : ' + item[seriesCode + "_base"];
              } else {
                res += '<br/>' + params[i].marker + params[i].seriesName + ' : ' + item[seriesCode];
              }
            }
            return res;
          }
        }
      };
      this.chartData.rows = nv;
      if (this.chartData.rows.length > 0)
        this.isChartEmpty = false;
    }
  }
}
</script>
