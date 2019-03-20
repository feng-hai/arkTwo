<template>
  <div class="main">
    <Row :gutter="10">
    <i-col span="12">
      <Card>
        <div class="title">
        	<Icon type="ios-pin" />
        	<span>位置轨迹</span>
        </div>
        <!-- 设置高德地图的位置轨迹 -->
        <!-- <div id="container" style="width: 100%; height: 450px;"></div> -->
        <!-- <GaodeTrack :trackLine="newLine"></GaodeTrack> -->
				<div :id="dom" style="widows: 100%; height: 506px;"></div>
      </Card>
    </i-col>
    <i-col span="12">
      <Card>
      <div class="title">
      	<Icon type="md-pulse" />
      	<span>动态数据</span>
      </div>
      <div class="selection">
      	<!-- <Button @click="setIsShow" type="primary">参数选择</Button> -->
      	<!-- select选择options -->
      	<Select v-show="isShow" filterable multiple :label-in-value="true" ref="setSelect" placeholde="参数选择" @on-change="ChangeValue" style="width:150px; padding-right: 4px;">
      		<!-- <OptionGroup label=""> -->
			     <Option placeholde="参数选择" v-for="item in cityList" :value="item.value" :key="item.value + item.index" :disabled="item.disabled">
			      {{item.label}}
			   </Option>
			  <!-- </OptionGroup> -->
    		</Select>
      </div>
      <!-- 显示select选择的内容 -->
      <div class="dataContent" v-show="fruit.length > 0">
      	<Row class="selectItem" v-for="(item, index) in fruit" :key="index">
      		<Col span="12" align="right" class="colorItem" :style="{'color':colorType[index]}"  ref="getData">{{getData(index)}}</Col>
      		<Col span="12" style="text-align: left;">{{item.label}}</Col>
      	</Row>
      	<div id="echarts" ref="echartsId" style="width: 100%; height: 300px;" class="echarts-line"></div>
      </div>
      </Card>
    </i-col>
  </Row>
 </div>
</template>

