<template>
<div class="realtime">
<!-- 电池块的显示 -->
  <div :style="batteryNum">
    <!-- <Scroll> -->
    <div class="batteryRow" v-for="itemRow in batteryData">
      <div v-for="item in itemRow" :class="item.colClass">
        <div :class="[item.dyClass,item.dyStyle]" v-if="item.dyIndex != null">
        <Tooltip :content="item.dyIndex" placement="top">
          <span style="display: block;">{{numberFormatter(dtdyArr[item.dyIndex - 1],3)}}</span>
        </Tooltip>
        </div>
        <div :class="[item.wdClass,item.wdStyle]" v-if="item.wdIndex != null">
          <Tooltip :content="item.wdIndex" placement="top">
             <span style="display: block;" class="current1">{{numberFormatter(wdArr[item.wdIndex - 1]),2}}℃</span>
          </Tooltip>
           </div>
      </div>
    </div>
  <!-- </Scroll> -->
  <Card shadow v-if="batteryData.length > 0">
    <chart-bar style="height: 300px;" :xData="xDataDtdy" :yData="yDataDtdy" :legendData="legendData1" :colorType="colorType1" />
    <chart-bar style="height: 300px;" :xData="xDataWd" :yData="yDataWd" :legendData="legendData2" :colorType="colorType2" />
  </Card>
  </div>
</div>
</template>

