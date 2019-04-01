<template>
<div class="main">
	<Card>
		<p slot="title">菜单权限</p>
    <p slot="title" style="font-weight: normal; font-size: 12px;">管理使用</p>
    <Row>
    	<Col span="6">
    		<h5>所有菜单</h5>
    		<v-tree 
    			ref='dropTree' 
    			:canDeleteRoot="true" 
    			:data='treeData' 
    			:draggable='false' 
    			:halfcheck='true' 
    			:multiple="true"
    			@node-click="nodeClick"
    			@node-check="nodeClick"
    			:topMustExpand="false" />
    	</Col>
    	<Col span="4" justify="center">
    		<Button :disabled="subAdd" @click="addTree()" style="display: block; margin-bottom: 20px;">添加</Button>
    		<Button :disabled="subReduce" @click="reduceTree()" style="display: block;">减少</Button>
    	</Col>
    	<Col span="6">
    		<h5>角色权限</h5>
    		<v-tree 
    			ref='selectedTree' 
    			:canDeleteRoot="true" 
    			:data='reduceTrees' 
    			:draggable='false' 
    			:halfcheck='true' 
    			:multiple="true"
    			@node-click="nodeClickReduce"
    			@node-check="nodeClickReduce"
    			:topMustExpand="false" />
    	</Col>
    </Row>
    <Row>
    	<Col span="13" align="middle" style="margin-top: 20px;">
    		<Button @click="saveMenu" :disabled="subDisabled" type="primary" name="subBtn">保存按钮权限信息</Button>
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
	mapMutations
} from 'vuex'
export default{
	name: 'roleManager',
	data(){
		return{
			treeData: [],
			allroles: [],
			getTemp: [],
			subAdd: false,
			subReduce: false,
			subDisabled: false,
			selectedItems: [],
			reduceTrees: [],
			arrData: [],
			arrD: [],
			roles: [],
			half: [],
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
		...mapMutations([
      'closeTag'
    ]),
    // 当保存当前菜单后，关闭窗口
    closee() {
      this.closeTag({
        name: 'roleManager',
        params: this.$route.params
      })
    },
    // 当有选中的菜单获取下拉框的时候，将button设置可点击
    nodeClick(){
    	this.subAdd = false;
    },
    // 当有选中的菜单获取下拉框的时候，将button设置可点击
    nodeClickReduce(){
    	this.subReduce = false;
    },
    // 选中菜单添加到当前菜单
		addTree(){
			let _this = this;
			// 保存角色的button可点击
			this.subDisabled = false;
			this.subReduce = false;
			this.half = [];
			let arrD = [];
			let arr = [];
			// console.log('reduceTrees', this.reduceTrees);
			this.arrD.forEach(function(obj){
				obj.checked = false;
				if(obj.children instanceof Array){
					obj.children.forEach(function(item){
						item.checked = false;
					})
				}
			})
			arr = this.$refs.dropTree.getCheckedNodes();
			if(arr.length == 0){
				this.$Notice.warning({
        title: '选择权限',
        desc: '请选择需要分配的权限'
      });
			}
			// 获取所有roles中的相同id
			for(let i=0; i<this.allroles.length; i++){
				for(let j=0; j<arr.length; j++){
					if(arr[j].id == this.allroles[i].id){
						arrD.push(this.allroles[i]);
					}
				}
			}
			arrD.forEach(function(item){
				item.checked = true;
				item.expanded = true;
			})
			this.arrD = this.arrD.concat(arrD)
			// 将累加保存中的相同id去重
			let hash = {};
			this.arrD = this.arrD.reduce((item, next) => {
    	hash[next.id] ? '' : hash[next.id] = true && item.push(next);
    	return item
			}, []);


			this.reduceTrees = translaterolesToTree2(this.arrD, '0');
			// console.log('this.reduceTrees', this.reduceTrees);
			this.subAdd = true;

			//删除
			arr.forEach(function(item){
				if(item.halfcheck === false){
					_this.half.push(item);
				}
			})
			
			this.roles = this.roles.filter(item => {
				return _this.half.every(function(obj){
					return obj.id !== item.id;
				})
			})
			this.roles.forEach(function(obj){
				obj.checked = false;
			})
			// this.subAdd = false;
			this.treeData = translaterolesToTree2(this.roles, '1');
		},
		reduceTree(){
			let _this = this;
			let treeData = [];
			this.half = [];
			this.roles.forEach(function(obj){
				obj.checked = false;
				if(obj.children instanceof Array){
					obj.children.forEach(function(item){
						item.checked = false;
					})
				}
			})
			// 选中半选状态的菜单
			var arr = this.$refs.selectedTree.getCheckedNodes();
			// console.log('arr', arr);
			//获取是不是半选状态的菜单
			arr.forEach(function(item){
				if(item.halfcheck === false){
					_this.half.push(item);
				}
			})
			// console.log('this.half', this.half);
			this.arrD = this.arrD.filter(item => {
				return _this.half.every(function(obj){
					return obj.id !== item.id;
				})
			})
			// console.log('this.arrD', this.arrD);

			// console.log('角色权限--当前菜单', this.arrD);
			this.subAdd = false;
			this.arrD.forEach(function(obj){
				obj.checked = false;
			})
			this.reduceTrees = translaterolesToTree2(this.arrD, '');
			this.subReduce = true;
			// console.log('arrrrr', arr);
			this.allroles.forEach(function(item, i){
				arr.forEach(function(obj, i){
					if(obj.id === item.id){
						treeData.push(item);
					}
				})
			})
			let newTreeData = [];
			// console.log('treeData', treeData);
			treeData.forEach(function(item){
				if(item.parent === '0' || item.parent === undefined){
					newTreeData.push(item);
				}else{
					_this.allroles.forEach(function(obj){
						if(item.parent === obj.id){
							newTreeData.push(obj);
							newTreeData.push(item);
						}
					})
				}
			})
			newTreeData.forEach(function(item){
				item.checked = true;
				item.expanded = true;
			})
			// console.log('treeData', treeData);
			this.roles = this.roles.concat(newTreeData);
			// 去除相同的id
			let hashs = {};
			this.roles = this.roles.reduce((item, next) => {
    	hashs[next.id] ? '' : hashs[next.id] = true && item.push(next);
    	return item
			}, []);
			this.treeData = translaterolesToTree2(this.roles, '1');
		},
		//获取所有的菜单
		getRolesData(){
			let _this = this;
			let allroles = [];
			this.getRolesInfoData().then(res => {
				// console.log('res', res);
				let data = res.collection;
				// 将数据转为tree需要的数据
				_this.treeData = translaterolesToTree(data, '');
				// 将数据进行转换以备需要
				allroles = data.map(item => {
			    return {
			      id: item.unid,
			      title: item.name,
			      expanded: true,
			      halfcheck: false,
			      checked: false,
			      parent: item.super_unid
			    }
			  })
			  _this.allroles = allroles;
			  _this.roles = allroles;
			})
		},
	// 获取当前的角色的数据
	getCurrentRole(){
		let _this = this;
		let reduceTrees = [];
		let treeData = [];
		let roleId = this.$route.params.id;
		// 通过id获取当前的菜单
		this.getcurrentRolesInfoData({unid: roleId}).then(res => {
			reduceTrees = res;
			_this.arrD = res.map(item => {
		    return {
		      id: item.unid,
		      title: item.name,
		      expanded: true,
		      halfcheck: false,
		      checked: false,
		      parent: item.super_unid
		    }
		  })
		  // 将数据转为tree需要的数据
			_this.reduceTrees = translaterolesToTree(res, '');

			_this.getRolesInfoData().then(res => {
				let data = res.collection;
				let reduce = [];
				// console.log('reduceTrees', reduceTrees);
				// console.log('allrolesssss', data);
				// 返回删除当前菜单，剩余的菜单
				reduce = data.filter(function(item){
						return reduceTrees.every(function(item1){
						return item.unid !== item1.unid;
					})
			})	
				reduce.forEach(function(item){
					if(item.super_unid === '0' || item.super_unid === undefined){
						treeData.push(item);
					}else{
						data.forEach(function(obj){
							if(item.super_unid === obj.unid){
								treeData.push(obj);
								treeData.push(item);
							}
					})
					}
				})
				
				// 匹配有父级的菜单
				treeData.forEach(function(obj){
					data.forEach(function(obje){
						if(obj.super_unid === obje.unid){
							treeData.push(obje);
						}
					})
				})
				// console.log('treeData222222', treeData);
				//删除相同id的菜单
			let hashs = {};
			treeData = treeData.reduce((item, next) => {
    	hashs[next.unid] ? '' : hashs[next.unid] = true && item.push(next);
    	return item
			}, []);
				console.log('treeData', treeData);

			_this.roles = treeData.map(item => {
			    return {
			      id: item.unid,
			      title: item.name,
			      expanded: true,
			      halfcheck: false,
			      parent: item.super_unid
			    }
			  })
			_this.allroles = data.map(item => {
			    return {
			      id: item.unid,
			      title: item.name,
			      expanded: true,
			      halfcheck: false,
			      parent: item.super_unid
			    }
			  })
			_this.treeData = translaterolesToTree(treeData, '');
			})
		}).catch(err => {
			this.getRolesData()
		})
	},

	//点击保存
	saveMenu(){
		let _this = this;
		let roleId = this.$route.params.id;
		if(roleId){
			let menuArr = []; // 菜单
			let menuStr = "";

			if(this.arrD.length < 0){
			this.$Notice.warning({
        title: '权限分配',
        desc: '请选择需要分配的权限'
      });
		}else{
			this.arrD.forEach(function(obj,index){
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
				// _this.close();
				_this.subDisabled = true;
					_this.$Notice.success({
	        title: '权限分配',
	        desc: '角色权限分配成功'
      });
			_this.closee();
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
.main >>> .halo-tree .inputCheck{
	top: 1px;
}
</style>