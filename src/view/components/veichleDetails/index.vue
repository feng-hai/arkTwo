<template>
<div>
  <!-- <div class="goodshow" style="height: calc(100vh - 140px); overflow-y: scroll; position: relative;"> -->
  <div id="webscoket" style="overflow: hidden;">
    <data-webscoket :dom="doms"></data-webscoket>
  </div>
  <div id="dataDetails" style="overflow: hidden;margin-top: 10px;">
    <data-details></data-details>
  </div>
  <div id="dataBack" style="overflow: hidden; height: 565px;margin-top: 10px;">
    <data-back></data-back>
  </div>
  <Card id="batteries" style="margin-top: 10px;">
    <p slot="title">电池组</p>
    <battery-arr></battery-arr>
  </Card>
  <!-- </div> -->
  <div style="position: absolute; top: 140px; right: 50px;">
    <Anchor container=".content-wrapper" :scroll-offset="offsetTop" show-ink>
      <AnchorLink href="#webscoket" title="实时推送" />
      <AnchorLink href="#dataDetails" title="数据明细" />
      <AnchorLink href="#dataBack" title="轨迹回放" />
      <AnchorLink href="#batteries" style="top: 100px;" title="电池组" />
    </Anchor>
  </div>
</div>
</template>

<script>
import dataWebscoket from '../data_webscoket/index';
import dataDetails from '../data-details/index'
import dataBack from '_c/data_back/index'
import batteryArr from '../gaodeMap/index'
import {
  getParams2,
  // toJson,
  // toStr
} from '@/libs/util'
export default {
  name: 'veichle_details',
  data() {
    return {
      doms: 'doms',
      offsetTop: 0,
      ws: null,
    }
  },
  components: {
    dataWebscoket,
    dataDetails,
    dataBack,
    batteryArr,
  },
  mounted() {
    this.websocketFunc();
  },
  methods: {
    websocketFunc() {
      let urlInfo = window.location.href;
      var id = getParams2(urlInfo);
      let _this = this;
      // this.$next
      setTimeout(function() {
        _this.ws = new WebSocket("ws://58.213.131.5/ws"); //建立连接
        _this.ws.onopen = function() {
          console.log(id, 'idddddddddddd');
          _this.ws.send('{"pageId":"1","vehicleId":"+ id +"}');
        }
        _this.ws.onmessage = function(e) {
          console.log(e, 'eeeeeeeeeeeeeeeeeeeee');

          let jsonObj = JSON.parse(e.data); //解析json数据--》对象
          if (jsonObj.type == 1) {
            _this.$store.dispatch('getWebscokets', jsonObj.canModel.list)
          }
          //内存释放
          jsonObj = null;
          e = null;
        }
        _this.ws.onclose = function() {
          _this.ws = null;
          _this.websocketFunc();
        }
      }, 10)
    }
  },
}
</script>

<style scoped>
.goodshow>>>.content-wrapper {
  overflow: hidden !important;
}
</style>
