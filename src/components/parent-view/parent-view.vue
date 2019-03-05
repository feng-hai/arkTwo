<template>
<Layout class="mains">
  <!-- <Header id="header" class="backColor">Header</Header> -->
  <Row class="header">
    <Col span="18" push="6">
    <div style="float:right;">
      <user :message-unread-count="unreadCount" :user-avator="userAvator" style="float:right;" />
      <titles style="margin-right:70px;" />
    </div>
    </Col>
    <Col span="6" pull="18">
    <show-current-time />
    </Col>
  </Row>
  <Layout class="backColor">

    <Sider hide-trigger  width="400"  id="slider" class="backColor bigSliderLeft">
      <device-statistics @on-click="turnToPage" :chartsHeight='chartsHeight' style=" margin:0 10px 0 10px" />
      <device-statistics :chartsHeight='chartsHeight' style="margin:10px 10px 0 10px" />
      <device-statistics :chartsHeight='chartsHeight' style="margin:10px 10px 0 10px" />
    </Sider>
    <Content class="main-content-con backColor">

      <Layout class="main-layout-con backColor">
        <!-- <div class="tag-nav-wrapper">
            <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
          </div> -->
        <Content class="content-wrapper backColor">
          <keep-alive :include="cacheList" :exclude="notCacheName">
            <router-view ref="child" />
          </keep-alive>

        </Content>
      </Layout>
    </Content>
    <Sider hide-trigger width="400" class="backColor bigSliderRight">
      <device-statistics :chartsHeight='chartsHeight' style="margin:0 10px 0 10px;margin-right:10px" />
      <device-statistics :chartsHeight='chartsHeight' style="margin:10px 10px 10px 10px;margin-right:10px" />
      <device-statistics :chartsHeight='chartsHeight' style="margin:10px 10px 10px 10px;margin-right:10px" />
    </Sider>
  </Layout>
</Layout>
</template>
<script>
import deviceStatistics from './components/deviceStatistics'
import showCurrentTime from "./components/times"
import User from './components/user/'
import titles from "./components/titles"
import './parent-view.less'
export default {
  name: 'ParentView',
  components: {

    deviceStatistics,
    showCurrentTime,
    User,
    titles


  },
  data() {
    return {
      chartsHeight: 170,
      unreadCount: 0
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
    console.log("header", $("#header").height())
    this.chartsHeight = ($(window).height() - 30 - 106) / 3 - 28
    console.log(this.chartsHeight)
    console.log($(window).height())
  },
  methods: {
    turnToPage(to) {
      this.$router.push({
        name: to,
        meta: {
          title: `视图管理`,
          notCache: false
        }
      })
    }
  },
  mounted() {
    console.log($(window).height())
  }
}
</script>
