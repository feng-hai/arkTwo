<template>
  <div id="icons">
    <Row>
      <Col span="4">
        <Card class="demo-split">
          <p slot="title">组织结构</p>
          <input
            class="tree-search-input"
            type="text"
            v-model.lazy="searchword"
            placeholder="search..."
          />
          <button class="tree-search-btn" type="button" @click="search">搜索</button>
          <div class="treeCompany">
            <v-tree
              ref="tree"
              @node-click="clickNode"
              :data="treeData1"
              :radio="true"
              :multiple="false"
              :halfcheck="true"
            />
          </div>
        </Card>
      </Col>
      <Col span="16" style="padding-left:10px; padding-right:10px;">
        <Card class="layer_main">
          <p slot="title">
            <span @click="isLayer=true" :class="isLayer?'layer_active':'layer_noActive'">分层图</span>
            <span
              @click="isLayer=false"
              style="padding-left:10px;"
              :class="!isLayer?'layer_active':'layer_noActive'"
            >设备列表</span>
            <Icon
              type="md-cloud-upload"
              @click="openImage"
              style="font-size:200%;float:right; cursor:pointer;"
            />
          </p>
          <div v-if="isLayer">
            <vue-layer
              :data-parent="data"
              :isLargeScreen="isLarge"
              @openModel="openModel"
              @layerPoint="layerPoint"
            ></vue-layer>
            <p>图标大小</p>
            <p class="editP">
              <Slider v-model="sliderNum" @on-change="sliderChange" show-input></Slider>
            </p>
          </div>
          <div v-else>
            <!-- <tablesPage :viewId="viewId"></tablesPage> -->
            <Table
              stripe
              :height="getTableheight"
              class="tableInfo"
              :columns="columns1"
              :data="data.dataContent"
            ></Table>
          </div>
        </Card>
        <!--
    <Card>
      <p slot="title">图层设施列表 </p>

        </Card>-->
      </Col>
      <Col span="4">
        <Card class="optionType">
          <p slot="title">图标操作</p>
          <Collapse v-model="value1" simple accordion @on-change="editChange">
            <Panel name="1">
              查询
              <div slot="content">
                <p>设备名称</p>
                <p class="editP">
                  <Input v-model="searchItem.name" placeholder="请输入设备名称" style="width:100%" />
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
              新增
              <div slot="content">
                <div>
                  <p>消防设施</p>
                  <p class="editP">
                    <Select style="width:100%" v-model="tempSV.deviceId">
                      <Option
                        v-for="item in deviceList"
                        :value="item.value"
                        @click.native="getdevicesMoreParamsforAdd(item)"
                        :key="item.value"
                      >{{ item.label }}</Option>
                    </Select>
                  </p>
                  <p>设备点位-X</p>
                  <p class="editP">
                    <Input v-model="addpointValue.x" placeholder="请输入设备x坐标值" style="width:100%" />
                  </p>
                  <p>设备点位-Y</p>
                  <p class="editP">
                    <Input v-model="addpointValue.y" placeholder="请输入设备y坐标值" style="width: 100%" />
                  </p>
                  <p>
                    图标类型
                    <!-- <Button @click="preShow">预览</Button> -->
                  </p>
                  <p class="editP">
                    <Select style="width:100%" v-model="tempSV.deviceType">
                      <Option
                        v-for="item in pointValueTypeList"
                        :value="item.value"
                        @click.native="getdevicesTypeMoreParamsforAdd(item)"
                        :key="item.value"
                      >{{ item.label }}</Option>
                    </Select>
                  </p>
                  <p class="editP">
                    <Button type="primary" style @click="save">新增</Button>
                    <Button type="primary" style="margin-left:5px;" @click="showAll">取消</Button>
                  </p>
                </div>
              </div>
            </Panel>
            <Panel name="3">
              修改
              <div slot="content">
                <p>消防设施</p>
                <p class="editP">
                  <span>{{pointValue.name}}</span>
                  <!-- <Select style="width:100%">
                         <Option v-for="item in deviceList" :value="item.value" @click.native="getdevicesMoreParams(item)"  :key="item.value">{{ item.label }}</Option>
                  </Select>-->
                </p>
                <p>设备点位-X</p>
                <p class="editP">
                  <Input v-model="pointValue.x" placeholder="请输入设备x坐标值" style="width:100%" />
                </p>
                <p>设备点位-Y</p>
                <p class="editP">
                  <Input v-model="pointValue.y" placeholder="请输入设备y坐标值" style="width: 100%" />
                </p>
                <p>
                  图标类型
                  <!-- <Button @click="preShow">预览</Button> -->
                </p>
                <p class="editP">
                  <Select style="width:100%">
                    <Option
                      v-for="item in pointValueTypeList"
                      :value="item.value"
                      @click.native="getdevicesTypeMoreParams(item)"
                      :key="item.value"
                    >{{ item.label }}</Option>
                  </Select>
                </p>
                <p class="editP">
                  <Button type="primary" style @click="update">保存</Button>
                  <Button type="primary" style="margin-left:5px;" @click="deleteMarker">刪除</Button>
                </p>
              </div>
            </Panel>
          </Collapse>
        </Card>
      </Col>
    </Row>
    <Modal v-model="updateImage" title="楼层图上传" @on-ok="ok" @on-cancel="cancel">
      <updateImage @updateClick="updateClick"></updateImage>
      <div>
        <span>图片宽度</span>
        <br />
        <Input v-model="imageInfo.width" placeholder="请输入宽度"></Input>
        <br />
        <span>图片高度</span>
        <br />
        <Input v-model="imageInfo.height" placeholder="请输入高度"></Input>
        <br />
      </div>
    </Modal>
  </div>
