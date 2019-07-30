<template>
  <div class="template-page-video backImage">
    <!-- <p>
      <i class="iconfont icon-jianzhu"></i>
      <span class="active">{{title}}</span>
    </p>-->
     <p class="tit"><span>视频</span></p>
    <div class="conten">
      <ul class="conten-rig">
        <li v-for="(item , index) in list" :key="index">
          <span class="lef" :style="{color:item.color}">{{item.num}}</span>
          <span class="rig">{{item.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default() {
        return "文字标题";
      }
    },
    grade: {
      type: Number,
      default() {
        return 98;
      }
    },
    list: {
      type: Array,

      default() {
        return [
          {
            color: "#5bf4fd",
            num: 123,
            name: "在线"
          },
          {
            color: "#ff5050",
            num: 123,
            name: "离线"
          }
        ];
      }
    }
  }
};
</script>
<style lang="scss" scoped >
.template-page-video {
  background-color: rgba(24, 35, 50, 0.2);
  padding: 15px;
  padding-top: 30px;
  position:relative;
  p {
    padding-bottom: 10px;
    text-align: left;
    i {
      color: #5bf4fd;
    }
    span {
      font-size: 14px;
      color: #00ceff;
    }
  }
  .tit{
      position: absolute;
      left: 0px;
      top: 0px;
      width:50px; 
      padding:10px;
      color:#fff;
      text-align: center;
      word-break: break-all;
      height: 100%;
      // background: rgb(91, 244, 253);
     span {
      font-size: 20px;
      color: #fff;
    }
    }
  .conten {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left:30px;
    ul.conten-rig {
      flex: 1;
      li {
        list-style-type: none;
        line-height: 38px;
        float: left;
        width: 50%;
        
        span {
          color: #ddd;
          font-size: 14px;
          display: inline-block;
        }
        .lef {
          width: 60%;
          text-align: right;
          font-size: 26px;
          
        }
        .rig {
          padding-left: 10px;
          width: 40%;
          text-align: left;
        }
      }
      li:nth-child(2){
        border-left:3px solid rgb(91, 244, 253);
      }
    }
  }
}

</style>


