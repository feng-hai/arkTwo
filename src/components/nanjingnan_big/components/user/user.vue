<template>
  <div class="user-avator-dropdown">
    <Dropdown @on-click="handleClick">
      <Badge :dot="!!messageUnreadCount">
        <Avatar :src="userAvator" />
      </Badge>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="message">
          消息中心
          <Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>
        </DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
        <DropdownItem name="saveLayout">保存设置</DropdownItem>
        <DropdownItem name="addLayout">添加设置</DropdownItem>
        <DropdownItem name="startEdit">启动编辑</DropdownItem>
        <DropdownItem name="endEdit">关闭编辑</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import "./user.less";
import { mapActions } from "vuex";
export default {
  name: "User",
  props: {
    userAvator: {
      type: String,
      default: ""
    },
    messageUnreadCount: {
      type: Number,
      default: 0
    }
  },
  methods: {
    ...mapActions(["handleLogOut", "clear_Routes"]),
    logout() {
      sessionStorage.removeItem("menuData");
      this.clear_Routes();
      this.handleLogOut().then(() => {
        this.$router.push({
          name: "login"
        });
        //location.reload() ;
      });
    },
    message() {
      this.$router.push({
        name: "message_page"
      });
    },
    handleClick(name) {
      switch (name) {
        case "logout":
          this.logout();
          break;
        case "message":
          this.message();
          break;
        case "saveLayout":
          this.$emit("saveLayout");
          break;
        case "addLayout":
          this.$emit("addLayout");
          break;
        case "startEdit":
          this.$emit("startEdit");
          break;
        case "endEdit":
          this.$emit("endEdit");
          break;
      }
    }
  }
};
</script>
