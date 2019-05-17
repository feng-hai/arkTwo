<template>
<Collapse accordion style="margin-top:30px;" v-model="value2">
  <Panel name="1">
    探测器

    <p slot="content" class="Devicetype" style="height:200px;  overflow: auto; ">
      <RadioGroup v-model="vertical" vertical>
        <Radio label="all">
          <Icon type="social-apple"></Icon>
          <span>全部类型</span>
        </Radio>
        <Radio label="apple">
          <Icon type="social-apple"></Icon>
          <span>剩余电流常规模块</span>
        </Radio>
        <Radio label="android">
          <Icon type="social-android"></Icon>
          <span>压力传感器</span>
        </Radio>
        <Radio label="windows">
          <Icon type="social-windows"></Icon>
          <span>消火栓泵手自动模块</span>
        </Radio>
        <Radio label="android2">
          <Icon type="social-android"></Icon>
          <span>消火栓泵启停模块</span>
        </Radio>
        <Radio label="windows3">
          <Icon type="social-windows"></Icon>
          <span>压力传感器</span>
        </Radio>

        <Radio label="windows4">
          <Icon type="social-windows"></Icon>
          <span>消防炮泵手自动模块</span>
        </Radio>
        <Radio label="android5">
          <Icon type="social-android"></Icon>
          <span>消防炮泵启停模块</span>
        </Radio>
        <Radio label="windows6">
          <Icon type="social-windows"></Icon>
          <span>喷淋泵手自动模块</span>
        </Radio>
        <Radio label="windows7">
          <Icon type="social-windows"></Icon>
          <span>喷淋泵启停模块</span>
        </Radio>
        <Radio label="android8">
          <Icon type="social-android"></Icon>
          <span>常闭式防火门监控模块</span>
        </Radio>
        <Radio label="windows9">
          <Icon type="social-windows"></Icon>
          <span>排烟风机手自动模块</span>
        </Radio>
        <Radio label="windows10">
          <Icon type="social-windows"></Icon>
          <span>排烟风机启停模块</span>
        </Radio>
        <Radio label="android11">
          <Icon type="social-android"></Icon>
          <span>送风机启停模块</span>
        </Radio>
        <Radio label="windows12">
          <Icon type="social-windows"></Icon>
          <span>电梯迫降模块</span>
        </Radio>
        <Radio label="android13">
          <Icon type="social-android"></Icon>
          <span>烟感</span>
        </Radio>
        <Radio label="windows14">
          <Icon type="social-windows"></Icon>
          <span>温感</span>
        </Radio>
        <Radio label="android15">
          <Icon type="social-android"></Icon>
          <span>手报</span>
        </Radio>
        <Radio label="windows16">
          <Icon type="social-windows"></Icon>
          <span>消报</span>
        </Radio>
        <Radio label="android17">
          <Icon type="social-android"></Icon>
          <span>烟火视频分析探头</span>
        </Radio>
        <Radio label="windows18">
          <Icon type="social-windows"></Icon>
          <span>液位传感器</span>
        </Radio>
        <Radio label="android19">
          <Icon type="social-android"></Icon>
          <span>声光报警器</span>
        </Radio>
        <Radio label="windows20">
          <Icon type="social-windows"></Icon>
          <span>稳压泵手自动模块</span>
        </Radio>
        <Radio label="android21">
          <Icon type="social-android"></Icon>
          <span>稳压泵启停模块</span>
        </Radio>
        <Radio label="windows22">
          <Icon type="social-windows"></Icon>
          <span>常闭式排烟阀启闭模块（排</span>
        </Radio>
        <Radio label="android23">
          <Icon type="social-android"></Icon>
          <span>报警主机</span>
        </Radio>
        <Radio label="windows24">
          <Icon type="social-windows"></Icon>
          <span>智能网关SGW-LA1211</span>
        </Radio>
        <Radio label="android25">
          <Icon type="social-android"></Icon>
          <span>压力开关</span>
        </Radio>
        <Radio label="windows26">
          <Icon type="social-windows"></Icon>
          <span>应急广播播放器</span>
        </Radio>
        <Radio label="android27">
          <Icon type="social-android"></Icon>
          <span>280°常开式排烟防火阀启闭</span>
        </Radio>
        <Radio label="windows28">
          <Icon type="social-windows"></Icon>
          <span>电磁阀</span>
        </Radio>
        <Radio label="android29">
          <Icon type="social-android"></Icon>
          <span>气体灭火控制器启停模块</span>
        </Radio>
        <Radio label="windows30">
          <Icon type="social-windows"></Icon>
          <span>信号蝶阀</span>
        </Radio>
        <Radio label="android31">
          <Icon type="social-android"></Icon>
          <span>烟感温感复合探测器</span>
        </Radio>
        <Radio label="windows32">
          <Icon type="social-windows"></Icon>
          <span>应急照明控制模块</span>
        </Radio>
        <Radio label="android33">
          <Icon type="social-android"></Icon>
          <span>水流指示器</span>
        </Radio>
        <Radio label="windows34">
          <Icon type="social-windows"></Icon>
          <span>强切</span>
        </Radio>
        <Radio label="android35">
          <Icon type="social-android"></Icon>
          <span>输入输出模块</span>
        </Radio>
        <Radio label="windows36">
          <Icon type="social-windows"></Icon>
          <span>输入模块</span>
        </Radio>
        <Radio label="android37">
          <Icon type="social-android"></Icon>
          <span>排烟天窗开闭模块</span>
        </Radio>
        <Radio label="windows38">
          <Icon type="social-windows"></Icon>
          <span>强启</span>
        </Radio>
        <Radio label="android39">
          <Icon type="social-android"></Icon>
          <span>输出模块</span>
        </Radio>
        <Radio label="windows">
          <Icon type="social-windows"></Icon>
          <span>nb压力传感器</span>
        </Radio>
        <Radio label="android">
          <Icon type="social-android"></Icon>
          <span>电气火灾状态探测器器（德</span>
        </Radio>
      </RadioGroup>
    </p>

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
  data() {
    return {
      value2: "1",
      vertical2: 'point',
      vertical1: '',
      vertical: ''
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

#big_layers .ivu-collapse>.ivu-collapse-item.ivu-collapse-item-active>.ivu-collapse-header {
  border-bottom: 1px solid #2db7f5 !important;
}

#big_layers .ivu-collapse {
  background-color: rgba(0, 0, 0, 0) !important;
  border: 1px solid #2db7f5 !important;
}

#big_layers .ivu-collapse>.ivu-collapse-item {
  border-top: 1px solid #2db7f5 !important;
}

#big_layers .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header {
  color: #5bf4fd !important;
}

#big_layers .ivu-collapse-content {
  color: #5bf4fd !important;
  padding: 0 16px;
  background-color: rgba(0, 0, 0, 0) !important;
}
</style>
