<template>
  <div>
    <div id="big_layers" class="backImage home_first drag-drawer-inner-box">
      <vue-layer v-show="showMapBDrawer" class="edit" :data-parent="data" @openModel="openModel"></vue-layer>
      <pointsTable v-show="showTableBDrawer"></pointsTable>
      <ButtonGroup class="buttonType">
        <Tooltip content="楼层信息" placement="right-start">
          <Button
            icon="ios-git-network"
            type="info"
            class="layersButtonBottom"
            @click="showCompanyBDrawer = !showCompanyBDrawer"
          ></Button>
        </Tooltip>
        <br />
        <Tooltip content="设备类型" placement="right-start">
          <Button
            icon="ios-switch-outline"
            class="layersButtonUp layersButtonBottom"
            type="info"
            @click="showContainerBDrawer = !showContainerBDrawer"
          ></Button>
        </Tooltip>
        <br />
        <Tooltip content="列表展示" placement="right-start">
          <Button
            icon="ios-keypad-outline"
            class="layersButtonUp layersButtonBottom"
            type="info"
            @click="changeTable"
          ></Button>
        </Tooltip>
        <br />
        <Tooltip content="地图展示" placement="right-start">
          <Button icon="ios-map-outline" class="layersButtonUp" type="info" @click="changeMap"></Button>
        </Tooltip>
      </ButtonGroup>
      <div v-show="showMapBDrawer">
        <p class="edit">图标大小</p>
        <p class="editP">
          <Slider v-model="sliderNum" @on-change="sliderChange" show-input></Slider>
        </p>
      </div>
      <drag-drawer
        v-model="showContainerBDrawer"
        :width.sync="width1"
        min-width="30px"
        :inner="true"
        :transfer="false"
        :placement="placementComputed"
        @on-resize="handleResize"
        :scrollable="true"
      >
        <deviceType @searchItem="searchItem"></deviceType>
      </drag-drawer>
      <drag-drawer
        v-model="showCompanyBDrawer"
        :width.sync="width2"
        min-width="30px"
        :inner="true"
        :transfer="false"
        placement="left"
        :draggable="draggable"
        @on-resize="handleResize"
        :scrollable="true"
      >
        <v-tree
          ref="tree"
          @node-click="clickNode"
          style="margin-top:20px; margin-left:20px;"
          :data="treeData1"
          :radio="true"
          :multiple="false"
          :halfcheck="true"
        />
      </drag-drawer>
    </div>

    <!-- <Modal
        v-model="modal1"
       

        >
       <div style="text-align:center">
         <modelz :isShow="modal1" @close="modal1=false"></modelz>
        </div>
        <div slot="footer">
         
        </div>
    </Modal>-->
  </div>
