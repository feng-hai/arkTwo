[{
    "value": "1",
    "label": "主体"
  },
  {
    "value": "2",
    "label": "非主体"
  }
]
[{
  "value": true,
  "label": "已完成"
},
{
  "value": false,
  "label": "未完成"
}
]


[{
"value": true,
"label": "隐藏"
},
{
"value": false,
"label": "显示"
}
]


	
[{ "value": 0, "label": "主页面" }, { "value": 1, "label": "子页面" }, { "value": 2, "label": "其他页面类型1" }, { "value": 3, "label": "其他页面类型2" }  ]

function(fun, params, callback, vm) {
  fun({

  }).then(res => {

  })
  callback(params.row.vin);

}
function(fun,params,callback,vm)
{
  callback(params.row.)
}

//根据id获取Text
function(fun, params, callback, vm) {
  fun({
    "url": "/firemen/domain/" + params.row.super_unid,
    "method": "get"
  }).then(function(res) {

    callback(res.data.name);
  })
}

function(fun, params, callback, vm) {
  fun({
    "url": "/firemen/domain/" + params.row.domain_unid,
    "method": "get"
  }).then(function(res) {

    callback(res.data.name);
  })
}

function(fun, params, callback, vm) {
  fun({
    "url": "/firemen/asset/" + params.row.unid,
    "method": "get"
  }).then(function(res) {

    callback(res.data.name);
  })
}
function(fun, val, callback, vm) {
  fun({
    "url": "/firemen/asset",
    "method": "get",
    "params": {
      "q": val,
      "page_id": 0,
      "page_size": 10,
      "flag_ava": true
    }
  }).then(function(res) {
    var items = res.data.map(function(item) {
      return {
        label: item.name,
        value: item.unid
      }
    });
    callback(items);
  })
}

function(fun, params, callback, vm) { callback(params.row.name); }

function(fun, params, callback, vm) { 
   if(params.row.checkpoint)
   {
    callback(params.row.checkpoint.name);
   }
 }

 function(fun, params, callback, vm) {
   console.log(params);
  fun({
    "url": "/legacy/security/openid_privilege_map/"+params.row.unid+"/privilege",
    "method": "get"
  }).then(function(res) {
    var names=res.data.map(item=>{
      return item.name;
    });
    callback(names.join(','));
  }).catch(err=>{
    callback("錯誤");
  })
}
