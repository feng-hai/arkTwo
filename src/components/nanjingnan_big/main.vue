<template>
  <div class="nanjingnan">
    <!-- <Header id="header" class="backColor">Header</Header> -->
    <Row class="big_header">
      <Col span="8">
        <show-current-time />
      </Col>
      <Col span="8" offset="8" class="big_cente">
        <!-- <span>
          <Icon style="margin-bottom:5px;margin-right:5px;" type="md-train" />
      </span>
        <span>南京动车段智慧消防安防平台</span>-->
      </Col>
      <Col span="8" style="float:right;">
        <div style="float:right;margin-right:50px;">
          <user
            :message-unread-count="unreadCount"
            @startEdit="startEdit"
            @endEdit="endEdit"
            @addLayout="addWidgets"
            @saveLayout="saveWidgets"
            :user-avator="userAvator"
            style="float:right;"
          />
          <div
            style="color:red;font-size:25px; float:right;line-height: 1;margin-right:10px;"
            title="应急预案"
            @click="modal1=true"
          >
            <Icon type="ios-bookmark-outline" />
          </div>
          <titles style="margin-right:10px; float:right;" name="南京南管理员" />
        </div>
      </Col>
    </Row>
    <grid-layout
      :layout.sync="layout"
      :col-num="24"
      :row-height="rowHeight"
      :is-draggable="isEdit"
      :is-resizable="isEdit"
      :is-mirrored="false"
      :vertical-compact="true"
      :autoSize="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
      @layout-before-mount="layoutBeforeMountEvent"
      @layout-mounted="layoutMountedEvent"
    >
      <!-- <Button type="dashed" @click="addWidgets" style="margin-left:10px;">新增</Button>
      <Button type="dashed" @click="saveWidgets" style="margin-left:10px;">保存</Button>-->

      <grid-item
        v-for="item in layout"
        :key="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
      >
        <!-- {{item.i}} -->
        <div :id="'page'+item.i" style="height:100%"></div>
      </grid-item>
    </grid-layout>
    <plan :isShow="modal1" @close="modal1=false"></plan>
    <modelz :isShow="modal2" @close="modal2=false"></modelz>
  </div>
</template>
<script>
import VueGridLayout from "vue-grid-layout";
import panel from "./CustomView/panel";
import createMessage from "./CustomView/container.js";
import showCurrentTime from "./components/times";
import User from "./components/user/";
import titles from "./components/titles";
import { windowHeight } from "@/libs/util";
import plan from "@/view/single-page/home/components/contingencyPlan.vue";
import "./main.less";
import Vuex from "vuex";
import modelz from "@/view/nanjingnan_big/components/modelz.vue";

