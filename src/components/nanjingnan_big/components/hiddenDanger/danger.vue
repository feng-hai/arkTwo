<template>
  <div class="template-page-danger backImage" >
    <p class="pTitle">
      <span class="active">隐患检测</span>
    </p>
    <!-- <p>
      <i class="iconfont icon-jianzhu"></i>
      <span class="active">{{title}}</span>
    </p>-->
    <div class="conten">
      <!-- <div><span>安全指数</span></div>
      <div class="conten-left">
        <i class="iconfont icon-dunpai"></i>
        <div class="shuliang">
          <span>{{grade}}</span>
        </div>
      </div>-->
      <!-- <span style="width:10px; color:#fff;padding-right:40px;">报警</span> -->
      <ul class="conten-rig">
        <li v-for="(item , index) in list" :key="index" style="width:50%">
          <span class="rig">{{item.name}}</span>
          <span class="lef" :style="{color:item.color}">{{item.num}}</span>
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
            color: "#ff5050",
            num: 123,
            name: "特别重大隐患"
          },
          {
            color: "#ff9900",
            num: 123,
            name: "重大隐患"
          },
          {
            color: "#5bf4fd",
            num: 13,
            name: "较大隐患"
          },
          {
            color: "#678af2",
            num: 3,
            name: "一般隐患"
          },
          {
            color: "#6781f2",
            num: 3000,
            name: "已处理隐患"
          }
        ];
      }
    }
  }
};
</script>
<style lang="scss" >
.template-page-danger {
  background-color: rgba(24, 35, 50, 0.2);
  padding: 30px;
  padding-top:60px;
  p {
    padding-bottom: 10px;
    text-align: left;
    i {
      color: #5bf4fd;
    }
    span {
      font-size: 14px;
      color: #00ceff;
      padding-left: 8px;
    }
  }
  .conten {
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      color: #fff;
      font-size: 21px;
      display: inline-block;
    }
    ul.conten-rig {
      flex: 1;
      li {
        list-style-type: none;
        line-height: 38px;
        float: left;
        width: 18%;
        span {
          color: #fff;
          font-size: 14px;
          display: inline-block;
        }
        .lef {
          //   width: 60%;
          padding-left: 10px;
          text-align: left;
          font-size: 26px;
        }
        .rig {
          //   width: 40%;
          text-align: right;
        }
      }
    }
  }
}

.conten-left {
  width: 106px;
  position: relative;

  .shuliang {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -40px;
    width: 80px;
    height: 80px;
    line-height: 80px;
    margin-left: -8px;
  }
  .shuliang span {
    color: #00ceff;
    font-size: 40px;
  }
  .pTitle {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 100;
    span {
      cursor: pointer;
      cursor: hand;
      padding: 10px;
      // Border: 1px solid #000;
    }
    .active {
      color: #00ceff;
    }
    .noactive {
      color: #caf3f8;
    }
  }
}
.icon-jianzhu {
  font-size: 1rem;
}

.icon-dunpai {
  font-size: 5rem;
  color: #5bf4fd;
  // margin-left: 20px;
  float: right;
}
</style>


