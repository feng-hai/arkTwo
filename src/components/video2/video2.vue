<template>
  <div class="video-content" v-if="show">
    <video
      id="myPlayer"
      controls
      playsinline
      webkit-playsinline
      autoplay
      :width="w"
      :height="height"
    >
      <source :src="src" type="rtmp/flv" />
    </video>
    <div class="videoTitle" v-show="isShowTitle" v-bind:class="[onLineStatus?'onLine':'offLine']">
      <span class="showTitleLeft" v-text="name"></span>
      <span class="showTitleRight">
        <Icon type="md-checkmark" />
        <span v-text="onLineStatusTitle"></span>
      </span>
    </div>
  </div>
</template>
<script>
import EZUIKit from "./ezuikit.js";
export default {
  data() {
    return {
      show: true
    };
  },

  props: {
    isShowTitle: {
      type: Boolean,
      default: true
    },
    name: {
      type: String,
      default: "[1]測試"
    },
    onLineStatusTitle: {
      type: String,
      default: "在线"
    },
    onLineStatus: {
      type: Boolean,
      default: true
    },
    height: {
      type: String,
      default: "360"
    },
    w: {
      type: String | Number,
      default: "360"
    },
    sourcesType: {
      type: String,
      default: "rtmp/mp4"
    },
    sourcesSrc: {
      type: String,
      default: "rtmp://47.103.98.47/live/stream"
    },
    autoplay: {
      type: Boolean,
      default: true
    },

    src: {
      type: String,
      default() {
        return "rtmp://rtmp01open.ys7.com/openlive/24eedd36b69243cba12d1e398d62713e";
      }
    }
  },
  methods: {
    initPlayer() {
      this.player = new EZUIKit.EZUIPlayer("myPlayer"); // 直接使用EZUIKit 不会报错
      this.player.play();
    }
  },
  beforeMount() {},
  mounted(){
    this.initPlayer();
  },
  updated() {
    this.initPlayer();
  }
};
</script>

<style>
.showTitleLeft {
  float: left;
  line-height: 30px;
  /* display: block; */
  vertical-align: middle;
}
.showTitleRight {
  float: right;
  line-height: 30px;
  /* display: block; */
  vertical-align: middle;
}
.onLine {
  color: green;
}
.offLine {
  color: gray;
}
.videoTitle {
  height: 30px;
  background-color: rgba(0, 0, 0, 0.5);
  vertical-align: middle;
  padding: 2px 5px;
}
.videoShow {
  /* width: 460px; */
  padding: 5px;
  background-color: rgba(0, 0, 0, 0.1);
  border: gray;
}
</style>
