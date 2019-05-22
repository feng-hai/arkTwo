<template>
<div>


  <Row>
    <Col span="4">
    <Card class="demo-split ">
      <p slot="title">组织结构</p>
      <input class="tree-search-input" type="text" v-model.lazy="searchword" placeholder="search..." />
      <button class=" tree-search-btn" type="button" @click="search">搜索</button>
      <v-tree ref='tree' :data='treeData1' :radio="true" :multiple="false" :halfcheck='true' />
    </Card>
    </Col>
    <Col span="16" style="padding-left:10px; padding-right:10px;">
    <Card>
      <p slot="title">分层图
        <Icon type="md-cloud-upload" @click="openImage" style="font-size:200%;float:right; cursor:pointer;" /> </p>
      <div>
        <vue-layer :data-parent="data" @openModel="openModel" @layerPoint="layerPoint"></vue-layer>

      </div>

      <p>图标大小</p>
      <p class="editP">
        <Slider v-model="sliderNum" @on-change="sliderChange" show-input></Slider>
      </p>
    </Card>

    <Card style="margin-top:10px;">
      <p slot="title">图层设施列表 </p>
      <tablesPage :viewId="viewId"></tablesPage>
    </Card>
    </Col>
    <Col span="4">

    <Card class="pointType">
      <p slot="title">点类型</p>
      <Collapse accordion>
        <Panel name="1" v-model="value2">
          探测器
          <p slot="content" style="height:200px;  overflow: auto; ">
            <RadioGroup v-model="vertical" vertical>
              <Radio label="all">
                <Icon type="social-apple"></Icon>
                <span>全部类型</span>
              </Radio>
              <Radio label="apple">
                <Icon type="social-apple"></Icon>
                <span>剩余电流常规模块</span>
              </Radio>
              <Radio label="android">
                <Icon type="social-android"></Icon>
                <span>压力传感器</span>
              </Radio>
              <Radio label="windows">
                <Icon type="social-windows"></Icon>
                <span>消火栓泵手自动模块</span>
              </Radio>
              <Radio label="android2">
                <Icon type="social-android"></Icon>
                <span>消火栓泵启停模块</span>
              </Radio>
              <Radio label="windows3">
                <Icon type="social-windows"></Icon>
                <span>压力传感器</span>
              </Radio>

              <Radio label="windows4">
                <Icon type="social-windows"></Icon>
                <span>消防炮泵手自动模块</span>
              </Radio>
              <Radio label="android5">
                <Icon type="social-android"></Icon>
                <span>消防炮泵启停模块</span>
              </Radio>
              <Radio label="windows6">
                <Icon type="social-windows"></Icon>
                <span>喷淋泵手自动模块</span>
              </Radio>
              <Radio label="windows7">
                <Icon type="social-windows"></Icon>
                <span>喷淋泵启停模块</span>
              </Radio>
              <Radio label="android8">
                <Icon type="social-android"></Icon>
                <span>常闭式防火门监控模块</span>
              </Radio>
              <Radio label="windows9">
                <Icon type="social-windows"></Icon>
                <span>排烟风机手自动模块</span>
              </Radio>
              <Radio label="windows10">
                <Icon type="social-windows"></Icon>
                <span>排烟风机启停模块</span>
              </Radio>
              <Radio label="android11">
                <Icon type="social-android"></Icon>
                <span>送风机启停模块</span>
              </Radio>
              <Radio label="windows12">
                <Icon type="social-windows"></Icon>
                <span>电梯迫降模块</span>
              </Radio>
              <Radio label="android13">
                <Icon type="social-android"></Icon>
                <span>烟感</span>
              </Radio>
              <Radio label="windows14">
                <Icon type="social-windows"></Icon>
                <span>温感</span>
              </Radio>
              <Radio label="android15">
                <Icon type="social-android"></Icon>
                <span>手报</span>
              </Radio>
              <Radio label="windows16">
                <Icon type="social-windows"></Icon>
                <span>消报</span>
              </Radio>
              <Radio label="android17">
                <Icon type="social-android"></Icon>
                <span>烟火视频分析探头</span>
              </Radio>
              <Radio label="windows18">
                <Icon type="social-windows"></Icon>
                <span>液位传感器</span>
              </Radio>
              <Radio label="android19">
                <Icon type="social-android"></Icon>
                <span>声光报警器</span>
              </Radio>
              <Radio label="windows20">
                <Icon type="social-windows"></Icon>
                <span>稳压泵手自动模块</span>
              </Radio>
              <Radio label="android21">
                <Icon type="social-android"></Icon>
                <span>稳压泵启停模块</span>
              </Radio>
              <Radio label="windows22">
                <Icon type="social-windows"></Icon>
                <span>常闭式排烟阀启闭模块（排</span>
              </Radio>
              <Radio label="android23">
                <Icon type="social-android"></Icon>
                <span>报警主机</span>
              </Radio>
              <Radio label="windows24">
                <Icon type="social-windows"></Icon>
                <span>智能网关SGW-LA1211</span>
              </Radio>
              <Radio label="android25">
                <Icon type="social-android"></Icon>
                <span>压力开关</span>
              </Radio>
              <Radio label="windows26">
                <Icon type="social-windows"></Icon>
                <span>应急广播播放器</span>
              </Radio>
              <Radio label="android27">
                <Icon type="social-android"></Icon>
                <span>280°常开式排烟防火阀启闭</span>
              </Radio>
              <Radio label="windows28">
                <Icon type="social-windows"></Icon>
                <span>电磁阀</span>
              </Radio>
              <Radio label="android29">
                <Icon type="social-android"></Icon>
                <span>气体灭火控制器启停模块</span>
              </Radio>
              <Radio label="windows30">
                <Icon type="social-windows"></Icon>
                <span>信号蝶阀</span>
              </Radio>
              <Radio label="android31">
                <Icon type="social-android"></Icon>
                <span>烟感温感复合探测器</span>
              </Radio>
              <Radio label="windows32">
                <Icon type="social-windows"></Icon>
                <span>应急照明控制模块</span>
              </Radio>
              <Radio label="android33">
                <Icon type="social-android"></Icon>
                <span>水流指示器</span>
              </Radio>
              <Radio label="windows34">
                <Icon type="social-windows"></Icon>
                <span>强切</span>
              </Radio>
              <Radio label="android35">
                <Icon type="social-android"></Icon>
                <span>输入输出模块</span>
              </Radio>
              <Radio label="windows36">
                <Icon type="social-windows"></Icon>
                <span>输入模块</span>
              </Radio>
              <Radio label="android37">
                <Icon type="social-android"></Icon>
                <span>排烟天窗开闭模块</span>
              </Radio>
              <Radio label="windows38">
                <Icon type="social-windows"></Icon>
                <span>强启</span>
              </Radio>
              <Radio label="android39">
                <Icon type="social-android"></Icon>
                <span>输出模块</span>
              </Radio>
              <Radio label="windows">
                <Icon type="social-windows"></Icon>
                <span>nb压力传感器</span>
              </Radio>
              <Radio label="android">
                <Icon type="social-android"></Icon>
                <span>电气火灾状态探测器器（德</span>
              </Radio>

            </RadioGroup>

          </p>
        </Panel>
        <Panel name="2">
          监控视频
          <p slot="content">
            <RadioGroup v-model="vertical1" vertical>
              <Radio label="qiuji">
                <Icon type="social-apple"></Icon>
                <span>球机</span>
              </Radio>
              <Radio label="qiangji">
                <Icon type="social-apple"></Icon>
                <span>枪机</span>
              </Radio>
              <Radio label="other">
                <Icon type="social-apple"></Icon>
                <span>其他</span>
              </Radio>
            </RadioGroup>
          </p>
        </Panel>
        <Panel name="3">
          巡检点位
          <p slot="content">
            <RadioGroup v-model="vertical2" vertical>
              <Radio label="point">
                <Icon type="social-apple"></Icon>
                <span>点位</span>
              </Radio>
            </RadioGroup>
          </p>
        </Panel>
      </Collapse>
    </Card>

    <Card class="optionType">

      <p slot="title">图标操作</p>

      <p>消防设施</p>
      <p class="editP">
        <Select v-model="pointValue.id" style="width:200px">
          <Option v-for="item in deviceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </p>
      <p>设备点位-X</p>
      <p class="editP">
        <Input v-model="pointValue.x" placeholder="Enter something..." style="width: 300px" />
      </p>
      <p>设备点位-Y</p>
      <p class="editP">
        <Input v-model="pointValue.y" placeholder="Enter something..." style="width: 300px" />
      </p>
      <p class="editP">
        <Button @click="preShow">预览</Button>
        <Button type="primary" style="margin-left:10px;">保存</Button>
        <Button type="primary" style="margin-left:10px;" @click="showAll">显示全部</Button>
      </p>


    </Card>
    </Col>
  </Row>

  <Modal v-model="updateImage" width="80%" title="Common Modal dialog box title" >
    <Row>
      <Col span="12" id="tempcol">
      <vue-layer ref="layer01" :data-parent="data1" @openModel="openModel" @layerPoint="layerPoint"></vue-layer>
      <alarmTable></alarmTable>
      </Col>
      <Col span="12">
      <videoTemplate v-if="updateImage" :vwidth="vwidth" :vheight="vheight" ref="videoTemplate" split="3" :iChannelID="iChannelID" :id="id1"></videoTemplate>
      </Col>
    </Row>
    <!-- <updateImage></updateImage> -->
  </Modal>
