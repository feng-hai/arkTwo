<template>
  <div class="safe-page " >
    <!-- <p>
      <i class="iconfont icon-jianzhu"></i>
      <span class="active">{{title}}</span>
    </p> -->
    <div class="conten">
    
      <div class="conten-left">
        <i class="iconfont icon-dunpai"></i>
        <div class="shuliang">
          <span>{{grade}}</span>
        </div>
      </div>
   <div><span>安全指数</span></div>
       
      <!-- <ul class="conten-rig">
        <li v-for="(item , index) in list" :key="index">
          <span class="lef" :style="{color:item.color}">{{item.num}}</span>
          <span class="rig">{{item.name}}</span>
        </li>
      </ul> -->
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default () {
        return '文字标题'
      }
    },
    grade: {
      type: Number|String,
      default () {
        return 98
      }
    },
    list: {
      type: Array,
      default () {
        return [
          {
            color: '#5bf4fd',
            num: 123,
            name: '正常'
          },
          {
            color: '#ff5050',
            num: 123,
            name: '故障'
          },
          {
            color: '#ff9900',
            num: 13,
            name: '报警'
          },
          {
            color: '#678af2',
            num: 3,
            name: '屏蔽'
          }
        ]
      }
    }
  },
  data () {
    return {
      // title: '文字标题',
    }
  },
  methods: {
   
  }
}
</script>
<style lang="scss" >
@import url("./iconfont/iconfont.css");
.safe-page  {
  background-color: rgba(24, 35, 50, 0.2);
  padding: 15px;
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
    span{
      color: #fff;
          font-size: 21px;
          display: inline-block;
    }
    ul.conten-rig {
      flex: 1;
      li {
        list-style-type: none;
        line-height: 38px;
        span {
          color: #fff;
          font-size: 14px;
          display: inline-block;
        }
        .lef {
          width: 100%;
          text-align: center;
          font-size: 26px;
        }
        .rig {
          // padding-left: 10px;
          width: 100%;
          text-align: center;
        }
      }
    }
  }
}
.active {
  color: #00ceff;
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
