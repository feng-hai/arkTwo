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
        <span>南京动车段智慧消防安防平台</span> -->
      </Col> 
      <Col span="8" style="float:right;">
        <div style="float:right;margin-right:50px;">
          <user :message-unread-count="unreadCount" @startEdit="startEdit" @endEdit="endEdit" @addLayout="addWidgets" @saveLayout="saveWidgets" :user-avator="userAvator" style="float:right;" />
          <titles style="margin-right:70px;" name="动车段管理员" />
        </div>
      </Col>
    </Row>
    <grid-layout
      :layout.sync="layout"
      :col-num="12"
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
      <Button type="dashed" @click="saveWidgets" style="margin-left:10px;">保存</Button> -->

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
import "./main.less";
var testLayout = [
  { x: 0, y: 0, w: 2, h: 4, i: "0", title: "自定义", component: "demo" },
  { x: 2, y: 0, w: 2, h: 4, i: "1", title: "自定义" },
  { x: 4, y: 0, w: 2, h: 5, i: "2" },
  { x: 6, y: 0, w: 2, h: 3, i: "3" },
  { x: 8, y: 0, w: 2, h: 3, i: "4" },
  { x: 10, y: 0, w: 2, h: 3, i: "5" },
  { x: 0, y: 5, w: 2, h: 5, i: "6" },
  { x: 2, y: 5, w: 2, h: 5, i: "7" },
  { x: 4, y: 5, w: 2, h: 5, i: "8" },
  { x: 6, y: 3, w: 2, h: 4, i: "9" },
  { x: 8, y: 4, w: 2, h: 4, i: "10" },
  { x: 10, y: 4, w: 2, h: 4, i: "11" },
  { x: 0, y: 10, w: 2, h: 5, i: "12" },
  { x: 2, y: 10, w: 2, h: 5, i: "13" },
  { x: 4, y: 8, w: 2, h: 4, i: "14" },
  { x: 6, y: 8, w: 2, h: 4, i: "15" },
  { x: 8, y: 10, w: 2, h: 5, i: "16" },
  { x: 10, y: 4, w: 2, h: 4, i: "17" },
  { x: 0, y: 9, w: 2, h: 4, i: "18" },
  { x: 2, y: 6, w: 2, h: 4, i: "19" }
];
export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    panel: panel,
    showCurrentTime,
    User,
    titles
  },
  data() {
    return {
      layout: testLayout,
      rowHeight: 10,
      isEdit:false,
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
      console.log(newLayout,"newLayout")
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
     layoutMountedEvent: function(newLayout){
      console.log("Mounted layout: ", newLayout)
    },
    saveWidgets() {
      console.log(this.layout, "layout");
      localStorage.setItem("layout", JSON.stringify(this.layout));
      this.$Notice.success({
        title: "提示信息",
        desc: "保存成功"
      });
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
          this.layout[i].lType=option.lType;
          this.layout[i].linkcomponent=option.linkcomponent;
          break;
        }
      }
      // console.log(this.layout,"布局")
      this. saveWidgets();
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
    linkto(item)
    {
      if(item.linkcomponent)
      {

      var that =this;
        var item = {
          id: 3,
          controlId: "panel" + 3,
          containId: "containId" + 3,
          title: 'value.title',
          component: item.linkcomponent,
          lType:'main'
        };
        that.createControl(item);
      }
    },
    startEdit(){
      this.isEdit=true;
    },
    endEdit(){
      this.isEdit=false;
    },
    createControl(item) {
      var that = this;
      this.$nextTick(function() {
        createMessage({
          id: "page" + item.id,
          controlId: item.controlId,
          control: panel,
          props: {
            containId: item.containId,
            title: item.title ? item.title : "自定义" + item.id,
            component: item.component,
            linkcomponent: item.linkcomponent,
            lType:item.lType
          },
          remove: that.remove,
          save: that.save,
          click:that.linkto
        });
      });

      // createMessage({
      //     id:'2',
      //     controlId:'panel02',
      //     control:panel,
      //     props: {
      //         containId:'contain01'
      //     }
      // });
    }
  },
  mounted() {
    var that = this;
    var tempLayout = localStorage.getItem("layout");
    // console.log(tempLayout);

    if (tempLayout) {
      this.layout = JSON.parse(tempLayout);
      console.log("mounted",this.layout)
      // console.log("init", this.layout);
      //  var allheight = 0;
      //  var type = "";
      //  this.layout.forEach(item=>{
      //   if (item.lType) {
      //     if (type == "") {
      //       type = item.lType;
      //     }
      //     if ("main" == item.lType) {
      //       allheight += item.h;
      //     }
      //   }
      //  })
      //  console.log(allheight,"总高度")
      //  this.rowHeight = (windowHeight()-170) / allheight;
    }
    // this.rowHeight="100"
     this.$nextTick(function() {
      this.layout.forEach(function(value, i) {
        var item = {
          id: value.i,
          controlId: "panel" + value.i,
          containId: "containId" + value.i,
          title: value.title,
          component: value.component,
          linkcomponent: value.linkcomponent,
          lType:value.lType
        };
        that.createControl(item);
       });
    });
  }
};
</script>