var temp =
'[{"x":0,"y":0,"w":3,"h":8,"i":"0","title":"自定义","component":"safetyIndex","moved":false,"lType":"menu","linkcomponent":"safetyIndexInfo"},{"x":18,"y":0,"w":6,"h":6,"i":"1","title":"自定义","moved":false,"component":"video","lType":"menu","linkcomponent":"videoInfo"},{"x":6,"y":0,"w":12,"h":40,"i":"3","moved":false,"title":"自定义3","component":"layer","lType":"main","linkcomponent":"message"},{"x":18,"y":28,"w":6,"h":12,"i":"5","moved":false,"title":"自定义5","component":"maintenance","lType":"menu","linkcomponent":"message"},{"x":0,"y":8,"w":6,"h":10,"i":"6","moved":false,"title":"自定义6","component":"alarm","lType":"menu","linkcomponent":"layer"},{"x":0,"y":25,"w":6,"h":15,"i":"7","moved":false,"title":"自定义7","component":"alarmTable","lType":"menu","linkcomponent":"alarmInfo"},{"x":18,"y":17,"w":6,"h":11,"i":"17","moved":false,"title":"自定义17","component":"danger","lType":"menu","linkcomponent":"dangerInfo"},{"x":0,"y":18,"w":6,"h":7,"i":"18","moved":false,"title":"自定义18","component":"water","lType":"menu","linkcomponent":"waterInfo"},{"x":3,"y":0,"w":3,"h":8,"i":9,"moved":false,"title":"自定义9","component":"contingencyPlan","lType":"menu","linkcomponent":"Message"},{"x":18,"y":6,"w":6,"h":11,"i":10,"moved":false,"title":"自定义10","component":"barrier","lType":"menu","linkcomponent":"barrierInfo"}]'
 // '[{"x":0,"y":0,"w":3,"h":8,"i":"0","title":"自定义","component":"safetyIndex","moved":false,"lType":"menu","linkcomponent":"safetyIndexInfo"},{"x":0,"y":22,"w":3,"h":8,"i":"1","title":"自定义","moved":false,"component":"video","lType":"menu","linkcomponent":"videoInfo"},{"x":3,"y":0,"w":6,"h":42,"i":"3","moved":false,"title":"自定义3","component":"layer","lType":"main","linkcomponent":"message"},{"x":9,"y":24,"w":3,"h":18,"i":"5","moved":false,"title":"自定义5","component":"maintenance","lType":"menu","linkcomponent":"message"},{"x":0,"y":8,"w":3,"h":8,"i":"6","moved":false,"title":"自定义6","component":"alarm","lType":"menu","linkcomponent":"layer"},{"x":0,"y":30,"w":3,"h":12,"i":"7","moved":false,"title":"自定义7","component":"alarmTable","lType":"menu","linkcomponent":"alarmInfo"},{"x":9,"y":0,"w":3,"h":13,"i":"15","moved":false,"title":"自定义15","component":"barrier","lType":"menu","linkcomponent":"barrierInfo"},{"x":9,"y":13,"w":3,"h":11,"i":"17","moved":false,"title":"自定义17","component":"danger","lType":"menu","linkcomponent":"dangerInfo"},{"x":0,"y":16,"w":3,"h":6,"i":"18","moved":false,"title":"自定义18","component":"water","lType":"menu","linkcomponent":"waterInfo"}]';
