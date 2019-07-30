<template>
    <div class="template-page-video backImage" >
    <!-- <p>
      <i class="iconfont icon-jianzhu"></i>
      <span class="active">{{title}}</span>
    </p> -->
    <div class="conten">
      <!-- <div><span>安全指数</span></div>
      <div class="conten-left">
        <i class="iconfont icon-dunpai"></i>
        <div class="shuliang">
          <span>{{grade}}</span>
        </div>
      </div> -->
      <span style="width:10px; color:#fff;padding-right:40px;">水网</span>
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
            num: 123,
            name: '正常'
          },
          {
            color: '#ff5050',
            num: 123,
            name: '报警'
          }
        
        
        ]
      }
    }
  },
}
</script>
<style lang="scss" scoped >

.template-page-video{
  background-color: rgba(24, 35, 50, 0.2);
  padding: 15px;
   padding-top: 30px;
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
        float: left;
        width:50%;
        span {
          color: #fff;
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
.active {
  color: #00ceff;
}
.icon-jianzhu {
  font-size: 1rem;
}


</style>


