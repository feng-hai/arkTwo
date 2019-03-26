<template>
<div>
  <!-- <div class="goodshow" style="height: calc(100vh - 140px); overflow-y: scroll; position: relative;"> -->
  <div>
    <dase-info-detail :paramsId="paramsId"></dase-info-detail>
  </div>
  <div id="webscoket" style="overflow: hidden;">
    <data-webscoket :getWebscoket="webscoketData" :dom="doms"></data-webscoket>
  </div>

  <div id="dataDetails" style="overflow: hidden;margin-top: 10px;">
    <data-details :getWebscoket="webscoketData" :paramsId="paramsId"></data-details>
  </div>

  <Card id="batteries" style="margin-top: 10px;">
    <p slot="title">电池组</p>
    <battery-arr :getWebscoket="webscoketData" :paramsId="paramsId"></battery-arr>
  </Card>

  <div id="dataBack" style="overflow: hidden; height: 565px;margin-top: 10px;">
    <data-back :paramsId="paramsId"></data-back>
  </div>

  <div id="history">
    <vehicleHistoryPage :paramsId="paramsId"></vehicleHistoryPage>
  </div>
  <!-- </div> -->
  <div style="position: absolute; top: 140px; right: 50px;">
    <Anchor container=".content-wrapper" :scroll-offset="offsetTop" show-ink>
      <AnchorLink href="#webscoket" title="实时推送" />
      <AnchorLink href="#dataDetails" title="数据明细" />
      <AnchorLink href="#batteries" style="top: 100px;" title="电池组" />
      <AnchorLink href="#dataBack" title="轨迹回放" />
      <AnchorLink href="#history" title="历史数据" />
    </Anchor>
  </div>
</div>
</template>

<script>
import daseInfoDetail from '../baseInfoShow/baseInfo_details'
import dataWebscoket from '../data_webscoket/index';
import dataDetails from '../data-details/index'
import dataBack from '_c/data_back/index'
import batteryArr from '../gaodeMap/index'
import vehicleHistoryPage from '@/view/singleVehicleInfo/vehicleHistoryPage'
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
      webscoketData: [],
      paramsId: '',
    }
  },
  components: {
    dataWebscoket,
    dataDetails,
    dataBack,
    batteryArr,
    vehicleHistoryPage,
    daseInfoDetail
  },
  mounted() {
    this.$nextTick(() => {
      this.websocketFunc(); //建立webscoket
    })
  },
  watch: {
    $route(nv, ov) {
      if (nv.params.id === ov.params.id) {
        return;
      } else {
        this.paramsId = this.$route.params.id;
        //初始化webscoket
        this.webscoketData = [];
        this.initWs(this.paramsId);
      }
    },
  },
  methods: {
    websocketFunc() {
      let id = this.$route.params.id;
      // var id = getParams2(urlInfo);
      let _this = this;
      // this.$next
      // setTimeout(() => {
      _this.ws = new WebSocket("ws://58.213.131.5/ws"); //建立连接
      _this.ws.onopen = function() {
        _this.ws.send('{"pageId":"1","vehicleId":"' + id + '"}');
      }
      _this.ws.onmessage = function(e) {
        if (e) {
          let jsonObj = JSON.parse(e.data); //解析json数据--》对象
          if (jsonObj.type == 1) {
            _this.webscoketData = jsonObj.canModel.list;
            // _this.$store.dispatch('getWebscokets', jsonObj.canModel.list)
          }
          //内存释放
          jsonObj = null;
          e = null;
        } else {
          return;
        }

      }
      _this.ws.onclose = function(e) {
        console.log(e, '监听关闭事件')
        // _this.ws.close();
        _this.ws = null;
        // _this.websocketFunc();
      }
      // }, 10)

    },
    //初始化webscoket
    initWs(unid) {
      var _this = this;
      // if(_this.ws.readyState === 1){
      if (_this.ws == null) { // ws连接还没有建立完
        _this.intervalWs = setInterval(function() {
          if (_this.ws != null && _this.ws.readyState === 1) {
            _this.ws.send('{"pageId":"1","vehicleId":"' + unid + '"}');
            clearInterval(_this.intervalWs);
          }
        }, 1000);
      } else {
        _this.ws.send('{"pageId":"1","vehicleId":"' + unid + '"}');
      }
      // }
    },
  },
  beforeDestroy() {
    // console.log('000000000000');
    this.ws = null;
    // this.ws.close();
  }
}
</script>

<style scoped>
.goodshow>>>.content-wrapper {
  overflow: hidden !important;
}
</style>
