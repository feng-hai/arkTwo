<template>
<div>
  <Input v-model="value5" type="textarea" :rows="4" placeholder="请输入json字符串..." />
  <Checkbox class="padding" v-model="single">格式化</Checkbox>
  <Button class="padding" type="primary" @click="toJsonStr">
            <Icon type="ios-arrow-back"></Icon>
            json转json字符串
        </Button>
  <Button class="padding" type="primary" @click="toJson">
            json字符串转json
            <Icon type="ios-arrow-forward"></Icon>
        </Button>

  <Input v-model="value6" type="textarea" :rows="4" placeholder="请输入json对象" />
  <div class="error">
    {{error}}
  </div>
</div>
</template>
<script>
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
    toJson() {
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
