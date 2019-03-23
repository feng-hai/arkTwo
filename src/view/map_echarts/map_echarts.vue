<template>
  <div class="main">
    <Row :gutter="20">
    <i-col span="16">
      <Card>
        <div class="update-paste-con">
          <gd-map ref="gdmap" @mapMarkerClick="mapMarkerClick" :getProvince="getProvince"></gd-map>
        </div>
      </Card>
    </i-col>
    <i-col span="8">
      <Row :gutter="15">
         <i-col :xs="12" :md="12" :lg="12" v-for="(infor, i) in inforCardData" :key="`infor-${i}`">
          <infor-card shadow :indexId = i>
            <Icons :type="infor.icon" :size="40" />
            <div class="infordata">
            <p class="textAlign">{{ infor.title }}</p>
            <p class="textcount">{{getCount(infor.count)}}</p>
            </div>
        <!-- <count-to :end="getCount(infor.count)" /> -->
          </infor-card>
        </i-col>
      </Row>
      <Row>
        <i-col span="24">
          <Card class="CardPadding">
          <div v-if="flag">
           <echarts-map :dataArray.sync="dataArray" @getProvince="getProvincee"></echarts-map>
          </div>
          </Card>
        </i-col>
      </Row>
    </i-col>

<!--  <Row style="height: 50vh">
        <i-col span="24" style="margin-top: 20px;">
        <Card>
          <p slot="title">分布排名</p>
          <div v-if="flag">
           <pie style="width: 100%; height: 39.5vh;" :ydata="ydata"></pie>
        </div>
      </Card>
      </i-col>
      </Row> -->
  </Row>
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import GdMap from './components/map.vue'
import EchartsMap from './components/echartsMap.vue'
import Icons from '_c/icons'

// import pie from './components/pie'
import {
  mapActions,
  mapGetters
  // mapState
} from 'vuex'
export default {
  name: 'map_echarts_page',
  components: {
    GdMap,
    EchartsMap,
    // pie,
    InforCard,
    Icons
  },
  data () {
    return {
      dataArray: [],
      flag: false,
      getPro: false,
      getProvince: '',
      ydata: [],
      colorTypes: ['#20c6b8', '#ff89b0', '#02b3d7', '#f3b409'],
      inforCardData: [{
        icon: 'wangguan',
        title: '入网数量',
        count: 123456789
      },
      {
        icon: 'shijian',
        title: '累计工作时间',
        count: 123456789
      },
      {
        icon: 'licheng',
        title: '里程数量',
        count: 123456789
      },
      {
        icon: 'baojing1',
        title: '报警数量',
        count: 123456789
      }
      ]

    }
  },
  // computed: {
  //   ...mapGetters([
  //     'getdomainId',
  //   ])
  // },
  mounted () {
    this.chartsData()
    this.getCarNumber()
    this.getMileage()
    this.getEvent()
    this.getWorkTime()
  },
  methods: {
    ...mapActions([
      'getEchartData',
      'getCarDataNumber',
      'getMileageDataNumber',
      'getCarEventNumber',
      'getWorkTimeNumber'
    ]),
    // 获取入网数
    getCarNumber () {
      let _this = this
      this.getCarDataNumber({ page_id: 0, page_size: 1 }).then(res => {
        _this.inforCardData[0].count = res.count
      })
    },
    // 工作时间
    getWorkTime () {
      let _this = this
      this.getWorkTimeNumber().then(res => {
        _this.inforCardData[1].count = (res / 3600000).toFixed(0)
      })
    },
    // 获取里程数
    getMileage () {
      let _this = this
      this.getMileageDataNumber({ dt: new Date().getTime() }).then(res => {
        // console.log('getMileage', res);
        _this.inforCardData[2].count = res
      })
    },
    // 获取故障车辆的数量
    getEvent () {
      let _this = this
      this.getCarEventNumber({
        page_id: 0,
        page_size: 10,
        level_alert: 10
      }).then(res => {
        _this.inforCardData[3].count = res.count
      })
    },
    getProvincee (data) {
      this.getProvince = data
    },
    getCount (num) {
      if (!num) return '0'
      var info = parseFloat(num).toFixed(0).toString().split('.')
      num = info[0]
      var result = ''
      while (num.length > 3) {
        result = ',' + num.slice(-3) + result
        num = num.slice(0, num.length - 3)
      }
      if (num) { result = num + result }
      info[0] = result
      return info.join('.')
    },
    // 高德地图的动态路由的传参
    mapMarkerClick (obj) {
      const id = obj.unid
      const route = {
        name: 'veichle_details',
        params: {
          id,
          VIN: obj.text
        },
        meta: {
          title: `动态路由-${id}`
        }
      }
      this.$router.push(route)
    },
    // 数组对象中的属性排序
    compare (property) {
      return function (a, b) {
        var value1 = a[property]
        var value2 = b[property]
        return value2 - value1
      }
    },
    // map china获取数据的方法
    chartsData () {
      var that = this
      that.getEchartData().then(res => {
        var test = res
        for (var i in test) {
          if (test[i].title) {
            this.dataArray.push({
              name: test[i].title.replace('省', '').replace('市', ''),
              value: test[i].count * 1,
              selected: false
            })
          }
        }
        // 分布排名
        let ydata = that.dataArray.sort(that.compare('value'))
        that.ydata = ydata.slice(0, 10)

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
        }]
        for (var i = 0; i < chartsDataArr.length; i++) {
          if (this.dataArray.indexOf(chartsDataArr[i].name) < 0) {
            chartsDataArr[i].value = 0
            this.dataArray.push(chartsDataArr[i])
          }
        }
        if (this.getProvince != 'undefined') {
          for (var i = 0; i < this.dataArray.length; i++) {
            if (this.dataArray[i].name == this.getProvince) {
              this.dataArray[i].selected = true
              break
            }
          }
        }
        this.flag = true
      })
    }
  }
}
</script>

<style scoped>
.textAlign{
  text-align: left;
  color: #fff;
  font-size: 13px;
  /*font-weight: bold;*/
  /*margin: 30px 0 6px 20px;*/

}
.textcount{
font-size: 24px;
color: #fff;
}
.main >>> .info-card-wrapper{
  margin-bottom: 15px;
}
.CardPadding >>> .ivu-card-body{
  padding: 0;
}
.infordata{
  flex:1;
  margin-left: 20px;
}

</style>
