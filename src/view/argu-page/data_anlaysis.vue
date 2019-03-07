<template>
	<div class="dataAnalysis">
		<div class="dataAnalysis-header">
			<Row>
				<Col :xs="23" :sm="23" :md="12" :lg="10" :xl="8" :offset="1">
					<div class="timeSelect">
						<DatePicker :value="startEndTime" @on-change="selectTime" @on-clear="clearTime" type="datetimerange" clearable placement="bottom-end" placeholder="开始时间-结束时间" style="width: 500px"></DatePicker>
					</div>
				</Col>
				<Col :xs="23" :sm="23" :md="10" :lg="6" :xl="6" style="text-align: left;">
					<Button type="primary" @click="submit">查询</Button>
					<Button type="primary" @click="dialogVisible = true">配置参数</Button>
				</Col>
			</Row>
		</div>
		<div id="echarts" ref="dom" style="width:100%; height: 450px;"></div>
		<!-- 配置参数 -->
		<Drawer title="配置参数" v-model="dialogVisible" width="500" :mask-closable="false" :styles="styles">
		<data-analysis :params.sync="params" :axisY.sync="axisY">
			<div slot="footer" class="demo-drawer-footer">
        <Button type="primary" style="margin-right: 8px" @click="dialogVisible = false">关闭</Button>
      </div>
		</data-analysis>
		</Drawer>
	</div>
</template>