</template>
<script>
import layering from "_c/layerford3";
import tablesPage from "@/view/tables/template";
import updateImage from "@/view/tools/updateTemplate";
import alarmTable from "@/view/single-page/home/components/alarmTable";
import { windowHeight } from "@/libs/util";
import { mapActions, mapGetters, mapState } from "vuex";
import videoTemplate from "_c/video/index.js";
export default {
  components: {
    vueLayer: layering,
    tablesPage: tablesPage,
    updateImage: updateImage,
    videoTemplate,
    alarmTable
  },
  computed: {
    ...mapGetters(["getOrgTreeInfo"]),
    getTableheight() {
      return windowHeight() - 260;
    }
  },
  data() {
    return {
      isLarge: true, //打开弹出框
      columns1: [
        {
          title: "名称",
          key: "name"
        },
        {
          title: "类型",
          key: "type"
        },
        {
          title: "x坐标",
          key: "x"
        },
        {
          title: "y坐标",
          key: "y"
        },
        {
          title: "图标地址",
          key: "pointImage"
        }
      ],
      isLayer: true, // 默认是图层模式，false是列表模式
      domain_unid: "",
      layer_map_unid: "",
      value1: "1",
      searchItem: {
        name: "",
        type: ""
      },
      tempSV: {
        // select控制临时值
        deviceId: "",
        deviceType: ""
      },
      pointValueTypeList: [
        {
          label: "消火栓",
          value: "1",
          uri: "/img/e-1.png"
        },
        {
          label: "自动水炮",
          value: "2",
          uri: "/img/l-1.png"
        },
        {
          label: "电气火灾监控",
          value: "3",
          uri: "/img/a-1.png"
        },
        {
          label: "火灾报警监控",
          value: "4",
          uri: "/img/c-1.png"
        },
        {
          label: "气体灭火",
          value: "5",
          uri: "/img/d-1.png"
        },
        {
          label: "温感",
          value: "6",
          uri: "/img/f-1.png"
        },
        {
          label: "消防泵",
          value: "7",
          uri: "/img/f-1.png"
        },
        {
          label: "消防给水及灭火",
          value: "8",
          uri: "/img/i-1.png"
        },
        {
          label: "消防水箱",
          value: "9",
          uri: "/img/g-1.png"
        },
        {
          label: "烟感",
          value: "10",
          uri: "/img/m-1.png"
        },
        {
          label: "应急疏散指示",
          value: "11",
          uri: "/img/n-1.png"
        },
        {
          label: "自动喷淋",
          value: "12",
          uri: "/img/j-1.png"
        },
        {
          label: "自动喷淋灭火",
          value: "13",
          uri: "/img/k-1.png"
        }
      ],

      defaultImage: {
        unid: "",
        url: "",
        width: "",
        height: ""
      },
      imageInfo: {
        unid: "",
        url: "",
        width: "",
        height: ""
      },
      vwidth: null,
      vheight: null,
      iChannelID: 2,
      id1: "divPlugin1",
      updateImage: false, // 上传图层对话框，默认不显示
      viewId: "570821854F8245B3BBA4A27ACB72F4DB",
      deviceId: "", // 待和底图保存的设备id
      pointValue: {
        id: 1,
        x: 100,
        y: 79,
        type: "4",
        name: "test01",
        content: "",
        pointImage: require("../../assets/img/t3.png")
      },
      addpointValue: {
        id: 1,
        x: 100,
        y: 79,
        type: "4",
        name: "test01",
        content: "",
        pointImage: require("../../assets/img/t3.png")
      },
      deviceList: [],
      vertical: "",
      vertical1: "",
      vertical2: "",
      sliderNum: 100,
      value2: 1,
      searchword: "",
      treeData1: [],
      split1: 0.2,
      tipsOptions: {
        title: "tip",
        top: "10px",
        left: "10px"
      },
      tempData: [],
      data: {
        divId: "test001",
        offset_y: 51,

        offset_x: 0,
        slider: 1, // 图标放大缩小比例
        //  width: 1000, // 画布宽度
        height: windowHeight() - 174 - 100, // 画布高度
        pageTop: 0, // 画布据页面距离
        pageLeft: 0, // 画布距页面左边距离
        zoom: {},
        containerHight: 144, // 底图真实高度
        containerWidth: 243, // 底图真实宽度
        pointImage: require("../../assets/img/t3.png"), // 点的背景图
        backgroudImage: require("../../assets/img/521-4-B.png"), // 画布的备件图
        scrollTop: 0,
        type: 0, // 4是新增 5是修改
        texts: [
          {
            cx: 100,
            cy: 90,
            text: "图标设计"
          }
        ],
        dataContent: []
      }
    };
  },
  mounted() {
    this.treeData1 = []; // this.getOrgTreeInfo;
    var that = this;
    if (this.treeData1.length == 0) {
      this.getOrgInfoAction().then(res => {
        that.treeData1 = that.getOrgTreeInfo;
        console.log(that.treeData1, "  that.treeData1");
      });
    }
    var that = this;

    // 获取到点数据后备份到tempData，方便新增和其他状态切换
    // this.tempData = this.data.dataContent;

    if ($("#layering").width() > 1000) {
      //  this.data.width=  $("#layering").width()
    }

    that.$store.on("text_big_screen_click", d => {
      that.openModel(d);
      console.log("获取文本点击事件", d);
    });
    // 通过$refs获取dom元素
    // console.log(document.querySelectorAll(".el-main").length)
    // this.box = document.querySelectorAll(".el-main")[0];
    // console.log(this.box);
    // // 监听这个dom的scroll事件
    // this.box.addEventListener('scroll', () => {
    //   console.log(" scroll ");
    //   //以下是我自己的需求，向下滚动的时候显示“我是有底线的（类似支付宝）”
    //   that.data.scrollTop = that.box.scrollTop;
    //   console.log(that.box.scrollTop);
    // }, false)
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
    editChange(
      keys // 面板状态修改
    ) {
      console.log(keys);
      if (keys.length > 0) {
        if (keys[0] == "1") {
          // 查詢
          this.data.type = 1;
          this.showAll();
          this.isLarge = true;
        } else if (keys[0] == "2") {
          this.isLarge = false;
          // 新增
          this.preShow();
        } else if (keys[0] == "3") {
          // 修改删除
          this.isLarge = false;
          this.data.type = 4;
          this.showAll();
        }
      } else {
        this.isLarge = true;
        this.data.type = 1;
        this.showAll();
      }
      console.log(keys, "面板状态");
    },
    getdevicesMoreParams(option) {
      // console.log(option)
      this.pointValue.id = option.value;
      this.pointValue.name = option.name;
    },
    getdevicesTypeMoreParams(option) {
      this.pointValue.type = option.value;
      this.pointValue.pointImage =
        option.uri.indexOf(window.g.SERVICE_PATH) != -1
          ? option.uri
          : window.g.SERVICE_PATH + option.uri;
    },
    getdevicesMoreParamsforAdd(option) {
      console.log(option, "option");
      this.addpointValue.id = option.value;
      this.addpointValue.name = option.name;
    },
    getdevicesTypeMoreParamsforAdd(option) {
      console.log(option, "add node");
      this.addpointValue.type = option.value;
      this.addpointValue.pointImage =
        option.uri.indexOf(window.g.SERVICE_PATH) != -1
          ? option.uri
          : window.g.SERVICE_PATH + option.uri;
    },
    initData() {
      var that = this;
      that.deviceList = [];
      that.data.backgroudImage = "";
      this.layer_map_unid = "";
      that.data.dataContent = [];
      that.data.texts = [];
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
      this.value1 = "1";
      this.editChange(["1"]);
      // console.log("点击树阶段触发事件");
      that.initData();

      var floorId = node.id;
      this.domain_unid = floorId;
      this.getMapAction({
        domain_unid: floorId
      })
        .then(res => {
          // console.log("底图信息", res);

          var mapInfo = res.data[0];

          that.data.backgroudImage = mapInfo.atta.uri;
          that.layer_map_unid = mapInfo.unid;
          // console.log("获取设备信息");

          that.getNodeDevice();
          that.getMarkers();
        })
        .catch(res => {
          that.data.backgroudImage = require("../../assets/img/bg.png");
          that.data.dataContent = [];
          this.$Notice.warning({
            title: "平面图标注",
            desc: "没有底图信息"
          });
        });
    },
    resetSearch() {
      this.searchItem = {
        name: "",
        type: ""
      };
    },
    save() {
      // 保存点信息
      var that = this;
      this.setMarkerAction({
        domain_unid: this.domain_unid,
        map_unid: this.layer_map_unid,
        entity_unid: this.addpointValue.id,
        x: this.addpointValue.x,
        y: this.addpointValue.y,
        type_id: this.addpointValue.type,
        avatar:
          this.addpointValue.pointImage.indexOf(window.g.SERVICE_PATH) != -1
            ? this.addpointValue.pointImage.substr(window.g.SERVICE_PATH.length)
            : this.addpointValue.pointImage,
        name: this.addpointValue.name
      })
        .then(res => {
          console.log("添加成功");
          that.$Notice.success({
            title: "平面图标注",
            desc: "点添加成功"
          });
          that.tempSV = {
            deviceId: "",
            deviceType: ""
          };
          that.getNodeDevice();
          that.getMarkers();
        })
        .catch(error => {
          that.$Notice.warning({
            title: "平面图标注",
            desc: "点添加失败"
          });
        });
    },
    deleteMarker() {
      var that = this;
      this.deleteMarkerAction({
        unid: this.pointValue.id
      })
        .then(res => {
          that.$Notice.success({
            title: "平面图标注",
            desc: "删除成功"
          });
          that.pointValue = {
            id: -1,
            x: 0,
            y: 0,
            type: "0",
            name: "",
            content: "",
            pointImage: ""
          };
        })
        .catch(error => {
          that.$Notice.warning({
            title: "平面图标注",
            desc: "删除失败"
          });
        });
    },
    update() {
      var that = this;
      this.updateMarkerAction({
        unid: this.pointValue.id,
        domain_unid: this.domain_unid,
        map_unid: this.layer_map_unid,
        entity_unid: this.pointValue.id,
        x: this.pointValue.x,
        y: this.pointValue.y,
        type_id: 2,
        avatar: this.pointValue.pointImage.substr(window.g.SERVICE_PATH.length),
        name: this.pointValue.name
      })
        .then(res => {
          console.log("修改成功");
          that.$Notice.success({
            title: "平面图标注",
            desc: "点修改成功"
          });
        })
        .catch(error => {
          that.$Notice.warning({
            title: "平面图标注",
            desc: "点添加失败"
          });
        });
    },
    ok() {
      var that = this;
      if (this.domain_unid == "") {
        this.$Notice.warning({
          title: "平面图标注",
          desc: "请现在左边树种现在楼层"
        });
        return;
      }
      // console.log(this.layer_map_unid, "新增图层");
      if (this.layer_map_unid != "") {
        this.updateMapAction({
          domain_unid: this.domain_unid,
          atta: this.imageInfo.unid,
          max_x: this.imageInfo.width,
          max_y: this.imageInfo.height,
          unid: this.layer_map_unid
        }).then(res => {
          // console.log("修改图成功");
          this.$Notice.success({
            title: "平面图标注",
            desc: "修改图成功"
          });
        });
      } else {
        this.AddMapAction({
          domain_unid: this.domain_unid,
          atta: this.imageInfo.unid,
          max_x: this.imageInfo.width,
          max_y: this.imageInfo.height
        }).then(res => {
          console.log("添加图成功");
          this.$Notice.success({
            title: "平面图标注",
            desc: "添加图成功"
          });
          that.defaultImage = that.imageInfo;
          that.data.backgroudImage = that.imageInfo.uri;
        });
      }
      that.getNodeDevice();
      that.getMarkers();
    },
    getMarkers() {
      var that = this;
      //
      this.getMarkersAction({
        unid: that.layer_map_unid
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
    },
    getNodeDevice() {
      var that = this;
      this.getDevices({
        unid: that.layer_map_unid
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
    },
    cancel() {},
    updateClick(res) {
      this.imageInfo.unid = res.unid;
      this.imageInfo.url = res.uri;
    },
    openImage() {
      this.updateImage = true;
      // var that = this;
      // this.$nextTick(function() {
      //
      //   that.$refs.layer01.initPage();
      //   setTimeout(function(){
      //     that.vheight = $("#tempcol").height();
      //     that.vwidth = $("#tempcol").width();
      //     // that.$refs.videoTemplate.initVideo();
      //
      //   },100)
      //   //  that.$refs.videoTemplate.initVideo();
      // })
    },
    preShow() {
      var temp = [];
      temp.push(this.addpointValue);
      this.data.type = 4;
      // this.tempData = this.data.dataContent;
      this.data.dataContent = temp;
    },
    showAll() {
      var that = this;
      // this.data.type = 0;
      console.log(this.searchItem, "查询内容");
      this.data.dataContent = this.tempData.filter(item => {
        if (that.searchItem.name != "" && that.searchItem.type != "") {
          if (
            item.name.indexOf(that.searchItem.name) != -1 &&
            item.type == that.searchItem.type
          ) {
            return true;
          } else {
            return false;
          }
        } else if (
          (that.searchItem.name && that.searchItem.name != "") ||
          (that.searchItem.type && that.searchItem.type != "")
        ) {
          var temp = false;
          if (
            that.searchItem.name != "" &&
            item.name.indexOf(that.searchItem.name) != -1
          ) {
            temp = true;
          }
          console.log(temp, item.type, that.searchItem.type, "dfsfsfs");
          if (that.searchItem.type != "" && item.type == that.searchItem.type) {
            temp = true;
          }

          return temp;
        }

        return true;
      });
    },
    openModel(e) {
      console.log(e, "獲取車輛信息");
      this.isLarge = false;
      this.value1 = "3";
      this.data.type = 4;
      this.pointValue = e;
    },
    search() {
      this.$refs.tree.searchNodes(this.searchword);
    },
    sliderChange() {
      this.data.slider = this.sliderNum / 100;
    },
    layerPoint: function(val) {
      // console.log("父页面打印数据" + val);
      //console.log(this.data.slider);

      //  console.log(val[0], val[1]);
      if (this.value1 == "2") {
        this.addpointValue.x = val[0];
        this.addpointValue.y = val[1];
      } else {
        this.pointValue.x = val[0];
        this.pointValue.y = val[1];
      }
    },
    // 监听从组件内传递出来的事件
    yes(args) {
      // console.log( args );
      alert(JSON.stringify(args));
    },

    // 显示tips
    showtips() {
      // console.log( this.$refs );
      this.$refs.dialog.showTips();
    }
  },
  watch: {
    data: {
      handler(newValue, oldValue) {
        console.log(newValue);
      },
      deep: true
    },
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
  created() {
    var that = this;
    this.$nextTick(function() {
      //  $(".treeCompany").width($(".treeCompany").parent().width())
    });
  }
};
</script>

<style>
#icons .editP {
  padding: 10px 0px 10px 0px;
}

#icons .layer_active {
  color: #2d8cf0;
  cursor: pointer;
}

#icons .layer_noActive {
  cursor: pointer;
}

#icons .demo-split {
  height: calc(100vh - 144px);
  border: 1px solid #dcdee2;
}

#icons .treeCompany {
  height: calc(100vh - 264px);
  overflow: auto;
  margin-top: 20px;
}

#icons .treeCompany .ivu-card-body {
  padding: 0;
}

#icons .halo-tree .tree-node-el {
  white-space: nowrap;
}

#icons .tree-search-input {
  width: 77%;
  float: left;
}

#icons .optionType {
  min-height: calc(100vh - 144px);
  height: auto;
  /*min-height: 550px;*/
}

#icons .layer_main {
  height: calc(100vh - 144px);
}

#icons .tableInfo {
  height: calc(100vh - 230px);
}

#icons .ivu-collapse-header {
  padding-left: 0px !important;
}

#icons .ivu-collapse-content {
  padding: 0px !important;
}

#icons .pointType {
  height: calc(60vh - 100px);
  min-height: 450px;
}

#icons .demo-split-pane {
  padding: 10px;
  position: relative;
}
</style>
