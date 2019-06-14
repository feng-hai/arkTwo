[{
    "value": "1",
    "label": "主体"
  },
  {
    "value": "2",
    "label": "非主体"
  }
]

function(fun, params, callback, vm) {
  fun({

  }).then(res => {

  })
  callback(params.row.vin);

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
