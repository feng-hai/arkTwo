<template>
  <div class="videoManage big_table" @mouseover="mouseover" @mouseout="mouseout">
    <div
      class="scrollbar"
      :style="{height:scollHeight+'px',right:scollRight+'px'}"
      sytle="width:100%"
    >
      <Row>
        <Col span="12" v-for="item in items">
          <videos :sourcesSrc="item.src" :height="item.height"></videos>
        </Col>
      </Row>
    </div>

    <!-- <div style="float:left">
      <videos></videos>
    </div>
    <div style="float:left">
      <videos :sourcesSrc="sourcesSrc"></videos>
    </div>
    <Button type="primary" @click="changeSrc">Primary</Button>-->
  </div>
</template>
<script>
import videos from "_c/video2";
import { windowHeight } from "@/libs/util";
export default {
  components: {
    videos
  },
  data() {
    return {
      scollHeight: windowHeight() - 120,
      scollRight: 0,
      items: [
        {
          src: "rtmp://localhost/live/test123",
          height: "300"
        },
        {
          src: "rtmp://localhost/live/test124",
          height: "300"
        },
        {
          src: "rtmp://localhost/live/test124",
          height: "300"
        },
        {
          src: "rtmp://47.103.98.47/live/stream",
          height: "300"
        }
      ]
    };
  },
  methods: {
    mouseover: function() {
      //this.scollRight=0;
    },
    mouseout: function() {
      //this.scollRight=-17;
    },
    changeSrc() {
      console.log("changeSrc");
      this.sourcesSrc = "rtmp://localhost/live/test123";
      console.log(this.sourcesSrc);
    }
  }
};
</script>
 <style lang="scss">
.videoManage {
  background-color: rgba(24, 35, 50, 0.1);

  overflow-y: auto;
  width: 100%;

  .scrollbar {
    position: absolute;
    left: 0;
    top: 0;
    //  right: -17px;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .scrollbar::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 10px;
  }
  .scrollbar::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #535353;
  }
  .scrollbar::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #ededed;
  }
}
</style>

