<template>
  <div class="template-page-danger backImage" >
    <p class="pTitle">
      <span>隐患检测</span>
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
        <li v-for="(item , index) in list" :key="index" >
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
            name: "特大隐患"
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
<style lang="scss" scoped >
.template-page-danger {
  background-color: rgba(24, 35, 50, 0.2);
  padding: 30px;
  padding-top:60px;
  // .pTitle {
  //   position: absolute;
  //   top: 20px;
  //   left: 20px;
  //   z-index: 100;
  //   span {
  //     cursor: pointer;
  //     cursor: hand;
  //     padding: 10px;
  //     font-size: 20px;
  //     color: #fff;
  //     // Border: 1px solid #000;
  //   }
  //   .active {
  //     color: #00ceff;
  //   }
  //   .noactive {
  //     color: #caf3f8;
  //   }
  // }

  .conten {
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      color: #fff;
      font-size: 20px;
      display: inline-block;
    }
    ul.conten-rig {
      li {
        list-style-type: none;
        width: 50%;
        float:left;
        span {
          color: #fff;
          font-size: 14px;
          display: inline-block;
        }
        .lef {
          width: 60%;
          padding-left: 10px;
          text-align: left;
          font-size: 26px;
        }
        .rig {
          width: 40%;
          text-align: right;
        }
      }
      li:last-child{
        width: 100%;
      }
    }
  }
}


.icon-jianzhu {
  font-size: 1rem;
}


</style>