var testLayout = JSON.parse(temp);
export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    panel: panel,
    showCurrentTime,
    User,
    titles,
    plan,
    modelz
  },
  computed: {
    userAvator() {
      return this.$store.state.user.avatorImgPath;
    }
  },
  data() {
    return {
      layout: testLayout,
      rowHeight: 10,
      isEdit: false,
      modal1: false,
      modal2: false, // 设备明细页面
      controls: [
        {
          id: 1,
          controlId: "panel1",
          containId: "containId1"
        },
        {
          id: 2,
          controlId: "panel2",
          containId: "containId2"
        }
      ]
    };
  },
  methods: {
    layoutBeforeMountEvent: function(newLayout) {
      console.log(newLayout, "newLayout");
      // var allheight = 0;
      // var type = "";
      // console.log(this.layout)

      // this.layout.forEach(item => {
      //   console.log(item)
      //      console.log(item.lType)
      //   if (item.lType) {
      //     console.log(item.lType)
      //     if (type == "") {
      //       type = lType;
      //     }
      //     if (type == lType) {
      //       allheight += item.h;
      //     }
      //   }
      // });

      // this.rowHeight = (windowHeight()-500) / allheight;
      // console.log(rowHeight)
    },
    layoutMountedEvent: function(newLayout) {
      console.log("Mounted layout: ", newLayout);
    },
    saveWidgets() {
      console.log(this.layout, "layout");
      localStorage.setItem("layout", JSON.stringify(this.layout));
      // this.$Notice.success({
      //   title: "提示信息",
      //   desc: "保存成功"
      // });
    },
    addWidgets() {
      var len = this.layout.length;
      this.layout.push({ x: 0, y: 0, w: 2, h: 4, i: this.layout.length });
      console.log(this.layout);
      this.$nextTick(function() {
        this.createControl({
          id: len,
          controlId: "panel" + len,
          containId: "containId" + len
        });
      });
    },
    remove(j) {
      // 删除控件
      var index = -1;
      for (var i = 0; i < this.layout.length; i++) {
        if (this.layout[i].i == j) {
          this.layout.splice(i, 1);
          break;
        }
      }
      // this.layout.forEach(function(value, i) {
      // var item = {
      //   id: value.i,
      //   controlId: "panel" + value.i,
      //   containId: "containId" + value.i
      // };
      // that.createControl(item);
      // });
    },
    save(option) {
      var that = this;
      for (var i = 0; i < this.layout.length; i++) {
        if (this.layout[i].i == option.id) {
          this.layout[i].title = option.title;
          this.layout[i].component = option.component;
          this.layout[i].lType = option.lType;
          this.layout[i].linkcomponent = option.linkcomponent;
          break;
        }
      }
      // console.log(this.layout,"布局")
      this.saveWidgets();
      //  var item = {
      //   id: 3,
      //   controlId: "panel" + 3,
      //   containId: "containId" + 3,
      //   title: 'value.title',
      //   component: "map",
      //   lType:''
      // };
      // that.createControl(item);
    },
    linkto(item, type) {
      console.log(this.main, "main");
      if (type && type == "contingencyPlan") {//如果是应急预案传来的信息
        this.modal1 = true;
      } else if (type && type === "detail") {//报警明细
        this.modal2 = true;
        console.log(item, "main page click");
      } else if (item.linkcomponent) {
        var that = this;
        var item = {
          id: 3,
          controlId: "panel" + 3,
          containId: "containId" + 3,
          title: "value.title",
          component: item.linkcomponent,
          lType: "main",
          w:
            (this.main
              ? (this.main.w / 24) * window.innerWidth
              : window.innerWidth) + "",
          h:
            (this.main
              ? (this.main.h * this.rowHeight) *1.75
              : window.innerHeight) + ""
        };
        console.log("start destroy", that.vm);
        if (that.vm) {
          console.log("start destroy");
          that.vm.$destroy();
        }
        that.vm = that.createControl(item);
      }
    },
    startEdit() {
      this.isEdit = true;
    },
    endEdit() {
      this.isEdit = false;
    },
    createControl(item) {
      var that = this;
      // this.$nextTick(function() {
      return createMessage({
        id: "page" + item.id,
        controlId: item.controlId,
        control: panel,
        props: {
          containId: item.containId,
          title: item.title ? item.title : "自定义" + item.id,
          component: item.component,
          linkcomponent: item.linkcomponent,
          lType: item.lType,
          w: item.w,
          h: item.h
        },
        remove: that.remove,
        save: that.save,
        click: that.linkto
      });
    }
  },
  beforeMount() {
    this.unreadCount = 0;
    // this.userAvator=""
  },
  mounted() {
    var that = this;

    var tempLayout = localStorage.getItem("layout");
    console.log(tempLayout)
    if (tempLayout) {
      this.layout = JSON.parse(tempLayout);
    }
    this.main = this.layout.find(item => {
      if (item.lType == "main") {
        return true;
      } else {
        return false;
      }
    });
    this.tempControls = [];
    this.$nextTick(function() {
      var that = this;
      this.layout.forEach(function(value, i) {
        var item = {
          id: value.i,
          controlId: "panel" + value.i,
          containId: "containId" + value.i,
          title: value.title,
          component: value.component,
          linkcomponent: value.linkcomponent,
          lType: value.lType,
          w: (value.w / 24) * window.innerWidth,
          h: (value.h * that.rowHeight ) *1.75 + ""
        };
        that.tempControls.push(that.createControl(item));
      });
    });
  },
  beforeDestroy() {
    if (this.vm) {
      this.vm.$destroy();
    }
    if (this.tempControls) {
      this.tempControls.forEach(item => {
        item.$destroy();
      });
    }
  }
};
</script>