</template>
<script>
import { windowHeight } from "@/libs/util";
import { mapActions, mapGetters, mapState } from "vuex";
import layering from "_c/layerford3";
import InforCard from "_c/info-card";
import CountTo from "_c/count-to";
import DragDrawer from "_c/drag-drawer";
import { ChartPie, ChartBar } from "_c/charts";
// import Example from "./example.vue";
import pointsTable from "./components/pointsTable.vue";
import deviceType from "./components/deviceType.vue";
import modelz from "./components/modelz.vue";
import alarmTable from "@/view/single-page/home/components/alarmTable";
import videoTemplate from "_c/video/index.js";
// import {
//   mapActions,
//   mapGetters,
//   mapState
// } from 'vuex'
export default {
  name: "home",
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    // Example,
    vueLayer: layering,
    DragDrawer,
    pointsTable,
    deviceType,
    alarmTable,
    videoTemplate,
    modelz
  },
  data() {
    return {
      tempData: [],
      vwidth: null,
      vheight: null,
      iChannelID: 2,
      id1: "divPlugin1",
      modal1: false,
      treeData1: [],
      showMapBDrawer: true,
      showCompanyBDrawer: false,
      showContainerBDrawer: false,
      showTableBDrawer: false,
      showBDrawer3: false,
      width1: 300,
      width2: 400,
      placement: false,
      draggable: true,
      sliderNum: 50,
      data: {
        divId: "test001",
        offset_y: -15,
        offset_x: -5,
        slider: 0.5, // 图标放大缩小比例
        //  width: 1000, // 画布宽度
        height: windowHeight() - 174 < 600 ? 600 : windowHeight() - 174, // 画布高度
        pageTop: 0, // 画布据页面距离
        pageLeft: 0, // 画布距页面左边距离
        zoom: {},
        containerHight: 144, // 底图真实高度
        containerWidth: 243, // 底图真实宽度
        pointImage: require("@/assets/img/t3.png"), // 点的背景图
        backgroudImage: require("@/assets/img/521-4-B.png"), // 画布的备件图
        scrollTop: 0,
        type: 0, // 4是新增 5是修改
        dataContent: [
          {
            id: 1,
            x: 100,
            y: 79,
            type: "1",
            name: "test01",
            content: "test Content",
            pointImage: require("@/assets/img/t3.png")
          },
          {
            id: 1,
            x: 100,
            y: 99,
            type: "2",
            name: "test01",
            content: "test Content",
            pointImage: require("@/assets/img/t3.png")
          }
        ]
      }
    };
  },
  computed: {
    placementComputed() {
      return this.placement ? "left" : "right";
    },
    ...mapGetters(["getOrgTreeInfo"])
  },
  methods: {
    ...mapActions([
      "getOrgInfoAction",
      "getMapAction",
      "AddMapAction",
      "updateMapAction",
      "deleteMapAction",
      "setMarkerAction",
      "updateMarkerAction",
      "deleteMarkerAction",
      "getMarkersAction",
      "getDevices"
    ]),
    initData() {
      var that = this;
      that.deviceList = [];
      that.data.backgroudImage = "";
      this.layer_map_unid = "";
      that.data.dataContent = [];
      that.tempData = [];
      that.imageInfo = {
        unid: "",
        url: "",
        width: "",
        height: ""
      };
    },
    clickNode(node) {
      var that = this;
      that.initData();
      var floorId = node.id;
      this.domain_unid = floorId;
      this.getMapAction({
        domain_unid: floorId
      })
        .then(res => {
          console.log("底图信息", res);
          var mapInfo = res.data[0];
          that.data.backgroudImage = mapInfo.atta.uri;
          this.layer_map_unid = mapInfo.unid;
          this.getDevices({
            unid: mapInfo.unid
          })
            .then(res => {
              console.log("获取未标注的信息", res);
              that.deviceList = res.data.map(item => {
                return {
                  label: item.name,
                  value: item.unid
                };
              });
            })
            .catch(error => {
              console.log("没有未标注的设备", error);
            });
          this.getMarkersAction({
            unid: mapInfo.unid
          })
            .then(res => {
              console.log("底图Markers", res);
              // 所有marker打到底图上
              that.data.dataContent = res.data.map(item => {
                return {
                  id: item.unid,
                  x: item.x,
                  y: item.y,
                  type: item.type_id,
                  name: item.entity.name,
                  content: "",
                  pointImage:
                    item.avatar.indexOf(window.g.SERVICE_PATH) != -1
                      ? item.avatar
                      : window.g.SERVICE_PATH + item.avatar
                };
              });
              console.log("底图Markers dataContent", that.data.dataContent);
              that.tempData = that.data.dataContent;
            })
            .catch(error => {
              console.log("底图没有Markers");
            });
        })
        .catch(res => {
          // that.data.backgroudImage = require('../../assets/img/bg.png');
          that.data.dataContent = [];
          this.$Notice.warning({
            title: "平面图标注",
            desc: "没有底图信息"
          });
        });
    },
    openModel(e) {
      // this.modal1 = true;
      this.$emit("click", e, "detail");
      // var that = this;
      // this.$nextTick(function() {
      //
      //   that.$refs.layer01.initPage();
      //   setTimeout(function() {
      //     that.vheight = $("#tempcol").height();
      //     that.vwidth = $("#tempcol").width();
      //     // that.$refs.videoTemplate.initVideo();
      //
      //   }, 100)
      //   //  that.$refs.videoTemplate.initVideo();
      // })
    },
    searchItem(searchItem) {
      var that = this;
      this.data.dataContent = this.tempData.filter(item => {
        if (searchItem.name != "" && searchItem.type != "") {
          if (
            item.name.indexOf(searchItem.name) != -1 &&
            item.type == searchItem.type
          ) {
            return true;
          } else {
            return false;
          }
        } else if (
          (searchItem.name && searchItem.name != "") ||
          (searchItem.type && searchItem.type != "")
        ) {
          var temp = false;
          if (
            searchItem.name != "" &&
            item.name.indexOf(searchItem.name) != -1
          ) {
            temp = true;
          }

          if (searchItem.type != "" && item.type == searchItem.type) {
            temp = true;
          }
          console.log(
            temp,
            item.name.indexOf(searchItem.name),
            searchItem.name,
            searchItem.type,
            item.type,
            "dfsfsfs"
          );
          return temp;
        }
        return true;
      });
      console.log(this.data.dataContent, "测试");
    },
    sliderChange() {
      this.data.slider = this.sliderNum / 100;
    },
    handleResize() {},
    changeMap() {
      this.showTableBDrawer = false;
      this.showMapBDrawer = true;
    },
    changeTable() {
      this.showTableBDrawer = true;
      this.showMapBDrawer = false;
    }
    // 在首页初始化公共数据
    // ...mapActions([
    //   "getOrgInfoAction",
    //   'getMenuInfoAction'
    // ]),
  },
  watch: {
    $route(to, from) {
      this.treeData1 = []; // this.getOrgTreeInfo;
      this.treeData1 = this.getOrgTreeInfo;
      var that = this;
      if (this.treeData1.length == 0) {
        this.getOrgInfoAction().then(res => {
          that.treeData1 = that.getOrgTreeInfo;
        });
      }
    }
  },
  mounted() {
    // this.getOrgInfoAction();
    // this.getMenuInfoAction();
    this.treeData1 = []; // this.getOrgTreeInfo;
    var that = this;
    if (this.treeData1.length == 0) {
      this.getOrgInfoAction().then(res => {
        that.treeData1 = that.getOrgTreeInfo;
      });
    }
  },
  beforeDestroy() {
    this.initData();
    this.treeData1 = [];
  }
};
</script>