<script>
import {
  mapActions,
  mapGetters,
  // mapState
} from 'vuex'
import { ChartBar } from '_c/charts'
// import Websocket from './mixin/webscoket.js'
export default {
  name: '',
  // mixins: [Websocket],
  props: {
    getWebscoket: {
      type: Array
    },
    paramsId: {
      type: String
    }
  },
  components: {
    ChartBar
  },
  data(){
    return{
      ws: null,
      batteryNum:{
        'margin-left':'-6px',
        position:'relative',
        // height: '0',
      },
      isChangeSwitch: false,
      batteryData:[],
      dtdyArr:[],
      wdArr:[],
      reportTime: null,
      barData: {
        Mon: 13253,
        Tue: 34235,
        Wed: 26321,
        Thu: 12340,
        Fri: 24643,
        Sat: 1322,
        Sun: 1324
      },
      // legendData: ['单体测温点', '单体温差点'],
      legendData1: ['单体测温点'],
      legendData2: ['单体温差点'],
      xDataDtdy: [],
      xDataWd: [],
      yDataDtdy: [],
      yDataWd: [],
      colorType1: '#2baab1',
      colorType2: '#ED9c28'
    }
  },
computed:{
  ...mapGetters([
    'getdomainId',
    // 'getWebscoket'
  ]),
},
watch: {
  getWebscoket(nv, ov){
    this.yDataDtdy = [];
    this.yDataWd = [];
    this.xDataWd = [];
    this.xDataDtdy = [];
    this.websocketFunc();
  },
  paramsId(){
    this.getCarInfoData()
    this.echartsBar();
  }
},

mounted() {
  this.getCarInfoData();
  this.websocketFunc();  //实时推送信息
  // this.echartsBar();
  this.echartsBar();

},
methods: {
...mapActions([
  // 'closeTag',
  'getInfoCarDate',
  'getAlarmSet',
  'getModelData',
  'getRealData'
]),
//高德地图具体的电池的动态路由的传参
  // openAnalysis(obj){
  //   this.$store.dispatch('openAnalysis', obj);
  //   let _self = this;
  //   let params = _self.$route.params.id;
  //   const id = params;
  //   const route = {
  //       name: 'data_anlaysis',
  //       params: {
  //         id
  //       },
  //       meta: {
  //         title: `动态路由-${id}`
  //       }
  //     }
  //     this.$router.push(route)
  //   },
    // 车辆的基本信息获取
    getCarInfoData(){
      let _self = this;
      if(_self.paramsId){
        this.getInfoCarDate({"unid": _self.paramsId}).then(res => {
        this.vehicle = res;
        _self.refreshAlarmSet(res);
      })       
      //初始化webscoket
      this.initWs(_self.paramsId);
      }else{
        let params = _self.$route.params;
        this.getInfoCarDate({"unid": params.id}).then(res => {
        this.vehicle = res;
        _self.refreshAlarmSet(res);
      })
      //初始化webscoket
      this.initWs(params.id);
      }

    },
    //报警初始化设置
    initAlarmSet:function() {
      this.alarmSet = {
            maxBatteryVoltage:[{option:null,value:null},{option:null,value:null},{option:null,value:null}],
            minBatteryVoltage:[{option:null,value:null},{option:null,value:null},{option:null,value:null}],
            subBatteryVoltage:[{option:null,value:null},{option:null,value:null},{option:null,value:null}],
            maxTemperature:[{option:null,value:null},{option:null,value:null},{option:null,value:null}],
            minTemperature:[{option:null,value:null},{option:null,value:null},{option:null,value:null}],
            subTemperature:[{option:null,value:null},{option:null,value:null},{option:null,value:null}],

            insulationResistance:[{option:null,value:null},{option:null,value:null},{option:null,value:null}],
            SOC:[{option:null,value:null},{option:null,value:null},{option:null,value:null}],
            voltage1:[{option:null,value:null},{option:null,value:null},{option:null,value:null}],
            current1:[{option:null,value:null},{option:null,value:null},{option:null,value:null}],
          }
    },
    // 报警等级设置
    refreshAlarmSet(row){
      //跳变开关，只有在为true的时候才检查是否跳变，第一次进来时关闭开关，开始刷新websocket后开启
      this.isChangeSwitch = false; 
      let model_unid = row.model_unid;
      this.initAlarmSet();
      this.getAlarmSet({model_unid:model_unid}).then(res => {
        let _this = this;
        res.collection.forEach(function(obj, i){
          if(_this.alarmSet[obj.code]){
            _this.alarmSet[obj.code][Number(obj.level) - 1].option = obj.option;
            _this.alarmSet[obj.code][Number(obj.level) - 1].value = obj.value;
          }
        })
        this.refreshModel(row);
      },err => {
        this.initAlarmSet();
        this.refreshModel(row);
      });
    },
    // 电池块信息获取
    refreshModel(vehicle){
      let batteryDataTmp = [];
      let indexOf_ = -1;
      this.getModelData({unid:vehicle.model_unid}).then(res => {
        // console.log(res, '2222222222222')
        if(res.grid){
          let rows = res.grid.split("/");
          rows.forEach(function(row, i){
            let cols = row.split(",");
            let tmpArray = [];
            cols.forEach(function(col, j){
              var tmpColObj = {};
              if(col.length === 1) {
                tmpColObj.colClass = 'battery-num2';
              }else{
                tmpColObj.colClass = 'battery-num1';
                indexOf_ = col.indexOf("-");
                if(indexOf_ === 0){
                  tmpColObj.wdClass = "batteryWdExp"
                  tmpColObj.wdIndex = parseInt(col.substring(1,col.length));
                }else if(indexOf_ === col.length - 1) {
                  tmpColObj.dyClass = "batteryDtdyExp";
                  tmpColObj.dyIndex = parseInt(col.substring(0,indexOf_));
                }else{
                  tmpColObj.dyClass = "batteryDtdyNormal";
                  tmpColObj.wdClass = "batteryWdNormal";
                  tmpColObj.dyIndex = parseInt(col.substring(0,indexOf_));
                  tmpColObj.wdIndex = parseInt(col.substring(indexOf_+1,col.length));
                }
              }
              tmpArray.push(tmpColObj);
            });
             batteryDataTmp.push(tmpArray);
          });
        }
        this.batteryData = batteryDataTmp;
        // console.log(this.batteryData, 'batteryData');
        this.initRealTime(vehicle.unid);
      }, err => {
        this.batteryData = [];
        this.initRealTime(vehicle.unid);
      })
    },

    initRealTime(unid){
      this.getRealData({unid: unid}).then(res => {
        let entry = res.snapshot.entry;  
        this.refreshData(entry); 
        this.echartsBar();    
        },err => {
          this.dtdyArr = [];
          this.wdArr = [];
        });
    },

    refreshData(entry){
      let dyArrTmp = [];
      let wdArrTmp = [];
      let _this = this;
      entry.forEach(function(obj, i){
        if(obj.key == 'tempItems1') {
          wdArrTmp = obj.value.split(",");
        }else if(obj.key == 'batteryPackageItems1') {
          dyArrTmp = obj.value.split(",");
        }
      });
        _this.refreshBatteryStyle(dyArrTmp,wdArrTmp);
        _this.dtdyArr =  dyArrTmp;
        _this.wdArr = wdArrTmp;
        _this.$store.dispatch('getDtdyWdArr',{ dyArrTmp, wdArrTmp});
    },
    echartsBar(){
      let _this = this;
      let xDataDtdy = [];
      let xDataWd = [];
      this.batteryData.forEach(function(item){
        item.forEach(function(items){
          if(items.dyIndex){
            xDataDtdy.push(items.dyIndex);
          }
          if(items.wdIndex != null){
            xDataWd.push(items.wdIndex);
          }
        })
      })
      this.xDataDtdy = xDataDtdy.sort(function(a,b){ return a-b;})
      this.xDataDtdy.forEach(function(item){
        _this.yDataDtdy.push(_this.dtdyArr[item-1])
      })
      this.xDataWd = xDataWd.sort(function(a,b){ return a-b;})
      this.xDataWd.forEach(function(item){
        _this.yDataWd.push(_this.wdArr[item-1])
      })
      this.yDataDtdy.forEach(function(item){
        if(item == undefined){
          item = '0'
        }
      })
      this.yDataWd.forEach(function(item){
        if(item == undefined){
          item = '0'
        }
      })
    },
    //设置样式
    refreshBatteryStyle:function(dyArrTmp,wdArrTmp) {
      let _this = this;
      _this.batteryData.forEach(function(obj, i){
        obj.forEach(function(obje, j){
          if(obje.dyIndex){
            obje.dyStyle ="alarm-bg-" + _this.computBatteryStyle('maxBatteryVoltage','minBatteryVoltage',dyArrTmp[obje.dyIndex - 1],_this.dtdyArr);
          }
          if(obje.wdIndex){
            obje.wdStyle ="alarm-bg-" + _this.computBatteryStyle('maxTemperature','minTemperature',wdArrTmp[obje.wdIndex - 1],_this.wdArr);
          }
        })
      })
    },

    computBatteryStyle:function(maxKey,minKey,value,value_old) {
      var i = 2;
      while(i > -1){
        let option_a = this.alarmSet[maxKey][i].option
        let value_a = this.alarmSet[maxKey][i].value;
        let option_b = this.alarmSet[minKey][i].option;
        let value_b = this.alarmSet[minKey][i].value;
        if(option_a && value_a) {
          if(option_a === "<"){
            if(Number(value) < Number(value_a)) {
              break;
            }
          }else if(option_a === ">"){
            if(Number(value) > Number(value_a)){
              break;
            }
          }else if(option_a === "~" && this.isChangeSwitch){
            if(Math.abs(Number(value) - Number(value_old)) > Number(value_a)){
              break;
            }
          }
        }
        if(option_b && value_b) {
          if(option_b === "<"){
            if(Number(value) < Number(value_b)) {
              break;
            }
          }else if(option_b === ">"){
            if(Number(value) > Number(value_b)){
              break;
            }
          }else if(option_b === "~" && this.isChangeSwitch){
            if(Math.abs(Number(value) - Number(value_old)) > Number(value_b)){
              break;
            }
          }
        }
        i--;
      }
      return i+1;
      
    },
    //设置报警等级
    getAlarmGrade:function(key, value) {
      var i = 2;
      while(i > -1) {
          let option = this.alarmSet[key][i].option;
          let threshold = this.alarmSet[key][i].value;
          if(option && threshold) {
            if(option === "<"){
              if(Number(value) < Number(threshold)) {
                break;
              }
            }else if(option === ">"){
              if(Number(value) > Number(threshold)){
                break;
              }
            }else if(option === "~" && this.isChangeSwitch){
              if(Math.abs(Number(value) - Number(this.information[key])) > Number(threshold)){
                break;
              }
            }
          }
        i--;
      }
      return i+1;
    },
    //设置保留几位小数
    numberFormatter:function(value,num) {
      if(value != null && Number(value)%1 != 0) {
         return Number(value).toFixed(num);
      }else{
          return value;
      }
    },
    //初始化webscoket设置
    initWs(unid){
      var _this = this;
      // if(_this.ws.readyState === 1){
        if(_this.ws == null){// ws连接还没有建立完
          _this.intervalWs=setInterval(function(){
            if(_this.ws != null && _this.ws.readyState ===1 ){
              _this.ws.send('{"pageId":"1","vehicleId":"'+unid+'"}');
              clearInterval(_this.intervalWs);
            }
          },1000);
        }else{
          _this.ws.send('{"pageId":"1","vehicleId":"'+unid+'"}');
        }
      // }
    },
    // 实时推送信息
websocketFunc(){
  let dyArrTmp = [];
  let wdArrTmp = [];
  let infor = {};
  let _this = this;
  _this.getWebscoket.forEach(function(obj, i){
    if(obj.alias == 'tempItems1') {
      wdArrTmp = obj.value.split(",");
    }else if(obj.alias == 'batteryPackageItems1') {
      dyArrTmp = obj.value.split(",");
    }
  });
    _this.refreshBatteryStyle(dyArrTmp,wdArrTmp);
    _this.dtdyArr =  dyArrTmp;
    _this.wdArr = wdArrTmp;
    _this.echartsBar();
    _this.$store.dispatch('getDtdyWdArr',{ dyArrTmp, wdArrTmp});
},



  }
}
</script>

