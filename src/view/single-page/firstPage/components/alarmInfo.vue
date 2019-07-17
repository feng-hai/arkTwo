<template>
     <div style="width:100%;height:100%;" class=" big_table backImage">
         <p>
           <i class="iconfont icon-baojing"></i><span>{{title}}</span>
         </p>
         <div class="test test-1" @mouseover="mouseover"   @mouseout="mouseout">
            <div class="scrollbar" :style="{right:scollRight+'px'}">
                <div>
                  <Row v-for="(item , index) in alarmArray" :key="index">
                      <Col span="6" class="big_table_cell">{{item.datetime}}</Col>
                      <Col span="6" class="big_table_cell">{{item.domainName}}</Col>
                      <Col span="6" class="big_table_cell">{{item.area}}</Col>
                      <Col span="6" class="big_table_cell">{{item.typeName}}</Col>
                  </Row>
               </div>
            </div>
          </div>
      </div>
  </template>
<script>
const prefixCls = 'ivu-page'
export default {
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
        horizrailenabled: true// 是否显示水平滚动条
      },
      scollRight: -17,
      forceGemini: true,
      title: '报警信息',
      alarmArray: [
        {
          datetime: '2019-05-15 10:21:21',
          domainName: '南京动车所',
          area: '二次东区',
          typeName: '烟感报警'
        },
        {
          datetime: '2019-05-15 10:22:21',
          domainName: '南京动车所',
          area: '二次东区',
          typeName: '烟感报警'
        },
        {
          datetime: '2019-05-15 10:21:21',
          domainName: '南京动车所',
          area: '二次东区',
          typeName: '烟感报警'
        },
        {
          datetime: '2019-05-15 10:22:21',
          domainName: '南京动车所',
          area: '二次东区',
          typeName: '烟感报警'
        },
        {
          datetime: '2019-05-15 10:21:21',
          domainName: '南京动车所',
          area: '二次东区',
          typeName: '烟感报警'
        },
        {
          datetime: '2019-05-15 10:22:21',
          domainName: '南京动车所',
          area: '二次东区',
          typeName: '烟感报警'
        }, {
          datetime: '2019-05-15 10:21:21',
          domainName: '南京动车所',
          area: '二次东区',
          typeName: '烟感报警'
        },
        {
          datetime: '2019-05-15 10:22:21',
          domainName: '南京动车所',
          area: '二次东区',
          typeName: '烟感报警'
        },
        {
          datetime: '2019-05-15 10:21:21',
          domainName: '南京动车所',
          area: '二次东区',
          typeName: '烟感报警'
        },
        {
          datetime: '2019-05-15 10:22:21',
          domainName: '南京动车所',
          area: '二次东区',
          typeName: '烟感报警'
        },
        {
          datetime: '2019-05-15 10:21:21',
          domainName: '南京动车所',
          area: '二次东区',
          typeName: '烟感报警'
        },
        {
          datetime: '2019-05-15 10:22:21',
          domainName: '南京动车所',
          area: '二次东区',
          typeName: '烟感报警'
        },
        {
          datetime: '2019-05-15 10:21:21',
          domainName: '南京动车所',
          area: '二次东区',
          typeName: '烟感报警'
        },
        {
          datetime: '2019-05-15 10:22:21',
          domainName: '南京动车所',
          area: '二次东区',
          typeName: '烟感报警'
        }, {
          datetime: '2019-05-15 10:21:21',
          domainName: '南京动车所',
          area: '二次东区',
          typeName: '烟感报警'
        },
        {
          datetime: '2019-05-15 10:22:21',
          domainName: '南京动车所',
          area: '二次东区',
          typeName: '烟感报警'
        }
      ]
    }
  },
  methods: {
    mouseover: function () {
      this.scollRight = 0
    },
    mouseout: function () {
      this.scollRight = -17
    }
  }
}
</script>
  <style lang="scss">
  .big_table_cell{
    color:rgb(255, 80, 80);
    padding:10px 10px 10px 10px;
    font-size: 12px;
    text-align: center;
  }
  .big_table{
      background-color: rgba(24,35,50,0.1);
      padding: 15px;
      p {
          padding-bottom: 10px;
          text-align: left;
          i {
              color: #5bf4fd;
          }
          span {
              font-size: 14px;
              color: #00ceff;
              padding-left: 8px;
          }
      }
  }
  .my-scroll-bar{
      height:200px;
  }
  .clear{ clear:both}

  /* override gemini-scrollbar default styles */
/* vertical scrollbar track */
.gm-scrollbar.-vertical {
  background-color: red
}

/* horizontal scrollbar track */
.gm-scrollbar.-horizontal {
  background-color: transparent;
}
/* scrollbar thumb */
.gm-scrollbar .thumb {
  background-color: rebeccapurple;
}
.gm-scrollbar .thumb:hover {
  background-color: fuchsia;
}

.test{
    width: 100%;
    height:  calc(100vh - 660px);
    //overflow: auto;
    // float: left;
    // margin: 5px;
    border: none;
    position: relative;
	  overflow: hidden;
}
.scrollbar{
  position: absolute;
	left: 0;
	top: 0;
	//  right: -17px;
	bottom: 0;
	overflow-x: hidden;
	overflow-y: scroll;
}

.scrollbar::-webkit-scrollbar {/*滚动条整体样式*/
        width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 10px;
    }
.scrollbar::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 10px;
         -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #535353;
    }
.scrollbar::-webkit-scrollbar-track {/*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        border-radius: 10px;
        background: #EDEDED;
    }
  </style>
