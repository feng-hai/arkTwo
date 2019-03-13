<template>
  <!-- static/04-音乐播放界面.png/歌曲控件 -->
  <div
    class="progress-bar"
    ref="progressBar"
    @click="progressClick"
  >
    <div style="position: relative;">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div
        class="progress-btn-wrapper"
        ref="progressBtn"
        @touchstart="progressTouchStart"
        @touchmove="progressTouchMove"
        @touchend="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
    <div :class="tipsMess" ref="tips">
      <span>{{tipsMsg ? tipsMsg : tipsMessage}}</span>
      <Icon class="icon-arrow" type="md-arrow-dropdown" />
    </div>
    </div>
  </div>
</template>

<script>
import { prefixStyle } from '../mixin/dom'

const progressBtnWidth = 10
const transform = prefixStyle('transform')

const tipsWidth = 300
const tipsWidthtransform = prefixStyle('transform')

export default {
  props: {
    percent: {
      type: Number,
      // default: 0
    },
    axData: {
      type: Array
    },
    len: {
      type: Number
    }
  },
  data(){
    return {
      tipsMessage: 0
    }
  },
  created() {
    this.touch = {}
  },
  computed: {
    tipsMsg(){
      let index = this.percent * this.len | 0;
      return this.axData[index-1];
    },
    tipsMess(){
      return this.tipsMsg ? 'tips' : 'tipsss'
    }
  },
  methods: {
    progressTouchStart(e) {
      this.touch.init = true
      /* this.touch.startX: finger x-axis distance */
      this.touch.startX = e.touches[0].pageX
      /* 进度条已经走过的距离，黄色显示 */
      this.touch.left = this.$refs.progress.clientWidth
    },
    progressTouchMove(e) {
      if (!this.touch.init) {
        return
      }
      /* 进度能移动的距离 = 进度条长度 - 进度条小球的宽度 */
      const progressBarWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
      /* progressbar move distance = current finger x-axis distance - pre finger x-axis distance */
      const detailX = e.touches[0].pageX - this.touch.startX
      /* offsetWidth: yellow color, real progress width */
      const offsetWidth = Math.min(
        progressBarWidth,
        Math.max(0, this.touch.left + detailX)
      )
      this._offset(offsetWidth)
    },
    progressTouchEnd() {
      this.touch.init = false
      this._triggerPercent()
    },
    _triggerPercent() {
      /* 进度能移动的距离 = 进度条长度 - 进度条小球的宽度 */
      const progressBarWidth = this.$refs.progressBar.clientWidth - progressBtnWidth

      /* 进度条已经走过的距离 / 进度能移动的距离 */
      const percent = this.$refs.progress.clientWidth / progressBarWidth
      this.$emit('percentChange', percent)
    },
    progressClick(e) {
      /* getBoundingClientRect: **static/getBoundingClientRect.png** */
      const rect = this.$refs.progressBar.getBoundingClientRect()
      /* offsetWidth: real progress = stop position - rect */
      const offsetWidth = e.pageX - rect.left
      // this.$refs.tips.style.left = offsetWidth + 'px';
      this._offset(offsetWidth)
      this._triggerPercent()
    },
    /* 进度条已经走过的距离，黄色显示 */
    _offset(offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`
      this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
      this.$refs.tips.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
    }
  },
  watch: {
    percent(newPercent) {
      /* !this.touch.init: progress bar drag process cancel */
      if (newPercent >= 0 && newPercent <= 1 && !this.touch.init) {
        /* 进度能移动的距离 = 进度条长度 - 进度条小球的宽度 */
        const progressBarWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
        /* 进度条已经走过的距离，黄色显示 */
        const offsetWidth = progressBarWidth * newPercent
        this._offset(offsetWidth)
      }
      return this.percent
    }
  }
}
</script>

<style scoped>
.progress-bar {
  height: 30px;}

.bar-inner {
position: relative;
top: 18px;
height: 14px;
background: #e4e7ed;
border-radius: 20px;
cursor: pointer;
}

.progress {
  position: absolute;
  height: 100%;
  background: #409eff;
  border-radius: 20px;
  cursor: pointer;
}

.progress-btn-wrapper {
  position: absolute;
  left: -8px;
  top: -13px;
  width: 22px;
  height: 22px;}

.progress-btn {
  position: relative;
  top: 8px;
  left: 0px;
  box-sizing: border-box;
  width: 22px;
  height: 22px;
  border: 3px solid #409eff;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
}
.tips{
  position:absolute;
  left:-67px;
  bottom:10px;
  text-align:center;
  padding:0 4px;
  background:#000;
  border-radius:5px;
  height:36px;
  color:#fff; 
  z-index: 160; 
  line-height: 36px;
  }
.tipsss{
  position:absolute;
  left:-8px;
  bottom:10px;
  text-align:center;
  padding:0 8px;
  background:#000;
  border-radius:5px;
  height:36px;
  color:#fff; 
  z-index: 160; 
  line-height: 36px;
  }
.tips .icon-arrow{    
  position: absolute;
  margin-left: -11px;
  left: 50%;
  bottom: -16px;
  font-size: 22px;
  color: #000;
}
.tipsss .icon-arrow{    
  position: absolute;
  margin-left: -11px;
  left: 50%;
  bottom: -16px;
  font-size: 22px;
  color: #000;
}
</style>