<script>
// import GaodeTrack from '_c/gaodeMap/gaode_tracks'
// import EchartsLine from '_c/echarts/line'
import {
  mapActions,
  mapGetters,
  // mapState
} from 'vuex'
import echarts from 'echarts'
export default{
name: 'data_webscoket',
components: {
	// GaodeTrack,
	// EchartsLine
},
props: {
	dom: {
		type: String,
		default: 'container'
	},
	getWebscoket: {
		type: Array
	}
},
data(){
	return{
		cityList: [],
		// 高德地图map初始化
		defaultOptions: {
			map: null
		},
		isShow: true,
		// 保留select的options值
		fruit: [],
		// 高德地图的经纬度
		newLine: [],
		colorType: ["#47a447", "#ED9c28", "#e36159", "#2baab1","#734ba9"], //图表的样式颜色,
		// echarts的数据
		lineEcharts: {
			xAxisData: [],
			legendData: [],
			seriesData: [],
			ydata: [],
		},
		xAxisData:[],
		lonData: 0,
		latData: 0,
		seriesData:[],
		ydata:[],
		legendIndex: -1,
		lineGaode: [],
	}
},
computed: {},
watch:{
	getWebscoket(nv, ov){
		let _this = this;
		// 当options有值时
		if(_this.fruit.length > 0){
			_this.legendIndex += 1;
			_this.setDataWebscoket();
			// _this.myChart.clear();
			let myOption = _this.drawLine(_this.lineEcharts.xAxisData);
			_this.myChart.setOption(myOption);
			_this.defaultOptions.map.clearMap();
			_this.createMap();
		}else{
			// 当没有选中select时，高德地图不受影响，依然可以获取值
			_this.setDataWebscoket();
			_this.defaultOptions.map.clearMap();
			_this.createMap();
		}
	},
},
mounted(){
	// 获取select的option的接口
	this.getTrackData();
	// 初始化地图
	this.initMap();
	// 获取推行信息的第一个值
	this.setDataWebscoket();
	// 高德地图轨迹点位移
	this.createMap()
},
methods: {
...mapActions([
	'getTrack'
]),
setIsShow(){
	this.isShow = !this.isShow;
},
initMap(){
  //初始化地图
	this.defaultOptions.map = new AMap.Map(this.dom, {
    resizeEnable: true,
    center: [116.397428, 39.90923],
    zoom: 13
});
	},
createMap(){
	let that = this;
	let markers = [];
	// 从推送信息中获取到了两种经纬度的数据类型，{}和[]，但是高德地图不接收{}的类型，会报Uncaught Invalid Object: Pixel(NaN, NaN)错误
	if(this.newLine.length >= 2){
		this.lineGaode = this.newLine.slice(1);
	}
	this.lineGaode.forEach(function(obj, i){	
		if(obj instanceof Array){
			let marker = new AMap.Marker({
	    map: that.defaultOptions.map,
	    position: obj,
	    icon: require("@/assets/images/car.png"),
	    offset: new AMap.Pixel(-13, -40),
	    autoRotation: true,
	    angle: 0,
}); 
	markers.push(marker);
}
})
for(let i=0; i< markers.length-1; i++){
	that.defaultOptions.map.remove(markers[i]);
}
// 绘制轨迹
that.defaultOptions.polyline = new AMap.Polyline({
  map: that.defaultOptions.map,
  path: that.lineGaode,
  showDir:true,
  strokeColor: "#28F",  //线颜色
  strokeOpacity: 1,     //线透明度
  strokeWeight: 6,      //线宽
  strokeStyle: "solid"  //线样式
});
	that.defaultOptions.map.setFitView();
},
//处理webscoket中推送过来的信息
setDataWebscoket(){
	let _this = this;
	//当点击切换的时候，初始化会没有webscoket的值，所以要设置之前的存在的值都为空
	if(this.getWebscoket.length == 0){
		_this.defaultOptions.map.clearMap();
		this.newLine = [];
		this.lineGaode = [];
		this.createMap();
		this.fruit = [];

		this.cityList.forEach(function(obj){
			obj.disabled = false;
		})
	  // this.myChart.clear();
	}else{
		this.getWebscoket.forEach(function(obj){
  	if(obj.alias === 'lon'){
  		if(obj.value != 0 && !isNaN(obj.value)){
  			_this.lonData = Number(obj.value)
  		}
  	}else if(obj.alias === 'lat'){
  		if(obj.value != 0 && !isNaN(obj.value)){
  		  _this.latData = Number(obj.value)	
  		}
  	}
  })
  if(_this.lonData && _this.lonData != 0 && _this.latData && _this.latData != 0){
 		_this.newLine.push([_this.lonData, _this.latData]);
 		_this.lineGaode = _this.newLine;
  }
 	// console.log(_this.newLine,'_this.newLine');

 	// 选择select选项的时候才会获取时间和相应的数值
 	if(_this.fruit.length > 0){
 		this.getWebscoket.forEach(function(obj){
 			// 与选择的options对应获取值
 		_this.fruit.forEach(function(obje, j){
 			if(obj.alias === obje.value){
 				_this.ydata.push(Number(obj.value));
 				_this.seriesData[j].name = obje.label.trim();
 				_this.seriesData[j].data.push(obj.value);
 				// return;
 			}else{ return;}
 			return;
 		})
 		// 获取时间的值
 		if(obj.alias === "DATIME_RX"){
 			if(_this.xAxisData.indexOf(obj.value) == -1)
  		_this.xAxisData.push(obj.value)
  	}
  	return;
 	})
 		// 双重循环中有很多多余的循环，去除多余的循环
 	_this.seriesData.forEach(function(obj, i){
 		if(obj.data.length === 0){
 			_this.seriesData.splice(i, 1);
 		}
 	})
 	// 重新设置xAxisData，seriesData是为了保留之前的推送的信息，而不是每次都从[]开始
 	_this.lineEcharts.xAxisData = _this.xAxisData;
 	_this.lineEcharts.seriesData = _this.seriesData;
 	}else{
 		return;
 	}
 	// console.log(_this.lineEcharts.xAxisData, 'this.lineEcharts.xAxisData');
 	// console.log(_this.ydata, '_this.lineEcharts.ydata')
	// console.log(_this.seriesData, '_this.lineEcharts.seriesData')

	}
},
// 处理select选择option数量的问题
ChangeValue(value){
	let _this = this;
	// 当选择options数量的时候，做超过5个时就不可以选择的处理
	if(value.length >= 5){
		// 过滤出不是options的选项
		let arr3 = this.cityList.filter(item => {
		return value.every(item2 => {
			return item.value != item2.value
		})
	})
		// 设置为不可选
	arr3.forEach(function(obj){
		obj.disabled = true;
	})
	}else{
		// 如果options没有超过5个，则设置全部可选状态
		this.cityList.forEach(function(obj){
			obj.disabled = false;
		})
	}
	this.fruit = value;
	// 当点击select时，设置曲线中x，y，每次legendIndex的次数都为初始值
	this.xAxisData = [];
	this.seriesData = [{name: '', type: 'line', data: []}];
	this.ydata = [];
	this.legendIndex = -1;
	// 曲线初始化
	this.getEcharts();

},
//接口获取select的所有options选项
getTrackData(){
	let _this = this;
	this.getTrack().then(res => {
		res.forEach(function(obj){
			_this.cityList.push({
				label: obj.title.trim(),
				value: obj.alias.trim(),
				disabled: false
			})
		})
	})
},
//echarts y轴数据变化的时候，随着变化的数据
getData(index){
	if(this.lineEcharts.seriesData[index].data.length >= 0){
		let data = this.lineEcharts.seriesData[index].data
		return data ? (data[this.legendIndex] ? data[this.legendIndex] : 0) : 0
	}else{
		return 0;
	}
	},

//echarts
getEcharts(){
	let _this = this;
	let echartsId = this.$refs.echartsId;
	 echartsId.style.width = window.innerWidth/3 + 100 + 'px';
	this.myChart = echarts.init(echartsId);
	this.myChart.clear();
	this.lineEcharts.legendData = [];
	this.lineEcharts.xAxisData = [];
	this.lineEcharts.seriesData = [{name: '', type: "line", data: []}];
	this.lineEcharts.ydata = [];
	for(var i=0; i<100; i++){
    this.lineEcharts.xAxisData.push('');
    this.lineEcharts.ydata.push(0);
  }
  let fruit = JSON.parse(JSON.stringify(this.fruit));
  fruit.forEach(function(obj){
		let value = obj.label.trim();
			_this.lineEcharts.legendData.push(value);
			_this.lineEcharts.seriesData.push({name: value, type: 'line', data: _this.lineEcharts.ydata});
			_this.seriesData.push({name: value, type: 'line', data: []});

	})
	let myOption = this.drawLine(this.lineEcharts.xAxisData);
	this.myChart.clear();
	this.myChart.setOption(myOption);
	// console.log(this.lineEcharts.ydata, 'ydata');
},
drawLine(value){		
	let myOption = {
		tooltip: {
        trigger: 'axis'
    },
    show: false,
    legend: {
      data: this.lineEcharts.legendData
            },
    toolbox: {
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
      }
  },
    grid: {
        x: 40,
        y: 40,
        x2: 40,
        y2: 30
    },
    dataZoom: {
        show: true,
        start: 0,
        end: 100
    },
    xAxis: [{
        type: 'category',
        boundaryGap: true,
        splitLine: {
            show: false
        },
        data: value
    }],
    yAxis: [{
        type: 'value',
        scale: true,
        splitLine: {
            show: false
        },
        boundaryGap: [0.2, 0.2]
    }],

    series: this.lineEcharts.seriesData,
    color: ["#0088cc", "#47a447", "#ED9c28", "#e36159", "#2baab1",
        "#734ba9"]

  };
	return myOption;
},
}
}
</script>

