<template>
  <div>
    <Row :gutter="10">
    <i-col span="12">
      <Card>
        <div class="update-paste-con">
          <gd-map ref="gdmap" @mapMarkerClick="mapMarkerClick" :getProvince="getProvince"></gd-map>
        </div>
      </Card>
    </i-col>
    <i-col span="12">
      <Card>
      <div v-if="flag">
       <echarts-map :dataArray.sync="dataArray" @getProvince="getProvincee"></echarts-map>
     </div>
      </Card>
    </i-col>
  </Row>
  </div>
</template>

<script>
import GdMap from './components/map.vue'
import EchartsMap from './components/echartsMap.vue'
import {
  mapActions,
  mapGetters,
  // mapState
} from 'vuex'
export default {
  name: 'map_echarts_page',
  components: {
    GdMap,
    EchartsMap
  },
  data(){
    return {
      dataArray: [],
      flag: false,
      getPro: false,
      getProvince: '',
    }
  },
  // computed: {
  //   ...mapGetters([
  //     'getdomainId',
  //   ])
  // },
  mounted(){
    this.chartsData();
  },
  methods: {
    ...mapActions([
      'getEchartData',
    ]),
    getProvincee(data){
      this.getProvince = data;
    },
    //高德地图的动态路由的传参
    mapMarkerClick(obj){
     const id = obj.unid;
      const route = {
        name: 'map_component',
        params: {
          id
        },
        meta: {
          title: `动态路由-${id}`
        }
      }
      this.$router.push(route)
    },
    //map china获取数据的方法
    chartsData(){
      var that = this;
      that.getEchartData().then(res => {
      var test = res;
      for(var i in test){
        if(test[i].title){
          this.dataArray.push({
            name: test[i].title.replace("省","").replace("市", ""), 
            value: test[i].count*1,
            selected: false
          })
        }     
      }
      var chartsDataArr = [{
                name: '北京',

                selected: false
            }, {
                name: '天津',

                selected: false
            }, {
                name: '上海',

                selected: false
            }, {
                name: '重庆',

                selected: false
            }, {
                name: '河北',

                selected: false
            }, {
                name: '河南',

                selected: false
            }, {
                name: '云南',

                selected: false
            }, {
                name: '辽宁',

                selected: false
            }, {
                name: '黑龙江',

                selected: false
            }, {
                name: '湖南',

                selected: false
            }, {
                name: '安徽',

                selected: false
            }, {
                name: '山东',

                selected: false
            }, {
                name: '新疆',

                selected: false
            }, {
                name: '江苏',

                selected: false
            }, {
                name: '浙江',

                selected: false
            }, {
                name: '江西',

                selected: false
            }, {
                name: '湖北',

                selected: false
            }, {
                name: '广西',

                selected: false
            }, {
                name: '甘肃',

                selected: false
            }, {
                name: '山西',

                selected: false
            }, {
                name: '内蒙古',

                selected: false
            }, {
                name: '陕西',

                selected: false
            }, {
                name: '吉林',

                selected: false
            }, {
                name: '福建',

                selected: false
            }, {
                name: '贵州',

                selected: false
            }, {
                name: '广东',

                selected: false
            }, {
                name: '青海',

                selected: false
            }, {
                name: '西藏',

                selected: false
            }, {
                name: '四川',

                selected: false
            }, {
                name: '宁夏',

                selected: false
            }, {
                name: '海南',

                selected: false
            }, {
                name: '台湾',

                selected: false
            }, {
                name: '香港',

                selected: false
            }, {
                name: '澳门',

                selected: false
            }];
      for(var i=0; i<chartsDataArr.length; i++){
        if(this.dataArray.indexOf(chartsDataArr[i].name) < 0){
          chartsDataArr[i].value = 0;
          this.dataArray.push(chartsDataArr[i]);
        }
      }
      if(this.getProvince != "undefined"){
        for(var i=0; i<this.dataArray.length; i++){
          if(this.dataArray[i].name == this.getProvince){
            this.dataArray[i].selected = true;
            break;
          }
        }
      }
      this.flag = true;
      })
  },

}
}
</script>

<style>

</style>
