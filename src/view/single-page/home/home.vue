<template>
<div>
  <Row :gutter="20">
    <i-col :xs="24" :md="8" :lg="8" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 140px;padding-bottom: 10px;">
      <infor-card shadow :indexId = i>
        <p class="textAlign">{{ infor.title }}</p>
        <p  style="font-size: 24px; color: #333; padding-left: 20px; margin-top: 10px;">{{getCount(infor.count)}}</p>
        <!-- <count-to :end="getCount(infor.count)" /> -->
      </infor-card>
    </i-col>
  </Row>
  <Row :gutter="20" style="margin-top: 10px;">
   <map-echarts></map-echarts>
  </Row>
</div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import MapEcharts from '../../map_echarts/map_echarts'
import {
  ChartPie,
  ChartBar
} from '_c/charts'
import Example from './example.vue'
import {
  mapActions,
  mapGetters,
  mapState
} from 'vuex'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    MapEcharts
  },
  data() {
    return {
      inforCardData: [{
          title: '入网数量',
          icon: 'md-person-add',
          count: 123456789,
          color: '#2d8cf0'
        },
        {
          title: '里程数量',
          icon: 'md-locate',
          count: 123456789,
          color: '#19be6b'
        },
        {
          title: '报警数量',
          icon: 'md-help-circle',
          count: 123456789,
          color: '#ff9900'
        },
      ],
    }
  },
  methods: {
    // 在首页初始化公共数据
    // ...mapActions([
    //   "getOrgInfoAction",
    //   'getMenuInfoAction'
    // ]),
    getCount(n){
      var b=parseInt(n).toString();
       var len=b.length;
       if(len<=3){return b;}
       var r=len%3;
       return r>0?b.slice(0,r)+","+b.slice(r,len).match(/\d{3}/g).join(","):b.slice(r,len).match(/\d{3}/g).join(",");
       // return 123;
      // console.log(count, 'count');
    }
  },
  mounted() {
    // this.getOrgInfoAction();
    // this.getMenuInfoAction();
  }
}
</script>

<style lang="less" scoped>
.textAlign{
  text-align: left;
  /*padding: 30px 0 10px 20px;*/
  margin-left: 20px;
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}
.count-style {
    font-size: 50px;
}
</style>
