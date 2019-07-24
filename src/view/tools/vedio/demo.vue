<template>
  <div class="container">
    <div class="player">
      <video-player  class="video-player vjs-custom-skin"
                     ref="videoPlayer"
                     :playsinline="true"
                     :options="playerOptions"
                     @play="onPlayerPlay($event)"
                     @pause="onPlayerPause($event)"
      >
      </video-player>
    </div>
  </div>
</template>
 
<script>
import { videoPlayer } from 'vue-video-player';

import 'videojs-flash'
export default {
  data () {
    return {
      playerOptions: {
//      height: '300',
          sources: [{
            type: "rtmp/mp4",
            src: "rtmp://47.103.98.47/live/stream"
          }],
          techOrder: ['flash'],
          autoplay: false,
          controls: true

      }
    }
  },
  components: {
    videoPlayer
  },
  methods: {
    onPlayerPlay(player) {
      alert("play");
    },
    onPlayerPause(player){
      alert("pause");
    },
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  }
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style type="text/css" scoped>
  .container {
    background-color: #efefef;
    min-height: 100%;
  }

</style>