<template>
<div>
  <Input v-model="value5" type="textarea" :rows="4" placeholder="请输入json字符串..." />
  <Checkbox class="padding" v-model="single">格式化</Checkbox>
  <Button class="padding" type="primary" @click="toJsonStr">
            <Icon type="ios-arrow-back"></Icon>
            json转json字符串
        </Button>
        <Button class="padding" type="primary" @click="toJsonStr1">
                  <Icon type="ios-arrow-back"></Icon>
                  json转json字符串(包含函数)
              </Button>
  <Button class="padding" type="primary" @click="toJson2">
            json字符串转json
            <Icon type="ios-arrow-forward"></Icon>
        </Button>
        <Button class="padding" type="primary" @click="toJson1">
                  json字符串转json包含函数
                  <Icon type="ios-arrow-forward"></Icon>
              </Button>

  <Input v-model="value6" type="textarea" :rows="4" placeholder="请输入json对象" />
  <div class="error">
    {{error}}
  </div>
</div>
</template>
<script>
import {
  getParams2,
  toJson,
  toStr
} from '@/libs/util'
export default {
  data() {
    return {
      value5: '',
      value6: '',
      single: false,
      error: ''
    }
  },
  methods: {
    toJson2() {
      this.error = ""
      try {
        if (this.single) {
          this.value6 = this.formatJson(JSON.parse(this.value5.replace(/\ +/g, "").replace(/[\r\n]/g, "")));
        } else {
          this.value6 = JSON.parse(this.value5.replace(/\ +/g, "").replace(/[\r\n]/g, ""));
        }
      } catch (ex) {
        this.error = ex.message + ":" + this.value5.replace(/\ +/g, "").replace(/[\r\n]/g, "")
      }
    },
    toJson1() {
      this.error = ""
      try {
        if (this.single) {
          this.value6 = this.formatJson(toJson(this.value5.replace(/\ +/g, "").replace(/[\r\n]/g, "")));
        } else {
          this.value6 = JSON.parse(this.value5.replace(/\ +/g, "").replace(/[\r\n]/g, ""));
        }
      } catch (ex) {
        this.error = ex.message + ":" + this.value5.replace(/\ +/g, "").replace(/[\r\n]/g, "")
      }
    },
    toJsonStr() {
      this.error = ""
      try {
        if (this.single) {
          this.value5 = this.formatJson(JSON.stringify(this.value6.replace(/\ +/g, "").replace(/[\r\n]/g, "")));

        } else {
          this.value5 = JSON.stringify(this.value6.replace(/\ +/g, "").replace(/[\r\n]/g, ""));
        }
      } catch (ex) {
        this.error = ex.message + ":" + this.value6.replace(/\ +/g, "").replace(/[\r\n]/g, "")
      }
    },
    toJsonStr1() {
      this.error = ""
      try {
        if (this.single) {
          this.value5 = this.formatJson(toStr(this.value6.replace(/\ +/g, "").replace(/[\r\n]/g, "")));

        } else {
          this.value5 = toStr(this.value6.replace(/\ +/g, "").replace(/[\r\n]/g, ""));
        }
      } catch (ex) {
        this.error = ex.message + ":" + this.value6.replace(/\ +/g, "").replace(/[\r\n]/g, "")
      }
    },
    // 工具方法
    formatJson(json, options) {
      var reg = null,
        formatted = '',
        pad = 0,
        PADDING = '    '; // one can also use '\t' or a different number of spaces
      // optional settings
      options = options || {};
      // remove newline where '{' or '[' follows ':'
      options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
      // use a space after a colon
      options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;

      // begin formatting...

      // make sure we start with the JSON as a string
      if (typeof json !== 'string') {
        json = JSON.stringify(json);
      }
      // parse and stringify in order to remove extra whitespace
      json = JSON.parse(json);
      json = JSON.stringify(json);

      // add newline before and after curly braces
      reg = /([\{\}])/g;
      json = json.replace(reg, '\r\n$1\r\n');

      // add newline before and after square brackets
      reg = /([\[\]])/g;
      json = json.replace(reg, '\r\n$1\r\n');

      // add newline after comma
      reg = /(\,)/g;
      json = json.replace(reg, '$1\r\n');

      // remove multiple newlines
      reg = /(\r\n\r\n)/g;
      json = json.replace(reg, '\r\n');

      // remove newlines before commas
      reg = /\r\n\,/g;
      json = json.replace(reg, ',');

      // optional formatting...
      if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
        reg = /\:\r\n\{/g;
        json = json.replace(reg, ':{');
        reg = /\:\r\n\[/g;
        json = json.replace(reg, ':[');
      }
      if (options.spaceAfterColon) {
        reg = /\:/g;
        json = json.replace(reg, ': ');
      }

      json.split('\r\n').forEach(function(node, index) {
        var i = 0,
          indent = 0,
          padding = '';

        if (node.match(/\{$/) || node.match(/\[$/)) {
          indent = 1;
        } else if (node.match(/\}/) || node.match(/\]/)) {
          if (pad !== 0) {
            pad -= 1;
          }
        } else {
          indent = 0;
        }

        for (i = 0; i < pad; i++) {
          padding += PADDING;
        }
        formatted += padding + node + '\r\n';
        pad += indent;
      });
      return formatted;
    }
  }
}



var ObjectToStringParser = {
  stringify: function(obj) {
    return JSON.stringify(obj, function(key, value) {
      var fnBody;
      if (value instanceof Function || typeof value == 'function') {
        fnBody = value.toString();
        if (fnBody.length < 8 || fnBody.substring(0, 8) !== 'function') { //this is ES6 Arrow Function
          return '_NuFrRa_' + fnBody;
        }
        return fnBody;
      }
      if (value instanceof RegExp) {
        return '_PxEgEr_' + value;
      }
      return value;
    });
  },

  parse: function(str, date2obj) {
    var iso8061 = date2obj ?
      /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/ : false;

    return JSON.parse(str, function(key, value) {
      var prefix;

      if (typeof value != 'string') {
        return value;
      }
      if (value.length < 8) {
        return value;
      }

      prefix = value.substring(0, 8);

      if (iso8061 && value.match(iso8061)) {
        return new Date(value);
      }
      if (prefix === 'function') {
        return eval('(' + value + ')');
      }
      if (prefix === '_PxEgEr_') {
        return eval(value.slice(8));
      }
      if (prefix === '_NuFrRa_') {
        return eval(value.slice(8));
      }

      return value;
    });
  }
};

// Test: Pass
var obj = {
  'my-string': {
    func: function(e) {
      console.log(e);
    },
    test:[
    function (h, params, vm)
    {
    var permit = params.permit;
    if (permit.addPermit)
    {
    return
    h('Button', { attrs: { style: 'margin-left:2px' }, props: { confirm: true, title: '你确定要新增吗?' },
    on: {
    'click': function click()
    { vm.$emit('on-add');
    }
    }
    }, '新增');
    }
    },
    function (h, params, vm)
    {
    var permit = params.permit;
    if (permit.deletePermit)
    {
    return h('Button',
    { attrs: { style: 'margin-left:2px' },
    props: { confirm: true, title: '你确定要删除吗?' },
    on:
    { 'click': function click() {
     vm.$emit('on-all-delete'); } }
    }, '批量删除'); } }],
    mix: [
      (e)=> {
        console.log('array', e);
      },
      1,
      2,
      'coco'
    ]
  },
  str: 'potato',
  num: 100
};

// Test: Pass
var objDeep = {
  'my-string': {
    func: function(e) {
      console.log(e);
    },
    mix: [
      function(e) {
        console.log('array', e);
      },
      1,
      2,
      'coco',
      {
        poop: true,
        deep: [
          true,
          {
            pooping: {
              ok: true
            },
            cow: [
              'goat', true, null, undefined
            ]
          }
        ]
      }
    ]
  },
  str: 'potato',
  num: 100
};

console.log('Test 1 - Original:', obj);
console.log('Test 1 - Object To String:',
  ObjectToStringParser.stringify(obj));
 var test=  ObjectToStringParser.parse(ObjectToStringParser.stringify(obj))["my-string"].mix[0]
 console.log('Test 1 - String To Object:',test(0))

console.log('\nTest 2 - Original:', objDeep);
console.log('Test 2 - Object To String:',
  ObjectToStringParser.stringify(objDeep));
console.log('Test 2 - String To Object:',
  ObjectToStringParser.parse(ObjectToStringParser.stringify(objDeep)));

</script>
<style>
.padding {
  margin: 20px;
}

.error {
  margin-top: 20px;
  color: red
}
</style>