<style >
#big_layers .ivu-btn-info {
  color: #fff;
  background-color: rgba(0, 0, 55, 0.2) !important;
  border-color: #2db7f5;
}

/*#big_layers .ivu-collapse-header {
  padding-left: 0px !important;
}*/

/*#big_layers .ivu-collapse-content {
  padding: 0px !important;
}*/

#big_layers .buttonType {
  position: absolute;
  top: 40%;
  left: 10px;
  z-index: 1001;
}

#big_layers .ivu-tooltip-inner {
  background-color: rgba(70, 76, 91, 0.2) !important;
}

#big_layers .halo-tree .tree-expand {
  background-color: rgba(0, 0, 55, 0) !important;
}

#big_layers .halo-tree .tree-node-el {
  background-color: rgba(0, 0, 55, 0) !important;
  color: #fff;
}

#big_layers {
  position: relative;
  overflow: hidden !important;
}

#big_layers .layersButtonBottom {
  border-bottom-right-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
}

#big_layers .layersButtonUp {
  border-top-left-radius: 0px !important;
  border-top-right-radius: 0px !important;
}

#big_layers .ivu-drawer-wrap {
  overflow: hidden !important;
}

#big_layers .ivu-drawer-content {
  background-color: rgba(0, 0, 55, 0.6) !important;
}

#big_layers .ivu-drawer-mask {
  background-color: rgba(0, 0, 0, 0) !important;
}

#big_layers {
  height: calc(100vh - 104px);
  background-color: rgba(24, 35, 50, 0.1);
}

#big_layers .editP {
  padding: 0px 10px 10px 10px;
}

#big_layers .edit {
  padding: 0px 10px 0px 10px;
}
.ivu-modal-footer {
  border-top: 0px solid #e8eaec;
  padding: 0;
  text-align: right;
}
.ivu-modal-content {
  background-color: rgba(24, 35, 50, 0);
}
</style>
