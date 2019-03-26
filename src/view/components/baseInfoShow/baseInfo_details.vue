<template>
	<Card class="main">
		<Row class="setrow">
			<Col span="4" align="center">
				<span class="setAlign">VIN:</span>
				<span>{{vehicle.vin}}</span>
			</Col>
			<Col span="4" align="center">
				<span class="setAlign">车牌号:</span>
				<span>{{vehicle.licence}}</span>
			</Col>
			<Col span="4" align="center">
				<span class="setAlign">编号:</span>
				<span>{{vehicle.name}}</span>
			</Col>
			<Col span="4" align="center">
				<span class="setAlign">型号:</span>
				<span>{{getmodel(vehicle.model)}}</span>
			</Col>
		</Row>
	</Card>
</template>

<script>
import {
  mapActions,
  mapGetters,
  // mapState
} from 'vuex'
export default{
	name: 'data_details',
	props: {
    paramsId: {
      type: String
    }
	},
	data(){
		return{
			vehicle: {},
		}
	},
	mounted(){
		// 获取车辆的基本信息
		this.getInfoData();

	},
	watch: {
		paramsId(){
			this.getInfoData();
		}
	},
	methods: {
		...mapActions([
  'getInfoCarDate'
]),
	getmodel(val){
		if(!val){
			return '没有匹配项目';
		}else{
			return val;
		}
	},
	getInfoData(){
	  let _self = this;
	  if(_self.paramsId){
	    this.getInfoCarDate({"unid": _self.paramsId}).then(res => {
	    this.vehicle = res;
	  })
	  }else{
	    let params = _self.$route.params;
	    this.getInfoCarDate({"unid": params.id}).then(res => {
	    this.vehicle = res;
	  })
	}
}
}
}
</script>

<style scoped>
.setrow{
	height: 30px;
	line-height: 30px;
	border-bottom: #f5f5f5;
}
.setAlign{
	padding-right: 10px;
	font-weight: 700;
	font-size: 14px;
}
.main{
	margin-bottom: 2px;
}
.main >>> .ivu-card-body{
	padding: 6px;
}
</style>