<style scoped>
.title{
	text-align: left;
	line-height: 14px;
	height: 35px;
	font-weight: bold;
	border-bottom: 1px solid #e2dddd;
}
.selection{
	display: flex;
	padding-top: 10px;
}
.dataContent{
	padding-top: 15px;
}
.selectItem{
	height: 30px;
	border-bottom: 1px solid #e2dddd;
	line-height: 30px;
	color: #aaa;
}
.colorItem{
	color: red;
	padding-right: 10px;
	font-size: 24px;
	text-align: right;
}
.echarts-line{
	padding-top: 40px;
}
/*.ivu-select-multiple .ivu-select-item-selected:after{
	display: none;
}*/
.main >>> .ivu-tag{
	display: none;
}
.main >>> .ivu-card-body{
	height: 570px;
}
.control{
	position: absolute;
	left: 0;
	bottom: -50px;
	width: 100%;
	height: 50px;
	line-height: 45px;
	border: 1px solid #e2dddd;
	padding-left: 20px;
	display: flex;
}
.borderRadius{
	width: 30px;
	height: 30px;
	line-height: 30px;
	text-align: center;
	font-size: 20px;
	background: #fff;
	border-radius: 50%;
	box-shadow:1px 1px #ccc;
	margin-left: 5px;
	cursor: pointer;
}
.control-icon{
	display: inline-block;
	position: relative;
}
.process{
	display: inline-block;
	width: 78%;
	padding-left: 20px;
}
.main >>> .ivu-progress-inner{
	background-color: #bfb8b8;
}
.main >>> .ivu-select-input:after{
	content: '22222222'
}
.tips{
	width: 24px;
    height: 24px;
    position: absolute;
    top: -8px;
    left: 54px;
    border-radius: 50%;
    box-shadow: 1px 1px 1px #aaa;
    background: #f1eded;
    line-height: 24px;
    text-align: center;
    color: red;
}
.main >>> .ivu-input-wrapper{
	padding: 0 4px;
	width: 306px;
}
.main >>> .ivu-input{
	width: 300px;
	text-align: center;
}
.main >>> .ivu-input-icon{
	left: 268px;
}
.main >>> .ivu-select-item{
	text-align: left;
}
</style>