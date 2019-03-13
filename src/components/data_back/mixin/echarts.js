import echarts from 'echarts'
export default {
  mounted() {
    this.EchartsLine();  //实时推送信息
  },
  methods: {
     EchartsLine(){
      var _this = this;
      this.myChart = echarts.init(document.getElementById('echarts'));
      let myOption = _this.drawLine();
      _this.myChart.clear();
      _this.myChart.setOption(myOption);
    },
    drawLine(){
      var xdata = [];
      var ydata = [];
      for(var i=0; i<100; i++){
        xdata.push('');
        ydata.push(0);
      }
      var that = this;
      var tempData = [];
      var legend = ['里程', '短路、过流报警', '电机控制器温度报警', '电机温度报警', '通讯故障报警'], series =[];
      tempData.forEach(function(field, i){
        legend.push(field.text);
        series.push({
          name: field.text,
          type: 'line',
          itemStyle: {
            normal: {
              color: field.type,
              lineStyle: { // 系列级个性化折线样式，横向渐变描边
                  color: field.type, // 47a447 ED9c28 e36159
                  // 2baab1 734ba9
                  width: 1
              }
            }
          },
          xAxisIndex: 0,
          yAxisIndex: 0,
          data: ydata
        })

      })
      let myOption = {
        show: false,
        feature: {
            mark: {
                show: true
            },
            dataView: {
                show: true,
                readOnly: false
            },
            magicType: {
                show: true,
                type: ['line', 'bar']
            },
            restore: {
                show: true
            },
            saveAsImage: {
                show: true
            }
        },
        grid: {
            x: 40,
            y: 40,
            x2: 40,
            y2: 30
        },
        dataZoom: {
            show: false,
            start: 0,
            end: 100
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            splitLine: {
                show: false
            },
            data: xdata
        }],
        yAxis: [{
            type: 'value',
            scale: true,
            splitLine: {
                show: false
            },
            boundaryGap: [0.2, 0.2]
        }],

        series: series
      };
      return myOption;
     }
    }
}
