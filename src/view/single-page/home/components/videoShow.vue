<template>
<div id="big_video" >
  <videoTemplate ref="video" @initVideo="initVideo" :split="split" :vwidth="vwidth" :vheight="vheight" :iChannelID="iChannelID" :id="id1"></videoTemplate>
  <drag-drawer v-model="showContainerBDrawer" :width.sync="width1" min-width="30px" :inner="true" :transfer="false" :placement="placementComputed" @on-resize="handleResize" :scrollable="true">
    <videoInfo :cameras="cameras" @on-click="selectCamera" @click-type="selectScreenType">
    </videoInfo>
  </drag-drawer>
  <drag-drawer v-model="showCompanyBDrawer" :width.sync="width2" min-width="30px" :inner="true" :transfer="false" placement="left" :draggable="draggable" @on-resize="handleResize" :scrollable="true">
    <!-- <v-tree ref='tree'style="margin-top:20px; margin-left:20px;" :data='treeData1' :radio="true" :multiple="false" :halfcheck='true' /> -->
  </drag-drawer>
  <ButtonGroup class="buttonType">
    <!-- <Tooltip content="楼层信息" placement="right-start">
      <Button icon="ios-git-network" type="info" class="layersButtonBottom" @click="showCompanyBDrawer = !showCompanyBDrawer"></Button>
    </Tooltip> -->
    <br/>
    <Tooltip content="摄像头信息" placement="right-start">
      <Button icon="ios-switch-outline" class="layersButtonBottom" type="info" @click="showContainerBDrawer = !showContainerBDrawer"></Button>
    </Tooltip><br/>
    <!-- <Tooltip content="列表展示" placement="right-start">
      <Button icon="ios-keypad-outline" class="layersButtonUp layersButtonBottom" type="info" @click="changeTable"></Button>
    </Tooltip><br/>-->
    <Tooltip content="取消监控" placement="right-start">
      <Button icon="ios-map-outline" class="layersButtonUp" type="info" @click="cancelPlay"></Button>
    </Tooltip>
  </ButtonGroup>

</div>
</template>
<script>
import videoTemplate from '_c/video/index.js'
import DragDrawer from '_c/drag-drawer'
import videoInfo from './videoInfo.vue'
import {
  windowHeight
} from '@/libs/util'
export default {
  name: 'videoPage',
  components: {
    videoTemplate,
    DragDrawer,
    videoInfo
  },
  mounted() {

    // this.$nextTick(function() {
    //
    //   console.log(this.width, 'dddddddddddddddddd');
    // })
  },
  created() {
    this.$nextTick(function(){
      this.vwidth = $("#big_video").width();
    })

  },
  data() {
    return {
      iChannelID: 3,
      split: "4",
      id1: "divPlugin1",
      showMapBDrawer: true,
      showCompanyBDrawer: false,
      showContainerBDrawer: false,
      showTableBDrawer: false,
      showBDrawer3: false,
      width1: 400,
      width2: 400,
      placement: false,
      draggable: true,
      vwidth: null,
      vheight: windowHeight() - 120,
      cameras: [] //摄像头信息
    }
  },
  methods: {
    handleResize() {

    },
    changeMap() {
      this.showTableBDrawer = false;
      this.showMapBDrawer = true;

    },
    changeTable() {
      this.showTableBDrawer = true;
      this.showMapBDrawer = false;
    },
    selectCamera(item) {
      this.iChannelID = item.oChannels * 1;
      this.$refs.video.startRealPlay();
    },
    selectScreenType(item) {
      this.split = item;
      this.$refs.video.changeWndNum(item);
    },
    initVideo(item) {

      this.cameras = item;
    },
    cancelPlay() {
      this.$refs.video.stopRealPlay();
    }
  }
}
</script>
<style>
#big_video {
  padding: 10px 10px 10px 10px
}

#big_video .ivu-btn-info {
  color: #fff;
  background-color: rgba(0, 0, 55, 0.4) !important;
  border-color: #2db7f5;
}

#big_video .buttonType {
  position: absolute;
  top: 40%;
  left: 40px;
  z-index: 1000;
}

#big_video .ivu-tooltip-inner {
  background-color: rgba(70, 76, 91, 0.2) !important;
}

#big_video .halo-tree .tree-expand {
  background-color: rgba(0, 0, 55, 0) !important;
}

#big_video .halo-tree .tree-node-el {
  background-color: rgba(0, 0, 55, 0) !important;
  color: #fff
}

#big_video {
  /*position: relative;*/
  overflow: hidden !important;
}

#big_video .layersButtonBottom {
  border-bottom-right-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
}

#big_video .layersButtonUp {
  border-top-left-radius: 0px !important;
  border-top-right-radius: 0px !important;
}

#big_video .ivu-drawer-wrap {
  overflow: hidden !important;
}

#big_video .ivu-drawer-content {
  background-color: rgba(0, 0, 55, 0.6) !important;
}

#big_video .ivu-drawer-mask {
  background-color: rgba(0, 0, 0, 0) !important;
}


#big_video {
  height: calc(100vh - 104px);
  background-color: rgba(24, 35, 50, 0.1);
}

#big_video .editP {
  padding: 0px 10px 10px 10px
}

#big_video .edit {
  padding: 0px 10px 0px 10px
}
</style>
