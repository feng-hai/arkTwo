<template>
<Layout class="big_mains">
  <!-- <Header id="header" class="backColor">Header</Header> -->
  <Row class="big_header">
    <Col span="8">
    <show-current-time />
    </Col>
    <Col span="8" class="big_cente">
    <span><Icon style="margin-bottom:5px;margin-right:5px;" type="md-train" /></span><span>南京动车段智慧消防安防平台</span>
    </Col>
    <Col span="8">
    <div style="float:right;margin-right:50px;">
      <user :message-unread-count="unreadCount" :user-avator="userAvator" style="float:right;" />
      <titles style="margin-right:70px;" name="动车段管理员"/>
    </div>
    </Col>
  </Row>
  <Layout class="backColor">
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
  name: 'ParentViewBig',
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
      return ['ParentView0', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
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
