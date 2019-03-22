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

function(fun, params, callback, vm) {
  const id = params.row.unid;
  const route = {
    "name": 'veichle_details',
    "params": {
      "id": id,
      "VIN": params.row.vin
    },
    "meta": {
      "title": `动态路由-${id}`
    }
  };
  vm.$router.push(route)
}


//格式化查询日期
function(val, callback) {
  if (Array.isArray(val) && val.length == 2) {
    var start = val[0];
    var end = val[1];
    var item = {
      date_from: start.replace(" ", "T"),
      date_to: end.replace(" ", "T")
    };
    callback(item);
  } else {
    callback({});
  }
}

function(fun, params, callback, vm) {
  const id = params.row.entity_unid;
  const route = {
    "name": 'veichle_details',
    "params": {
      "id": id,
      "VIN": params.row.vin
    },
    "meta": {
      "title": `动态路由-${id}`
    }
  };
  vm.$router.push(route)
}


//更加车辆id获取VIN号
function(fun, params, callback, vm) {
  callback(params.row.vin);
}
//车辆自动完成
function(fun, val, callback, vm) {
  fun({
    "url": "/bigger/vehicle/info",
    "method": "get",
    "params": {
      "q": val,
      "page_id": 0,
      "page_size": 10
    }
  }).then(res => {
    var items = res.data.map(item => {
      return {
        label: item.vin,
        value: item.vin
      }
    });
    callback(items);
  })
}

[{
  "label": "大于",
  "value": ">"
}, {
  "label": "小于",
  "value": "<"
}, {
  "label": "等于",
  "value": "="
}]
[{
  "label": "1级",
  "value": "1"
}, {
  "label": "2级",
  "value": "2"
}, {
  "label": "3级",
  "value": "3"
}]

[{
  "label": "最高温度",
  "value": "maxTemperature"
}, {
  "label": "单体电压差值",
  "value": "subBatteryVoltage"
}, {
  "label": "最高单体电压",
  "value": "maxBatteryVoltage"
}]



function(fun, params, callback, vm) {
  const id = params.row.unid;
  const route = {
    "name": 'veichle_details',
    "params": {
      "id": id,
      "VIN": params.row.vin
    },
    "meta": {
      "title": `动态路由-${id}`
    }
  };
  vm.$router.push(route);
}
//格式化车辆状态
function(fun, val, callback, vm) {
  var items = val.entry;
  var temp = items.find(function(item) {
    if (item.key == "ACTIVE_STATUS") {
      return true;
    }
    return false;
  });
  var title = '';
  if (temp.value == 1) {
    title = '<a>充电</a>';
  } else if (temp.value == 2) {
    title = "<font color='#0000FF'>在线</font>"
  } else {
    title = "离线"
  };
  callback(title);

}


function(fun, params, callback, vm) {
  const id = params.row.unid;
  const route = {
    "name": "veichle_details",
    "params": {
      "id": id,
      "VIN": params.row.vin
    },
    "meta": {
      "title": "动态路由-${id}"
    }
  };
  vm.$router.push(route);
}



function(fun, val, callback, vm) {
  fun({
    "url": "/bigger/vehicle/info",
    "method": "get",
    "params": {
      "q": val,
      "page_id": 0,
      "page_size": 10
    }
  }).then(function(res) {
    var items = res.data.map(function(item){
      return {
        label: item.vin,
        value: item.vin
      }
    });
    callback(items);
  })
}
