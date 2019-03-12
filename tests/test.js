function(fun, val, callback, vm) {
  var items = val.entry;
  items.forEach(item => {
    if (item.key == "ACTIVE_STATUS") {
      var title = '';
      if (item.value == 1) {
        title = '<a>充电</a>';
      } else if (item.value == 2) {
        title = "<font color='#0000FF'>在线</font>"
      } else {
        title = "离线"
      }
      callback(title);
      return;
    }
  })
}


[{
  "label":"大于",
  "value":">"
},{
  "label":"小于",
  "value":"<"
},{
  "label":"等于",
  "value":"="
}]
[{
  "label":"1级",
  "value":"1"
},{
  "label":"2级",
  "value":"2"
},{
  "label":"3级",
  "value":"3"
}]

[{
  "label":"最高温度",
  "value":"maxTemperature"
},{
  "label":"单体电压差值",
  "value":"subBatteryVoltage"
},{
  "label":"最高单体电压",
  "value":"maxBatteryVoltage"
}]
