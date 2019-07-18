<template>
  <div>
    <tablesPage
      :viewId="viewId"
      @on-saveRow="saveRow"
      @on-edit="editPage"
      @on-save-edit="onSaveEdit"
    ></tablesPage>
    <Modal v-model="model1" title="用户角色" :scrollable="true" @on-ok="ok" @on-cancel="cancel">
      <CheckboxGroup v-model="resultArr" @on-change="checkChange">
        <Checkbox :label="item.id" v-for="item in searchArr" v-bind:key="item.id">{{item.name}}</Checkbox>
      </CheckboxGroup>
    </Modal>
  </div>
</template>
<script>
import tablesPage from "@/view/tables/template";
import { getDataByParams } from "@/api/handle";
import {
  mapActions,
  mapGetters
  // mapState
} from "vuex";
export default {
  name: "userPage",
  components: {
    tablesPage
  },
  computed: {
    ...mapGetters(["getRolesInfo"])
  },
  data() {
    return {
      viewId: "342FA2327026480A903B019902CBC24D",
      searchArr: [],
      resultArr: [],
      currentUserid: "",
      model1: false
    };
  },
  methods: {
    ...mapActions(["getRolesByUserId"]),
    checkChange() {},
    cancel() {},
    ok() {
      var that = this;
      if (this.resultArr.length > 0) {
        var items = this.searchArr.map(item => {
          return item.id;
        });
        getDataByParams({
          url: "/legacy/security/openid_privilege_map/unbind",
          method: "put",
          data: {
            openid: this.currentUserid,
            privilege_unid: items.join(",")
          }
        }).then(item => {
          getDataByParams({
            url: "/legacy/security/openid_privilege_map/bind",
            method: "put",
            data: {
              openid: that.currentUserid,
              privilege_unid: that.resultArr.join(",")
            }
          }).then(item => {
            this.$Message.success('绑定角色成功');
          }).catch(err=>{
            this.$Message.error('角色绑定失败');
          });
        });
      } else {
      }
    },
    editPage(params, vm) {
      var that = this;
      this.model1 = true;
      this.currentUserid = params.row.unid;
      this.getRolesByUserId(this.currentUserid).then(res => {
        that.resultArr = res.map(item => {
          return item.unid;
        });
       
      }).catch(err=>{
        that.resultArr=[]
      });
    },
    onSaveEdit: function(params) {
      if (params.column.field == "privilege_unid") {
        this.saveRow(params.row);
      }
    },
    saveRow: function(row) {
      // console.log(row, "修改用戶綁定角色");
      // getDataByParams({
      //   url: "/legacy/security/openid_privilege_map/bind",
      //   method: "put",
      //   data: {
      //     openid: row.unid,
      //     privilege_unid: row.privilege_unid
      //   }
      // }).then(item => {
      //   console.log(item);
      // });
    }
  },
  mounted() {
    var roles = this.getRolesInfo;

    this.searchArr = roles.map(item => {
      return {
        name: item.label,
        id: item.value
      };
    });
  }
};
</script>
