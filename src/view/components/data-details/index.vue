<template>
	<div class="container" v-if="msg.length > 0">
		<!-- 国标的页面 -->
		<div v-for="item,index in msg" :key="index">
			<Card class="cardText">
				<p slot="title">{{typeValue[item.type]}}</p>
				<Row v-if="item.data.length > 0">
					<Col span="8" v-for="items in item.data" :key="items.title">
						<div class="from-group">
							<div class="title">{{items.title}} : </div>
							<div class="content">{{items.content}}</div>						
						</div>
					</Col>
				</Row>
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
import setData from './mixin/setData.js'
export default{
	name: 'data_details',
	mixins: [setData],
	props: {
		getWebscoket: {
			type: Array
		}
	},
	data(){
		return{
			msg: [],
			isChangeSwitch: false,
			vehicle:{},  //从列表获取的信息存储
			valueList: [], //获取值的数组
			typeValue: ['', '整车数据', '位置数据', '驱动电机数据', '燃效电池', '发动机数据', '极值数据', '报警数据', '可充电储能装置电压数据', '可充电储能装置温度数据'],
			getWebsc: [],
		}
	},
	mounted(){
		// 获取type和title的名称
		this.getDetailTitle();
		this.getFilerUnid();
		this.websocketFunc(); //推送信息
	},
	computed: {
	// 	...mapGetters([
	// 		'getWebscoket'
	// ])
	},
	watch: {
		getWebscoket(nv, ov){
			console.log(nv, 'nv');
			this.websocketFunc();
		}
	},
	methods: {
	...mapActions([
  'getDetails',
  'getInfoCarDate',
  'getRealData',
  'getWebscokets'
	]),
	//webscoket
	websocketFunc(){
		let _this = this;
		this.isChangeSwitch = true;
		this.getWebsc = this.getWebscoket;
		// console.log(this.getWebsc, 'webscoket');
		this.getWebsc.forEach(function(obj){
				_this.valueList.forEach(function(obje){
					if(obj.alias === obje.alias || obj.alias.substring(0, obj.alias.length-1) == obje.alias){
						obje.content = obj.value;
					}
				})
			})
			_this.setData(_this.valueList);
	},
	//获取table传过来的信息
	getFilerUnid(){
		let _self = this;
    let params = _self.$route.params;
		this.getInfoCarDate({"unid": params.id}).then(res => {
			_self.vehicle = res;
			_self.initRealTime(res.unid);
		})
	},
	// 获取type和title的名称
	getDetailTitle(){
		let _this = this;
		this.getDetails().then(res => {
			res.forEach(function(obj){
				obj.content = '-'
			})
			_this.valueList = res;
	  })
	},
	// 获取值
	initRealTime(unid){
		this.isChangeSwitch = false;
		let _this = this;
		this.getRealData({unid:unid}).then(res => {
			let data = res.snapshot.entry;
			// console.log(data, 'data');
			data.forEach(function(obj){
				_this.valueList.forEach(function(obje){
					if(obj.key === obje.alias || obj.key.substring(0, obj.key.length-1) == obje.alias){
						obje.content = obj.value;
					}
				})
			})
			_this.setData(_this.valueList);
		})
	},
	
},

}
</script>

<style scoped>
.cardText{
	margin-bottom: 10px;
}
.from-group{
	text-align: center;
}
.title{
	display: inline-block;
	width: 50%;
	text-align: right;
	background: #f8f8f8;
	height: 30px;
	margin-right: 10px;
	padding-right: 4px;
	font-size: 13px;
	line-height: 30px;
}
.content{
	display: inline-block;
	color: #0088cc;
	font-size: 15px;
	width: 22%;
	text-align: left;
}
/*.container >>> .ivu-col-span-8{
	height: 30px;
}
.container >>> .ivu-card-body{
	height: 228px;
}*/
</style>