<template>
  <Card :shadow="shadow" class="info-card-wrapper" :padding="0">
    <div class="content-con">
      <div class="left-area" :style="{width: leftWidth}">
        <slot></slot>
      </div>
      <div class="right-area" :style="{width: rightWidth}" style="position: relative;">
        <div :style="{width: rightWidth}">
          <div>
          <example :colorType="indexId" style="width: 270px; height: 120px;" />
          </div>
          <div class="percent" :style="{color: colorTypes[indexId]}">+{{percent}}%</div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script>
import Example from './example.vue'
export default {
  name: 'InforCard',
  components: {
    Example
  },
  props: {
    left: {
      type: Number,
      default: 36
    },
    shadow: {
      type: Boolean,
      default: false
    },
    indexId: {
      type: Number
    }
  },
  data(){
    return{
      colorTypes: ['#00c6de', '#b6bde8', '#fcb822'],
      percent: 17,
    }
  },
  computed: {
    leftWidth () {
      return `${this.left}%`
    },
    rightWidth () {
      return `${100 - this.left}%`
    }
  }
}
</script>

<style lang="less">
.common{
  float: left;
  height: 100%;
  display: table;
  /*text-align: center;*/
}
.size{
  width: 100%;
  height: 100%;
}
.percent{
  position: absolute;
  right: 36px;
  bottom: 36px;
}
.middle-center{
  display: table-cell;
  vertical-align: middle;
}
.info-card-wrapper{
  .size;
  overflow: hidden;
  box-shadow: 2px 2px 2px 0 0 #ccc;
  .ivu-card-body{
    .size;
  }
  .content-con{
    .size;
    position: relative;
    display: flex;
    .left-area{
      .common;
      & > .icon{
        .middle-center;
      }
    }
    .right-area{
      .common;
      & > div{
        .middle-center;
      }
    }
  }
}
</style>
