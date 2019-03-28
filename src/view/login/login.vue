<style lang="less">
@import './login.less';
</style>
<template>
<div class="login">
  <div class="login-logo"></div>
  <div class="login-con">
    <div class="title">
      <span>智航电池系统大数据管理平台</span>
    </div>
    <!--     <Card icon="log-in" title="" :bordered="false"> -->
    <div class="form-con">
      <login-form @on-success-valid="handleSubmit"></login-form>
      <!-- <p class="login-tip">输入任意用户名和密码即可</p> -->
    </div>
    <!--     </Card> -->
  </div>
</div>
</template>

<script>
import LoginForm from '_c/login-form'
import {
  mapActions,
  mapGetters,
  mapState
} from 'vuex'

export default {
  components: {
    LoginForm
  },
  computed: {
    ...mapGetters([
      'getMenus'
    ])
  },
  methods: {
    ...mapState(['menus']),
    ...mapActions([
      'handleLogin',
      'getUserInfo',
      'add_Routes',
      'handleTablesInfo',
      "getOrgInfoAction",
      'getMenuInfoAction',
      'getRolesInfoAction',
      'getVehicleModelAction'
    ]),
    handleSubmit({
      userName,
      password
    }) {
      this.handleLogin({
        userName,
        password
      }).then(res => {
        var that = this;
        that.getOrgInfoAction();
        that.getMenuInfoAction();
        that.getRolesInfoAction();
        that.getVehicleModelAction();
        this.getUserInfo().then(res => {
          if (that.getMenus) {
            that.add_Routes(that.getMenus); //触发vuex里的增加路由
            sessionStorage.setItem('menuData', JSON.stringify(that.getMenus))
          }
          this.$router.push({
            name: this.$config.homeName
          })
        })
      })
    }
  }
}
</script>
<style>
.ivu-btn-primary{
background: #007a3d;
border: 1px solid #007a3d;
}


  
</style>
