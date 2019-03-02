<template>
<div id="demo" class="tips" ref="tips" v-show="show" transition="fade" :style="styleObject">
  <div class="tips-close" @click="closeTips">x</div>
  <div class="tips-header">
    <slot name="header">
      <a href="javascript:;" v-if="tips.showbtn" @click="yes">{{tips.title}}</a>
    </slot>
  </div>
  <div class="tips-body">
    <slot name="body">
      <p class="notice">{{tips.text}}</p>
    </slot>
  </div>

</div>
</template>
<script>
export default {
  name: 'vue-tips',
  props: ['tipsOptions'],
  data () {
    return {
      styleObject: {
        left: '100px',
        top: '100px'
      },
      show: false
    }
  },
  mounted () {
    let height = this.$refs.tips.clientHeight
  },
  computed: {

    tips: {
      get () {
        var that = this
        let tips = this.tipsOptions || {}
        var tips1 = {
          title: tips.title || '提示',
          text: tips.text || '',
          showbtn: tips.showbtn || true,
          btnText: tips.btnText || '确定'
        }
        that.styleObject.left = tips.left || '100px'
        that.styleObject.top = tips.top || '100px'
        // console.log(tips);
        return tips1
      }
    }
  },
  methods: {
    closeTips: function () {
      this.show = false
    },
    yes: function () {
      this.show = false
      this.$emit('yes', {
        name: 'wenzi',
        age: 36
      }) // 触发yes事件
    },
    showTips () {
      var self = this

      /* let height = self.$refs.tips.clientHeight;
      console.log(height);
            self.styleObject.top=self.styleObject.top-height; */
      self.show = true
      setTimeout(function () {
        // self.show = false;

      }, 2000)
    }
  }
}
</script>

<style>
.tips {
  position: absolute;
  z-index: 1001;
  -webkit-overflow-scrolling: touch;
  max-width: 690px;
  width: 260px;
  padding: 10px;
  background: #000;
  box-shadow: 0 0 10px #888;
  border-radius: 4px;
  opacity: 0.8;
  color: #fff;
}

a {
  color: #fff;
}

.tips-close {
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
}

.tips-header {
  text-align: center;
  font-size: 25px;
}

#demo {
  width: 200px;
  height: 100px;

}

#demo:after {
  border: solid transparent;
  content: ' ';
  height: 0;
  left: 100%;
  position: absolute;
  width: 0;
}

#demo:after {
  border: 10px solid transparent;
  border-top-color: #000;
  opacity: 0.8;
  top: 100%;
  left: 50%;
  margin-left: -10px;
}
</style>
