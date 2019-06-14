<template>
<div v-on:click="cardClick">
  <Card shadow style=" backgroundColor:rgba(0, 0, 0, 0.1); ">
    <p class="pTitle"><span class="active">视频监控</span></p>
    <Chart-object v-bind:style="{height:chartsHeight + 'px'}" :options="options" text="巡检管理"></Chart-object>
  </Card>
</div>
</template>
<script>
import '../parent-view.less'
import {
  ChartObject,
} from '_c/charts'
import {
  mapActions,
  mapGetters,
  mapState
} from 'vuex'
export default {
  name: 'vedioStatus',
  props: {
    chartsHeight: {
      type: Number,
      default () {
        return 200;
      }
    },
  },
  components: {
    ChartObject,
  },
  data() {
    return {

      options: {

        legend: {
          orient: 'vertical',
          left: 'right',
          data: ['离线', '在线']
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color:['red', '#19BE6B','yellow','blueviolet'],
        calculable: true,
        series: [{
          name: '视频监控',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          roseType: 'redius',
          data: [{
              value: 10,
              name: '离线'
            },
            {
              value: 35,
              name: '在线'
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
    cardClick() {
      this.$emit("on-click", 'bigvideo')
    }
    // 在首页初始化公共数据
    // ...mapActions([
    //   "getOrgInfoAction",
    //   'getMenuInfoAction'
    // ]),
  },
  mounted() {
  var that=this;
    //访问车辆状态数据
    this.getBigInfoAction({
      channel: 'CAMERA',
      system_id: '157'
    }).then(res => {
      var temp = res.data.map(item => {
        return {
          value: item.amount,
          name: item.name
        }
      })
      that.options.series[0].data = temp;
      console.log(that.options)

    })
    // this.getOrgInfoAction();
    // this.getMenuInfoAction();
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
        color: #fff;
    }
    .noactive {
        color: #bbb;
    }
}
</style>
