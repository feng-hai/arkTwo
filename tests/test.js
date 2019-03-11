function(fun, val, callback, vm) {
  fun({
    "url": "bigger/security/privilege",
    "params": {
      "q": val
    },
    "method": 'get'
  }).then(res => {
    let temp = [];
    res.data.forEach(item => {
      temp.push({
        value: item.unid,
        label: item.name
      });
    });
    if (temp.length > 0) {
      callback(temp);
    }
  });
}