</div>
</template>
<script>
import layering from '_c/layerford3'
import tablesPage from '@/view/tables/template'
import updateImage from '@/view/tools/updateTemplate'
import alarmTable from '@/view/single-page/home/components/alarmTable'
import {
  windowHeight
} from '@/libs/util'
import {
  mapActions,
  mapGetters,
  mapState
} from 'vuex'
import videoTemplate from '_c/video/index.js'
export default {
  components: {
    vueLayer: layering,
    tablesPage: tablesPage,
    updateImage: updateImage,
    videoTemplate,
    alarmTable
  },
  computed: {
    ...mapGetters([
      "getOrgTreeInfo"
    ])
  },
  data() {
    return {
      vwidth: null,
      vheight: null,
      iChannelID: 2,
      id1: "divPlugin1",
      updateImage: false, //上传图层对话框，默认不显示
      viewId: '570821854F8245B3BBA4A27ACB72F4DB',
      deviceId: '', //待和底图保存的设备id
      pointValue: {
        id: 1,
        x: 100,
        y: 79,
        type: "4",
        name: 'test01',
        content: 'test Content',
        pointImage: require('../../assets/img/t3.png')
      },
      deviceList: [{
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        },
        {
          value: 'Ottawa',
          label: 'Ottawa'
        },
        {
          value: 'Paris',
          label: 'Paris'
        },
        {
          value: 'Canberra',
          label: 'Canberra'
        }
      ],
      vertical: '',
      vertical1: '',
      vertical2: '',
      sliderNum: 100,
      value2: 1,
      searchword: '',
      treeData1: [],
      split1: 0.2,
      tipsOptions: {
        title: 'tip',
        top: '10px',
        left: '10px'
      },
      tempData: [],
      data: {
        divId: 'test001',
        offset_y: 51,
        offset_x: 0,
        slider: 1, //图标放大缩小比例
        //  width: 1000, // 画布宽度
        height: 400, //(windowHeight() - 174 - 51 - 90) < 600 ? 600 : (windowHeight() - 174 - 51 - 90), // 画布高度
        pageTop: 0, // 画布据页面距离
        pageLeft: 0, // 画布距页面左边距离
        zoom: {},
        containerHight: 144, // 底图真实高度
        containerWidth: 243, // 底图真实宽度
        pointImage: require('../../assets/img/t3.png'), // 点的背景图
        backgroudImage: require('../../assets/img/bg.png'), // 画布的备件图
        scrollTop: 0,
        type: 0, //4是新增 5是修改
        dataContent: [{
            id: 1,
            x: 100,
            y: 79,
            type: "4",
            name: 'test01',
            content: 'test Content',
            pointImage: require('../../assets/img/t3.png')
          },
          {
            id: 1,
            x: 100,
            y: 99,
            type: "4",
            name: 'test01',
            content: 'test Content',
            pointImage: require('../../assets/img/t3.png')
          }
        ]

      },
      data1: {
        divId: 'test002',
        offset_y: 51,
        offset_x: 0,
        slider: 1, //图标放大缩小比例
        //  width: 1000, // 画布宽度
        height: 400, //(windowHeight() - 174 - 51 - 90) < 600 ? 600 : (windowHeight() - 174 - 51 - 90), // 画布高度
        pageTop: 0, // 画布据页面距离
        pageLeft: 0, // 画布距页面左边距离
        zoom: {},
        containerHight: 144, // 底图真实高度
        containerWidth: 243, // 底图真实宽度
        pointImage: require('../../assets/img/t3.png'), // 点的背景图
        backgroudImage: require('../../assets/img/bg.png'), // 画布的备件图
        scrollTop: 0,
        type: 0, //4是新增 5是修改
        dataContent: [{
            id: 1,
            x: 100,
            y: 79,
            type: "4",
            name: 'test01',
            content: 'test Content',
            pointImage: require('../../assets/img/t3.png')
          },
          {
            id: 1,
            x: 100,
            y: 99,
            type: "4",
            name: 'test01',
            content: 'test Content',
            pointImage: require('../../assets/img/t3.png')
          }
        ]

      }

    }
  },
  mounted() {


    this.treeData1 = []; // this.getOrgTreeInfo;
    var that = this;
    if (this.treeData1.length == 0) {
      this.getOrgInfoAction().then(res => {
        that.treeData1 = that.getOrgTreeInfo;
        console.log(that.treeData1, "  that.treeData1");

      })
    }
    var that = this


    if ($("#layering").width() > 1000) {
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
    ...mapActions([
      'getOrgInfoAction'

    ]),
    openImage() {
      this.updateImage = true;
      var that = this;
      this.$nextTick(function() {

        that.$refs.layer01.initPage();
        setTimeout(function(){
          that.vheight = $("#tempcol").height();
          that.vwidth = $("#tempcol").width();
          // that.$refs.videoTemplate.initVideo();

        },100)
        //  that.$refs.videoTemplate.initVideo();
      })

    },
    preShow() {
      var temp = [];
      temp.push(this.pointValue)
      this.data.type = 4;
      this.tempData = this.data.dataContent;
      this.data.dataContent = temp;
    },
    showAll() {
      this.data.type = 0;
      this.data.dataContent = this.tempData;
    },
    openModel(e) {
      console.log(e, "獲取車輛信息")
      this.pointValue = e;

    },
    search() {

      this.$refs.tree.searchNodes(this.searchword)
    },
    sliderChange() {
      this.data.slider = this.sliderNum / 100;
    },
    layerPoint: function(val) {
      console.log('父页面打印数据' + val)
      console.log(this.data.slider)

      console.log(val[0], val[1]);
      this.pointValue.x = val[0];
      this.pointValue.y = val[1];
    },
    // 监听从组件内传递出来的事件
    yes(args) {
      // console.log( args );
      alert(JSON.stringify(args))
    },

    // 显示tips
    showtips() {
      // console.log( this.$refs );
      this.$refs.dialog.showTips()
    }
  },
  watch: {
    data: {
      handler(newValue, oldValue) {
        console.log(newValue)
      },
      deep: true
    },
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
  created() {
    var that = this;
    this.$nextTick(function() {


    })



  }
}
</script>

<style>
.editP {
  padding: 10px 10px 10px 0px
}

.demo-split {
  height: calc(100vh - 144px);
  border: 1px solid #dcdee2;
}

.optionType {
  height: calc(60vh - 100px);
  margin-top: 10px;
  min-height: 450px;
}

.pointType {
  height: calc(60vh - 100px);
  min-height: 450px;
}

.demo-split-pane {
  padding: 10px;
  position: relative;
}
</style>
