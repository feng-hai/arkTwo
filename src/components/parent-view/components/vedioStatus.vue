<template>
<div v-on:click="cardClick" >
 <Card shadow  style=" backgroundColor:rgba(0, 0, 0, 0.1); ">
    <chart-pie v-bind:style="{height:chartsHeight + 'px'}" :value="pieData" text="视频监控"></chart-pie>
  </Card>
</div>
</template>
<script>
import '../parent-view.less'
import {
  ChartPie,
} from '_c/charts'
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
    ChartPie,
  },
  data() {
    return {

      inforCardData: [{
          title: '新增用户',
          icon: 'md-person-add',
          count: 803,
          color: '#2d8cf0'
        },
        {
          title: '累计点击',
          icon: 'md-locate',
          count: 232,
          color: '#19be6b'
        },
        {
          title: '新增问答',
          icon: 'md-help-circle',
          count: 142,
          color: '#ff9900'
        },
        {
          title: '分享统计',
          icon: 'md-share',
          count: 657,
          color: '#ed3f14'
        },
        {
          title: '新增互动',
          icon: 'md-chatbubbles',
          count: 12,
          color: '#E46CBB'
        },
        {
          title: '新增页面',
          icon: 'md-map',
          count: 14,
          color: '#9A66E4'
        }
      ],
      pieData: [
        {
          value: 310,
          name: '在线'
        },
        {
          value: 4,
          name: '离线'
        }

      ],
      barData: {
        Mon: 13253,
        Tue: 34235,
        Wed: 26321,
        Thu: 12340,
        Fri: 24643,
        Sat: 1322,
        Sun: 1324
      }
    }
  },
  methods: {
    cardClick()
    {
     this.$emit("on-click",'bigvideo')
    }
    // 在首页初始化公共数据
    // ...mapActions([
    //   "getOrgInfoAction",
    //   'getMenuInfoAction'
    // ]),
  },
  mounted() {
    // this.getOrgInfoAction();
    // this.getMenuInfoAction();
  }
}
</script>

<style lang="less">
.count-style {
    font-size: 50px;
}
</style>
