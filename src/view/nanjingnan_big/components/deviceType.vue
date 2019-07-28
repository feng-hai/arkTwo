<template>
  <Collapse accordion style="margin-top:30px;" v-model="value2">
    <Panel name="1">
      探测器
      <div slot="content">
        <p>设备名称</p>
        <p class="editP">
          <Input
            class="big_input"
            v-model="searchItem.name"
            placeholder="请输入设备名称"
            style="width:100%"
          />
        </p>
        <p>图标类型</p>
        <p class="editP">
          <Select style="width:100%" v-model="searchItem.type">
            <Option
              v-for="item in pointValueTypeList"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
        </p>
        <p class="editP">
          <Button type="primary" @click="showAll">查询</Button>
          <Button type="primary" style="margin-left:5px;" @click="resetSearch">重置</Button>
        </p>
      </div>
    </Panel>
    <Panel name="2">
      监控视频
      <p slot="content">
        <RadioGroup v-model="vertical1" vertical>
          <Radio label="qiuji">
            <Icon type="social-apple"></Icon>
            <span>球机</span>
          </Radio>
          <Radio label="qiangji">
            <Icon type="social-apple"></Icon>
            <span>枪机</span>
          </Radio>
          <Radio label="other">
            <Icon type="social-apple"></Icon>
            <span>其他</span>
          </Radio>
        </RadioGroup>
      </p>
    </Panel>
    <Panel name="3">
      巡检点位
      <p slot="content">
        <RadioGroup v-model="vertical2" vertical>
          <Radio label="point">
            <Icon type="social-apple"></Icon>
            <span>点位</span>
          </Radio>
        </RadioGroup>
      </p>
    </Panel>
  </Collapse>
</template>
<script>
export default {
  data () {
    return {
      value2: '1',
      vertical2: 'point',
      vertical1: '',
      vertical: '',
      searchItem: {
        name: '',
        type: ''
      },
      pointValueTypeList: [
        {
          label: '消火栓',
          value: '1',
          uri: '/img/e-1.png'
        },
        {
          label: '自动水炮',
          value: '2',
          uri: '/img/l-1.png'
        },
        {
          label: '电气火灾监控',
          value: '3',
          uri: '/img/a-1.png'
        },
        {
          label: '火灾报警监控',
          value: '4',
          uri: '/img/c-1.png'
        },
        {
          label: '气体灭火',
          value: '5',
          uri: '/img/d-1.png'
        },
        {
          label: '温感',
          value: '6',
          uri: '/img/f-1.png'
        },
        {
          label: '消防泵',
          value: '7',
          uri: '/img/f-1.png'
        },
        {
          label: '消防给水及灭火',
          value: '8',
          uri: '/img/i-1.png'
        },
        {
          label: '消防水箱',
          value: '9',
          uri: '/img/g-1.png'
        },
        {
          label: '烟感',
          value: '10',
          uri: '/img/m-1.png'
        },
        {
          label: '应急疏散指示',
          value: '11',
          uri: '/img/n-1.png'
        },
        {
          label: '自动喷淋',
          value: '12',
          uri: '/img/j-1.png'
        },
        {
          label: '自动喷淋灭火',
          value: '13',
          uri: '/img/k-1.png'
        }
      ]
    }
  },
  methods: {
    resetSearch () {
      this.searchItem = {
        name: '',
        type: ''
      }
    },
    showAll () {
      var that = this
      this.$emit('searchItem', this.searchItem)
      // this.data.type = 0;
      // console.log(this.searchItem, "查询内容");
      // this.data.dataContent = this.tempData.filter(item => {
      //   if (that.searchItem.name != "" && that.searchItem.type != "") {
      //     if (item.name.indexOf(that.searchItem.name) != -1 && item.type == that.searchItem.type) {
      //       return true;
      //     } else {
      //       return false;
      //     }
      //   } else if (that.searchItem.name && that.searchItem.name != "" || that.searchItem.type && that.searchItem.type != "") {
      //     var temp = false;
      //     if (that.searchItem.name != "" && item.name.indexOf(that.searchItem.name) != -1) {
      //       temp = true;
      //     }
      //     console.log(temp, item.type, that.searchItem.type, "dfsfsfs")
      //     if (item.type == that.searchItem.type) {
      //       temp = true;
      //     }
      //
      //     return temp;
      //   }
      //
      //   return true;
      // });
    }
  }
}
</script>
<style>
.Devicetype::-webkit-scrollbar {
  width: 8px;
}

.Devicetype::-webkit-scrollbar-track {
  background-color: #fff;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

.Devicetype::-webkit-scrollbar-thumb {
  background-color: #535353;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

#big_layers
  .ivu-collapse
  > .ivu-collapse-item.ivu-collapse-item-active
  > .ivu-collapse-header {
  border-bottom: 1px solid #2db7f5 !important;
}

#big_layers .ivu-collapse-content-box .editP {
  padding: 10px 0px 10px 0px;
}

#big_layers .ivu-collapse-content-box .ivu-input {
  background-color: rgba(0, 0, 0, 0) !important;
  border: 1px solid #5bf4fd !important;
  color: #2d8cf0 !important;
}

#big_layers .ivu-collapse-content-box .ivu-select-selection {
  background-color: rgba(0, 0, 0, 0) !important;
  border: 1px solid #5bf4fd !important;
}

#big_layers .ivu-collapse-content-box .ivu-select-dropdown {
  background-color: rgba(0, 0, 0, 0.9) !important;
  border: 1px solid #5bf4fd !important;
}

#big_layers .ivu-collapse-content-box .ivu-select-item {
  color: #5bf4fd !important;
}

#big_layers .ivu-collapse-content-box .ivu-select {
  color: #2d8cf0 !important;
}

#big_layers .ivu-collapse-content-box .ivu-select-item-focus {
  background: #2d8cf0 !important;
}

#big_layers .ivu-select-item:hover {
  background: #2d8cf0 !important;
}

#big_layers .ivu-select-placeholder {
  color: #2d8cf0 !important;
}

#big_layers .ivu-select-arrow {
  color: #2d8cf0;
}

#big_layers .ivu-input-default {
  color: #2d8cf0 !important;
}

#big_layers .ivu-collapse {
  background-color: rgba(0, 0, 0, 0) !important;
  border: 1px solid #2db7f5 !important;
}

#big_layers .ivu-collapse > .ivu-collapse-item {
  border-top: 1px solid #2db7f5 !important;
}

#big_layers .ivu-collapse > .ivu-collapse-item > .ivu-collapse-header {
  color: #5bf4fd !important;
}

#big_layers .ivu-collapse-content {
  color: #5bf4fd !important;
  padding: 0 16px;
  background-color: rgba(0, 0, 0, 0) !important;
}

#big_layers input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #2d8cf0;
  /*font-size: 16px;*/
}

#big_layers input:-moz-placeholder,
textarea:-moz-placeholder {
  color: #2d8cf0;
  /*font-size: 16px;*/
}

#big_layers input::-moz-placeholder,
textarea::-moz-placeholder {
  color: #2d8cf0;
  /*font-size: 16px;*/
}

#big_layers input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  color: #2d8cf0;
  /*font-size: 16px;*/
}
</style>
