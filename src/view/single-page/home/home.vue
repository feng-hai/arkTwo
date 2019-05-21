<template>
<div id="big_layers" class="backImage home_first drag-drawer-inner-box">

  <vue-layer v-show="showMapBDrawer" class="edit" :data-parent="data"></vue-layer>
  <pointsTable v-show="showTableBDrawer"></pointsTable>
  <ButtonGroup  class="buttonType">
    <Tooltip content="楼层信息" placement="right-start">
        <Button icon="ios-git-network" type="info" class="layersButtonBottom" @click="showCompanyBDrawer = !showCompanyBDrawer"></Button>
    </Tooltip><br/>
    <Tooltip content="设备类型" placement="right-start">
        <Button icon="ios-switch-outline"  class="layersButtonUp layersButtonBottom"  type="info" @click="showContainerBDrawer = !showContainerBDrawer"></Button>
    </Tooltip><br/>
    <Tooltip content="列表展示" placement="right-start">
          <Button icon="ios-keypad-outline"  class="layersButtonUp layersButtonBottom"  type="info" @click="changeTable"></Button>
    </Tooltip><br/>
    <Tooltip content="地图展示" placement="right-start">
          <Button icon="ios-map-outline" class="layersButtonUp" type="info" @click="changeMap"></Button>
    </Tooltip>
  </ButtonGroup>
  <div v-show="showMapBDrawer">
    <p class="edit">图标大小</p>
    <p class="editP">
      <Slider v-model="sliderNum" @on-change="sliderChange" show-input></Slider>
    </p>
  </div>
  <drag-drawer v-model="showContainerBDrawer" :width.sync="width1" min-width="30px" :inner="true" :transfer="false" :placement="placementComputed" @on-resize="handleResize" :scrollable="true">
    <deviceType>
    </deviceType>
  </drag-drawer>
  <drag-drawer v-model="showCompanyBDrawer" :width.sync="width2" min-width="30px" :inner="true" :transfer="false" placement="left" :draggable="draggable" @on-resize="handleResize" :scrollable="true">
    <v-tree ref='tree'style="margin-top:20px; margin-left:20px;" :data='treeData1' :radio="true" :multiple="false" :halfcheck='true' />
  </drag-drawer>

</div>
</template>

