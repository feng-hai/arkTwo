<template>
  <div class="item">
    <div class="player">
      <video-player class="vjs-custom-skin" :options="playerOptions"></video-player>
    </div>
    <div class="player">
      <video-player class="vjs-custom-skin" :options="playerOptions1"></video-player>
    </div>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import 'videojs-flash'
export default {
  components: {
    videoPlayer
  },
  data () {
    return {
      playerOptions: {
        height: '360',
        sources: [
          {
            type: 'rtmp/mp4',
            src: 'rtmp://localhost/live/test123'
          }
        ],
        techOrder: ['flash'],
        autoplay: true,
        controlBar: {
          timeDivider: false,
          durationDisplay: false
        },
        flash: { hls: { withCredentials: false } },
        html5: { hls: { withCredentials: false } },
        poster:
          'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-5.jpg'
      },
      playerOptions1: {
        height: '360',
        sources: [
          {
            type: 'rtmp/mp4',
            src: 'rtmp://localhost/live/test124'
          }
        ],
        techOrder: ['flash'],
        autoplay: true,
        controlBar: {
          timeDivider: false,
          durationDisplay: false
        },
        flash: { hls: { withCredentials: false } },
        html5: { hls: { withCredentials: false } },
        poster:
          'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-5.jpg'
      }
    }
  }
}
</script>
