<template>
<div class="realtime">
 	   <Row type="flex" justify="center" class="code-row-bg">
        <Col span="6" center>
        	<span class="vin-width">VIN</span>
        	<span class="verticalSet">{{vehicle.vin}}</span>
        </Col>
        <Col span="6">
        	<span class="vin-width">车牌</span>
        	<span class="verticalSet">{{vehicle.licence}}</span>
      	</Col>
        <Col span="6">
        	<span class="vin-width">编号</span>
        	<span class="verticalSet">{{vehicle.name}}</span>
        </Col>
        <Col span="6">
        	<span class="vin-width">型号</span>
        	<span class="verticalSet">{{vehicle.model}}</span>
        </Col>
    </Row>
    <Row class="textAlign">
      <Col span="24">数据时间：{{reportTime}}</Col>
    </Row>
   <div class="state">
	   	<Row class="rowCol">
	      <Col :xs="12" :sm="12" :md="3" :lg="3" :xl="3">
	        <span class="vin-width">状态</span><span class="state-sign-0">{{getStatus}}</span></Col>
	      <Col :xs="12" :sm="12" :md="5" :lg="5" :xl="5">
	        <span class="vin-width">SOC</span><span :class="information.SOCStyle">{{information.SOC}}%</span></Col>
	      <Col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
	        <span class="vin-width">绝缘电阻</span><span :class="information.insulationResistanceStyle">{{information.insulationResistance}}kΩ</span></Col>
	      <Col :xs="12" :sm="12" :md="5" :lg="5" :xl="5">
	        <span class="vin-width">总电压</span><span :class="information.totalVoltageStyle">{{information.totalVoltage}}V</span></Col>
	      <Col :xs="12" :sm="12" :md="5" :lg="5" :xl="5">
	        <span class="vin-width">总电流</span><span :class="information.totalCurrentStyle">{{information.totalCurrent}}A</span></Col>
	  </Row>
   </div>
   <!-- 单体电压和测温点 -->
   <div class="voltage">
    <div class="voltage-container">
        <div class="voltage-tit">单体电压</div>
        <div class="voltage-items">
            <ul class="item-col">
                <li> <span>压差</span><span :class="information.subBatteryVoltageStyle">{{information.subBatteryVoltage}}</span></li>
                <li> <span>最高</span><span :class="information.maxBatteryVoltageStyle">{{information.maxBatteryVoltage}}</span></li>
                <li> <span>NO.{{information.maxBatteryVoltageCode}}</span></li>
            </ul>
            <ul class="item-col">
                <li> <span>平均</span><span class="alarm-0">{{information.batteryPackageItemsAve}}</span></li>
                <li> <span>最低</span><span :class="information.minBatteryVoltageStyle">{{information.minBatteryVoltage}}</span></li>
                <li> <span>NO.{{information.minBatteryVoltageCode}}</span></li>
            </ul>

        </div>
    </div>
    <div class="voltage-container">
        <div class="voltage-tit">测温点</div>
        <div class="voltage-items">
            <ul class="item-col">
                <li> <span>温差</span><span :class="information.subTemperatureStyle">{{information.subTemperature}}</span></li>
                <li> <span>最高</span><span :class="information.maxTemperatureStyle">{{information.maxTemperature}}</span></li>
                <li><span> NO.{{information.maxTemperatureCode}}</span></li>
            </ul>
            <ul class="item-col">
                <li> <span>平均</span><span class="alarm-0">{{information.tempItemsAve}}</span></li>
                <li> <span>
                最低</span><span :class="information.minTemperatureStyle">{{information.minTemperature}}</span></li>
                <li><span> NO.{{information.minTemperatureCode}}</span></li>
            </ul>

        </div>
    </div>
</div>
<!-- 电池块的显示 -->
	<div :style="batteryNum">
		<Scroll>
			<div class="batteryRow" v-for="itemRow in batteryData">
				<div v-for="item in itemRow" :class="item.colClass">
					<div @click="openAnalysis(['batteryPackageItems1',item.dyIndex])" :class="[item.dyClass,item.dyStyle]" v-if="item.dyIndex != null">
            <span class="voltage1">[V{{item.dyIndex}}]</span><span>{{numberFormatter(dtdyArr[item.dyIndex - 1],3)}}V</span>
          </div>
          <div @click="openAnalysis(['tempItems1',item.wdIndex])" :class="[item.wdClass,item.wdStyle]" v-if="item.wdIndex != null">
               <span class="current1">[T{{item.wdIndex}}] </span><span>{{numberFormatter(wdArr[item.wdIndex - 1]),2}}℃</span>
             </div>
				</div>
			</div>
		</Scroll>
	</div>
</div>
</template>

