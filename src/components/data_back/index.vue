<template>
  <div class="main">
    <Row :gutter="10">
    <i-col span="12">
      <Card>
        <div class="title">
        	<Icon type="ios-pin" />
        	<span>轨迹回放</span>
        </div>
        <!-- 设置高德地图的位置轨迹 -->
        <div id="container" style="width: 100%; height: 450px;"></div>
        <div class="control">
        	<div class="control-icon">
        		<Icon class="borderRadius" type="md-rewind" @click="goBack()" />
        		<div class="tips" v-show="setTimeNum">{{timeNum}}</div>
        		<Icon v-show="defaultOptions.isFirst" class="borderRadius" type="md-play" @click="startAnimation()" />
        		<Icon v-show="!defaultOptions.isFirst" class="borderRadius" type="ios-pause" @click="pauseAnimation()" />
        		<Icon class="borderRadius" type="md-fastforward" @click="goTwo()" />
        	</div>
        	<div class="process">
        		<progress-bar :percent="percentValue" :axData="lineEcharts.xAxisData" :len="len" @percentChange="onProgressBarChange"></progress-bar>
        </div>
        </div>
      </Card>
    </i-col>
    <i-col span="12">
      <Card>
      <div class="title">
      	<Icon type="md-pulse" />
      	<span>动态数据</span>
      </div>
      <div class="selection">
      	<!-- select选择options -->
      	<Select filterable v-model="model1" multiple :label-in-value="true" ref="setSelect" placeholde="参数选择" @on-query-change="QueryChange" @on-change="ChangeValue" style="width:150px; padding-right: 4px;">
      		<!-- <OptionGroup label=""> -->
			     <Option placeholde="参数选择" v-for="item in cityList" :value="item.value" :key="item.value + item.index" :disabled="item.disabled">
			      {{item.label}}
			   </Option>
			  <!-- </OptionGroup> -->
    		</Select>
    		<!-- 开始时间和结束时间 -->
    		<div class="dataStartEnd">
    			<DatePicker type="datetimerange" v-model="startEndTime" @on-change="handleStartChange" placeholder="开始时间  -  结束时间" style="width: 300px"></DatePicker>
    		</div>
    		<Button type="primary" @click="submit" style="margin-left: 10px;">查询</Button>
      </div>
      <!-- 显示select选择的内容 -->
      <div class="dataContent" v-show="fruit.length > 0">
      	<Row class="selectItem" v-for="(item, index) in fruit" :key="index">
      		<Col span="12" align="right" class="colorItem" :style="{'color':colorType[index]}" style="text-align: right;" ref="getData">{{getData(index)}}</Col>
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
import {
  mapActions,
  mapGetters,
  // mapState
} from 'vuex'
import echarts from 'echarts'
// import EchartsLine from './mixin/echarts.js'
import Process from './components/silder'
import ProgressBar from './components/progress-bar'
export default{
	name: 'data_back',
	// mixins: [EchartsLine],
	data(){
		return{
			startTime: '',
			endTime: '',
			startEndTime: '',
			currentPercent: 0,
			defaultOptions: {
				markerOptions : {},
				marker : null,
				map : null,
				polyline : null,
				markers : [],
				isFirst : true
			},
			//设置搜索的配置参数
			submitParams:{
        field:null,
        date_to:null,
        date_from:null, 
        unid:null,
			},
			// echarts的数据
			lineEcharts: {
				xAxisData: [],
				legendData: [],
				seriesData: [],
				ydata: [],
			},
			// markersMap:{}, //存储地图上的点
			fruit: [],
			single: false,
			model1: [],
			cityList: [],
			timeKey: null,
			myChart: null,
			lineArr:  [],
			newLine: [],
			len: 0,
			timeNum: 1,
			legenNum: -1,
			paramsIdd: '',
			colorType: ["#47a447", "#ED9c28", "#e36159", "#2baab1",
            "#734ba9"] //图表的样式颜色
		}
	},
	props: {
		paramsId: {
			type: String
		}
	},
	components: {
		Process,
		ProgressBar
	},
	computed: {
		setTimeNum(){
			return this.timeNum >= 2 ? true : false
		},
		percentValue(){
			if(this.currentPercent === this.len){
				return 1;
			}
			return this.currentPercent / this.len;
		},
		lineValue(){
			return 0
		},
		xAxisData(){
			return this.lineEcharts.xAxisData;
		}
},
	mounted(){
		this.initMap();
		this.getTrackData();
	},
	watch:{
		currentPercent: function(nv, ov){
			this.legenNum += 1;
			let xAxisDataArr = this.lineEcharts.xAxisData.slice(0, nv)
			let seriesData = this.lineEcharts.ydata.slice(0, nv)
			this.lineEcharts.seriesData.data = seriesData;
			let lineArr = this.lineArr.slice(0, nv)
			// console.log(lineArr, 'lineArr')
			this.newLine = [];
			this.defaultOptions.map.clearMap();
			this.newLine = lineArr;
			this.createMap();
			let myOption = this.drawLine(xAxisDataArr);
			this.myChart.setOption(myOption);
			if(nv >= this.len){
				this.defaultOptions.isFirst = true;
				this.startAnimation;
				clearInterval(this.timeKey);
				// this.timeKey = null;
			}
		},
		paramsId(nv, ov){
			this.paramsIdd = nv;
			this.startEndTime = '';
			this.startTime = '';
			this.endTime = '';
			this.model1 = [];
			this.fruit = [];
			this.submit();
		}
	},
	methods: {
		getData(index){
			if(this.lineEcharts.seriesData[index].data.length >= 0){
				let data = this.lineEcharts.seriesData[index].data
				return data ? (data[this.legenNum-2] ? data[this.legenNum-2] : 0) : 0
				// return data ? data[index++] : 0
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
					_this.lineEcharts.seriesData.push({name: value, type: 'line', data: _this.lineEcharts.ydata})
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
	  onProgressBarChange(data){
			this.currentPercent = data * this.len | 0;
			// 点击进度条时候，将data的index转到
			this.legenNum = this.currentPercent;
			if(this.currentPercent === this.len){
				this.defaultOptions.isFirst = false;
				this.startAnimation()
			}else{
				this.defaultOptions.isFirst = false;
				this.startAnimation()
			}
		},
		...mapActions([
      		'getTrack',
      		'getvehicleDataAnlaysis'
    	]),
		// 时间控件的获取时间-开始时间
		handleStartChange(data){
			this.startTime = data[0];
			this.endTime = data[1];
			// console.log(data, 'startEndTime')
		},
		// 结束时间获取
		// handleEndChange(data){
		// 	this.endTime = data;
		// 	console.log(data, 'endTime');

		// },
		//select的值
		getTrackData(){
			let _this = this;
			this.getTrack().then(res => {
				// console.log(res, 'res');
				res.forEach(function(obj){
					_this.cityList.push({
						label: obj.title.trim(),
						value: obj.alias.trim(),
						disabled: false
					})
				})
			})
		},
		submit(){
			let _this = this;
			let start = new Date(this.startTime.replace(/-/g, '/')).getTime();
			let end = new Date(this.endTime.replace(/-/g, '/')).getTime();
			if(end == null || end === '' || start === null || start === ''){
				this.$Message.warning('请选择开始时间和结束时间！')
			}else if(end < start){
				this.$Message.warning('结束时间不能小于开始时间！')
			}else if(end - start > 86400000){
				this.$Message.warning('时间区间不能超过24小时!')
			}else{
				//api数据的获取
				if(!_this.paramsId){
					_this.paramsIdd = _this.$route.params.id;;
				}else{
					_this.paramsIdd = _this.paramsId;
				}
				let date_from = this.startTime.replace(/ /, "T");
	      let date_to = this.endTime.replace(/ /, "T");
	      let field = 'DATIME_RX,lon,lat';
	      this.model1.forEach(function(obj){
	      	field += ',' + obj
	      })
	      let legendData = [];
	      let xAxisData = [];
	      let seriesData = [];
	      let lonData = [];
	      let latData = [];
	      this.fruit.forEach(function(obj, j){
	      	let name = obj.label.trim();
	      	legendData.push(name);
	      	seriesData.push({name:name,type:"line",data:[]});
	      })
	      this.submitParams = {
	      	unid: _this.paramsIdd,
	      	date_from: date_from,
	      	date_to: date_to,
	      	field: field,
	      	sort: true
	      }
	      this.getvehicleDataAnlaysis(this.submitParams).then(res => {
	      	let _this = this;
				 if(res){
				 	this.$Message.success('数据加载成功')
				 	// console.log(res.datas, 'datassssssssssssss');
				 	res.datas.forEach(function(obj, i){
	    			obj.pairs.forEach(function(obje, j){
	    				if(obje.key === 'lon'){
	    					lonData.push(obje.value)
	    				}else if(obje.key === 'lat'){
	    					latData.push(obje.value)
	    				}else if(obje.key === 'DATIME_RX'){
	    					xAxisData.push(obje.value)
	    				}else {
	    					_this.lineEcharts.ydata.unshift(Number(obje.value));
            		seriesData[j-3].data.push(Number(obje.value));
	    			// seriesData.push(Number(obje.value));
	    		}
	    	})
	    })	
				 	this.lineEcharts.legendData = [];
				 	this.lineEcharts.xAxisData = [];
				 	this.lineEcharts.seriesData = [{name: '', style:'line', data: []}];
				 	lonData = lonData.map(function(item){ return +item;})
				 	latData = latData.map(function(item){ return +item;})
				 	let lonLat = lonData.map((key, value) => [key, latData[value]])
				 	this.lineArr = [];
				 	this.lineArr = lonLat;
				 	// console.log(this.lineArr, 'this.lineArr');
				 	this.lineEcharts.legendData = legendData;
					this.lineEcharts.xAxisData = xAxisData;
					this.lineEcharts.seriesData = seriesData;
					res = null;
				 }else{
				 	this.$Message.error('没有数据')
				 }
				}).catch(err => {
					console.log(err,'err')
				})
			}
			
		},
//初始化地图
	initMap(){
		this.defaultOptions.map = new AMap.Map("container", {
       	resizeEnable: true,
        center: [116.397428, 39.90923],
        zoom: 13
  		 });
		// this.createMap();
	},
		//高德地图的轨迹回放
		createMap(){
			// this.defaultOptions.map ? this.defaultOptions.map : new AMap.Map("container");
			// this.defaultOptions.map = new AMap.Map("container");
			let that = this;
			let markers = [];
			this.newLine.forEach(function(obj, i){	
				let marker = new AMap.Marker({
        map: that.defaultOptions.map,
        position: obj,
        icon: require("@/assets/images/car.png"),
        offset: new AMap.Pixel(-13, -40),
       autoRotation: true,
        angle: 0,
    });  
    markers.push(marker);
		})

			for(let i=0; i< markers.length-1; i++){
				// markers[i].setMap(null);s
				that.defaultOptions.map.remove(markers[i]);
				// markers[i] = {};
				// markers[i].G.icon = '';
				// console.log(markers[i].G.icon, 'markers[is]');
			}

		 // 绘制轨迹
		 that.defaultOptions.polyline = new AMap.Polyline({
        map: that.defaultOptions.map,
        path: that.newLine,
        showDir:true,
        strokeColor: "#28F",  //线颜色
        strokeOpacity: 1,     //线透明度
        strokeWeight: 6,      //线宽
        strokeStyle: "solid"  //线样式
    });
		    that.defaultOptions.map.setFitView();
		},
		//点击开始和继续
		startAnimation(){
			 clearInterval(this.timeKey);
			let _this = this;
				if(this.myChart){
					this.createMap();
					this.defaultOptions.isFirst = false;
					this.len = this.lineEcharts.xAxisData.length;
					// 如果设置定时器不存在
					if(!this.timeKey){
							// 从0开始，每次循环1，条件式小于总长度
							// console.log(this.currentPercent, 'currentPercent');
							if(this.currentPercent < this.len){
							this.timeKey = window.setInterval(function() {
							_this.currentPercent += _this.timeNum;
						_this.legenNum = _this.currentPercent;

							}, 1000)
							// this.start(20);
						}else{
							// 如果循环的当前数不小于this.len，那么就结束循环
							_this.defaultOptions.isFirst = true;
							clearInterval(_this.timeKey);
							// _this.timeKey = null;
						
						}
							// this.defaultOptions.marker.resumeMove();
					}else{
						// 如果设置的定时器已经存在，但是要设置暂停
						//如果当前的进度条已经到终点，那么就关闭定时器
						if(this.currentPercent >= this.len){
							_this.defaultOptions.isFirst = true;
							clearInterval(_this.timeKey);
							// _this.timeKey = null;
						}else{
							// 如果没有到终点
							if(this.currentPercent < this.len){
								this.timeKey = window.setInterval(function() {
								_this.currentPercent += _this.timeNum;
						_this.legenNum = _this.currentPercent;

							
							}, 1000)
							// 同时继续高德地图的轨迹运行
							// this.defaultOptions.marker.resumeMove();
							}
						}
					}
				}else{
					this.$Message.warning('请设置查询条件！');
				}		
		},
		//暂停动画
		pauseAnimation(){
			this.defaultOptions.isFirst = true;
			clearInterval(this.timeKey)
			// console.log(this.timeKey);
			// this.timeKey = null;
			 // this.defaultOptions.marker.pauseMove();
		},
		// 减速
		goBack(){
			let _this = this;
			if(this.timeNum >= 2){
				this.timeNum /= 2;
			}else{
				this.timeNum = 1
			}
			if(!this.defaultOptions.isFirst){
				clearInterval(this.timeKey);
				if(this.currentPercent < this.len ){
					this.timeKey = window.setInterval(function(){
						_this.currentPercent += _this.timeNum;
						_this.legenNum = _this.currentPercent;

						// debugger;
						if(_this.currentPercent >= _this.len){
							_this.currentPercent = _this.len;
						_this.legenNum = _this.currentPercent;

							_this.defaultOptions.isFirst = true;
							clearInterval(_this.timeKey);
							_this.timeKey = null;
						}
					}, 1000)
				}else{
					// debugger;
					this.defaultOptions.isFirst = true;
					clearInterval(this.timeKey);
					// this.timeKey = null;
				}
			}
		},
		//加速动画
		goTwo(){
			let _this = this;
			this.timeNum *= 2;
			if(!this.defaultOptions.isFirst){
				clearInterval(this.timeKey);
				if(this.currentPercent < this.len ){
					this.timeKey = window.setInterval(function(){
						_this.currentPercent += _this.timeNum;
						// 如果加速，会将当前的数赋值给echarts的y轴数组的index
						_this.legenNum = _this.currentPercent;
						// debugger;
						if(_this.currentPercent >= _this.len){
							_this.currentPercent = _this.len;
						_this.legenNum = _this.currentPercent;
							_this.defaultOptions.isFirst = true;
							clearInterval(_this.timeKey);
							_this.timeKey = null;
						}
					}, 1000)
				}else{
					// debugger;
					this.defaultOptions.isFirst = true;
					clearInterval(this.timeKey);
					// this.timeKey = null;
				}
			}
	},
		QueryChange(data){
			// console.log('data',data);
		},
		ChangeValue(value){
			let _this = this;
			if(value.length >= 5){
				// console.log(value, 'value');
				// console.log(this.cityList, 'this.cityList');
				let arr3 = this.cityList.filter(item => {
				return value.every(item2 => {
					return item.value != item2.value
				})
			})
			arr3.forEach(function(obj){
				obj.disabled = true;
			})
			}else{
				this.cityList.forEach(function(obj){
					obj.disabled = false;
				})
			}
			this.defaultOptions.isFirst = true;
			this.currentPercent = 0;
			clearInterval(this.timeKey)
			this.fruit = value;
			// this.defaultOptions.seriesData.data=[];
			this.getEcharts();
		},
	},
	beforeDestroy () {
    clearInterval(this.timeKey)
	},
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
</style>