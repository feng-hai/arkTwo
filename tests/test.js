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
    "url": "/firemen/domain/"+params.row.super_unid,
    "method": "get"
  }).then(function(res) {

    callback(res.data.name);
  })
}

function(fun, params, callback, vm) {
  fun({
    "url": "/firemen/domain/"+params.row.domain_unid,
    "method": "get"
  }).then(function(res) {

    callback(res.data.name);
  })
}
