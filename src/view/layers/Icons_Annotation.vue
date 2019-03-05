<template>
<div>
  <vue-layer :data-parent="data" @layerPoint="layerPoint"></vue-layer>
  <div class="block">
    <span class="demonstration">自定义初始值</span>
    <!-- <el-slider v-model="data.slider" :max="10" :step="0.1"></el-slider> -->
  </div>

</div>
</template>
<script>
import layering from '_c/layerford3'

export default {
  components: {
    vueLayer: layering
  },
  data () {
    return {
      tipsOptions: {
        title: 'tip',
        top: '10px',
        left: '10px'
      },
      data: {
        slider: 1,
        width: 1000, // 画布宽度
        height: 800, // 画布高度
        pageTop: 144, // 画布据页面距离
        pageLeft: 243, // 画布距页面左边距离
        zoom: {},
        containerHight: 144, // 底图高度
        containerWidth: 243, // 底图宽度
        pointImage: require('../../assets/img/t3.png'), // 点的背景图
        backgroudImage: require('../../assets/img/bg.png'), // 画布的备件图
        scrollTop: 0,
        type: 0,
        dataContent: [{
          id: 1,
          x: 100,
          y: 79,
          type: 1,
          name: 'test01',
          content: 'test Content',
          pointImage: require('../../assets/img/t3.png')
        }]

      }

    }
  },
  mounted () {
    var that = this
    console.log("layering",$("#layering").width())
    if($("#layering").width()>1000)
    {
  //  this.data.width=  $("#layering").width()
    }
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
    layerPoint: function (val) {
      console.log('父页面打印数据' + val)
      console.log(this.data.slider)
    },
    // 监听从组件内传递出来的事件
    yes (args) {
      // console.log( args );
      alert(JSON.stringify(args))
    },

    // 显示tips
    showtips () {
      // console.log( this.$refs );
      this.$refs.dialog.showTips()
    }
  },
  watch: {
    data: {
      handler (newValue, oldValue) {
        console.log(newValue)
      },
      deep: true
    }

  }
}
</script>

<style lang="scss" scoped>

</style>
