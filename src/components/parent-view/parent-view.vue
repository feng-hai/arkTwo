<template>
<Layout class="big_mains_home">
  <!-- <Header id="header" class="backColor">Header</Header> -->
  <Row class="big_header">
    <Col span="8">
    <show-current-time />
    </Col>
    <Col span="8" class="big_cente">
    <span><Icon style="margin-bottom:5px;margin-right:5px;" type="md-train" /></span><span @click="openMedol">南京动车段智慧消防安防平台</span>
    </Col>
    <Col span="8">
    <div style="float:right;margin-right:50px;">
      <user :message-unread-count="unreadCount" :user-avator="userAvator" style="float:right;" />
      <div style="color:red;font-size:25px; float:right;line-height: 1;margin-right:10px;" title="应急预案" @click="modal1=true"> <Icon type="ios-bookmark-outline" /></div>
      <titles style="margin-right:10px;float:right" name="动车段管理员" />
      
    </div>
    </Col>
  </Row>
  <Layout class="backColor">
    <Sider hide-trigger width="400" id="slider" class="backColor bigSliderLeft">
      <deviceStatus @on-click="turnToPage" class="backImage" :chartsHeight='chartsHeight' style=" margin:0 10px 0 10px" />
      <vedioStatus2 @on-click="turnToPage" :chartsHeight='chartsHeight' class="backImage" style="margin:10px 10px 0 10px" />
      <alarm @on-click="turnToPage" :chartsHeight='chartsHeight' class="backImage" style="margin:10px 10px 0 10px" />
    </Sider>
    <Content class="main-content-con backColor">

      <Layout class="main-layout-con backColor">
        <!-- <div class="tag-nav-wrapper">
            <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
          </div> -->
        <Content class="content-wrapper backColor backImage">
          <keep-alive :include="cacheList" :exclude="notCacheName">
            <router-view ref="child" />
          </keep-alive>
        </Content>
      </Layout>
    </Content>
    <Sider hide-trigger width="400" class="backColor bigSliderRight">
      <jobControl @on-click="turnToPage" :chartsHeight='chartsHeight' class="backImage" style="margin:0 10px 0 10px;margin-right:10px" />
      <ElectronicFence @on-click="turnToPage" :chartsHeight='chartsHeight' class="backImage" style="margin:10px 10px 10px 10px;margin-right:10px" />
      <daozha @on-click="turnToPage" :chartsHeight='chartsHeight' class="backImage" style="margin:0px 10px 10px 10px;margin-right:10px" />
    </Sider>
    <plan :isShow="modal1" @close="modal1=false"></plan>
  </Layout>
</Layout>
</template>
<script>
import deviceStatistics from './components/deviceStatistics'
import deviceStatus from './components/deviceStatus'
import vedioStatus from './components/vedioStatus'
import vedioStatus2 from './components/vedioStatus2'
import jobControl from './components/jobControl'
import ElectronicFence from './components/ElectronicFence'
import showCurrentTime from "./components/times"
import daozha from "./components/daozha"
import alarm from "./components/alarm"
import User from './components/user/'
import titles from "./components/titles"
import './parent-view.less'
import plan from '@/view/single-page/home/components/contingencyPlan.vue'
// import {
//   mapActions,
//   mapGetters,
//   mapState
// } from 'vuex'
export default {
  name: 'ParentView',
  components: {
    deviceStatistics,
    deviceStatus,
    vedioStatus,
    vedioStatus2,
    jobControl,
    ElectronicFence,
    showCurrentTime,
    daozha,
    alarm,
    User,
    titles,
    plan
  },
  data() {
    return {
      chartsHeight: 170,
      unreadCount: 0,
      modal1: false
    }
  },
  computed: {
    userAvator() {
      return this.$store.state.user.avatorImgPath
    },
    tagNavList() {
      return this.$store.state.app.tagNavList
    },
    notCacheName() {
      return [(this.$route.meta && this.$route.meta.notCache) ? this.$route.name : '']
    },
    cacheList() {
      return ['ParentView', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
    }
  },
  created() {
    this.chartsHeight = ($(window).height() - 30 - 106) / 3 - 28
  },
  methods: {
    // ...mapActions([
    //   'getBigInfoAction'
    //
    // ]),
    turnToPage(to) {
      this.$router.push({
        name: to,
        meta: {
          title: `视图管理`,
          notCache: false
        }
      })
    },
    openMedol() {
      this.modal1 = true;
      // this.$layer.alert("找不到对象！");
      //   this.$layer.iframe({
      // 		content: {
      // 		  content: pv, //传递的组件对象
      // 		  parent: this,//当前的vue对象
      // 		  data:[]//props
      // 		},
      // 		area:['1000px','800px'],
      // 		title:"editForm"
      // });

    }
  },
  mounted() {
    // //访问车辆状态数据
    // this.getBigInfoAction({
    //   channel: 'FIRE_FACILITY',
    //   system_id: '157'
    // }).then(res => {
    //   console.log(res);
    //
    // })

  }
}
</script>
