<template>
  <div class="contingencyPlan" @click.stop="click">
    <div class="content">
      <div class="contingency"></div>
      <span class="title1">应急预案</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      resource: require("@/assets/img/contingencyPlan.png")
    };
  },
  methods: {
    click() {
      this.$emit("click", {}, "contingencyPlan");
    }
  },
  props: {
    w: {
      type: String | Number,
      default() {
        return 50;
      }
    },
    h: {
      type: String | Number,
      default() {
        return 50;
      }
    }
  },
  beforeMount() {}
};
</script>
<style lang="less">
.contingencyPlan {
    padding-top: 2em;

  .content {
    position: relative;

    left: 50%;

    margin-left: -2.5em;

    .contingency {
      width: 5em;
      height: 5em;
      background-image: url("../../../../assets/img/contingencyPlan.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .title1 {
      color: #fff;
      font-size: 21px;
      display: inline-block;
    }
  }
}
</style>

