<template>
  <div class="template-page backImage" >
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
      <p><span>安全指数</span></p>
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
<style lang="scss" scoped >
@import url("./iconfont/iconfont.css");
.template-page {
  background-color: rgba(24, 35, 50, 0.2);
  padding: 15px;
  p {
    i {
      color: #5bf4fd;
    }
    span {
      font-size: 14px;
      color: #00ceff;
      // padding-left: 8px;
  
    }
  }
  .conten {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    span{
      color: #fff;
          font-size: 20px;
          display: inline-block;
    }
  }
}
.active {
  color: #00ceff;
}
.conten-left {
  width: 74px;
  height: 84px;
  position: relative;
      padding-left: 4px;

  .shuliang {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -19px;
    width: 74px;
    margin-left: -36px;
    text-align: center;
  }
  .shuliang span {
    color: #00ceff;
    font-size: 34px;
  }
}
.icon-jianzhu {
  font-size: 1rem;
}

.icon-dunpai {
  font-size: 4.2rem;
  color: #5bf4fd;
  height: 83px;
  // margin-left: 20px;
}
</style>