<style scoped>
ul, li{
  list-style: none;
}
.realtime >>> .ivu-tooltip{
  width: 100%;
  cursor: pointer;
}
.realtime{
  background: #fff;
  /*min-height: 560px;*/
}
.state{
  height: 40px;
  padding: 20px 0 10px 0;
  line-height: 40px;
}
.vin-width{
  color: #999;
  font-size: 12px;
}
.verticalSet{
  padding-left: 5px;
  font-size: 14px;
  color: #000;
}
.state-sign-0,.state-sign-1,.state-sign-2,.state-sign-3{
    font-size:24px;
    padding-left:8px;
    color: #000;
}
.state-sign-0{color: #222;}
.state-sign-1{color: #fbc317;}
.state-sign-2{color: #ff9001;}
.state-sign-3{color: #e25c2d;}
.vin-width{
  font-size: 14px;
}
.ivu-row{
  text-align: center;
}
.ivu-row-flex-center{
  border-bottom: 1px solid #48e39c;
  height: 40px;
  line-height: 40px;
}
.ivu-col-span-6{
  text-align: center;
}
.textAlign{
  text-align: right;
  height: 30px;
  line-height: 30px;
  padding-right: 16px;
}
.voltage{
    display:flex;
    flex-direction:row;
    padding-bottom:15px;
    width: 100%;
}
.voltage-container{
    background-color: #f5f5f5;
    justify-content: space-around;
    border-radius:4px;
    width: 50%;
    color: #000;
}
.voltage-tit{ 
    padding-top:10px;
    font-size:16px;
    text-align:center;
    letter-spacing: 1px;
    color: #999;
}
.voltage-items{
    display:flex;
    flex-direction:row;
    justify-content:center;
    flex: 0 0 auto;
    
}
.item-col{
    flex:1;
     display:flex;
    flex-direction:column;
    padding:0px 10px;

}
.voltage-container:nth-child(1){
    margin-right:15px;
}
.item-col span{
    padding-right:10px;
    display:inline-block;
    width:70px;
    vertical-align:middle;
    text-align:right;
    height:38px;
    line-height:38px;
    font-size:13px;
    color:#999;
 }
.voltage-items li{
    text-align:center;
    flex:1
}
span.alarm-0,span.alarm-1,span.alarm-2,span.alarm-3{
  font-size:26px;
  text-align:left;
  width:100px;
  color: #000;
}
span.alarm-0{color: #222;}
span.alarm-1{color: #fbc317;}
span.alarm-2{color: #ff9001;}
span.alarm-3{color: #e25c2d;}

/*电池*/

.batteryRow{
  display:flex;
  flex-direction:row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1;
}
.battery_num:nth-child(3){
  margin-top:-6px
}

.battery-num1 span{
  font-size: 14px;
  /*color: #ccc;*/
  display:inline-flex;
  /*width:55%;*/
}
.battery-num1{
    flex:0 0 6.5%; 
    /*height:20px;*/
    justify-content: space-around;
    align-content:flex-start;
    margin-left:3px;
    margin-bottom:3px;
    box-sizing:border-box;
    border: 1px solid #48e39c;
    
}
.battery-num2{
    flex:0 0 6.5%; 
    /*height:20px;*/
    justify-content:space-around;
    align-content:flex-start;
    margin-left:3px;
    margin-bottom:3px;
    box-sizing:border-box;
    /*border: 1px solid #48e39c;*/

}
/*全屏下电池组显示的数量变多*/
.battery-num3{
    flex:0 0 6.5%; 
    /*height:30px;*/
    justify-content:space-around;
    align-content:flex-start;
    margin-left:3px;
    margin-bottom:3px;
    box-sizing:border-box;
    border: 1px solid #48e39c;

}

.batteryDtdyNormal,.batteryWdNormal{
  height:16px;
  line-height: 16px;
  box-sizing:border-box; 
  /*background: #48e39c;*/
  text-align: center;
}
.batteryDtdyNormal{
    border-bottom:1px solid #48e39c !important;
}

.batteryWdNormal{
}

.batteryDtdyExp,.batteryWdExp{
  height: 32px;
  line-height: 32px;
  border: none !important;
  /*background: #48e39c;*/
  text-align: center;
}

.alarm-bg-0 {
  /*border:1px solid #48e39c*/
}
.alarm-bg-1 {border:1px solid #fbc317}
.alarm-bg-2 {border:1px solid #ff9001}
.alarm-bg-3 {border:1px solid #e25c2d}

.alarm-bg-0 span{}
.alarm-bg-1 span{color: #fbc317!important}
.alarm-bg-2 span{color: #ff9001!important}
.alarm-bg-3 span{color: #e25c2d!important}

/*电池编号定宽样式*/
span.current1,span.voltage1{
/* padding-right:2px;
 width:45%;
 justify-content:flex-end;*/
}
@media screen and (max-width: 1024px) {
  .battery-num1 span{
  font-size: 12px;
}
.batteryDtdyNormal,.batteryWdNormal{
  height:12px;
  line-height: 12px;
}
 .batteryDtdyExp,.batteryWdExp{
  height: 24px;
  line-height: 24px;
}
}
@media screen and (min-width: 1280px) and (max-width:1366px) {
    .battery-num1 span{
  font-size: 12px;
}
  .batteryDtdyNormal,.batteryWdNormal{
  height:15px;
  line-height: 15px;
}
 .batteryDtdyExp,.batteryWdExp{
  height: 30px;
  line-height: 30px;
}
}
@media screen and (min-width: 1366px) and (max-width:1600px) {
  .batteryDtdyNormal,.batteryWdNormal{
  height:16px;
  line-height: 16px;
}
 .batteryDtdyExp,.batteryWdExp{
  height: 32px;
  line-height: 32px;
}
}
@media screen and (min-width: 1920px) {
 .batteryDtdyNormal,.batteryWdNormal{
  height:20px;
  line-height: 20px;
}
 .batteryDtdyExp,.batteryWdExp{
  height: 40px;
  line-height: 40px;
}
}
</style>