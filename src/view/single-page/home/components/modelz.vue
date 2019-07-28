<template>
<div id ="modelz">
<div v-if="isShow" class="tempShowModel"  >
  <div class="temp-ivu">
    <div class="temp-ivu-close" @click="closeModel">
      <Icon type="ios-close" />
    </div>
    <div class="content">
      <Row>
        <Col span="12" id="tempcol">
        <div style="    border: 1px solid #5bf4fd; margin-bottom:15px; margin-right:15px;">
          <vue-layer ref="layer01" :data-parent="data" @openModel="openModel" @layerPoint="layerPoint"></vue-layer>
        </div>
        <div style="    border: 1px solid #5bf4fd; margin-right:15px;padding:10px;">
          <alarmTable></alarmTable>
        </div>
        </Col>
        <Col span="12">
        <videoTemplate v-if="isShow" :vwidth="vwidth" :vheight="vheight" ref="videoTemplate" split="3" :iChannelID="iChannelID" :id="id1"></videoTemplate>
        </Col>
      </Row>
    </div>
  </div>
</div>
</div>
</template>
<script>
import alarmTable from '@/view/single-page/home/components/alarmTable'
import videoTemplate from '_c/video/index.js'
import layering from '_c/layerford3'
import {
  windowHeight
} from '@/libs/util'
export default {
  props: {
    isShow: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  components: {
    vueLayer: layering,
    alarmTable,
    videoTemplate
  },
  watch: {
    isShow (n, o) {
      console.log(n, o, 'ddddddddddd')
      var that = this
      this.$nextTick(function () {
        setTimeout(function () {
          that.vheight = $('#tempcol').height()
          that.vwidth = $('#tempcol').width()
        }, 100)
        //  that.$refs.videoTemplate.initVideo();
      })
    }
  },
  data () {
    return {
      vwidth: null,
      vheight: null,
      iChannelID: 2,
      id1: 'divPlugin1',
      data: {
        divId: 'test002',
        offset_y: -15,
        offset_x: -5,
        slider: 0.5, // 图标放大缩小比例
        //  width: 1000, // 画布宽度
        height: (windowHeight() - 174) < 600 ? 300 : (windowHeight() - 174) / 2 - 50, // 画布高度
        pageTop: 0, // 画布据页面距离
        pageLeft: 0, // 画布距页面左边距离
        zoom: {},
        containerHight: 144, // 底图真实高度
        containerWidth: 243, // 底图真实宽度
        pointImage: require('../../../../assets/img/t3.png'), // 点的背景图
        backgroudImage: require('../../../../assets/img/test.png'), // 画布的备件图
        scrollTop: 0,
        type: 0, // 4是新增 5是修改
        dataContent: [{
          id: 1,
          x: 100,
          y: 79,
          type: '1',
          name: 'test01',
          content: 'test Content',
          pointImage: require('../../../../assets/img/b-1.png')
        },
        {
          id: 1,
          x: 100,
          y: 99,
          type: '4',
          name: 'test01',
          content: 'test Content',
          pointImage: require('../../../../assets/img/c-3.png')
        }
        ]

      }
    }
  },
  methods: {
    closeModel () {
      this.$emit('close')
    },
    openModel () {

    },
    layerPoint () {

    }
  }
}
</script>
<style lang="less">
#modelz
{


 .tempShowModel {
  position: fixed;
  overflow: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  -webkit-overflow-scrolling: touch;
  outline: 0;
}

 .temp-ivu {
  width: 80%;
  margin: 0 auto;
  position: relative;
  outline: none;
  top: 100px;
}

 .temp-ivu-close {
  z-index: 1;
  font-size: 30px;
  position: absolute;
  right: 5px;
  top: -8px;
  color: #fff;
  overflow: hidden;
  cursor: pointer;
}

.content {
  position: relative;
  background-color: rgba(0, 0, 0, 0.8);
  border: 0;
  padding: 25px 25px 25px 25px;
  border-radius: 6px;
  background-clip: padding-box;
  -webkit-box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
}
</style>
