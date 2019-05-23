<template>
<div v-if="isShow" class="tempShowModel" >
  <div class="temp-ivu">
    <div class="temp-ivu-close" @click="closeModel">
      <Icon type="ios-close" />
    </div>
    <div class="content">
      <Row>
        <Col span="12" id="tempcol">
        <div style="    border: 1px solid #5bf4fd; margin-bottom:15px; margin-right:15px;">
          <p class="yaname">应急预案01</p>
        </div>
        <div style="    border: 1px solid #5bf4fd; margin-bottom:15px; margin-right:15px;">
          <p class="yaTitle">应急小组</p>
          <Row v-for="(item , index) in alarmArray" :key="index">
            <Col span="8">
            <p class="yaContent yacenter">{{item.role}}</p>
            </Col>
            <Col span="8">
            <p class="yaContent yacenter">{{item.name}}</p>
            </Col>
            <Col span="8">
            <p class="yaContent yacenter">{{item.phone}}</p>
            </Col>
          </Row>
        </div>
        <div style="    border: 1px solid #5bf4fd; margin-right:15px;padding:10px;">
          <p class="yaTitle">人员职责</p>
          <p class="yaContent">1、 为了统筹指挥，公司确定注册安全主任为火灾总指挥，负责火灾应急时的全盘指挥工作。注册安全主任在火灾发生时不在厂内时总指挥由公司行政副总担任；节假日期间由公司安排的值班负责人担任；</p>
          <p class="yaContent">2、 保安组长是火警时的副指挥，在总指挥的领导下负责现场具体的灭火抢救工作；各部门负责人任现场指挥；</p>
          <p class="yaContent">3、 总指挥、副指挥和现场指挥应在接到火警后的第一时间内赶到火灾现场；</p>
        </div>
        </Col>
        <Col span="12">
        <div style="  height:693px;   border: 1px solid #5bf4fd;">
          <p class="yaTitle">应急预案</p>
          <p class="yaContent"> 1、 在本部门（或车间）发生火灾时，在岗员工应立即对初起火灾进行扑救，就近原则运用灭火器材（如灭火器、消防栓等）扑灭火源；使用灭火器要注意以下要点：先拉开保险栓，操作者站在上风位置，侧身作业，手按压柄，距火点二米位置胶管对准火源扫射；
          </p>
          <p class="yaContent"> 2、 当火势未能得到控制时，要立即通知当班保安和安全负责人（本司由人资部主管担任）；
          </p>
          <p class="yaContent">3、 当班保安接到火警后，立即通知全厂警戒并通知保安组长迅速调集全体保安员利用身边的灭火器材赶到火灾现场参加扑救，并且做好火灾现场人员秩序维护和无关人员的疏散撤离工作；
          </p>
          <p class="yaContent"> 4、 当火灾蔓延到非本厂力量所能控制的程度时，在岗员工应立即敲破玻璃按响火灾按钮使用消防水栓，并安排报警——119，（报警人员应向消防部门详细报告火灾的现场情况，包括火场的单位名称和具体位置、燃烧物资、人员围困情况、联系电话和姓名等信息），并安排人员到路口接消防车，以便消防队员把握火灾情况和尽快抵达，采取相应的灭火措施，抓住救灾时机；
          </p>
          <p class="yaContent"> 5、 火灾应急总指挥和现场指挥在接到火警后应在第一时间内赶赴火灾现场指挥扑救工作，指挥设备维修组把电梯迫降到底层，并切断生产区的电源，同时保证各消防设施的正常运转；

          </p>
          <p class="yaContent">6、 火灾警报拉响后各部门应立即切断电源，并组织本部门（或车间）人员撤离到安全区域待命；
          </p>
          <p class="yaContent">7、 人资部立即组织司机疏散本厂内停放的车辆和厂门口的障碍物，以确保救灾现场的畅通和车辆用急。</p>
          <p></p>
          <p></p>
          <p></p>
        </div>
        </Col>
      </Row>
    </div>
  </div>
</div>
</template>
<script>


import {
  windowHeight
} from '@/libs/util'
export default {
  props: {
    isShow: {
      type: Boolean,
      default () {
        return false;
      }
    }
  },
  components: {



  },
  watch: {
    isShow(n, o) {
      console.log(n, o, "ddddddddddd")
      var that = this;
      this.$nextTick(function() {
        setTimeout(function() {
          that.vheight = $("#tempcol").height();
          that.vwidth = $("#tempcol").width();

        }, 100)
        //  that.$refs.videoTemplate.initVideo();
      })
    }
  },
  data() {
    return {
      vwidth: null,
      vheight: null,
      iChannelID: 2,
      id1: "divPlugin1",
      alarmArray: [{
          role: '组长',
          name: '张xx',
          phone: '13xxxxxxxx',

        },
        {
          role: '副组长',
          name: '张xx',
          phone: '13xxxxxxxx',
        },
        {
          role: '消防组',
          name: '张xx',
          phone: '13xxxxxxxx',
        }, {
          role: '消防组',
          name: '张xx',
          phone: '13xxxxxxxx',
        }, {
          role: '消防组',
          name: '张xx',
          phone: '13xxxxxxxx',
        }, {
          role: '消防组',
          name: '张xx',
          phone: '13xxxxxxxx',
        }

      ]

    }
  },
  methods: {
    closeModel() {
      this.$emit("close")
    },
    openModel() {

    },
    layerPoint() {

    }
  }
}
</script>
<style>
.yaTitle {
  color: #5bf4fd;
  font-size: 25px;
  text-align: center;
  padding: 20px 20px 20px 20px;
}

.yaname {
  color: #5bf4fd;
  font-size: 15px;
  text-align: center;
  padding: 20px 20px 20px 20px;
}

.yaContent {
  font-size: 15px;
  color: #5bf4fd;

  padding: 10px 10px 10px 10px;
}

.yacenter {
  text-align: center;
}

.tempShowModel {
  position: fixed;
  overflow: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
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
</style>
