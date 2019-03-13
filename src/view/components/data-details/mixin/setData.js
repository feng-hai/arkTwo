export default{
	methods: {
		// 将相同的type组成一个数组
	setData(arr){
		var map = {}, dest = [];
		for(var i = 0; i < arr.length; i++){
      var ai = arr[i];
	    if(!map[ai.type]){
        dest.push({
          type: ai.type,
          data: [ai]
        });
        map[ai.type] = ai;
	    }else{
        for(var j = 0; j < dest.length; j++){
          var dj = dest[j];
          if(dj.type == ai.type){
              dj.data.push(ai);
              break;
          }
        }
	    }
		}
		// let data = dest.splice(0, dest.length-1);
		dest.forEach(function(obj){
			obj.data.forEach(function(obje){
				if(obje.alias === 'batteryPackageItems'){
						obje.content = "-";
				}else if(obje.alias === 'tempItems'){
						obje.content = "-";
				}
				else if(obje.alias== "vehicleState"){
					if(obje.content=="1"){
						obje.content = "启动";
					}else if(obje.content=="2"){
						obje.content ="熄火";
					}else if(obje.content=="3"){
						obje.content ="其他"; 
					}else if(obje.content==""){
						obje.content ="-"; 
					}else{
						obje.content ="异常";
					}
			}else if(obje.alias== "chargeState"){
					if(obje.content==1){
					obje.content ="停车充电";
				}else if(obje.content==2){
					obje.content ="行驶充电";
				}else if(obje.content==3){
					obje.content ="未充电";
				}else if(obje.content==4){
					obje.content ="充电完成";
				}else if(obje.content==""){
					obje.content = "-"; 
				}else{
					obje.content ="异常";
				}
			}else if(obje.alias== "runModel"){
				if(obje.content==1){
					obje.content ="纯电";
				}else if(obje.content==2){
					obje.content ="混动";
				}else if(obje.content==3){
					obje.content ="燃油";
				}else if(obje.content==""){
					obje.content ="-"; 
				}else{
					obje.content ="异常";
				}
			}else if(obje.alias== "dcState"){//DC-DC状态 
				if(obje.content==1){
					obje.content ="工作";
				}else if(obje.content==2){
					obje.content ="断开";
				}else if(obje.content==""){
					obje.content ="-"; 
				}else{
					obje.content ="异常";
				}
			}else if(obje.alias== "gear"){//档位
				var str="";
				if((obje.content & 16) == 16){
					obje.content = str+="有制动   ";
				}else if((obje.content & 32) == 32){
					str+="有驱动    "
				}
				if((obje.content & 15)==0){
					obje.content = str+="空档";
				}else if((obje.content & 15) == 1){
					obje.content = str+="1档";
				}else if((obje.content & 15) == 2){
					obje.content =str+="2档";
				}else if((obje.content & 15) == 3){
					obje.content =str+="3档";
				}else if((obje.content & 15) == 4){
					obje.content =str+="4档";
				}else if((obje.content & 15) == 5){
					obje.content =str+="5档";
				}else if((obje.content & 15) == 6){
					obje.content =str+="6档";
				}else if((obje.content & 15) == 7){
					obje.content =str+="7档";
				}else if((obje.content & 15) == 8){
					obje.content =str+="8档";
				}else if((obje.content & 15) == 9){
					obje.content =str+="9档";
				}else if((obje.content & 15) == 10){ 
					obje.content =str+="10档";
				}else if((obje.content & 15) == 11){
					obje.content =str+="11档";
				}else if((obje.content & 15) == 12){
					obje.content =str+="12档";
				}else if((obje.content & 15) == 13){
					obje.content =str+="倒档";
				}else if((obje.content & 15) == 14){
					obje.content =str+="D档";
				}else if((obje.content & 15) == 15){
					obje.content =str+="停车P挡";
				}
			}else if(obje.alias=="drState"){//驱动电机状态
				if(obje.content==1){
					obje.content ="耗电";
				}else if(obje.content==2){
					obje.content ="发电";
				}else if(obje.content==3){
					obje.content ="关闭";
				}else if(obje.content==4){
					obje.content ="准备";
				}else if(obje.content==""){
					obje.content ="-"; 
				}else{
					obje.content = "异常";
				}
			}else if(obje.alias =="psStatus"){ //定位状态 
				if(obje.content==0){
					obje.content ="有效定位";
				}else if(obje.content==1){
					obje.content ="无效定位";
				}else if(obje.content==""){
					obje.content = "-"; 
				}else{
					obje.content ="异常";
				}
			}else if(obje.alias =="engStatus"){//发动机状态 
				if(obje.content==1){
					obje.content ="启动";
				}else if(obje.content==2){
					obje.content ="关闭";
				}else if(obje.content==""){
					obje.content ="-"; 
				}else{
					obje.content ="异常";
				}
			}else if(obje.alias =="faultLevel"){  //故障等级 
				if(obje.content==0){
					obje.content ="无故障";
				}else if(obje.content==1){
					obje.content ="1级故障";
				}else if(obje.content==2){
					obje.content ="2级故障";
				}else if(obje.content==3){
					obje.content ="3级故障";
				}else if(obje.content==""){
					obje.content ="-"; 
				}else{
					obje.content ="异常";
				}
			}else if(obje.alias.split("_")[0] =="faultTag"){//温度差异报警
				if(obje.content==0){
					obje.content = "正常";
				}else if(obje.content==1){
					obje.content = "报警";
				}else if(obje.content==""){
					obje.content = "-"; 
				}else{
					obje.content = "异常";
				}
			}else if(obje.alias =="fuelCellDcStatus"){ //最高DC/DC状态
				if(obje.content==1){
					obje.content = "工作";
				}else if(obje.content==2){
					obje.content = "断开";
				}else if(obje.content==""){
					obje.content = "-"; 
				}else{
					obje.content = "异常";
				}
			}else{
				obje.content = obje.content
			}
			})
		})
		this.msg = dest.splice(0, dest.length-1);
		console.log(this.msg, 'msg');
	}
	},
}