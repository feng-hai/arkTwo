
export default {
  mounted() {
    this.websocketFunc();  //实时推送信息
  },
  computed: {
    ...mapGetters([
      'getWebscoket'
  ])
  },
  watch: {
    getWebscoket(nv, ov){
      console.log(nv, 'nv');
      this.websocketFunc();
    }
  },
methods: {
// 实时推送信息
websocketFunc(){
  let dyArrTmp = [];
  let wdArrTmp = [];
  let infor = {};
  let _this = this;
    data.forEach(function(obj, i){
    if(obj.alias == 'tempItems1') {
      wdArrTmp = obj.value.split(",");
    }else if(obj.alias == 'batteryPackageItems1') {
      dyArrTmp = obj.value.split(",");
    }else if(obj.alias == 'vehicleState') {
        infor.vehicleState = obj.value;
    }else if(obj.alias == 'SOC') {
        infor.SOCStyle = "state-sign-" +  _this.getAlarmGrade(obj.alias,obj.value);
        infor.SOC = _this.numberFormatter(obj.value,2);
    }else if(obj.alias == 'insulationResistance') {
        infor.insulationResistanceStyle = "state-sign-" +  _this.getAlarmGrade(obj.alias,obj.value);
        infor.insulationResistance = _this.numberFormatter(obj.value,2);
    }else if(obj.alias == 'voltage1') {
      infor.totalVoltageStyle = "state-sign-" +  _this.getAlarmGrade(obj.alias,obj.value);
        infor.totalVoltage = _this.numberFormatter(obj.value,3);
    }else if(obj.alias == 'current1') {
      infor.totalCurrentStyle = "state-sign-" +  _this.getAlarmGrade(obj.alias,obj.value);
        infor.totalCurrent = _this.numberFormatter(obj.value,2);
    }else if(obj.alias == 'maxBatteryVoltageCode') {
        infor.maxBatteryVoltageCode = obj.value;
    }else if(obj.alias == 'maxBatteryVoltage') {
        infor.maxBatteryVoltageStyle = "alarm-" +  _this.getAlarmGrade(obj.alias,obj.value);
        infor.maxBatteryVoltage = _this.numberFormatter(obj.value,3);
    }else if(obj.alias == 'minBatteryVoltageCode') {
        infor.minBatteryVoltageCode = obj.value;
    }else if(obj.alias == 'minBatteryVoltage') {
        infor.minBatteryVoltageStyle = "alarm-" +  _this.getAlarmGrade(obj.alias,obj.value);
        infor.minBatteryVoltage = _this.numberFormatter(obj.value,3);
    }else if(obj.alias == 'maxTemperatureCode') {
        infor.maxTemperatureCode = obj.value;
    }else if(obj.alias == 'maxTemperature') {
        infor.maxTemperatureStyle = "alarm-" +  _this.getAlarmGrade(obj.alias,obj.value);
        infor.maxTemperature = _this.numberFormatter(obj.value,2);
    }else if(obj.alias == 'minTemperatureCode') {
        infor.minTemperatureCode = obj.value;
    }else if(obj.alias == 'minTemperature') {
        infor.minTemperatureStyle = "alarm-" +  _this.getAlarmGrade(obj.alias,obj.value);
        infor.minTemperature = _this.numberFormatter(obj.value,2);
    }else if(obj.alias == 'subTemperature') {
        infor.subTemperatureStyle = "alarm-" +  _this.getAlarmGrade(obj.alias,obj.value);
        infor.subTemperature = _this.numberFormatter(obj.value,2);
    }else if(obj.alias == 'subBatteryVoltage') {
      infor.subBatteryVoltageStyle = "alarm-" +  _this.getAlarmGrade(obj.alias,obj.value);
        infor.subBatteryVoltage = _this.numberFormatter(obj.value,3);
    }else if(obj.alias == 'tempItemsAve') {
        infor.tempItemsAve = _this.numberFormatter(obj.value,2);
    }else if(obj.alias == 'batteryPackageItemsAve') {
        infor.batteryPackageItemsAve = _this.numberFormatter(obj.value,3);
    }else if(obj.alias == 'DATIME_RX') {
       _this.reportTime = obj.value;//初始化时间
    }
  });
    _this.refreshBatteryStyle(dyArrTmp,wdArrTmp);
    _this.dtdyArr =  dyArrTmp;
    _this.wdArr = wdArrTmp;
    _this.information = infor;
    _this.$store.dispatch('getDtdyWdArr',{ dyArrTmp, wdArrTmp});
},

  }
}
