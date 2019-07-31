<template>
  <div class="item videoShow">
    <div class="player" >
      <video-player ref="videoPlayer" id="myPlayer"  class="vjs-custom-skin" :options="playerOptions"></video-player>
    </div>
    <div class="videoTitle" v-show="isShowTitle"  v-bind:class="[onLineStatus?'onLine':'offLine']" >
      <span class="showTitleLeft"  v-text="name"></span>
      <span class="showTitleRight ">
        <Icon type="md-checkmark"/>
        <span v-text="onLineStatusTitle"></span>
      </span>
    </div>
  </div>
</template>
<script>
import EZUIKit from './ezuikit.js'
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import 'videojs-flash'
export default {
  mounted(){
      this.initPlayer();

  },
  methods:{
    initPlayer(){
        this. player = new EZUIKit.EZUIPlayer('myPlayer') // 直接使用EZUIKit 不会报错
        this. player.play();
    }
  },
  components: {
    videoPlayer
  },
  props: {
    isShowTitle: {
      type: Boolean,
      default: true
    },
    name: {
      type: String,
      default: '[1]測試'
    },
    onLineStatusTitle: {
      type: String,
      default: '在线'
    },
    onLineStatus: {
      type: Boolean,
      default: true
    },
    height: {
      type: String,
      default: '360'
    },
    sourcesType: {
      type: String,
      default: 'rtmp/mp4'
    },
    sourcesSrc: {
      type: String,
      default: 'rtmp://47.103.98.47/live/stream'
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    poster: {
      type: String,
      default:
        'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-5.jpg'
    }
  },
  watch: {
    // sourcesSrc: function (n, o) {
    //   let myPlayer = this.$refs.videoPlayer.player
    //   myPlayer.src('rtmp://47.103.98.47/live/stream') // 根据userType的不同展示不同的视频地址
    // }
  },

  data () {
    return {
      playerOptions: {
        height: this.height,

          sources: [{
            type: "rtmp/flv",
            src:'rtmp://rtmp01open.ys7.com/openlive/24eedd36b69243cba12d1e398d62713e'
           // src: "rtmp://184.72.239.149/vod/&mp4:BigBuckBunny_115k.mov"
          }],
          techOrder: ['flash'],
          autoplay: false,
          controls: true,
          poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-9.jpg"

     
      }
    }
  }
}
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
  background-Color:rgba(0, 0, 0, 0.5);
  vertical-align: middle;
  padding: 2px 5px;
}
.videoShow {
  /* width: 460px; */
  padding:5px;
 background-Color:rgba(0, 0, 0, 0.1);
  border: gray;
}
</style>
