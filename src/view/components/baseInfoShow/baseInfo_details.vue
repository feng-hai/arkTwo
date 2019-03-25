<template>
	<div class="container" >
		<!-- 国标的页面 -->
		<div>
			<Card class="cardText">
				<p slot="title">基础信息</p>
				<Row >
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
export default{
	name: 'data_details',
	mixins: [setData],
	props: {
		getWebscoket: {
			type: Array
		},
		paramsId:{
			type: String
		},
	},
	data(){
		return{
			item:{
        data:[]
      }
		}
	},
	mounted(){
		// 获取type和title的名称

	},
	computed: {

	},
	watch: {

	},
	methods: {
	...mapActions([
  'getDetails',
  'getInfoCarDate',
  'getRealData',
  'getWebscokets'
	]),

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