<script>
import {
  mapActions,
  mapGetters,
  // mapState
} from 'vuex'
import Websocket from './mixin/webscoket.js'
export default {
  name: 'map_component',
  mixins: [Websocket],
  data(){
  	return{
      ws: null,
  		dataAnalysisArr:null,
  		dialogVisible: false,
  		vehicle: {},
      batteryNum:{
        'margin-left':'-6px',
        position:'relative',
        height: '0',
      },
  		isChangeSwitch: false,
  		batteryData:[],
  		dtdyArr:[],
      wdArr:[],
      reportTime: null,
      information:{
        vehicleState:null,
        SOC:null,
        insulationResistance:null,                //绝缘电阻
        totalVoltage:null,                        //总电压
        totalCurrent:null,                        //总电流
        maxBatteryVoltageCode:null,               //最高电池单体号
        maxBatteryVoltage:null,                   //最高电池值
        minBatteryVoltageCode:null,               //最低电池单体号
        minBatteryVoltage:null,                   //最低电池值
        maxTemperatureCode:null,                  //最高温度单体号
        maxTemperature:null,                      //最高温度值
        minTemperatureCode:null,                  //最低温度单体号
        minTemperature:null,                      //最低温度值
        subTemperature:null,                      //温度差值
        subBatteryVoltage:null,                   //单体电压差值
        tempItemsAve:null,                        //温度均值
        batteryPackageItemsAve:null                //电压均值
      },
  	}
  },
computed:{
  ...mapGetters([
    'getdomainId',
  ]),
  getStatus:function() {
    let status = this.information.vehicleState;
    if(status === "1") {
      return '启动';
    }else if(status === "2") {
      return '熄火';
    }else{
      return '其他';
    }
  },
},
mounted() {
	this.getCarInfoData();
},
watch:{
  $route(){
    this.getCarInfoData();
  }
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
  openAnalysis(obj){
  	this.$store.dispatch('openAnalysis', obj);
  	let _self = this;
    let params = _self.$route.params.id;
    const id = params;
    const route = {
        name: 'data_anlaysis',
        params: {
          id
        },
        meta: {
          title: `动态路由-${id}`
        }
      }
      this.$router.push(route)
    },
    // 车辆的基本信息获取
    getCarInfoData(){
    	let _self = this;
    	let params = _self.$route.params;
    	this.getInfoCarDate({"unid": params.id}).then(res => {
    		this.vehicle = res;
    		_self.refreshAlarmSet(res);
    	})
      //初始化webscoket
      this.initWs(params.id);
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
        },err => {
          this.information = null;
          this.dtdyArr = [];
          this.wdArr = [];
        });
    },

    refreshData(entry){
	    let dyArrTmp = [];
	    let wdArrTmp = [];
	    let infor = {};
	    let _this = this;
	    entry.forEach(function(obj, i){
        if(obj.key == 'tempItems1') {
          wdArrTmp = obj.value.split(",");
        }else if(obj.key == 'batteryPackageItems1') {
          dyArrTmp = obj.value.split(",");
        }else if(obj.key == 'vehicleState') {
            infor.vehicleState = obj.value;
        }else if(obj.key == 'SOC') {
            infor.SOCStyle = "state-sign-" +  _this.getAlarmGrade(obj.key,obj.value);
            infor.SOC = _this.numberFormatter(obj.value,2);
        }else if(obj.key == 'insulationResistance') {
            infor.insulationResistanceStyle = "state-sign-" +  _this.getAlarmGrade(obj.key,obj.value);
            infor.insulationResistance = _this.numberFormatter(obj.value,2);
        }else if(obj.key == 'voltage1') {
          infor.totalVoltageStyle = "state-sign-" +  _this.getAlarmGrade(obj.key,obj.value);
            infor.totalVoltage = _this.numberFormatter(obj.value,3);
        }else if(obj.key == 'current1') {
          infor.totalCurrentStyle = "state-sign-" +  _this.getAlarmGrade(obj.key,obj.value);
            infor.totalCurrent = _this.numberFormatter(obj.value,2);
        }else if(obj.key == 'maxBatteryVoltageCode') {
            infor.maxBatteryVoltageCode = obj.value;
        }else if(obj.key == 'maxBatteryVoltage') {
            infor.maxBatteryVoltageStyle = "alarm-" +  _this.getAlarmGrade(obj.key,obj.value);
            infor.maxBatteryVoltage = _this.numberFormatter(obj.value,3);
        }else if(obj.key == 'minBatteryVoltageCode') {
            infor.minBatteryVoltageCode = obj.value;
        }else if(obj.key == 'minBatteryVoltage') {
            infor.minBatteryVoltageStyle = "alarm-" +  _this.getAlarmGrade(obj.key,obj.value);
            infor.minBatteryVoltage = _this.numberFormatter(obj.value,3);
        }else if(obj.key == 'maxTemperatureCode') {
            infor.maxTemperatureCode = obj.value;
        }else if(obj.key == 'maxTemperature') {
            infor.maxTemperatureStyle = "alarm-" +  _this.getAlarmGrade(obj.key,obj.value);
            infor.maxTemperature = _this.numberFormatter(obj.value,2);
        }else if(obj.key == 'minTemperatureCode') {
            infor.minTemperatureCode = obj.value;
        }else if(obj.key == 'minTemperature') {
            infor.minTemperatureStyle = "alarm-" +  _this.getAlarmGrade(obj.key,obj.value);
            infor.minTemperature = _this.numberFormatter(obj.value,2);
        }else if(obj.key == 'subTemperature') {
            infor.subTemperatureStyle = "alarm-" +  _this.getAlarmGrade(obj.key,obj.value);
            infor.subTemperature = _this.numberFormatter(obj.value,2);
        }else if(obj.key == 'subBatteryVoltage') {
          infor.subBatteryVoltageStyle = "alarm-" +  _this.getAlarmGrade(obj.key,obj.value);
            infor.subBatteryVoltage = _this.numberFormatter(obj.value,3);
        }else if(obj.key == 'tempItemsAve') {
            infor.tempItemsAve = _this.numberFormatter(obj.value,2);
        }else if(obj.key == 'batteryPackageItemsAve') {
            infor.batteryPackageItemsAve = _this.numberFormatter(obj.value,3);
        }else if(obj.key == 'DATIME_RX') {
            _this.reportTime = obj.value;//初始化时间
        }
	    });
	      _this.refreshBatteryStyle(dyArrTmp,wdArrTmp);
	      _this.dtdyArr =  dyArrTmp;
	      _this.wdArr = wdArrTmp;
	      _this.information = infor;
        _this.$store.dispatch('getDtdyWdArr',{ dyArrTmp, wdArrTmp});
    },

    //设置样式
    refreshBatteryStyle:function(dyArrTmp,wdArrTmp) {
      let _this = this;
      // console.log(_this.batteryData);
      // console.log(wdArrTmp);
      // console.log(dyArrTmp);
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



  }
}
</script>

