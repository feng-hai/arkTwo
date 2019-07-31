<template>
  <div id="alarmTable" style="width:100%;height:100%;" class="big_table">
    <!-- <p>
         <i class="iconfont icon-baojing"></i><span>{{title}}</span>
    </p>-->
    <!-- <Row>
      <Col span="6" class="big_table_cell">扣分项</Col>
      <Col span="6" class="big_table_cell">扣分值</Col>
      <Col span="6" class="big_table_cell">扣分项</Col>
      <Col span="6" class="big_table_cell">扣分值</Col>
    </Row> -->
    <div
      class="test test-1"
      :style="{height:scollHeight+'px'}"
      @mouseover="mouseover"
      @mouseout="mouseout"
    >
      <div class="scrollbar" :style="{right:scollRight+'px'}">
        <div>
          <Row >
            <Col span="6" class="big_table_cell" v-for="(item , index) in alarmArray" :key="index">
            <dangerDetail :option="item"></dangerDetail>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { windowHeight } from '@/libs/util'
import dangerDetail from './dangerDetail'
const prefixCls = 'ivu-page'
export default {
  props: {
    scollHeight: {
      type: Number,
      default () {
        return 300
      }
    }
  },
  components:{
dangerDetail
  },
  data () {
    return {
      myBarOption: {
        barColor: '#959595', // 滚动条颜色
        barWidth: 6, // 滚动条宽度
        railColor: '#eee', // 导轨颜色
        barMarginRight: 0, // 垂直滚动条距离整个容器右侧距离单位（px）
        barMaginBottom: 0, // 水平滚动条距离底部距离单位（px)
        barOpacityMin: 0.3, // 滚动条非激活状态下的透明度
        zIndex: 'auto', // 滚动条z-Index
        autohidemode: true, // 自动隐藏模式
        horizrailenabled: true // 是否显示水平滚动条
      },
      scollRight: 0,
      forceGemini: true,
      title: '报警信息',
      alarmArray: [
        {
          url: require("@/assets/temp/a.jpg"),
          name: "消防设施",
          type: '一般隐患',
          comment: '地灯不亮'
        },
        {
        url: require("@/assets/temp/b.jpg"),
          name: "消防设备",
          type: '一般隐患',
          comment: '手动按钮脱落'
        },
         {
         url: require("@/assets/temp/c.jpg"),
          name: "消防设备",
          type: '一般隐患',
          comment: '缺失水带'
        },
        {
       url: require("@/assets/temp/d.jpg"),
          name: "消防设备",
          type: '重大隐患',
          comment: '锈蚀漏水'
        }
      ]
    }
  },
  methods: {
    mouseover: function () {
      //  this.scollRight=0;
    },
    mouseout: function () {
      //  this.scollRight=-17;
    }
  }
}
</script>
  <style lang="scss">
// .scrollbar .conten-rig li{
//   float: left;
//   padding: 10px;
//   list-style-type: none;
//
// }
#alarmTable .big_table_cell {
  color: #5bf4fd;
  padding: 10px 10px 10px 10px;
  font-size: 12px;
  text-align: center;
}
#alarmTable .big_table {
  background-color: rgba(24, 35, 50, 0.1);
  padding: 15px;
  p {
    padding-bottom: 10px;
    text-align: left;
    i {
      color: #5bf4fd;
    }
    span {
      font-size: 14px;
      color: #fff;
      padding-left: 8px;
    }
  }
}
#alarmTable .my-scroll-bar {
  height: 200px;
}
#alarmTable .clear {
  clear: both;
}

/* override gemini-scrollbar default styles */

/* vertical scrollbar track */
#alarmTable .gm-scrollbar.-vertical {
  background-color: red;
}

/* horizontal scrollbar track */
#alarmTable .gm-scrollbar.-horizontal {
  background-color: transparent;
}

/* scrollbar thumb */
#alarmTable .gm-scrollbar .thumb {
  background-color: rebeccapurple;
}
#alarmTable .gm-scrollbar .thumb:hover {
  background-color: fuchsia;
}

#alarmTable .test {
  width: 100%;
  //  height: calc(100vh - 168px);
  //overflow: auto;
  // float: left;
  // margin: 5px;
  border: none;
  position: relative;
  overflow: hidden;
}
#alarmTable .scrollbar {
  position: absolute;
  left: 0;
  top: 0;
  //  right: -17px;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}

#alarmTable .scrollbar::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 10px;
}
#alarmTable .scrollbar::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}
#alarmTable .scrollbar::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}
</style>
