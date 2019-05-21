<template>
<Collapse accordion style="margin-top:30px;" v-model="value2">
  <Panel name="1">
    摄像头信息
    <p slot="content" class="Devicetype" style="height:200px;  overflow: auto; ">
      <ul>
        <li v-for="(item, i) in cameras" @click="changeCamera(item)" :key="item.id" :label="item.channel">
          <Icon type="social-apple"></Icon>
          <span>{{"IPCamera"+item.name +( item.online?" (在线)":" (离线)")}}</span>
        </li>
      </ul>
    </p>
  </Panel>
  <Panel name="2">
    屏幕类型
    <p slot="content" class="Devicetype">
      <ul>
        <li @click="changeCameraType('1')">
          <Icon type="social-apple"></Icon>
          <span>1x1</span>
        </li>
        <li @click="changeCameraType('2')">
          <Icon type="social-apple"></Icon>
          <span>2x2</span>
        </li>
        <li @click="changeCameraType('3')">
          <Icon type="social-apple"></Icon>
          <span>3x3</span>
        </li>
        <li @click="changeCameraType('4')">
          <Icon type="social-apple"></Icon>
          <span>4x4</span>
        </li>
      </ul>
    </p>
  </Panel>
  <!-- <Panel name="3">
    巡检点位
    <p slot="content">
      <RadioGroup v-model="vertical2" vertical>
        <Radio label="point">
          <Icon type="social-apple"></Icon>
          <span>点位</span>
        </Radio>
      </RadioGroup>
    </p>
  </Panel> -->
</Collapse>
</template>
<script>
export default {
  props: {
    cameras: {
      type: Array,
      default () {
        return [{
          id: '1',
          name: '地下一层01',
          online: true,
          oChannels: "1"
        }, {
          id: '2',
          name: '地下一层02',
          online: true,
          oChannels: "2"
        }, ]
      }
    }
  },
  data() {
    return {
      value2: "1",
      vertical2: 'point',
      vertical1: '',
      vertical: '',

    }
  },
  methods: {
    changeCamera(item) {
      console.log(item, "ddddddddddddd");
      this.$emit("on-click", item);
    },
    changeCameraType(item) {
      console.log(item)
      this.$emit("click-type", item)
    }
  }

}
</script>
<style>
#big_video .Devicetype::-webkit-scrollbar {
  width: 8px;
}

#big_video .Devicetype::-webkit-scrollbar-track {
  background-color: #fff;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

#big_video .Devicetype::-webkit-scrollbar-thumb {
  background-color: #535353;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

#big_video li {
  cursor: pointer;
  cursor: hand;
  list-style-type: none;
  padding: 5px 5px 5px 5px;
}

#big_video .ivu-collapse>.ivu-collapse-item.ivu-collapse-item-active>.ivu-collapse-header {
  border-bottom: 1px solid #2db7f5 !important;
}

#big_video .ivu-collapse {
  background-color: rgba(0, 0, 0, 0) !important;
  border: 1px solid #2db7f5 !important;
}

#big_video .ivu-collapse>.ivu-collapse-item {
  border-top: 1px solid #2db7f5 !important;
}

#big_video .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header {
  color: #5bf4fd !important;
}

#big_video .ivu-collapse-content {
  color: #5bf4fd !important;
  padding: 0 16px;
  background-color: rgba(0, 0, 0, 0) !important;
}
</style>
