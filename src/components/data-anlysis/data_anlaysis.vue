<template>
<div>
			<div class="dataAnalysisParam">
				<Row class="test">
					<Col :span="3" :offset="1">Y1轴值域</Col>
					<Col :span="7">
						<Input v-model.number="axisY[0].min" placeholder="Y1最小值" size="small"></Input>
					</Col>
					<Col :span="3">—</Col>
					<Col :span="7">
						<Input v-model.number="axisY[0].max" size="small" placeholder="Y1最大值"></Input>
					</Col>
				</Row>
				<Row class="test">
					<Col :span="3" :offset="1">Y2轴值域</Col>
					<Col :span="7">
						<Input v-model.number="axisY[1].min" size="small" placeholder="Y2最小值"></Input>
					</Col>
					<Col :span="3">—</Col>
					<Col :span="7">
						<Input v-model.number="axisY[1].max" size="small" placeholder="Y2最大值"></Input>
					</Col>
				</Row>

				<Row class="test" v-for="(param, index) in params" :key="'param'+index">
					<Col :span="3" :offset="1">参数{{index+1}}</Col>
					<Col :span="7">
						<Select  placeholder="请选择" v-model="param.option.value">
							<Option v-for="option in options" :key="option.label" :label="option.label" :value="option.value"></Option>
						</Select>
					</Col>
					<Col :span="3">坐标轴</Col>
					<Col :span="7">
						<Select placeholder="请选择" v-model="param.axis">
							<Option v-for="item in axis" :key="item.value" :label="item.label" :value="item.value"></Option>
						</Select>
					</Col>
					<Col v-if="index > 0" :span="2">
					<Icon type="md-remove-circle" @click="removeParam(index)" style="color: #2d8cf0; font-size: 26px; padding-left: 30px;"  />
					</Col>
				</Row>

				<Row style="text-align: left;"> 
					<Icon type="ios-add-circle" @click="addParam" style="color: #2d8cf0; font-size: 26px; padding-left: 30px;" />
				</Row>
			</div>
			<slot name="footer"></slot> 
</div>
</template>

<script>
import {
  mapActions,
  mapGetters,
  // mapState
} from 'vuex'
export default{
	name: 'data_analysis',
	props:{
		params: {
			type: Array,
			// required: true
		},
		axisY: {
			type: Array
		}
	},
	data:function(){
		return{
			options:[],
			axis:[{value:0,label:"Y1"},{value:1,label:"Y2"}],
			// paramsTmp:[],
		}
	},
	computed: {
    ...mapGetters([
      'dtdywdArr'
    ])
  },
	mounted(){
		if(!this.dtdywdArr){
		}else{
		  let dyArrTmp = this.dtdywdArr.dyArrTmp;
		  let wdArrTmp = this.dtdywdArr.wdArrTmp;
		  // this.paramsTmp = this.params;
		//设置options的值
		let options = [{
				value : "maxBatteryVoltage",
				label : '最高电压'
			},{
				value : "minBatteryVoltage",
				label : '最低电压'
			},{
				value : "maxTemperature",
				label : '最高温度'
			},{
				value : "minTemperature",
				label : '最低温度'
			},{
				value : "subTemperature",
				label : '温差'
			},{
				value : "subBatteryVoltage",
				label : '压差'
			},{
				value : "tempItemsAve",
				label : '平均温度'
			},{
				value : "batteryPackageItemsAve",
				label : '平均电压'
			}];
			for(var i=0; i<dyArrTmp.length; i++){
				options.push({value:'batteryPackageItems1_'+i, label:'单体电压'+(i)})
			}
			for(var j=0; j< wdArrTmp.length; j++){
				options.push({value:'tempItems1_'+j, label:'测温点'+(j)});
			}
			this.options = options;
			this.$store.dispatch('getOption', this.options);
		}
	},
	methods:{
		removeParam:function(index) {
		 this.params.splice(index,1);
		},
		addParam:function() {
			if(this.params.length < 5){
				this.params.push({
					axis: 0,
					option: {
						label: '',
						value: ''
					}
				});
			}
		},
	},
}
</script>

<style>
	
</style>