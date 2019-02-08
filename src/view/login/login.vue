<style lang="less">
@import './login.less';
</style>
<template>
<div class="login">
  <div class="login-con">
    <Card icon="log-in" title="欢迎登录" :bordered="false">
      <div class="form-con">
        <login-form @on-success-valid="handleSubmit"></login-form>
        <p class="login-tip">输入任意用户名和密码即可</p>
      </div>
    </Card>
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
      'add_Routes'
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