<script>
import dataAnalysis from '_c/data-anlysis/data_anlaysis'
import echarts from 'echarts'
import {
  mapActions,
  mapGetters,
  // mapState
} from 'vuex'
export default{
	name: 'anlaysisEcharts',
	data(){
		let endTime = new Date().toLocaleDateString().replace(/\//g, "-") + " " + new Date().toTimeString().substr(0, 8);
		let startTime = new Date(new Date().getTime()-3600000).toLocaleDateString().replace(/\//g, "-") + " " + new Date(new Date().getTime()-3600000).toTimeString().substr(0, 8);
		return{
			styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
    	},
			axisY:[{min:null,max:null},{min:null,max:null}],
			params:[{option:null,axis:0}],
			paramTime: [],
			startEndTime: [startTime, endTime],
			dialogVisible: false,
			submitParams:{
	        field:null,
	        date_to:null,
	        date_from:null,
	        unid:null,
			},
			myChart:null,
			lineEcharts: {
    		xAxisData: [],
    		legendData: [],
    		seriesData: []
			},
			option:null,
		}
	},
	components: {
		dataAnalysis
	},
	computed: {
    ...mapGetters([
      'dataAnalysisArr',
      'getoptions'
    ])
  },
	mounted(){
		if(!this.dataAnalysisArr){
			this.$Message.warning('请返回到车辆信息页面，选择电池块！')
		}else{
			this.refreshParams(this.dataAnalysisArr);
		}
		this.refreshParams(this.dataAnalysisArr);
	},
	watch:{
    dataAnalysisArr:function(val,oldVal){
        this.refreshParams(val);
    }
	},
	methods: {
    ...mapActions([
  		'getvehicleDataAnlaysis',
    ]),
		selectTime(event){
			this.startEndTime = event;
		},
		clearTime(){
			this.startEndTime = [];
		},
		//接收父组件传递过来的值
		refreshParams(val){
			let label = '';
			let value = '';
			if(val[0] === 'tempItems1'){
				value = 'tempItems1_' + val[1];
				label = '测温点' + (val[1]);
			}else{
				value = 'batteryPackageItems1_' + val[1];
				label = '单体电压' + (val[1])
			}
			this.params[0].option = {label:label,value:value};
			this.selectChart();
			// this.drawLine();
			this.submit();
		},
		//查询
		submit(){
			let _this = this;
			let start = new Date(this.startEndTime[0].replace(/-/g, '/')).getTime();
			let end = new Date(this.startEndTime[1].replace(/-/g, '/')).getTime();
			if(end == null || end === '' || start === null || start === ''){
				this.$Message.warning('请选择开始时间和结束时间！')
			}else if(end < start){
				this.$Message.warning('结束时间不能大于开始时间！')
			}else if(end - start > 86400000){
				this.$Message.warning('时间区间不能超过24小时!')
			}else{
				//api获取数据
				let unid = this.$route.params.id;
	      let date_from = this.startEndTime[0].replace(/ /, "T");
	      let date_to = this.startEndTime[1].replace(/ /, "T");
	      let field = "DATIME_RX";
	      let legendData = [];
	      let xAxisData = [];
	      let seriesData = [];
	      // debugger;
	      // this.params的处理
	      this.params.forEach(function(obj, i){
	      	if(obj !=null && obj.axis != null && obj.option != null){
	      		let option = obj.option;
	      		let axisY = obj.axis == 0 ? "Y1" : "Y2";
	      		// 从配置参数中传递过来的值，如果value相同，那么就把label的值赋值给option中
	      		_this.getoptions.forEach(function(obje, j){
	      			if(option.value == obje.value){
	      				if(option.label != obje.label){
	      					option.label = obje.label;
	      				}
	      			}
	      		})
	      		let indexOf_ = option.value.indexOf("_");
	      		if(indexOf_ > 0){
	            field += "," + option.value.substring(0,indexOf_);
	            option.index = Number(option.value.substring(indexOf_ + 1, option.value.length));
		        }else{
		            field += "," +  option.value;
		        }
		        if(!option.label){return;}
		        let name = option.label + "(" + axisY + ")";
		        legendData.push(name);
		        seriesData.push({name:name,type:"line",yAxisIndex:obj.axis,data:[]});
	      	}
	      })
	      this.submitParams = {
	      	unid: unid,
	      	date_from:date_from,
	        date_to:date_to,
	        field:field,
	        sort:true
	      }
	      //接口获取数据
	      this.getvehicleDataAnlaysis(this.submitParams).then(res => {
	      	let _this = this;
	      	res.datas.forEach(function(obj, i){
	      		obj.pairs.forEach(function(obje, j){
	      			if(obje.key === "DATIME_RX"){
                  xAxisData.push(obje.value);
              }else if(obje.key === "batteryPackageItems1" || obje.key === "tempItems1"){
                  let tmpValue = null;
                  if(obje.value){
                      let tmpArr = obje.value.split(",");
                      let tmpIndex = _this.params[j-1].option.index;
                      if(tmpArr.length > tmpIndex){
                          tmpValue = tmpArr[tmpIndex];
                      }
                  }
                  seriesData[j-1].data.push(tmpValue);
              }else{
                  seriesData[j-1].data.push(Number(obje.value));
              }
	      		})
					})
					this.lineEcharts.legendData = legendData;
					this.lineEcharts.xAxisData = xAxisData;
					this.lineEcharts.seriesData = seriesData;
					let myOption = _this.drawLine();
					_this.myChart.clear();
					_this.myChart.setOption(myOption);
	      	//this.drawLine(legendData,xAxisData,seriesData);
	      }, err => {
	      	console.log(err, 'err');
	      })
			//api获取数据结束
			}
			
		},
		selectChart:function(){
			var _this = this;
			// if(!this.$refs.dom){
			// 	return;
			// }
			this.myChart = echarts.init(document.getElementById('echarts'));
		},
		drawLine:function(){
			let myOption = {
				tooltip: {
    				trigger: 'axis'
				},
				legend: {
    				data:this.lineEcharts.legendData
				},
				grid: {
    				left: '3%',
    				right: '4%',
    				bottom: '3%',
    				containLabel: true
				},
				toolbox: {
    				feature: {
        				saveAsImage: {}
    				}
				},
				xAxis: {
    				type: 'category',
    				boundaryGap: false,
    				data: this.lineEcharts.xAxisData
				},
				dataZoom:{
    				start:0,
    				end:100
				},
				yAxis: [
					{
    				type: 'value',
            min:this.axisY[0].min?this.axisY[0].min:'dataMin',
            max:this.axisY[0].max?this.axisY[0].max:'dataMax'
				},
				{
    				type: 'value',
            min:this.axisY[1].min?this.axisY[1].min:'dataMin',
            max:this.axisY[1].max?this.axisY[1].max:'dataMax'
				}
				],
				series: this.lineEcharts.seriesData,
				color:['#33CC33','#FF9900','#6666CC','#990033','#ff0033']
			};
			return myOption;
		},
	},
}
</script>
<style>
.dataAnalysis {
	height:500px;
  padding-top:10px;
}
.dataAnalysis-header {
	padding-bottom: 30px;
}
.timeSelect{
	text-align: center !important;
}
.ivu-input{
	height: 32px;
	text-align: center !important;
	font-size: 14px;
}
.ivu-input-icon{
	line-height: 38px;
}
.ivu-btn-primary{
	margin-right: 20px;
}
.ivu-modal-wrap{
	text-align: left;
}
#echarts{
  height: 355px;
}
/*配置参数样式*/
.demo-drawer-footer{
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
.dataAnalysisParam{
	padding-top: 20px;
}
.test{
	padding-bottom: 15px;
	line-height: 40px;
}
.ivu-col-span-3{
	text-align: center;
}
</style>