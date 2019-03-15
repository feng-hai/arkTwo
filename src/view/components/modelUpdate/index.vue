<template>
<div class="modelUpdate">
  <Card>
  	 <p slot="title">单体布局</p>
  	<!-- <Scroll> -->
  		<table id="viewTabs" class="viewTabs" border="0">
    		<tr class="info"></tr>
  		</table>
    <div class="button">
    	<Button type="primary" @click="addCells">添加行</Button>
    	<Button type="primary" @click="addRows" style="margin:0 10px">添加列</Button>
      <Button type="primary" @click="save">保存</Button>

    </div>
    <div class="save">
    </div>
  	<!-- </Scroll> -->

  </Card>
</div>
</template>

<script>
import axios from 'axios'
import {
  getModelpPut,
  getModelPost
} from '@/api/vehicle'
import {
  mapActions,
  mapGetters,
  // mapState
} from 'vuex'
export default {
  name: 'modelUpdate',
  data(){
  	return{
  		rowNum: 0,
  		columnNum: 0,
  		paramsId: '',
  	}
  },
mounted() {
  this.paramsId = this.$route.params.id;
  this.rowNum = Number(this.$route.params.rowNum);
  this.columnNum = Number(this.$route.params.columnNum);
  if(this.paramsId){
  	this.getModelFlex(this.paramsId);
  }else{
  	this.add(this.rowNum, this.columnNum)
  }
  },
 methods: {
  ...mapActions([
    'getModelInfo',
    'putModelInfo',
    'postModelInfo'
  ]),
  //h获取数据
  getModelFlex(id){
  	let _this = this;
  	this.getModelInfo({unid: id}).then(res => {
     var datas = res.grid;
		if(datas){
			var rowsValue = datas.split("/");
     	_this.add(rowsValue.length,(rowsValue[0].split(",")).length);
     for (var i = 0; i < rowsValue.length; i++) {
      var columnsValue =rowsValue[i].split(",");
      for (var j = 0; j < columnsValue.length; j++) {
        var value = columnsValue[j].split("-");
        $("#"+(i+1)+(j+1)+"a").val(value[0]);
        $("#"+(i+1)+(j+1)+"b").val(value[1]);
      }
     }
		}
  	})
  },
   //指定行与列个数的添加
  add(a,b){    
   let _this = this;
  	for(var i=1;i<=a;i++){
    	$("<tr>").attr("index",i).html(_this.ash(i,b)).insertBefore("tr:last");
  	};    
	},
	ash(a,b){//添加列
		let _this = this;
  	var bs="";
  	for(var i = 1;i<=b;i++){
    	bs= bs+"<td><input class='input_count' placeholder='添加1到999的正整数' type='number' id='"+(a+""+i)+"a'></input><br/><input type='number' placeholder='添加1到999的正整数' class='input_count' id='"+(a+""+i)+"b'></input></td>";      
  };
  	return bs;
	},
	columnss(id,value){//判断是否是1-999的正整数
    var a = /^[1-9][0-9]{0,2}$/;
    if(value.match(a)){
    }else{$(id).val("");}    
	},
	// 添加行
  addRows(){
  	let _this = this;
 		var tab=document.getElementById("viewTabs"); //获得表格
   //$("tr:not(tr:last)").remove();//每次增加行前删除前面的行，否则会重复增加
   	var colsNum=tab.rows.item(0).cells.length;   //表格的列数
 		var tr = tab.getElementsByTagName("tr");
 		var count = tr.length;
   	for(var i=0; i<count-1; i++) {
  		var newTD = document.createElement("td");
  		newTD.innerHTML="<input type='number' placeholder='添加1到999的正整数' class='input_count' id='"+((i+1)+""+(colsNum+1))+"a'></input><br/><input type='number'placeholder='添加1到999的正整数' class='input_count' id='"+((i+1)+""+(colsNum+1))+"b'></input>";
  		tr[i].appendChild(newTD);
  	}
  },
  // 添加列
  addCells(){
  	let _this = this;
		var tab=document.getElementById("viewTabs"); //获得表格
		var num=tab.rows.length;//表格当前的行数
		var colsNum=tab.rows.item(0).cells.length;   //表格的列数
		if(colsNum=='0'||colsNum==0){
  		colsNum=1;
		}
		$("<tr>").attr("index",num).html(_this.ash(num,colsNum)).insertBefore("tr:last");
 		},
 	save(){
 		let _this = this;
 		var tb=document.getElementById("viewTabs");    //获取table对像
    var rows=tb.rows;
    var rowsLeng=tb.rows.length;//获取table行数
    var cellsLeng=rows[0].cells.length;//获取table列数
    var values = "";
    var num=0;//单体数
    var num_temp=0;//测温点数
    for(var i = 1;i<rowsLeng;i++){
      if(values){
        values = values+"/";
      }     
      var valuea="";
      for(var j = 1;j<=cellsLeng;j++){
        if(valuea){
          valuea=valuea+",";
        }
      var value = $("#"+(i+""+j)+"a").val()+"-"+$("#"+(i+""+j)+"b").val();
      valuea=valuea+value;
      if($("#"+(i+""+j)+"a").val()){
        num=num+1;
      }
      if($("#"+(i+""+j)+"b").val()){
        num_temp=num_temp+1;
      }     
      }
      values=values+valuea;     
    }
    if(_this.paramsId){
    	_this.setSave(values,_this.paramsId, getModelpPut, num, num_temp)
    }else{
    	_this.setSave(values,_this.paramsId, getModelPost, num, num_temp)

    }
 		},
 		setSave(grid, unid, urldata, num, num_temp){
 			let _this = this;
 			urldata({
				unid: unid,
				num_temp: num_temp,
				num: num,
				grid: grid
 			}).then(res => {
 				_this.$Notice.success({
            title: '成功',
            desc: '保存成功！'
        });
 			})
 		},
  }
}
</script>

<style>
.info{
	margin-bottom: 8px;
}
.viewTabs td {
    padding: 6px;
    border: none;
 }
.input_count{
	font-size: 13px;
	height: 29px;
	background-color: #fff;
	background-image: none;
	border: 1px solid #ccc;
	margin-top: -1px;
	box-shadow: 0 0px 0px rgba(0, 0, 0, 0.75) inset;
	text-align: center;
	outline:none;
}
</style>
<style scoped>
.modelUpdate{
	overflow: auto;
}
.modelUpdate >>> .ivu-scroll-container{
	height: 100% !important;
}
.button{
	padding: 10px 0 10px 0px;
}
</style>