<script>
import {
  windowHeight
} from '@/libs/util'
import {
  mapActions,
  mapGetters,
  mapState
} from 'vuex'
import layering from '_c/layerford3'
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import DragDrawer from '_c/drag-drawer'
import {
  ChartPie,
  ChartBar
} from '_c/charts'
import Example from './example.vue'
import pointsTable from './components/pointsTable.vue'
import deviceType from './components/deviceType.vue'
// import {
//   mapActions,
//   mapGetters,
//   mapState
// } from 'vuex'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example,
    vueLayer: layering,
    DragDrawer,
    pointsTable,
    deviceType
  },
  data() {
    return {
      treeData1: [],
      showMapBDrawer: true,
      showCompanyBDrawer: false,
      showContainerBDrawer: false,
      showTableBDrawer: false,
      showBDrawer3: false,
      width1: 300,
      width2: 400,
      placement: false,
      draggable: true,
      sliderNum: 50,
      data: {
        offset_y: -15,
        offset_x: -5,
        slider: 0.5, //图标放大缩小比例
        //  width: 1000, // 画布宽度
        height: (windowHeight() - 174) < 600 ? 600 : (windowHeight() - 174), // 画布高度
        pageTop: 0, // 画布据页面距离
        pageLeft: 0, // 画布距页面左边距离
        zoom: {},
        containerHight: 144, // 底图真实高度
        containerWidth: 243, // 底图真实宽度
        pointImage: require('../../../assets/img/t3.png'), // 点的背景图
        backgroudImage: require('../../../assets/img/bg.png'), // 画布的备件图
        scrollTop: 0,
        type: 0, //4是新增 5是修改
        dataContent: [{
            id: 1,
            x: 100,
            y: 79,
            type: "4",
            name: 'test01',
            content: 'test Content',
            pointImage: require('../../../assets/img/t3.png')
          },
          {
            id: 1,
            x: 100,
            y: 99,
            type: "4",
            name: 'test01',
            content: 'test Content',
            pointImage: require('../../../assets/img/t3.png')
          }
        ]

      },
      inforCardData: [{
          title: '新增用户',
          icon: 'md-person-add',
          count: 803,
          color: '#2d8cf0'
        },
        {
          title: '累计点击',
          icon: 'md-locate',
          count: 232,
          color: '#19be6b'
        },
        {
          title: '新增问答',
          icon: 'md-help-circle',
          count: 142,
          color: '#ff9900'
        },
        {
          title: '分享统计',
          icon: 'md-share',
          count: 657,
          color: '#ed3f14'
        },
        {
          title: '新增互动',
          icon: 'md-chatbubbles',
          count: 12,
          color: '#E46CBB'
        },
        {
          title: '新增页面',
          icon: 'md-map',
          count: 14,
          color: '#9A66E4'
        }
      ],
      pieData: [{
          value: 335,
          name: '直接访问'
        },
        {
          value: 310,
          name: '邮件营销'
        },
        {
          value: 234,
          name: '联盟广告'
        },
        {
          value: 135,
          name: '视频广告'
        },
        {
          value: 1548,
          name: '搜索引擎'
        }
      ],
      barData: {
        Mon: 13253,
        Tue: 34235,
        Wed: 26321,
        Thu: 12340,
        Fri: 24643,
        Sat: 1322,
        Sun: 1324
      }
    }
  },
  computed: {
    placementComputed() {
      return this.placement ? 'left' : 'right'
    },
    ...mapGetters([
      "getOrgTreeInfo"
    ])
  },
  methods: {
    ...mapActions([
      'getOrgInfoAction'

    ]),
    sliderChange() {
      this.data.slider = this.sliderNum / 100;
    },
    handleResize() {

    },
    changeMap() {
      this.showTableBDrawer = false;
      this.showMapBDrawer = true;

    },
    changeTable() {
      this.showTableBDrawer = true;
      this.showMapBDrawer = false;
    }
    // 在首页初始化公共数据
    // ...mapActions([
    //   "getOrgInfoAction",
    //   'getMenuInfoAction'
    // ]),
  },
  watch: {
    '$route' (to, from) {
      this.treeData1 = []; // this.getOrgTreeInfo;
      this.treeData1 = this.getOrgTreeInfo;
      var that = this;
      if (this.treeData1.length == 0) {
        this.getOrgInfoAction().then(res => {
          that.treeData1 = that.getOrgTreeInfo;

        })
      }
    }
  },
  mounted() {
    // this.getOrgInfoAction();
    // this.getMenuInfoAction();
    this.treeData1 = []; // this.getOrgTreeInfo;
    var that = this;
    if (this.treeData1.length == 0) {
      this.getOrgInfoAction().then(res => {
        that.treeData1 = that.getOrgTreeInfo;

      })
    }
  }
}
</script>

<style >
#big_layers .ivu-btn-info {
  color: #fff;
  background-color: rgba(0, 0, 55, 0.2) !important;
  border-color: #2db7f5;
}

#big_layers .buttonType {
  position: absolute;
  top: 40%;
  left: 10px;
}

#big_layers .ivu-tooltip-inner
{
  background-color: rgba(70, 76, 91, 0.2) !important;
}
#big_layers .halo-tree .tree-expand {
  background-color: rgba(0, 0, 55, 0) !important;
}

#big_layers .halo-tree .tree-node-el {
  background-color: rgba(0, 0, 55, 0) !important;
  color: #fff
}

#big_layers {
  position: relative;
  overflow: hidden !important;
}

#big_layers .layersButtonBottom
{
  border-bottom-right-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
}
#big_layers .layersButtonUp
{
  border-top-left-radius: 0px !important;
  border-top-right-radius: 0px !important;
}
#big_layers .ivu-drawer-wrap {
  overflow: hidden !important;
}

#big_layers .ivu-drawer-content {
  background-color: rgba(0, 0, 55, 0.6) !important;
}

#big_layers .ivu-drawer-mask {
  background-color: rgba(0, 0, 0, 0) !important;
}


#big_layers {
  height: calc(100vh - 104px);
  background-color: rgba(24, 35, 50, 0.1);
}

#big_layers .editP {
  padding: 0px 10px 10px 10px
}

#big_layers .edit {
  padding: 0px 10px 0px 10px
}
</style>
