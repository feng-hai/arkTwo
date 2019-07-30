<template>
    <div class="template-page-alarm backImage" >
    <!-- <p>
      <i class="iconfont icon-jianzhu"></i>
      <span class="active">{{title}}</span>
    </p> -->
    <p class="panel-tit">监控点位</p>
    <div class="conten">
      <!-- <div><span>安全指数</span></div>
      <div class="conten-left">
        <i class="iconfont icon-dunpai"></i>
        <div class="shuliang">
          <span>{{grade}}</span>
        </div>
      </div> -->
      
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
      default () {
        return '文字标题'
      }
    },
    grade: {
      type: Number,
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
            num: 345,
            name: '接入'
          },
          {
            color: '#5bf4fd',
            num: 300,
            name: '正常'
          },
          {
            color: '#ff9900',
            num: 15,
            name: '报警'
          },
          {
            color: '#ff5050',
            num: 7,
            name: '故障'
          },
          
          {
            color: '#678af2',
            num: 21,
            name: '屏蔽'
          }
          ,
          {
            color: '#6781f2',
            num: 7,
            name: '联动'
          }
        ]
      }
    }
  },
}
</script>
<style lang="scss" >
.panel-tit{ height: 40px; line-height: 40px; font-size: 20px; color: #fff; padding-left: 10px; }
.template-page-alarm{
  background-color: rgba(24, 35, 50, 0.2);
  padding: 15px;
  p {
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
      font-size: 20px;
      display: inline-block;
    }
    ul.conten-rig {
      li {
        list-style-type: none;
        height: 38px;
        line-height: 38px;
        float: left;
        width:50%;
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
          width: 35%;
          text-align: left;
        }
      }
    }
  }
}


.icon-jianzhu {
  font-size: 1rem;
}

</style>