<style>
ul, li{
	list-style: none;
}
.realtime{
	background: #fff;
	overflow: hidden;
	height: 100vh;
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
	border-bottom: 1px solid #ddd;
	height: 40px;
	line-height: 40px;
}
.ivu-col-span-6{
	text-align: center;
}
.textAlign{
	text-align: right;
	height: 30px;
	line-height: 46px;
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
  font-size: 15px;
  display:inline-flex;
  width:55%;
}
.battery-num1{
    flex:0 0 9%; 
    height:52px;
    justify-content: space-around;
    align-content:flex-start;
    margin-left:7px;
    margin-bottom:7px;
    box-sizing:border-box;
    
}
.battery-num2{
    flex:0 0 9%; 
    height:52px;
    justify-content:space-around;
    align-content:flex-start;
    margin-left:7px;
    margin-bottom:7px;
    box-sizing:border-box;
}
/*全屏下电池组显示的数量变多*/
.battery-num3{
    flex:0 0 7%; 
    height:52px;
    justify-content:space-around;
    align-content:flex-start;
    margin-left:7px;
    margin-bottom:7px;
    box-sizing:border-box;
}

.batteryDtdyNormal,.batteryWdNormal{
  height:26px;
  line-height: 26px;
  box-sizing:border-box; 
  background: #48e39c;
}
.batteryDtdyNormal{
    border-bottom:1px solid #cbecdd !important;
}

.batteryWdNormal{
}

.batteryDtdyExp,.batteryWdExp{
  height:52px;
  line-height: 52px;
  border: none !important;
  background: #48e39c;
}

.alarm-bg-0 {border:1px solid #48e39c}
.alarm-bg-1 {border:1px solid #fbc317}
.alarm-bg-2 {border:1px solid #ff9001}
.alarm-bg-3 {border:1px solid #e25c2d}

.alarm-bg-0 span{}
.alarm-bg-1 span{color: #fbc317!important}
.alarm-bg-2 span{color: #ff9001!important}
.alarm-bg-3 span{color: #e25c2d!important}

/*电池编号定宽样式*/
span.current1,span.voltage1{
 padding-right:2px;
 width:45%;
 justify-content:flex-end;
}
</style>



























<!-- <template>
  <div>
    <Card>
      <h2>ID: {{ $route.query.id }}</h2>
      <Button @click="close">调用closeTag方法关闭本页</Button>
    </Card>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'map',
  methods: {
    ...mapMutations([
      'closeTag'
    ]),
    close () {
      /**
       * 如果是调用closeTag方法，普通的页面传入的对象参数只需要写name字段即可
       * 如果是动态路由和带参路由，需要传入query或params字段，用来区别关闭的是参数为多少的页面
       */
      this.closeTag({
        name: 'map',
        query: {
          id: this.$route.query.id
        }
      })
    }
  }
}
</script>

<style>

</style>
 -->