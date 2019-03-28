<template>
<div class="main">
	<Card>
		<p slot="title">菜单权限</p>
    <p slot="title" style="font-weight: normal; font-size: 12px;">管理使用</p>
    <Row>
    	<Col span="6">
    		<h5>所有菜单</h5>
    		<v-tree ref='dropTree' :canDeleteRoot="true" :data='treeData' :draggable='true' :halfcheck='true' :multiple="true" />
    	</Col>
    	<Col span="4" justify="center">
    		<Button  @click="addTree()" style="display: block; margin-bottom: 20px;">添加</Button>
    		<Button @click="reduceTree()" style="display: block;">减少</Button>
    	</Col>
    	<Col span="6">
    		<h5>角色权限</h5>
    		<v-tree ref='selectedTree' :canDeleteRoot="true" :data='reduceTrees' :draggable='true' :halfcheck='true' :multiple="true" />
    	</Col>
    </Row>
    <Row>
    	<Col span="13" align="middle" style="margin-top: 20px;">
    		<Button @click="saveMenu" type="primary" name="subBtn">保存按钮权限信息</Button>
    	</Col>
    </Row>
	</Card>
</div>
</template>

<script>
import {
  translaterolesToTree,
  translaterolesToTree2
} from '@/libs/util'
import {
  mapActions,
  mapGetters,
  // mapState
} from 'vuex'
export default{
	name: 'roleManager',
	data(){
		return{
			treeData: [],
			allroles: [],
			getTemp: [],
			reduceTrees: [],
			submitParams:{
        privilege_unid: null,
  			menu_unid: null,
  			field: null
			},
		}
	},
  watch: {
  	$route(nv, ov){
      if(nv.params.id === ov.params.id){
        return;
      }else{
        this.getCurrentRole();
      }
    },
  },
	mounted(){
		this.getCurrentRole();	
	},
	methods:{
		...mapActions([
    'getRolesInfoData',
    'postRolesInfoData',
    'getcurrentRolesInfoData'
  ]),
		addTree(){
			let _this = this;
			let treeData = [];
			this.treeData.forEach(function(item, i){
				if(item.checked === true){
				// console.log(item, 'item');
				_this.reduceTrees.push(item);
				let treeData = _this.treeData.filter(function(item1){
					return item1.id !== item.id;
			})
				_this.treeData = treeData;
				}
			})	
		},

   getFilterData(arr, arr1){
   	return arr.filter(function(item){
				return arr1.every(function(item1){
					return item.id !== item1.id;
				})
			})
   },
		reduceTree(){
			let _this = this;
			let treeData = [];
			// let data1 = [];
			this.reduceTrees.forEach(function(item, i){
				if(item.checked === true){
				// console.log(item, 'item');
				_this.treeData.push(item);
				let treeData = _this.reduceTrees.filter(function(item1){
					return item1.id !== item.id;
			})
				_this.reduceTrees = treeData;
				}
			})
		},
		getRolesData(){
			let _this = this;
			this.getRolesInfoData().then(res => {
				let data = res.collection;
				_this.treeData = translaterolesToTree(data, '');
				_this.allroles = data.map(item => {
			    return {
			      id: item.unid,
			      title: item.name,
			      expanded: true,
			      parent: item.super_unid
			    }
			  })
			})
		},
	// 获取当前的角色的数据
	getCurrentRole(){
		let _this = this;
		let roleId = this.$route.params.id;
		this.getcurrentRolesInfoData({unid: roleId}).then(res => {
			// _this.currentRole = res;
		// console.log(_this.currentRole, 'currentRole');

			_this.reduceTrees = translaterolesToTree(res, '');
			_this.getRolesInfoData().then(res => {
				let data = res.collection;
				_this.treeData = translaterolesToTree(data, '');
				_this.allroles = data.map(item => {
			    return {
			      id: item.unid,
			      title: item.name,
			      expanded: true,
			      parent: item.super_unid
			    }
			  })
				_this.treeData = _this.treeData.filter(function(item){
				return _this.reduceTrees.every(function(item1){
					return item.id !== item1.id;
				})
			})
			})
		}).catch(err => {
			this.getRolesData()
		})
	},
	//点击保存
	saveMenu(){
		let _this = this;
		let temp = [];
		// console.log(_this.reduceTrees, 'reduceTrees');
		this.reduceTrees.forEach(function(item, i){
			if(item.parent === '0'){
				console.log(item, 'item');
				temp.push(item);
			}
			if(item.children instanceof Array){
				item.children.forEach(function(obj){
					temp.push(obj);
					if(obj.children instanceof Array){
						obj.children.forEach(function(obje){
							temp.push(obje);
						})
					}
				})
			}
			_this.getTemp = temp;
		})
		let roleId = this.$route.params.id;
		if(roleId){
			let menuArr = []; // 菜单
			let menuStr = "";

			if(this.getTemp.length < 0){
			this.$Notice.warning({
        title: '权限分配',
        desc: '请选择需要分配的权限'
      });
		}else{
			this.getTemp.forEach(function(obj,index){
				menuArr.push(obj.id);
				menuStr += obj.id + ',';
			})

			let fieldStr = '';
			for(let i=0; i< menuArr.length; i++){
				fieldStr+="menu:"+menuArr[i]+";button:";
				fieldStr+="|";
			}

			this.submitParams = {
				privilege_unid: roleId,
  			menu_unid: menuStr,
  			field: fieldStr
			}
			this.postRolesInfoData(this.submitParams).then(res => {
					_this.$Notice.success({
	        title: '权限分配',
	        desc: '角色权限分配成功'
      });
			}).catch(err => {
					_this.$Notice.error({
	        title: '权限分配',
	        desc: '角色权限分配失败'
      });
			})

		}
		}
		},
	},
}
</script>

<style scoped>
.main >>> .ivu-card-body{
	padding: 20px 0 16px 60px;
}
</style>